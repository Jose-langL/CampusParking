//Variables Global
let Vehiculos = JSON.parse(localStorage.getItem("Vehiculos")) || [];
let GananciasPorTipo = JSON.parse(localStorage.getItem("GananciasPorTipo")) || {
   "Carro": 0,
   "Moto": 0,
   "Bus": 0,
   "Camión": 0
};
let HistorialVehiculos = JSON.parse(localStorage.getItem("HistorialVehiculos")) || [];


//Funcion extraer datos formulario y localhost
const formulariodatos = document.getElementById("FormularioIngreso");
if (formulariodatos) {
   formulariodatos.addEventListener("submit", validarformulario);
   fechainteractiva();
}
function validarformulario(e) {
   e.preventDefault();


   const Placa = document.getElementById("Placa").value;
   const TipoVehiculo = document.getElementById("TipoVehiculo").value;
   const FechaIngreso = document.getElementById("fechaingreso").value;
   const Slot = parseInt(document.getElementById("Espacio").value);

   const ocupado = Vehiculos.some(carro => Number(carro.Slot) === Number(Slot));
   if (ocupado) {
       alert("¡Error! Este espacio ya está ocupado. Elige otro.");
       return;
   }


   const placaDuplicada = Vehiculos.some(vehiculo => vehiculo.Placa === Placa);


   if (placaDuplicada) {
       alert("Esta placa ya está registrada");
       return;
   }
   nuevovehiculo = { Placa, TipoVehiculo, FechaIngreso, Slot };


   Vehiculos.push(nuevovehiculo);
   localStorage.setItem("Vehiculos", JSON.stringify(Vehiculos));
   formulariodatos.reset();
   datostabla();
   espacios();
   fechainteractiva();
}


//Funcion para poner datos de localhost en tabla
const tablaentrada = document.getElementById("tabla2")
const tablasalida = document.getElementById("tabla3")


