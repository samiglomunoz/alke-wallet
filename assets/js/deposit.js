
//Redirección 
function mostrarAlertaYRedirigir(mensaje, url, tipo = "success", tiempo = 2000) {
  $("#alerta-redireccion-texto").text(mensaje);

  $("#alerta-redireccion")
    .removeClass("d-none alert-success alert-danger")
    .addClass(`alert-${tipo} show`);

  if (url) {
    setTimeout(() => window.location.href = url, tiempo);
  }
}

$(document).ready(function () {

  // Protección de acceso
  if (!localStorage.getItem("usuarioLogueado")) {
    window.location.href = "login.html";
    return;
  }

  $("#depositForm").on("submit", function (e) {
    e.preventDefault();

    let monto = parseInt($("#monto").val());

    if (isNaN(monto) || monto <= 0) {
      // Error sin redirección
      mostrarAlertaYRedirigir(
        "Ingresa un monto válido.",
        null,
        "danger",
        0
      );
      return;
    }

    // Saldo
    let saldo = parseInt(localStorage.getItem("saldo")) || 0;
    saldo += monto;
    localStorage.setItem("saldo", saldo);

    // Movimiento
    let movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];
    movimientos.push({
      tipo: "deposito",
      descripcion: "Depósito realizado",
      monto: monto,
      fecha: new Date().toISOString()
    });
    localStorage.setItem("movimientos", JSON.stringify(movimientos));

    // Éxito + redirección
    mostrarAlertaYRedirigir(
      "Depósito realizado con éxito. Redirigiendo al menú…",
      "menu.html",
      "success",
      2200
    );
  });

});

//Movimiento a funciones
guardarMovimiento(
  "deposito",
  "Depósito realizado",
  monto
);
