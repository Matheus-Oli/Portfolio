<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name'])) : '';
    $email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
    $subject = isset($_POST['subject']) ? htmlspecialchars(trim($_POST['subject'])) : '';
    $message = isset($_POST['message']) ? htmlspecialchars(trim($_POST['message'])) : '';
    $errors = [];
    
    if (empty($name)) {
        $errors[] = "Nome é obrigatório";
    }
    
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Email válido é obrigatório";
    }
    
    if (empty($subject)) {
        $errors[] = "Assunto é obrigatório";
    }
    
    if (empty($message)) {
        $errors[] = "Mensagem é obrigatória";
    }
    
    if (empty($errors)) {
    
        $to = 'matheus.oliveira.do.nasc@gmail.com';
        $email_subject = "Contato Portfolio: $subject";
        $email_body = "Você recebeu uma nova mensagem do formulário de contato do seu portfólio.\n\n";
        $email_body .= "Nome: $name\n";
        $email_body .= "Email: $email\n";
        $email_body .= "Assunto: $subject\n";
        $email_body .= "Mensagem:\n$message\n";
        $headers = "From: $email\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion();        
    
        if (mail($to, $email_subject, $email_body, $headers)) {
        
            $response = ['success' => true, 'message' => 'Mensagem enviada com sucesso! Entrarei em contato em breve.'];
            echo json_encode($response);
            exit;
        } else {
        
            $response = ['success' => false, 'message' => 'Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.'];
            echo json_encode($response);
            exit;
        }
    } else {
    
        $response = ['success' => false, 'message' => 'Por favor, corrija os seguintes erros:', 'errors' => $errors];
        echo json_encode($response);
        exit;
    }
} else {

    header("Location: index.html");
    exit;
}
?>