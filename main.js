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

//Funcion extraer datos formulario y localhost
const formulariodatos = document.getElementById("FormularioIngreso");
formulariodatos.addEventListener("submit", validarformulario);

//Variable Global
const Vehiculos = JSON.parse(localStorage.getItem("Vehiculos")) || [];
function validarformulario(e){
    e.preventDefault();
    
    const Placa = document.getElementById("Placa").value;
    const TipoVehiculo = document.getElementById("TipoVehiculo").value;
    const FechaIngreso = document.getElementById("fechaingreso").value;
    const Slot = document.getElementById("Espacio").value;

    nuevovehiculo = {Placa, TipoVehiculo, FechaIngreso, Slot};

    Vehiculos.push(nuevovehiculo);
    localStorage.setItem("Vehiculos", JSON.stringify(Vehiculos));
    formulariodatos.reset();
}

//Funcion para poner datos de localhost en tabla
const tabladatos = document.getElementById("tabla2")

function datostabla(){
   const listaVehiculos = Vehiculos
   tabladatos.innerHTML = "";
   listaVehiculos.forEach(datos => {
    //Extraer datos de input fecha y hora
      let fecha_hora = datos.FechaIngreso.split('T');
      let fecha =  fecha_hora[0]
      let hora = fecha_hora[1]

       tabladatos.innerHTML +=`
       <tr>
            <td>${datos.Placa}</td>
            <td>${datos.TipoVehiculo}</td>
            <td>${fecha}</td>
            <td>${hora}</td>
            <td>${datos.Slot}</td>
       </tr>
       `
   });
   console.log(listaVehiculos)
   
}

datostabla()
