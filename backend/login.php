<?php
// Vérifier si le formulaire a été soumis
if (isset($_SERVER["REQUEST_METHOD"]) && $_SERVER["REQUEST_METHOD"] == "POST") {
    // Le formulaire a été soumis via POST, traiter les données ici
    $email = $_POST["email"];
    $mdp = $_POST["mot_de_passe"]; 

    // Établir une connexion à la base de données
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "etuservices_db"; // Remplacez par le nom de votre base de données

    $conn = new mysqli($servername, $username, $password, $dbname);

    // Vérifier la connexion
    if ($conn->connect_error) {
        die("La connexion à la base de données a échoué : " . $conn->connect_error);
    }

    // Préparer et exécuter la requête SQL pour vérifier les informations de connexion
    $sql = "SELECT id, mot_de_passe FROM utilisateurs WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        if (password_verify($mdp, $user['mot_de_passe'])) {
            // Les informations de connexion sont correctes
            $id_utilisateur = $user["id"];

            // Exécuter le script Python avec l'id utilisateur
            $cmd = escapeshellcmd("C:/Users/Hp/anaconda3/python.exe" . " " . "C:/Users/Hp/Desktop/COURS/Bases_de_donnees_distribuees/TP/TP1/app.py" . " " . $id_utilisateur);
            $shelloutput = shell_exec($cmd);
            // Afficher la sortie pour débogage
           # echo "<pre>$shelloutput</pre>";

            if (strpos($shelloutput, "Connexion refusee") !== false) {
                echo "<pre>$shelloutput</pre>";
            } else {
                header('Location: services.php');
            }
        } else {
            // Afficher un message d'erreur
            echo "Identifiants incorrects.";
        }
    } else {
        // Afficher un message d'erreur
        echo "Identifiants incorrects.";
    }
    // Fermer la connexion à la base de données
    $conn->close();
}
?>


<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Connexion à EtuServices</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .login-form {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            width: 300px;
        }
        h2 {
            text-align: center;
            color: #333;
        }
        .form-field {
            margin-bottom: 15px;
        }
        .form-field label {
            display: block;
            margin-bottom: 5px;
        }
        .form-field input[type=email], .form-field input[type=password] {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        .form-field input[type=submit] {
            width: 100%;
            padding: 10px;
            border: none;
            border-radius: 4px;
            color: white;
            background-color: #007bff;
            cursor: pointer;
        }
        .form-field input[type=submit]:hover {
            background-color: #0056b3;
        }
        .message {
            text-align: center;
            color: red;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="login-form">
        <h2>Connexion</h2>
        <form action="login.php" method="post">
            <div class="form-field">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-field">
                <label for="mot_de_passe">Mot de passe:</label>
                <input type="password" id="mot_de_passe" name="mot_de_passe" required>
            </div>
            <div class="form-field">
                <input type="submit" value="Se connecter">
            </div>
        </form>
        <?php if (isset($shelloutput) && strpos($shelloutput, "Connexion refusee") !== false): ?>
            <div class="message">
                Connexion refusée.
            </div>
        <?php endif; ?>
    </div>
</body>
</html>
