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
    // If a subject was entered, synchronize it with FormSubmit's _subject hidden field
    const subjectField = thisForm.querySelector('#subject-field') || thisForm.querySelector('[name="subject"]');
    const hiddenSubject = thisForm.querySelector('[name="_subject"]');
    if (subjectField && hiddenSubject && subjectField.value.trim() !== '') {
      hiddenSubject.value = `[Portfolio Inquiry] ${subjectField.value.trim()}`;
      formData.set('_subject', hiddenSubject.value);
    }

    fetch(action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
    .then(async response => {
      const contentType = response.headers.get('content-type') || '';
      let data;
      if (contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        try {
          data = JSON.parse(text);
        } catch {
          data = text;
        }
      }

      if (!response.ok) {
        let errorMsg = (data && data.message) ? data.message : (typeof data === 'string' && data.trim()) ? data.trim() : `${response.status} ${response.statusText}`;
        throw new Error(errorMsg);
      }
      return data;
    })
    .then(data => {
      thisForm.querySelector('.loading').classList.remove('d-block');

      // Check for success across FormSubmit JSON and standard 'OK' text responses
      const isSuccess = (typeof data === 'object' && data !== null && (data.success === 'true' || data.success === true)) ||
                        (typeof data === 'string' && data.trim() === 'OK');

      if (isSuccess) {
        thisForm.querySelector('.sent-message').innerHTML = 'Your message has been sent successfully. Thank you for reaching out!';
        thisForm.querySelector('.sent-message').classList.add('d-block');
        thisForm.reset(); 
      } else {
        let message = (data && data.message) ? data.message : (typeof data === 'string' ? data : 'Form submission failed.');
        if (message.toLowerCase().includes('activate') || message.toLowerCase().includes('activation')) {
          message = '<strong>Form activation required:</strong> A one-time activation email has been sent to <strong>mahendra.s@outlook.in</strong>. Please check your inbox and click the activation link to start receiving inquiries.';
        }
        throw new Error(message); 
      }
    })
    .catch((error) => {
      displayError(thisForm, error);
    });
  }

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    let message = (error instanceof Error) ? error.message : String(error);

    const isActivationNotice = message.includes('activation email has been sent');

    if (!isActivationNotice) {
      const subjectInput = thisForm.querySelector('[name="subject"]');
      const messageInput = thisForm.querySelector('[name="message"]');
      const nameInput = thisForm.querySelector('[name="name"]');
      const emailInput = thisForm.querySelector('[name="email"]');

      const subject = encodeURIComponent(subjectInput ? subjectInput.value : 'Executive Inquiry');
      const bodyText = `Name: ${nameInput ? nameInput.value : ''}\nEmail: ${emailInput ? emailInput.value : ''}\n\nMessage:\n${messageInput ? messageInput.value : ''}`;
      const mailtoUrl = `mailto:mahendra.s@outlook.in?subject=${subject}&body=${encodeURIComponent(bodyText)}`;

      message += `<div class="mt-2"><small>Direct contact: <a href="${mailtoUrl}" class="text-white text-decoration-underline fw-bold" style="word-break: break-word;">Click here to email mahendra.s@outlook.in</a></small></div>`;
    }

    thisForm.querySelector('.error-message').innerHTML = message;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

})();
