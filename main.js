//Variable y validacion para el login
const Usuario = document.getElementById("Usuario");
const Contra = document.getElementById("Contraseña");
const BtnLogin = document.getElementById("LoginButton");
// const BtnCerrar = document.getElementById("Btnsalir")
const Usuarioprueba = "Admin1";
const Contraprueba = "admin123";

const validaUsuario = () => {
    if(Usuario.value == Usuarioprueba && Contra.value == Contraprueba) {
        window.location.href = "index.html";
        console.log("Usuario y contraseña correctos");
    }else if (Usuario.value != Usuarioprueba && Contra.value == Contraprueba){
        alert("Usuario incorrecto");
    }else if (Usuario.value == Usuarioprueba && Contra.value != Contraprueba){
        alert("Contraseña incorrecta");
    }else{
        alert("Usuario y contraseña incorrectos");
    }
}

//Funcion para extraer datos del formulario 
const formulariodatos = document.getElementById("FormularioIngreso");

formulariodatos.addEventListener("submit", validarformulario);

function validarformulario(e){
    e.preventDefault();
    const Vehiculos = JSON.parse(localStorage.getItem("Vehiculos")) || [];

    const Placa = document.getElementById("Placa").value;
    const TipoVehiculo = document.getElementById("TipoVehiculo").value;
    const FechaIngreso = document.getElementById("fechaingreso").value;
    const Slot = document.getElementById("Espacio").value;

    vehiculo = {Placa, TipoVehiculo, FechaIngreso, Slot};

    Vehiculos.push(vehiculo);
    localStorage.setItem("Vehiculos", JSON.stringify(Vehiculos));
    formulariodatos.reset();
}