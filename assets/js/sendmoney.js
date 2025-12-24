$(document).ready(function () {

  //Protección
  if (!localStorage.getItem("usuarioLogueado")) {
    window.location.href = "login.html";
    return;
  }

  let contactos = JSON.parse(localStorage.getItem("contactos")) || [];

  function renderContactos(lista) {
    $("#lista-contactos").empty();
    lista.forEach((c, i) => {
      $("#lista-contactos").append(`
        <li class="list-group-item contacto" data-index="${i}">
          <strong>${c.nombre} ${c.apellido}</strong><br>
          <small>${c.banco} · ${c.alias}</small>
        </li>
      `);
    });
  }

  renderContactos(contactos);

  //Autocompletar
  $("#buscar").on("keyup", function () {
    const texto = $(this).val().toLowerCase();
    const filtrados = contactos.filter(c =>
      (`${c.nombre} ${c.apellido}`).toLowerCase().includes(texto)
    );
    renderContactos(filtrados);
  });

  // Selección
  $("#lista-contactos").on("click", ".contacto", function () {
    $(".contacto").removeClass("active");
    $(this).addClass("active");
  });

  //Guardar contacto
  $("#contactForm").submit(function (e) {
    e.preventDefault();

    const contacto = {
      nombre: $("#nombre").val().trim(),
      apellido: $("#apellido").val().trim(),
      cbu: $("#cbu").val().trim(),
      alias: $("#alias").val().trim(),
      banco: $("#banco").val().trim()
    };

    if (Object.values(contacto).some(v => v === "")) {
      $("#alerta-contacto").text("Completa todos los campos.").removeClass("d-none");
      return;
    }

    contactos.push(contacto);
    localStorage.setItem("contactos", JSON.stringify(contactos));

    $("#contactForm")[0].reset();
    $("#modalContacto").modal("hide");

    renderContactos(contactos);
  });

  //Transferencia
  $("#sendForm").submit(function (e) {
    e.preventDefault();

    const monto = parseInt($("#monto").val());
    const contacto = $(".contacto.active").text();

    if (!contacto) {
      $("#alerta-envio").text("Selecciona un contacto.").removeClass("d-none");
      return;
    }

    if (isNaN(monto) || monto <= 0) {
      $("#alerta-envio").text("Monto inválido.").removeClass("d-none");
      return;
    }

    let saldo = parseInt(localStorage.getItem("saldo")) || 0;

    if (monto > saldo) {
      $("#alerta-envio").text("Saldo insuficiente.").removeClass("d-none");
      return;
    }

    saldo -= monto;
    localStorage.setItem("saldo", saldo);

    let movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];
    movimientos.push({
      tipo: "transferencia",
      descripcion: "Transferencia realizada",
      monto: monto,
      fecha: new Date().toISOString()
    });
    localStorage.setItem("movimientos", JSON.stringify(movimientos));

    window.location.href = "menu.html";
  });

});

//Movimientos a funciones
guardarMovimiento(
  "transferencia_enviada",
  "Transferencia enviada a Juan Pérez",
  monto
);

guardarMovimiento(
  "transferencia_recibida",
  "Transferencia recibida",
  monto
);
