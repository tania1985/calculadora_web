$(document).ready(function(){
    // Referencia al display
    var $display = $("#display");
    var operationCompleted = false;

    // Manejar el evento click de cada botón
    $(".buttons button").click(function(){
        var value = $(this).text();

        if (operationCompleted && !$(this).hasClass("operator") && !$(this).hasClass("equal") && !$(this).hasClass("backspace") && !$(this).hasClass("clear")) {
            $display.val("");
            operationCompleted = false;
        }

        switch (true) {
            case $(this).hasClass("clear"):
                // Si se presiona "C", se limpia el display
                $display.val("");
                break;
            case $(this).hasClass("equal"):
                // Si se presiona "=", se envía la expresión al servidor para evaluarla
                var expression = $display.val();
                $.ajax({
                    url: 'php/calc.php',
                    method: 'POST',
                    data: { expression: expression },
                    dataType: 'json',
                    success: function(response){
                        if(response.error){
                            $display.val(response.error);
                        } else {
                            $display.val(response.result);
                            operationCompleted = true;
                            setTimeout(function() {
                                $display.val("");
                            }, 2000); // Limpia el display después de 2 segundos
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown){
                        $display.val("Error en la petición");
                    }
                });
                break;
            case $(this).hasClass("backspace"):
                // Si se presiona "CE", se borra la última cifra
                var currentValue = $display.val();
                $display.val(currentValue.slice(0, -1));
                break;
            default:
                // En cualquier otro caso, se agrega el valor del botón al display
                $display.val($display.val() + value);
                break;
        }
    });
});
