<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // $name = strip_tags(trim($_POST["name"]));
        // $name = str_replace(array("\r","\n"),array(" "," "),$name);
        $email = filter_var(trim($_POST["mail"]), FILTER_SANITIZE_EMAIL);
        // $message = trim($_POST["poruka"]);
        // $novosti = implode(', ', $_POST['novosti']);

        // if ( empty($novosti) ) {
        //   http_response_code(400);
        //   echo "Molim čekirajte poje da potvrdite ispravnost formulara";
        //   exit;
        // }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
          http_response_code(400);
          echo "There is a problem with message, maybe email address is mistyped? Please correct any mistakes and try again.";
          exit;
        }
        $recipient = "nbursa@gmail.com";

        $subject = "Novu poruka sa sajta www.nenadbursac.com od $email";

        $email_headers = 'Content-type: text/html; charset=UTF-8';

        $variables = array();
        $variables['mejl'] = "$email";

        $content = file_get_contents('request-mail.html');

        foreach($variables as $key => $value)
        {
            $content = str_replace('{{ '.$key.' }}', $value, $content);
            $content = str_replace('<a href="mailto:{{ ' .$key. ' }}">', $value, $content);
        }

        if (mail($recipient, $subject, $content, $email_headers)) {
            http_response_code(200);
            echo "Thank you, request has been sent!";
        } else {
            http_response_code(500);
            echo "(500) Error...message sending failed!";
        }

    } else {
        http_response_code(403);
        echo "(403) There is a problem with the form, try again!";
    }

?>
