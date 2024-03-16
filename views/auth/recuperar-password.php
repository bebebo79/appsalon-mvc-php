<h1 class="nombre-pagina">Recuperar Password</h1>
<p class="descripcion-pagina">Introduce tu nuevo Password</p>


<?php 
    include_once __DIR__ . "/../templates/alertas.php";

?>

<!-- para que no aparezca el formulario,solo el error -->
<?php if($error) return;?>

<form class="formulario" method ="POST">
    <div class="campo">
        <label for="password">Password</label>
        <input type="password"
                id="password"
                name="password"
                placeholder="Tu Nuevo Password"
        />
    </div>


    <input type="submit" value="Guardar Nuevo Password" class="boton" >

</form>

<div class="acciones">
    <a href="/">¿Ya tienes cuenta? Iniciar Sesion</a>
    <a href="/crear-cuenta">¿No tienes cuenta? Crear Cuenta</a>

</div>