<h1 class="nombre-pagina">Olvide el Passwrord</h1>
<p class="descripcion-pagina">Escribe tu mail para recuperar el Password</p>



<?php 
    include_once __DIR__ . "/../templates/alertas.php";

?>

<form class="formulario" method="POST"  action="/olvide">
    <div class="campo">
        <label for="email">Email</label>
        <input  type="email"
                id="email"
                placeholder="Tu Email"
                name="email"  
        
        />
    </div>
    
    <input type="submit" value="Enviar Instrucciones" class="boton">



</form>

<div class="acciones">
    <a href="/">Si ya tienes cuenta. Inicia Sesión</a>
    <a href="/crear-cuenta">¿No tienes cuenta?.Crear Cuenta</a>
</div>