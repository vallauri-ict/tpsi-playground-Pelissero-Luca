<?php 

function _openConnection($dbName)
{
    define('DBHOST', 'localhost'); // dominio del server
    define('DBUSER', 'root');      // utente
    define('DBPASS', '');          // password

    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT); // in caso di errore genera un'eccezione
    try
    {
        $con = new mysqli(DBHOST, DBUSER, DBPASS, $dbName);
        return $con;
    }
    catch (mysqli_sql_exception $ex)
    {
        die ("Errore connessione db: <br>" . $ex->getMessage()); 
    }
}

function _eseguiQuery($con, $sql)
{
    try
    {
        $rs = $con->query($sql);
    }
    catch (mysqli_sql_exception $ex)
    {
        $con->close();
        die("Errore nella query sql: <br>". $ex->getMessage());
    }

    // se il comando è una query di tipo SELECT convertiamo il record set in un vettore json.
    // I comandi NON di tipo SELECT restituiscono semplicemente un booleano che lasciamo così com'è
    if(!is_bool($rs))
    {
        $data = $rs->fetch_all(MYSQLI_ASSOC);
    }
    else
    {
        $data = $rs;
    }
    return $data;
}

?>