$(document).ready(function(){
    // Referencia al display
    var $display = $("#display");
  
    // Manejar el evento click de cada botón
    $(".buttons button").click(function(){
      var value = $(this).text();
  
      if ($(this).hasClass("clear")) {
        // Si se presiona "C", se limpia el display
        $display.val("");
      } else if ($(this).hasClass("equal")) {
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
            }
          },
          error: function(jqXHR, textStatus, errorThrown){
            $display.val("Error en la petición");
          }
        });
      } else {
        // En cualquier otro caso, se agrega el valor del botón al display
        $display.val($display.val() + value);
      }
    });
  });
  