/**
* PHP Email Form Validation - v3.9
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/
(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach( function(e) {
    e.addEventListener('submit', function(event) {
      event.preventDefault();

      let thisForm = this;

      let action = thisForm.getAttribute('action');
      let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');
      
      if( ! action ) {
        displayError(thisForm, 'The form action property is not set!');
        return;
      }
      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      let formData = new FormData( thisForm );

      if ( recaptcha ) {
        if(typeof grecaptcha !== "undefined" ) {
          grecaptcha.ready(function() {
            try {
              grecaptcha.execute(recaptcha, {action: 'php_email_form_submit'})
              .then(token => {
                formData.set('recaptcha-response', token);
                php_email_form_submit(thisForm, action, formData);
              })
            } catch(error) {
              displayError(thisForm, error);
            }
          });
        } else {
          displayError(thisForm, 'The reCaptcha javascript API url is not loaded!')
        }
      } else {
        php_email_form_submit(thisForm, action, formData);
      }
    });
  });

  function php_email_form_submit(thisForm, action, formData) {
    fetch(action, {
      method: 'POST',
      body: formData,
      headers: {'X-Requested-With': 'XMLHttpRequest'}
    })
    .then(async response => {
      const responseText = await response.text();
      if( response.ok ) {
        return responseText;
      } else {
        throw new Error(responseText.trim() || `${response.status} ${response.statusText}`); 
      }
    })
    .then(data => {
      thisForm.querySelector('.loading').classList.remove('d-block');
      if (data.trim() == 'OK') {
        thisForm.querySelector('.sent-message').classList.add('d-block');
        thisForm.reset(); 
      } else {
        throw new Error(data ? data : 'Form submission failed and no error message returned from: ' + action); 
      }
    })
    .catch((error) => {
      displayError(thisForm, error);
    });
  }

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    let message = (error instanceof Error) ? error.message : String(error);

    // If server mail is unconfigured or static host returns 405 Method Not Allowed / 404,
    // provide an executive 1-click mailto fallback with the form data pre-populated
    const isServerUnavailable = message.includes('405') ||
                                message.includes('Method Not Allowed') ||
                                message.includes('404') ||
                                message.includes('Failed to fetch') ||
                                message.includes('NetworkError') ||
                                message.includes('mail server') ||
                                message.includes('mail service');

    if (isServerUnavailable) {
      const subjectInput = thisForm.querySelector('[name="subject"]');
      const messageInput = thisForm.querySelector('[name="message"]');
      const nameInput = thisForm.querySelector('[name="name"]');
      const emailInput = thisForm.querySelector('[name="email"]');

      const subject = encodeURIComponent(subjectInput ? subjectInput.value : 'Executive Inquiry');
      const bodyText = `Name: ${nameInput ? nameInput.value : ''}\nEmail: ${emailInput ? emailInput.value : ''}\n\nMessage:\n${messageInput ? messageInput.value : ''}`;
      const mailtoUrl = `mailto:mahendra.s@outlook.in?subject=${subject}&body=${encodeURIComponent(bodyText)}`;

      message = `Server mail processing is not configured on this host. <a href="${mailtoUrl}" class="text-white text-decoration-underline fw-bold" style="word-break: break-word;">Click here to email mahendra.s@outlook.in directly</a> with your inquiry details.`;
    }

    thisForm.querySelector('.error-message').innerHTML = message;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

})();
