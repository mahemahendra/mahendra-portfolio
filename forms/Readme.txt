Executive Portfolio Contact Form Handler
========================================

Production Configuration:
-------------------------
The active contact form in `contact.html` is configured to use the FormSubmit.co serverless endpoint:
  Endpoint: https://formsubmit.co/ajax/mahendra.s@outlook.in

Why this is ideal for the portfolio:
- Works seamlessly on static web hosting (GitHub Pages, Netlify, Vercel) as well as local test servers.
- Requires zero backend servers or SMTP daemon setup.
- Delivers form submissions directly to mahendra.s@outlook.in.
- Includes hidden anti-spam honeypot (_honey), customizable email subject (_subject), and clean table formatting (_template=table).

First-Time Activation:
- When the very first message is submitted, FormSubmit sends a 1-click confirmation email to mahendra.s@outlook.in to activate the endpoint.
- Once activated, all subsequent inquiries are delivered immediately to your inbox.

Alternative Self-Hosted PHP Handler:
-------------------------------------
If you host this website on a dedicated PHP-enabled server (Apache/Nginx with sendmail/postfix), you can switch the form action in `contact.html` to:
  action="forms/contact.php"

The file `forms/contact.php` is fully standalone (PHP 7.4 - 8.3+), requires no proprietary libraries, validates input, prevents CRLF header injection, blocks bots via honeypot, and returns standard 'OK' responses.