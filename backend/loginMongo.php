<?php
session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];
    
    // Connexion à la base de données MongoDB
    $client = new MongoDB\Client("mongodb://localhost:27019");
    $collection = $client->selectDatabase("bdusers")->selectCollection("utilisateurs");

    // Préparation de la requête pour récupérer l'utilisateur en fonction de l'e-mail et du mot de passe
    $user = $collection->findOne(['email' => $email, 'mot_de_passe' => $password]);

    // Vérification si un utilisateur correspondant est trouvé
    if ($user) {
        // L'utilisateur est authentifié avec succès
        $_SESSION['user_id'] = (string)$user['_id'];

        // Vérification des connexions via Redis
        $user_id = $_SESSION['user_id'];
        $cmd = "C:\\Users\\chafi\\anaconda3\\python.exe" . " " . "C:\\wamp64\\www\\EtuServices\\controleRedis.py" . " " . $user_id;
        
        $command = escapeshellcmd($cmd);
        $output = shell_exec($command);

        // Affiche la sortie du script Python
        if (strpos($output, "Connexion autorisee") !== false) {
            header('Location: services.php');
            exit();
        } else {
            echo "<pre>$output</pre>";
        }
    } else {
        // L'utilisateur n'est pas authentifié
        echo "Adresse e-mail ou mot de passe incorrect.";
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Login - EtuServices</title>
</head>
<body>
    <form method="post" action="login.php">
        Email: <input type="email" name="email"><br>
        Mot de passe: <input type="password" name="password"><br>
        <input type="submit" value="Connexion">
    </form>
    <p>Vous n'avez pas de compte ? <a href="inscription.php">Inscrivez-vous ici</a></p>
</body>
</html>
