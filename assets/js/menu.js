 $("#logoutBtn").click(function () {
        localStorage.removeItem("usuarioLogueado");
        window.location.href = "login.html";
    });


/* Saldo */
$(document).ready(function () {

    let saldo = parseInt(localStorage.getItem("saldo")) || 0;

    $("#saldo").text("$" + saldo.toLocaleString("es-CL"));

});

