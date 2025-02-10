<?php
// Configuramos que la respuesta será en JSON
header('Content-Type: application/json');

if (isset($_POST['expression'])) {
    $expression = $_POST['expression'];

    // Validamos que la expresión contenga únicamente caracteres permitidos:
    // dígitos, operadores básicos, paréntesis, espacios y el punto decimal.
    if (preg_match('/^[0-9+\-.*\/\(\)\s]+$/', $expression)) {
        // Usamos eval() para evaluar la expresión.
        // **Atención:** Eval() puede ser peligroso si no se valida correctamente la entrada.
        // Se utiliza aquí únicamente con fines demostrativos.
        $result = null;
        @eval("\$result = $expression;");

        if ($result !== null) {
            echo json_encode(["result" => $result]);
        } else {
            echo json_encode(["error" => "Error en la evaluación"]);
        }
    } else {
        echo json_encode(["error" => "Expresión inválida"]);
    }
} else {
    echo json_encode(["error" => "No se recibió ninguna expresión"]);
}
?>
