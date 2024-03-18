<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupérer les données du formulaire
    $prenom = $_POST['prenom'];
    $nom = $_POST['nom'];
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

    // Préparation de la requête SQL pour insérer un nouvel utilisateur dans la base de données
    $sql = "INSERT INTO utilisateurs (prenom, nom, email, mot_de_passe) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss", $prenom, $nom, $email, $password);
    
    // Exécution de la requête
    if ($stmt->execute()) {
        // Redirection vers la page de connexion si l'inscription est réussie
        header('Location: login.php');
        exit();
    } else {
        // Affichage d'un message d'erreur en cas d'échec de l'inscription
        echo "Erreur lors de l'inscription. Veuillez réessayer.";
    }

    // Fermeture de la connexion à la base de données
    $stmt->close();
    $conn->close();
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Inscription - EtuServices</title>
</head>
<body>
    <h2>Inscription</h2>
    <form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
        Prénom: <input type="text" name="prenom"><br>
        Nom: <input type="text" name="nom"><br>
        Email: <input type="email" name="email"><br>
        Mot de passe: <input type="password" name="password"><br>
        <input type="submit" value="S'inscrire">
    </form>
    <p>Déjà un compte ? <a href="login.php">Connectez-vous ici</a></p>
</body>
</html>
