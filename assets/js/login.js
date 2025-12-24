$(document).ready(function () {
    $("#loginForm").on("submit", function (e) {
        e.preventDefault();

        const usuario = $("#usuario").val().trim();
        const password = $("#password").val().trim();

        const usuarioValido = "admin";
        const passValido = "1234";

        if (usuario === usuarioValido && password == passValido) {
            localStorage.setItem("usuarioLogueado", usuario);
            window.location.href = "menu.html";
        } else {
            $("#alerta-texto").text("Usuario o contraseña incorrectos.");
            $("#alerta")
                .removeClass("d-none")
                .addClass("show");
        }
    });
});