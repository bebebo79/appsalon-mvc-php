<?php

namespace Model;



class Usuario extends ActiveRecord {
    // Base de datos
    protected static $tabla = 'usuarios';
    protected static $columnasDB = ['id','nombre','apellido','email','password','telefono','admin','confirmado','token'];

    public $id;
    public $nombre;
    public $apellido;
    public $email;
    public $password;
    public $telefono;
    public $admin;
    public $confirmado;
    public $token;

    public  function __construct($args=[]) {
        $this->id= $args['id'] ?? null;
        $this->nombre= $args['nombre'] ?? '';
        $this->apellido= $args['apellido'] ?? '';
        $this->email= $args['email'] ?? '';
        $this->password= $args['password'] ?? '';
        $this->telefono= $args['telefono'] ?? '';
        $this->admin= $args['admin'] ?? "0";
        $this->confirmado= $args['confirmado'] ?? "0";
        $this->token= $args['token'] ?? '';


    }

    public function validarNuevaCuenta() {
        if(!$this->nombre){
            self::$alertas['error'][] = "El nombre es obligatorio";
        }
        if(!$this->apellido){
            self::$alertas['error'][] = "El apellido es obligatorio";
        }
        if(!$this->telefono){
            self::$alertas['error'][] = "El telefono  es obligatorio";
        }
        if(!$this->email){
            self::$alertas['error'][] = "El mail  es obligatorio";
        }
        if(!$this->password){
            self::$alertas['error'][] = "El password es obligatorio";
        }
        if(strlen($this->password) > 6) {
            self::$alertas['error'][]= "El password tiene que tener al menos 6 caracteres";   
        
        }
            
        return self::$alertas;
    } 

    public function validarLogin(){
        if(!$this->email){
            self::$alertas['error'][] = "Es mail es obligatorio";
        }
        if(!$this->password) {
            self::$alertas['error'][] = "El password es obligatorio";
        }
        
        return self::$alertas;
    }
    
    public function validarEmail() {
        if(!$this->email){
            self::$alertas['error'][] = "Es mail es obligatorio";
        }
        return self::$alertas;

    }

    public function validarPassword (){
        if(!$this->password) {
            self::$alertas['error'][] = "El Password es Obligatorio";
        }
        if(strlen($this->password) < 6) {
            self::$alertas['error'][] = "El Password tiene que tener minimo 6 caracteres";

        }
        return self::$alertas;

    }
    // para comprobar que el usuario ya existe
    public function existeUsuario(){
        $query = " SELECT * FROM " . self::$tabla . " WHERE email = '". $this->email ."' LIMIT 1 ";

        $resultado = self::$db->query($query);

        if($resultado->num_rows){
            self::$alertas['error'][] = "El usuario ya existe";
        }

        return $resultado;
    }
    
    public function hashPassword() {
        $this->password = password_hash($this->password, PASSWORD_BCRYPT);
    }

    public function generarToken() {
        $this->token = uniqid();
    }

    public function comprobarPasswordAndVerificado($password){

        $resultado = password_verify($password, $this->password);
        
       
        if(!$resultado  || !$this->confirmado){
            self::$alertas['error'][] = "Password incorrecto o es necesario que confirmes la cuenta";

        }else {
            return true;
        }
            
    }

       

        
}
    
    

    
        

