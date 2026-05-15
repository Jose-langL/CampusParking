//Variable y validacion para el login
const Usuario = document.getElementById("Usuario");
const Contra = document.getElementById("Contraseña");
const BtnLogin = document.getElementById("LoginButton");
// const BtnCerrar = document.getElementById("Btnsalir")
const Usuarioprueba = "Admin1";
const Contraprueba = "admin123";

const validaUsuario = () => {
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


    //Variable Global
    let Vehiculos = JSON.parse(localStorage.getItem("Vehiculos")) || [];

    //Funcion extraer datos formulario y localhost
    const formulariodatos = document.getElementById("FormularioIngreso");
    formulariodatos.addEventListener("submit", validarformulario);

    function validarformulario(e) {
        e.preventDefault();

        const Placa = document.getElementById("Placa").value;
        const TipoVehiculo = document.getElementById("TipoVehiculo").value;
        const FechaIngreso = document.getElementById("fechaingreso").value;
        const Slot = document.getElementById("Espacio").value;

        const ocupado = Vehiculos.some(carro => Number(carro.Slot) === Number(Slot));
        if (ocupado) {
            alert("¡Error! Este espacio ya está ocupado. Elige otro.");
            return;
        }

        nuevovehiculo = { Placa, TipoVehiculo, FechaIngreso, Slot };

        Vehiculos.push(nuevovehiculo);
        localStorage.setItem("Vehiculos", JSON.stringify(Vehiculos));
        formulariodatos.reset();
        datostabla();
    }

    //Funcion para poner datos de localhost en tabla
    const tablaentrada = document.getElementById("tabla2")
    const tablasalida = document.getElementById("tabla3")

    function datostabla() {
        Vehiculos
        tablaentrada.innerHTML = "";
        Vehiculos.forEach((datos, indice)=> {
            //Extraer datos de input fecha y hora
            let fecha_hora = datos.FechaIngreso.split('T');
            let fecha = fecha_hora[0]
            let hora = fecha_hora[1]

            tablaentrada.innerHTML += `
            <tr>
                <td>${datos.Placa}</td>
                <td>${datos.TipoVehiculo}</td>
                <td>${fecha}</td>
                <td>${hora}</td>
                <td>${datos.Slot}</td>
                <td><button onclick="EliminarVehiculo(${indice})" class="btneliminar">Eliminar</button></td>
                <td><button onclick="ModificarVehiculo(${indice})" class="btnmodificar">Modificar</button></td>
                <td><button onclick="pagarParqueo(${indice})" class="BtnPagar">Pagar</button></td>
            </tr>  `
            
        });
    }

    //Funcion para eliminar datos de la tabla y localstorage
    function EliminarVehiculo(posicion) {
        const respuesta = confirm("¿Seguro que quieres eliminar este auto?");

        if (respuesta == true) {
            Vehiculos.splice(posicion, 1);
            localStorage.setItem("Vehiculos", JSON.stringify(Vehiculos));
            datostabla();
            espacios();
        }else{
            alert("El auto no se ha eliminado");
        }
    }


//Funcion para modificar datos de la tabla y localstorage
    function ModificarVehiculo (posicion){
        const respuesta = confirm("¿Seguro que quieres modificar este auto?");
        if(respuesta == true){
            const nuevotipo = prompt ("Ingrese el nuevo tipo de vehiculo");
            const nuevoSlot = prompt ("Ingrese el nuevo espacio");

            Vehiculos[posicion].TipoVehiculo = nuevotipo;
            Vehiculos[posicion].Slot = nuevoSlot;
            localStorage.setItem("Vehiculos", JSON.stringify(Vehiculos));
            datostabla();
            alert("El auto se ha modificado correctamente");
        }else{
            alert("El auto no se ha podido modificar")
        }

    }

//Funcion para Pagar el parqueo
function pagarParqueo(posicion){

    const hora = Vehiculos[posicion];
    const horaentrada = new Date(hora.FechaIngreso);
    const horasalida = new Date();
    console.log(horasalida)
    const diferencia = horasalida - horaentrada;
    const horasparqueo = (diferencia / (1000 * 60 * 60));
    const Tarifa = Number(document.getElementById("TarifaHora").value);
    const Total = horasparqueo * Tarifa;

    const respuesta = confirm("Bienvenido al proceso de pago, ¿Desea continuar?");
    if(respuesta == true){
        alert("calculando el total a pagar...")
        const fecha_hora = hora.FechaIngreso.split('T');
        const hora_limpia_salida = horasalida.toLocaleTimeString('es-GT', { 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: false });
        tablasalida.innerHTML += `
        <tr>
            <td>${hora.Placa}</td>
            <td>${hora.TipoVehiculo}</td>
            <td>${fecha_hora[0]}</td>
            <td>${hora_limpia_salida}</td>
            <td>${hora.Slot}</td>
            <td>Q${Total.toFixed(2)}</td>
        </tr>`;

        Vehiculos.splice(posicion, 1); 
        datostabla();
        espacios();
    }else{
        alert("El proceso de pago se ha cancelado");
    }
}


    function espacios() {
        const tablaespacios = document.getElementById("tablaespacios");

        tablaespacios.innerHTML = "";
        
        for (let i = 1; i <= 20; i++) {
            const vehiculoespacio = Vehiculos.find(carro => Number(carro.Slot) === i);
            
            if (vehiculoespacio) {
                tablaespacios.innerHTML += `
                    <div class="espacios ocupado">
                        <b>Slot ${i}</b><br>
                        <span>${vehiculoespacio.Placa}</span>
                    </div>`;
            } else {
                tablaespacios.innerHTML += `
                    <div class="espacios libre">
                        <b>Slot ${i}</b><br>
                        <span>Disponible</span>
                    </div>`;
            }
        }
    }