function datostabla() {
   if (!tablaentrada) return;
   tablaentrada.innerHTML = "";
   Vehiculos.forEach((datos, indice) => {
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
   } else {
       alert("El auto no se ha eliminado");
   }
}




//Funcion para modificar datos de la tabla y localstorage
function ModificarVehiculo(posicion) {
   const respuesta = confirm("¿Seguro que quieres modificar este auto?");
   if (respuesta == true) {
       const nuevotipo = prompt("Ingrese el nuevo tipo de vehiculo");
       const nuevoSlot = prompt("Ingrese el nuevo espacio");


       Vehiculos[posicion].TipoVehiculo = nuevotipo;
       Vehiculos[posicion].Slot = nuevoSlot;
       localStorage.setItem("Vehiculos", JSON.stringify(Vehiculos));
       datostabla();
       espacios()
       alert("El auto se ha modificado correctamente");
   } else {
       alert("El auto no se ha podido modificar")
   }


}
1

//Funcion para Pagar el parqueo
function pagarParqueo(posicion) {


   const hora = Vehiculos[posicion];
   const horaentrada = new Date(hora.FechaIngreso);
   const horasalida = new Date();
   console.log(horasalida)
   const diferencia = horasalida - horaentrada;
   const horasparqueo = (diferencia / (1000 * 60 * 60));
   const Tarifa = Number(document.getElementById("TarifaHora").value);
   const Total = horasparqueo * Tarifa;


   const respuesta = confirm("Bienvenido al proceso de pago, ¿Desea continuar?");
   if (respuesta == true) {
       alert("calculando el total a pagar...")
       //Meter ganancias en el loca1lstore
       GananciasPorTipo[hora.TipoVehiculo] += Total;
       localStorage.setItem("GananciasPorTipo", JSON.stringify(GananciasPorTipo));
       const fecha_hora = hora.FechaIngreso.split('T');
       const hora_limpia_salida = horasalida.toLocaleTimeString('es-GT', {
           hour: '2-digit',
           minute: '2-digit',
           hour12: false
       });

       //Historial de vehiculos pagados 
       const registroHistorial = {
           Placa: hora.Placa,
           TipoVehiculo: hora.TipoVehiculo,
           FechaIngreso: fecha_hora[0],
           HoraIngreso: fecha_hora[1],
           HoraSalida: hora_limpia_salida,
           SlotLiberado: hora.Slot,
           TotalPagado: Total.toFixed(2)
       };

       HistorialVehiculos.push(registroHistorial);
       localStorage.setItem("HistorialVehiculos", JSON.stringify(HistorialVehiculos));

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
       localStorage.setItem("Vehiculos", JSON.stringify(Vehiculos));
       datostabla();
       espacios();
   } else {
       alert("El proceso de pago se ha cancelado");
   }
}


// Minimo y Maximo de la fecha
function fechainteractiva() {
   const datetimeinput = document.getElementById("fechaingreso");
   const fechaactual = new Date();


   const año = fechaactual.getFullYear();
   const mes = String(fechaactual.getMonth() + 1).padStart(2, '0');
   const dia = String(fechaactual.getDate()).padStart(2, '0');


   const fechaMinima = `${año}-${mes}-${dia}T00:00`;
   const fechaMaxima = `${año}-${mes}-${dia}T23:59`;


   datetimeinput.min = fechaMinima;
   datetimeinput.max = fechaMaxima;
   const horas = String(fechaactual.getHours()).padStart(2, '0');
   const minutos = String(fechaactual.getMinutes()).padStart(2, '0');
   datetimeinput.value = `${año}-${mes}-${dia}T${horas}:${minutos}`;
}


function espacios() {
   const tablaespacios = document.getElementById("tablaespacios");
   if (!tablaespacios) return;
   tablaespacios.innerHTML = "";


   for (let i = 1; i <= 20; i++) {
       let carroEncontrado = null;
       for (let j = 0; j < Vehiculos.length; j++) {
           if (Number(Vehiculos[j].Slot) === i) {
               carroEncontrado = Vehiculos[j];
           }
       }  


       if (carroEncontrado) {
           tablaespacios.innerHTML += `
               <div class="espacios ocupado">
                   <b>Slot ${i}</b><br>
                   <span>${carroEncontrado.Placa}</span>
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




//GRÁFICAS
function importarChartJS(callback) {
   const script = document.createElement("script");
   script.src = "https://cdn.jsdelivr.net/npm/chart.js";
   script.onload = () => {
       callback();
   };
   document.head.appendChild(script);
}
window.addEventListener("DOMContentLoaded", () => {
   datostabla();
   espacios();
   //Info vehiculos Parqueados
   const txtVehiculosDentro = document.getElementById("informacionKPIS1");
   if (txtVehiculosDentro) {


       txtVehiculosDentro.innerHTML = `
       <h4>Vehiculos Parqueados</h4>
       <h2>${Vehiculos.length}</h2>`
   }


   //Tiempo Total de los servicios
   const tiempototal = document.getElementById("informacionKPIS2");
   if (tiempototal) {
       tiempototal.innerHTML = `
       <h4>Vehiculos a los cuales les prestamos el servicio</h4>
       <h2>${HistorialVehiculos.length}</h2>
       `
   }
   //En vehiculos Parqueados hay 0 porque cuando se da a pagar se eliminan ya que salieron entonces queda en 0  
   //Info ganancias totales
   const ganancias2 = document.getElementById("informacionKPIS3");
   if (ganancias2) {
       let totalDinero = GananciasPorTipo["Carro"] +
           GananciasPorTipo["Moto"] +
           GananciasPorTipo["Bus"] +
           GananciasPorTipo["Camión"];

       ganancias2.innerHTML = `
       <h4>Ingresos Hoy</h4>
       <h2>Q${totalDinero.toFixed(2)}</h2>`

    const gananciasfechas = document.getElementById("informacionKPIS4")
    gananciasfechas.innerHTML = `
       <h4>Ingresos Fechas</h4>
       <h2>Q${totalDinero.toFixed(2)}</h2>`
   }
   if (document.getElementById("Grafica")) {
       importarChartJS(() => {
           let grafica = document.getElementById("Grafica").getContext("2d");


           var chart = new Chart(grafica, {
               type: "pie",
               data: {
                   labels: ["Carro", "Moto", "Bus", "Camión"],
                   datasets: [
                       {
                           label: "Ganancias por Tipo de Vehículo (Q)",
                           backgroundColor: ["#3498db", "#e74c3c", "#00FF00", "#f1c40f"],
                           data: [
                               GananciasPorTipo["Carro"].toFixed(0),
                               GananciasPorTipo["Moto"].toFixed(0),
                               GananciasPorTipo["Bus"].toFixed(0),
                               GananciasPorTipo["Camión"].toFixed(0),
                           ]
                       }
                   ]
               }
           });
       });
   }
});