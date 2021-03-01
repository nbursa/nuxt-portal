<?php

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // $_POST = json_decode(file_get_contents('php://input'), true);
        $name = strip_tags(trim($_POST["name"]));
        $name = str_replace(array("\r","\n"),array(" "," "),$name);
        $email = filter_var(trim($_POST["mail"]), FILTER_SANITIZE_EMAIL);
        $message = trim($_POST["message"]);
        // $novosti = implode(', ', $_POST['novosti']);

        if ( empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo "There is a problem with message, maybe email address is mistyped? Please correct any mistakes and try again.";
            exit;
        }

        // if ( empty($novosti) ) {
        //   http_response_code(400);
        //   echo "Please use checkbox, it is anti-spam protection.";
        //   exit;
        // }

        $recipient = "nbursa@gmail.com";

        $subject = "Nova poruka sa sajta www.nenadbursac.com od $name - $email";

        $email_headers = 'Content-type: text/html; charset=UTF-8';

        $variables = array();
        $variables['name'] = "$name";
        $variables['mejl'] = "$email";
        $variables['message'] = "$message";

        $content = file_get_contents('mail.html');

        foreach($variables as $key => $value)
        {
            $content = str_replace('{{ '.$key.' }}', $value, $content);
            $content = str_replace('<a href="mailto:{{ ' .$key. ' }}">', $value, $content);
        }

        if (mail($recipient, $subject, $content, $email_headers)) {
            http_response_code(200);
            echo "Message successfully sent!";
        } else {
            http_response_code(500);
            echo "(500) Error...sending failed!";
        }

    } else {
        http_response_code(403);
        echo "(403) Error...please try again.";
    }

?>
