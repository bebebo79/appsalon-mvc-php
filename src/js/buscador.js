document.addEventListener('DOMContentLoaded', function(){
    iniciarAPP();
});

///***** aqui es donde almacenaremos todas las fuciones necesarias */
function iniciarAPP(){
    buscarPorFecha();
};


function buscarPorFecha(){
    const fechaInput = document.querySelector('#fecha');
    fechaInput.addEventListener('input', function(e){
        // para leer un valor que estamo inmput es necesario e
        const fechaSeleccionada = e.target.value;
        // redireccionado añadiendo a la url ? la fecha
        window.location = `?fecha=${fechaSeleccionada}`;

    });


}
