let paso = 1;
const pasoInicio = 1;
const pasoFinal = 3;

// creamos la variable de cita como un objeto
const cita = {
    id:'',
    nombre: '',
    fecha: '',
    hora: '',
    servicios: []
}

document.addEventListener('DOMContentLoaded', function(){
    inicicarAPP();

});

//******** INICIAR APP,******* contiene todas las funciones que requerimos */
function inicicarAPP() {
    mostrarSeccion(); // es lo primero, ya que la opcion Servicio se tiene que ver primero
    tabs(); // func,. para cambiar la seccion cuando se presion los tabs
    botonesPaginador(); // para mostrar los botones dependiendo en la seccion que estemos
    paginaAnterior();
    paginaSiguiente();
    consultarAPI(); // consultar la API en el backend de php

    
    idCliente(); //para añadir el id al objeto de cita
    nombreCliente(); // para añadir el nombre al objeto de cita
    fechaCita(); // para añadir la fecha al objeto de cita
    horaCita(); // para añadir la hora al objeto cita

    mostrarResumen(); // para permitir ver el contenido del objeto cita antes de mandarlo al servidos
}


//********* SECCIONES ************* */

//*** APAREZCA EN LA INTERFAZ LA SECCION SELECCIONADA */
function mostrarSeccion(){
    // para ocultar el que tenga la clase de mostrar
    const seccionAnterior = document.querySelector('.mostrar');
    if(seccionAnterior){
        seccionAnterior.classList.remove('mostrar');
    }

    // para mostrar el paso seleccionado
    const seleccionarSeccion = `#paso-${paso}`;
    const seccion = document.querySelector(seleccionarSeccion);
    seccion.classList.add('mostrar');

    //para quitar la clase actual
    const actualAnterior = document.querySelector('.actual');
    if(actualAnterior) {
        actualAnterior.classList.remove('actual');
    }
    
    //cambiar el aspecto cuando estemos en una seccion
    const tab = document.querySelector(`[data-paso="${paso}"]`);
    tab.classList.add('actual');

}

//*** LOS TABS los botones de cada seccion */
function tabs(){
    const botones =  document.querySelectorAll('.tabs button')
    
    // como se seleccionan los tres, hay que iterar con foreach
    botones.forEach(boton=>{
        boton.addEventListener('click', function(e){
            paso= parseInt(e.target.dataset.paso);
            mostrarSeccion();
            botonesPaginador();
            if(paso === 3) {
                mostrarResumen();
            }
        });
    })

}

