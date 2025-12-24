//Obtener movimiento
function obtenerMovimientos() {
  return JSON.parse(localStorage.getItem("movimientos")) || [];
}

//Guardar movimiento
function guardarMovimiento(tipo, descripcion, monto) {
  let movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];

  movimientos.push({
    tipo: tipo,
    descripcion: descripcion,
    monto: monto,
    fecha: new Date().toLocaleDateString("es-CL")
  });

  localStorage.setItem("movimientos", JSON.stringify(movimientos));
}

//Mostrar Movimientos
function getTipoTransaccion(tipo) {
  const tipos = {
    deposito: "Depósito",
    retiro: "Retiro",
    transferencia_enviada: "Transferencia enviada",
    transferencia_recibida: "Transferencia recibida"
  };
  return tipos[tipo] || "Movimiento";
}


function mostrarUltimosMovimientos(filtro = "todos") {
  let movimientos = obtenerMovimientos();
  $("#lista-movimientos").empty();

  if (filtro !== "todos") {
    movimientos = movimientos.filter(m => m.tipo === filtro);
  }

   // Tomar solo los últimos 5
  movimientos = movimientos.slice(-5).reverse();

  if (movimientos.length === 0) {
    $("#lista-movimientos").append(
      `<li class="list-group-item text-center text-muted">
        No hay transacciones registradas
      </li>`
    );
    return;
  }

  movimientos.reverse().forEach(mov => {
    $("#lista-movimientos").append(`
      <li class="list-group-item d-flex justify-content-between">
        <div>
          <strong>${getTipoTransaccion(mov.tipo)}</strong><br>
          <small>${mov.descripcion}</small><br>
          <small class="text-muted">${mov.fecha}</small>
        </div>
        <span class="fw-bold">$${mov.monto}</span>
      </li>
    `);
  });
}

//Evento del filtro
$(document).ready(function () {

  mostrarUltimosMovimientos();

  $("#filtroTipo").on("change", function () {
    mostrarUltimosMovimientos($(this).val());
  });

});


/* localStorage.removeItem("saldo");
localStorage.removeItem("movimientos");

$("#saldo").text("$0");
 */

 


 