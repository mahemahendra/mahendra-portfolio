<?php
/**
 * Executive Portfolio Contact Form Handler
 * Recipient: mahendra.s@outlook.in
 *
 * Designed for native PHP web servers.
 * Supports AJAX submissions compatible with assets/vendor/php-email-form/validate.js.
 */

// 1. Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    echo 'Method Not Allowed. Please submit this form using POST.';
    exit;
}

// Set plain text output
header('Content-Type: text/plain; charset=UTF-8');

// Recipient email address
$receiving_email_address = 'mahendra.s@outlook.in';

// 2. Anti-spam honeypot verification
// If a bot filled out the hidden honeypot input, silently exit with success
if (!empty($_POST['contact_botcheck'])) {
    http_response_code(200);
    echo 'OK';
    exit;
}

// 3. Extract and sanitize inputs
$name    = isset($_POST['name']) ? trim(strip_tags($_POST['name'])) : '';
$email   = isset($_POST['email']) ? trim($_POST['email']) : '';
$subject = isset($_POST['subject']) ? trim(strip_tags($_POST['subject'])) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// 4. Validate input fields
$errors = [];

if (empty($name)) {
    $errors[] = 'Please provide your name & title.';
} elseif (mb_strlen($name) > 100) {
    $errors[] = 'Name exceeds the maximum length of 100 characters.';
}

if (empty($email)) {
    $errors[] = 'Please provide your email address.';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Please provide a valid email address.';
} elseif (mb_strlen($email) > 150) {
    $errors[] = 'Email address exceeds the maximum length of 150 characters.';
}

if (empty($subject)) {
    $errors[] = 'Please provide a discussion topic or subject.';
} elseif (mb_strlen($subject) > 200) {
    $errors[] = 'Subject exceeds the maximum length of 200 characters.';
}

if (empty($message)) {
    $errors[] = 'Please provide your inquiry details.';
} elseif (mb_strlen($message) > 10000) {
    $errors[] = 'Message exceeds the maximum length of 10,000 characters.';
}

if (!empty($errors)) {
    http_response_code(400);
    echo implode(' ', $errors);
    exit;
}

// 5. Email Header Injection Defense
// Strip any CR/LF characters from values that appear in mail headers
$clean_name    = str_replace(["\r", "\n", "%0a", "%0d"], '', $name);
$clean_email   = str_replace(["\r", "\n", "%0a", "%0d"], '', $email);
$clean_subject = str_replace(["\r", "\n", "%0a", "%0d"], '', $subject);

// 6. Build the email message
$email_subject = '[Portfolio Executive Inquiry] ' . $clean_subject;

$timestamp  = date('Y-m-d H:i:s T');
$ip_address = !empty($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : 'Unknown';
$user_agent = !empty($_SERVER['HTTP_USER_AGENT']) ? strip_tags($_SERVER['HTTP_USER_AGENT']) : 'Unknown';

$email_body = "Executive Inquiry received from Mahendra's Portfolio Website:\n\n";
$email_body .= "------------------------------------------------------------\n";
$email_body .= "Name & Title : " . $clean_name . "\n";
$email_body .= "Email        : " . $clean_email . "\n";
$email_body .= "Topic        : " . $clean_subject . "\n";
$email_body .= "------------------------------------------------------------\n\n";
$email_body .= "Message:\n" . $message . "\n\n";
$email_body .= "------------------------------------------------------------\n";
$email_body .= "Submission Metadata:\n";
$email_body .= "Timestamp  : " . $timestamp . "\n";
$email_body .= "IP Address : " . $ip_address . "\n";
$email_body .= "User Agent : " . $user_agent . "\n";
$email_body .= "------------------------------------------------------------\n";

// 7. Compose Email Headers
// Using a server domain for 'From' satisfies SPF/DMARC, while 'Reply-To' routes to the sender
$server_host = !empty($_SERVER['SERVER_NAME']) ? preg_replace('/^www\./', '', $_SERVER['SERVER_NAME']) : 'portfolio.local';
$from_email  = 'inquiry@' . $server_host;

$headers   = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = 'From: ' . $clean_name . ' <' . $from_email . '>';
$headers[] = 'Reply-To: ' . $clean_name . ' <' . $clean_email . '>';
$headers[] = 'X-Mailer: PHP/' . phpversion();

// 8. Dispatch Email
$mail_sent = @mail($receiving_email_address, $email_subject, $email_body, implode("\r\n", $headers));

if ($mail_sent) {
    // Return standard 'OK' response expected by the frontend AJAX validator
    echo 'OK';
} else {
    // Graceful error if mail server is unconfigured
    http_response_code(500);
    echo 'Unable to send message via the web server mail service. Please send your inquiry directly to ' . $receiving_email_address;
}