//*** PAGINADOR */
function botonesPaginador(){
    const paginaAnterior = document.querySelector('#anterior');
    const paginaSiguiente = document.querySelector('#siguiente');

    if(paso === 1){
        paginaAnterior.classList.add('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    } else if(paso === 3){
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.add('ocultar');
        mostrarResumen();
    } else{
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    }

    mostrarSeccion();
    
}

//*** BOTON ANTERIOR */
function paginaAnterior() {
    const paginaAnterior = document.querySelector('#anterior');
    paginaAnterior.addEventListener('click', function(){
        if(paso <= pasoInicio ) return
        paso--
        botonesPaginador();
    })    

}

//**** BOTON SIGUIENTE */
function paginaSiguiente() {
    const paginaSiguiente = document.querySelector('#siguiente');
    paginaSiguiente.addEventListener('click', function(){
        if(paso >= pasoFinal) return
        paso++
        botonesPaginador();
    })

}


//**** API, para poder conectarnos a un servicio, el resultado de la bs nos la da en json */
async function consultarAPI() {

    try {
        const url = '/api/servicios';
        const resultado = await fetch(url);  // fetch es lo que nos permite ver 
        const servicios = await resultado.json();
        mostrarServicios(servicios)
        
    } catch (error) {
        console.log(error);
        
    }

}


//******* PRIMERA SECCCION  */
//****     SERVICIOS        */

//*** Mostrar en la interzaf los servicios de la base de datos */
function mostrarServicios(servicios) {
    // en servicios hay que iterar los campos con foreach
    servicios.forEach(servicio=> {
        const {id, nombre, precio} = servicio;

        //agregar al html a traves de un parrafo
        const nombreServicio = document.createElement('P');
        
        //nombramos una clase para ese parrafo
        nombreServicio.classList.add('nombre-servicio');
        
        // ponemos el texto en el parrafo
        nombreServicio.textContent = nombre;

        //creamos para el precio igual
        const precioServicio = document.createElement('P');
        precioServicio.classList.add('precio-servicio');
        precioServicio.textContent = `${precio} €`;

        //creamos un div para cada servicio con su id del index.html
        const divServicio = document.createElement('DIV');
        divServicio.classList.add('servicio');
        divServicio.dataset.idServicio = id;


        divServicio.onclick = function(){
            seleccionarServicio(servicio);
        }; 


        // metemos en los div los parrafos que hemos creado
        divServicio.appendChild(nombreServicio); 
        divServicio.appendChild(precioServicio);

        // lo inyectamos en el html seleccionando el id donde lo queremos meter
        document.querySelector('#servicios').appendChild(divServicio);



    })

}

//*** SELECCIONAR EL SERVICIO */ para añadir el servicio al objeto de cita
function seleccionarServicio(servicio){

    // seleccionamos a parte el elemento servicios[] del objeto cita
    const{ servicios } = cita;
    
    // seleccionamos el id de servicios
    const { id } = servicio;
    
    // selector, para coger el id del servicio
    const servicioId = document.querySelector(`[data-id-servicio="${id}"]`);
    
    // comprobar que un servicio esta agragado
    if(servicios.some( agregado => agregado.id ===id)) {
        // eliminar servicio
        cita.servicios = servicios.filter(agregado => agregado.id !== id); 
        servicioId.classList.remove('seleccionado');
    }else {
        //agragar servicio
        cita.servicios = [...servicios, servicio];
        servicioId.classList.add('seleccionado');

    }

    
    
    

}

//****** SEGUNDA SERCCION */
//****DATOS Y FECHA DE LA CITA ******/

function nombreCliente(){
    cita.nombre = document.querySelector('#nombre').value;
}

function idCliente() {
    cita.id = document.querySelector('#id').value;
}

function fechaCita(){
    const inputFecha = document.querySelector('#fecha');
    inputFecha.addEventListener('input', function(e){ // e permite que si alguien selecciona sabado o domingo no deje
        // dia = al numero del dia de la semana
        const dia = new Date(e.target.value).getUTCDay();

        if([6,0].includes(dia)) {
            e.target.value = '';
            mostrarAlerta('Fines de semana no abrimos', 'error','.formulario');
        }else {
            cita.fecha = e.target.value;
        }

        
    })

    
}

function horaCita(){
    const inputHora = document.querySelector('#hora');
    inputHora.addEventListener('input', function(e){
        const citaHora = e.target.value;
        const hora = citaHora.split(":")[0]; // para crear un separador [hora, minuto]
        if(hora < 9 || hora >= 18){
            e.target.value = "";
            mostrarAlerta('horario no valido', 'error', '.formulario');
            

        }else {
            cita.hora = e.target.value;
        }

    })
    
}
     


////**** SECCION 3  ***** */
///**** RESUMEN  ****/

function mostrarResumen() {
    const resumen = document.querySelector('.contenido-resumen');

    //limpiar el contenido de resumen
   while(resumen.firstChild) {
        resumen.removeChild(resumen.firstChild);
   }


    // comprobamos que no haya datos en el objeto cita
    if(Object.values(cita).includes('') || cita.servicios.length===0){
        mostrarAlerta('campos no rellenos o servicio no seleccionado', 'error', '.contenido-resumen', false)
        
    return;
    }

    // formatear el div del resumen
    // es desmembrar el objeto cita
    const {nombre, fecha, hora, servicios} = cita;


    ///***** resumen de los servicios seleccionados */
    //Heading para poner un titulo antes de los servicios
    const headingServicios = document.createElement('H3');
    headingServicios.textContent = "Servicios que has seleccionado";
    resumen.appendChild(headingServicios);

    servicios.forEach(servicio =>{
        // desmembrar los servicios
        const {id, nombre, precio} = servicio
        // crear un contenedor para el iu
        const contenedorServicios = document.createElement('DIV');
        contenedorServicios.classList.add('contenedor-servicio');

        const textoServicio = document.createElement('P');
        textoServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.innerHTML = `<span>Precio: </span> ${precio} €`;

        //para que se muestre en el iu
        contenedorServicios.appendChild(textoServicio);
        contenedorServicios.appendChild(precioServicio);

        resumen.appendChild(contenedorServicios);

    })

    //**** resumen de la cita  */
    
    // heading para poner titulo a los datos de la cita
    const headingCita = document.createElement('H3'); 
    headingCita.textContent = "Datos de la cita";
    resumen.appendChild(headingCita);

    const nombreCliente = document.createElement('P');
    nombreCliente.innerHTML = `<span>Nombre: </span> ${nombre}`;

    //formatear la fecha de la cita, para que aparezca mas amigable
    const fechaObjet = new Date(fecha);
    const mes = fechaObjet.getMonth();
    const dia = fechaObjet.getDate();
    const year = fechaObjet.getFullYear();
    const opciones = {weekday: 'long', year:'numeric', month:'long', day:'numeric'};
    const fechaUTC = new Date(Date.UTC(year, mes, dia));
    const fechaFormateada = fechaUTC.toLocaleDateString('es-ES', opciones);

    
    const fechaCita = document.createElement('P');
    fechaCita.innerHTML = `<span>Fecha de la cita: </span> ${fechaFormateada}`;

    const horaCita = document.createElement('P');
    horaCita.innerHTML = `<span>Hora de la cita: </span> ${hora} h.`;

   //creamos un boton de reservar
   const botonReservar = document.createElement('BUTTON');
   botonReservar.classList ='boton';
   botonReservar.textContent = "Reservar Cita";
   botonReservar.onclick = reservarCita;

    // para que se pueste en el iu
    resumen.appendChild(nombreCliente);
    resumen.appendChild(fechaCita);
    resumen.appendChild(horaCita);
    resumen.appendChild(botonReservar);

}

// fetch api para el boton reservar cita
async function reservarCita(){
    const {id,nombre, fecha, hora, servicios} = cita;

    //para seleccionar el id del servicio
    const idServicios = servicios.map(servicio=>servicio.id);

    
    // los datos que vamos a mandar
    const datos = new FormData();
    datos.append('usuarioId', id);
    datos.append('fecha', fecha);
    datos.append('hora', hora);
    datos.append('servicios', idServicios);

    //
    try {
        // peticion a la API
        const url = '/api/citas';

        // para conectarnos a la API para poder mandar los datos de Formdata
        const respuesta = await fetch(url,{
            method: 'POST',
            body:datos
        })

        // vemos lo que tenemos en el APICOntroller
        const resultado = await respuesta.json();

        if(resultado.resultado){
            Swal.fire({
            icon: "success",
            title: "Cita Creada",
            text: "Tu cita ha sido creada correctamente",
            button: 'OK'
        }).then(()=> {
            setTimeout(() => {
                window.location.reload();
                
            },2000);
        })
    }
        
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "La Cita no fue creada por un error",        
          });
        
    }


 

    


    

    
}


function mostrarAlerta(mensaje, tipo, elemento, desaparece =true) {
    // si hay alerta se elimina
    const alertaPrevia = document.querySelector('.alerta');
    if(alertaPrevia){
        alertaPrevia.remove();
    };

    // creamos la alerta en un div(html) para que aparezca en iu
    const alerta = document.createElement('DIV');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');
    alerta.classList.add(tipo);

    const referencia = document.querySelector(elemento);
    referencia.appendChild(alerta);

    // para que desaparezca la alerta a los 2 segundos
    if(desaparece){
    setTimeout(() => {
        alerta.remove();
    }, 2000);
    }   

}