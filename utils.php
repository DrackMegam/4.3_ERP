<?php
    $data = $_POST['???'];
    // Creo un archivo de texto y escribo el data en él.
    $f = fopen('backup.json', 'w+');
    fwrite($f, $data);
    fclose($f);
?>