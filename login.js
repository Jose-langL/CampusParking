//Variable y validacion para el login
const Usuario = document.getElementById("Usuario");
const Contra = document.getElementById("Contraseña");
const BtnLogin = document.getElementById("LoginButton");
// const BtnCerrar = document.getElementById("Btnsalir")
const Usuarioprueba = "Admin1";
const Contraprueba = "admin123";

const validaUsuario = () => {
    if (!Usuario || !Contra) return;
    if (Usuario.value == Usuarioprueba && Contra.value == Contraprueba) {
        window.location.href = "index.html";
        console.log("Usuario y contraseña correctos");
    } else if (Usuario.value != Usuarioprueba && Contra.value == Contraprueba) {
        alert("Usuario incorrecto");
    } else if (Usuario.value == Usuarioprueba && Contra.value != Contraprueba) {
        alert("Contraseña incorrecta");
    } else {
        alert("Usuario y contraseña incorrectos");
    }
}

const btnenter = document.getElementById("LoginButton");
    btnenter.addEventListener('click', validaUsuario);
