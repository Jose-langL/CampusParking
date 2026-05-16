//Variable y validacion para el login
const Usuario = document.getElementById("Usuario");
const Contra = document.getElementById("Contraseña");
const email = document.getElementById("email")
const BtnLogin = document.getElementById("LoginButton");
// const BtnCerrar = document.getElementById("Btnsalir")
const Usuarioprueba = "Admin1";
const Contraprueba = "admin123";
const emailprueba = "admin1@gmail.com"
const validaUsuario = () => {
    if (!Usuario || !Contra) return;
    if (Usuario.value == Usuarioprueba && Contra.value == Contraprueba && email.value == emailprueba) {
        window.location.href = "index.html";
        console.log("Usuario y contraseña correctos");
    } else if (Usuario.value != Usuarioprueba && Contra.value == Contraprueba && email.value == emailprueba) {
        alert("Usuario incorrecto");
    }else if (Usuario.value == Usuarioprueba && Contra.value == Contraprueba && email.value != emailprueba){
        alert("Correo incorrecto")
    }else if (Usuario.value == Usuarioprueba && Contra.value != Contraprueba) {
        alert("Contraseña incorrecta");
    } else {
        alert("Credenciales incorrectas ");
    }
}

const btnenter = document.getElementById("LoginButton");
    btnenter.addEventListener('click', validaUsuario);
