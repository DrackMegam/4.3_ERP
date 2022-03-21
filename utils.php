<?php
    // Esto es el nombre de lo que pasemos en data: { "X" : "valor"}
    $data = $_GET['datos'];
    // Creo un archivo de texto y escribo el data en él.
    $f = fopen('backup.txt', 'w');
    fwrite($f, $data);
    fclose($f);

?>