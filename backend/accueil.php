<?php
// Vérifier si le formulaire d'inscription a été soumis
if (isset($_SERVER["REQUEST_METHOD"]) && $_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupérer les données du formulaire
    $nom = $_POST["nom"];
    $prenom = $_POST["prenom"];
    $email = $_POST["email"];
    $mdp = password_hash($_POST["mot_de_passe"], PASSWORD_DEFAULT); // Hacher le mot de passe
    #$mdp = $_POST["mot_de_passe"];


    // Paramètres de connexion à la base de données
    $servername = "localhost";
    $username = "root"; // Nom d'utilisateur par défaut de WampServer
    $password = ""; // Le mot de passe par défaut de WampServer est vide
    $dbname = "etuserVICES_db"; // Remplacez par le nom de votre base de données

    // Création d'une nouvelle connexion à la base de données
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Vérification d'une erreur de connexion
    if ($conn->connect_error) {
        die("Echec de la connexion : " . $conn->connect_error);
    }

    // Préparation de la requête SQL pour insérer le nouvel utilisateur
    $stmt = $conn->prepare("INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $nom, $prenom, $email, $mdp);

    // Exécution de la requête préparée
    if ($stmt->execute()) {
        echo "Nouvel utilisateur enregistré avec succès !";
    } else {
        echo "Erreur : " . $stmt->error;
    }

    // Fermeture de la requête et de la connexion
    $stmt->close();
    $conn->close();
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Inscription à EtuServices</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            width: 300px;
        }
        h1, h2 {
            text-align: center;
            color: #333;
        }
        p {
            text-align: center;
            font-size: 14px;
        }
        input[type=text], input[type=email], input[type=password] {
            width: 100%;
            padding: 10px;
            margin: 10px 0 20px 0;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-sizing: border-box;
        }
        input[type=submit] {
            width: 100%;
            background-color: #007bff;
            color: white;
            padding: 10px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        input[type=submit]:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Bienvenue sur EtuServices</h1>
        <p>Rejoignez notre communauté et découvrez une nouvelle manière d'acheter et de vendre des articles entre étudiants.</p>
        <h2>Inscription</h2>
        <form action="accueil.php" method="post">
            Nom: <input type="text" name="nom" required><br>
            Prénom: <input type="text" name="prenom" required><br>
            Email: <input type="email" name="email" required><br>
            Mot de passe: <input type="password" name="mot_de_passe" required><br>
            <input type="submit" value="S'inscrire">
        </form>
        <div style="text-align: center; margin-top: 20px;">
            Déjà inscrit ? <a href="login.php">Connectez-vous ici</a>.
        </div>

    </div>
</body>
</html>