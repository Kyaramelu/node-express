
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="author" content="Represent">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="style/style.css" rel="stylesheet">
    <title>Малая Академия Наук</title>
</head>
<head>
    <title>Главная страница сайта</title>
</head>
<body>
    <h1>Главная страница сайта</h1>
    <?php
    session_start();
    if (isset($_SESSION['user_id'])) {
        // Если пользователь авторизован, отобразите информацию о его профиле
        echo "Добро пожаловать, " . $_SESSION['user_name'] . "!";
        echo "<br><a href='profile.php'>Посмотреть профиль</a>";
        // Добавьте другую информацию о сайте
    } else {
        // Если пользователь не авторизован, перенаправьте его на страницу входа
        header("Location: login.php");
    }
    ?>
</body>
</html>
