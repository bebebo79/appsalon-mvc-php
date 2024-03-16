<?php

namespace Controller;
use MVC\Router;

class CitaController {

    public static function index(Router $router) {
        // funcion para iniciar sesion
        isSession();

        // funcion para que solo si esta la sesion abierta
        isAuth();
        
        $nombre = $_SESSION['nombre'];
        $id = $_SESSION['id'];

    
        $router->render('cita/index',[
            'nombre'=> $nombre,
            'id'=>$id

        ]);

    }


}