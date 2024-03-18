<!DOCTYPE html>
<html>
<head>
    <title>Services - EtuServices</title>
</head>
<body>
    <h2>Services</h2>
    <p>Choisissez un service :</p>
    <form action="services.php" method="post">
        <input type="submit" name="service" value="Vente">
        <input type="submit" name="service" value="Achat">
    </form>
    <?php
    session_start();
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if (isset($_POST['service'])) {
            $service = $_POST['service'];
            // Appeler la fonction Python pour compter l'appel du service
            $user_id = $_SESSION['user_id'];
            $cmd = "C:\\Users\\chafi\\anaconda3\\python.exe" . " " . "C:\\wamp64\\www\\EtuServices\\compteurServices.py" . " " . $user_id . " " . $service;
            $output = shell_exec($cmd);
            echo "<p>$output</p>";
        }
    }
    ?>
</body>
</html>
