<?php

function debuguear($variable) : string {
    echo "<pre>";
    var_dump($variable);
    echo "</pre>";
    exit;
}

// Escapa / Sanitizar el HTML
function s($html) : string {
    $s = htmlspecialchars($html);
    return $s;
}

// funcion para determinar el ultimo elemento
function esUltimo(string $actual, string $proximo) :bool {
    if($actual !== $proximo){
        return true;
    }return false;
}

//funcion para iniciar sesion
function isSession() :void  {
    if(!isset($_SESSION)) {
        session_start();
    }
}



// funcion que nos permite ver si el usuario esta autenticado
function isAuth() : void{
    if(!isset($_SESSION['login'])) {
        header('Location:/');
    }

}

// funcion para comprobar que el usuario es admin
function isAdmin() : void {
    if(!isset($_SESSION['admin'])){
        header('Location:/');
    }
}