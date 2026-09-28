Executive Portfolio Contact Form Handler
========================================

File: forms/contact.php
Destination: mahendra.s@outlook.in

Features:
- Native PHP (PHP 7.4+ and PHP 8.x compatible)
- Zero proprietary dependencies (no BootstrapMade pro library required)
- Full AJAX integration with assets/vendor/php-email-form/validate.js
- Form sanitization and server-side validation
- Anti-spam honeypot verification
- Email Header Injection defense (CRLF filtering)
- Clear executive submission formatting with metadata (IP, timestamp, user agent)
- Direct reply-to routing

Deployment Notes:
- To deploy on a PHP server (Apache / Nginx / PHP-FPM), ensure PHP's mail() function is enabled or configure a local MTA (sendmail/postfix).
- If deployed on a static host (such as GitHub Pages), the contact form in contact.html provides an instant one-click executive email fallback to mahendra.s@outlook.in.