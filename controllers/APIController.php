<?php

namespace Controller;

use Model\Servicio;
use Model\Cita;
use Model\CitaServicio;

class APIController {
    
    public static function index() {
       $servicio = Servicio::all();
       echo json_encode($servicio);
    
       
    }

    public static function guardar() {
       
        $cita = new Cita($_POST);
        $resultado = $cita->guardar();

        $id = $resultado['id'];


        $idServicios= explode(",",$_POST['servicios'] );


        foreach($idServicios as $idServicio) {
            $args=[
                'citaId'=> $id,
                'servicioId' =>$idServicio
            ];
            $citaServicio = new CitaServicio($args);
            $citaServicio->guardar();

        }
        $respuesta = [
            'resultado'=>$resultado
        ];
        
        echo json_encode($respuesta);
    }

    public static function eliminar(){
        
        if($_SERVER['REQUEST_METHOD']==='POST'){
            $id = $_POST['id'];
            $cita = Cita::find($id);
            $cita->eliminar();
            header('Location: '. $_SERVER["HTTP_REFERER"]);

            



            

        }
        



    }


}