<?php 

require_once __DIR__ . '/../includes/app.php';

use Controller\AdminController;
use Controller\APIController;
use Controller\CitaController;
use Controller\LoginController;
use Controller\ServicioController;
use MVC\Router;

$router = new Router();

// Rutas para iniciar sesion
$router->get('/',[LoginController::class, 'login']);
$router->post('/', [LoginController::class, 'login']);

//Rutas para cerrar sesion
$router->get('/logout',[LoginController::class, 'logout']);

//Rutas para recuperar password
$router->get('/olvide', [LoginController::class, 'olvide']);
$router->post('/olvide', [LoginController::class, 'olvide']);
$router->get('/recuperar', [LoginController::class, 'recuperar']);
$router->post('/recuperar', [LoginController::class, 'recuperar']);

// Rutas para crear una cuenta
$router->get('/crear-cuenta' , [LoginController::class, 'crear']);
$router->post('/crear-cuenta' , [LoginController::class, 'crear']);

// ruta para confirmar cuenta
$router->get('/confirmar-cuenta', [LoginController::class, 'confirmar']);
$router->get('/mensaje', [LoginController::class, 'mensaje']);

//***** AREA PRIVADA ***** */
$router->get('/cita',[CitaController::class, 'index']);


//**** AREA ADMINISTRADOR */
$router->get('/admin', [AdminController::class,'index']);

//**** CRUD de servicios */
// READ
$router->get('/servicios', [ServicioController::class,'index']);
// CREATE
$router->get('/servicios/crear', [ServicioController::class,'crear']);
$router->post('/servicios/crear', [ServicioController::class,'crear']);
// UPDATE
$router->get('/servicios/actualizar', [ServicioController::class,'actualizar']);
$router->post('/servicios/actualizar', [ServicioController::class,'actualizar']);
// DELETED
$router->post('/servicios/eliminar', [ServicioController::class,'eliminar']);


// API
$router->get('/api/servicios',[APIController::class, 'index']);
$router->post('/api/citas',[APIController::class,'guardar']);
$router->post('/api/eliminar', [APIController::class, 'eliminar']);











// Comprueba y valida las rutas, que existan y les asigna las funciones del Controlador
$router->comprobarRutas();