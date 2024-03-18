<?php
session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];
    
    // Connexion à la base de données
    $servername = "localhost"; // Remplacez localhost par votre hôte de base de données
    $username = "root"; // Remplacez votre_nom_utilisateur par votre nom d'utilisateur MySQL
    //$password_db = ""; // Remplacez votre_mot_de_passe par votre mot de passe MySQL
    $dbname = "bdusers"; // Remplacez votre_base_de_donnees par le nom de votre base de données

    $conn = new mysqli($servername, $username, '', $dbname);

    // Vérification de la connexion
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Préparation de la requête SQL pour récupérer l'utilisateur en fonction de l'e-mail et du mot de passe
    $sql = "SELECT id FROM utilisateurs WHERE email = ? AND mot_de_passe = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $email, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    // Vérification si une ligne correspondante est trouvée
    if ($result->num_rows == 1) {
        // L'utilisateur est authentifié avec succès
        $row = $result->fetch_assoc();
        $_SESSION['user_id'] = $row['id'];

        // Vérification des connexions via Redis
        $user_id = $_SESSION['user_id'];
        $cmd="C:\\Users\\chafi\\anaconda3\\python.exe". " " ."C:\\wamp64\\www\\EtuServices\\controleRedis.py". " " . $user_id;
        
        $command=escapeshellcmd($cmd);

        $output = shell_exec($command);
        // Affiche la sortie du script Python
        if(strpos($output, "Connexion autorisee")!==false){
            header('location: services.php');
        }
        else{
            echo "<pre>$output</pre>";
        }
        //echo "<pre>ciao $output</pre>";
        //echo $output;

        //header('Location: accueil.php');
        //exit();
    } else {
        // L'utilisateur n'est pas authentifié
        echo "Adresse e-mail ou mot de passe incorrect.";
    }

    // Fermeture de la connexion à la base de données
    $stmt->close();
    $conn->close();
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
