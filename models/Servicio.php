<?php

namespace Model;

class Servicio extends ActiveRecord {

    // BASE DE DATOS
    protected static $tabla = 'servicios';
    protected static $columnasDB = ['id', 'nombre', 'precio'];

    public $id;
    public $nombre;
    public $precio;

    public function __construct($args=[]) {
        $this->id = $args['id'] ?? null;
        $this->nombre = $args['nonmbre'] ?? '';
        $this->precio = $args['precio'] ?? '';
    }
    
        
    public function validar() {
        if(!$this->nombre){
            self::$alertas['error'][] ='Es necesario introducir el nombre del servicio';
        }
        if(!$this->precio) {
            self::$alertas['error'][] =  'Es obligatorio introducir el precio del servicio';
        }
        if(!is_numeric($this->precio)) {
            self::$alertas['error'][] = 'El precio tiene que se un numero';
        }
        
        
        return self::$alertas;
    }


}