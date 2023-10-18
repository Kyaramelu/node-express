<!DOCTYPE html>
<html>
<head>
    <title>Профиль</title>
</head>
<body>
    <h1>Профиль</h1>
    <?php
    session_start();
    if (isset($_SESSION['user_id'])) {
        // Если пользователь авторизован, отобразите информацию о его профиле
        echo "Имя: " . $_SESSION['user_name'] . "<br>";
        echo "Фамилия: " . $_SESSION['user_last_name'] . "<br>";
        echo "Отчество: " . $_SESSION['user_middle_name'] . "<br>";
        echo "Почта: " . $_SESSION['user_email'] . "<br>";
        echo "Школа: " . $_SESSION['user_school'] . "<br>";
        echo "Языки: " . $_SESSION['user_languages'] . "<br>";
        echo "Роль: " . $_SESSION['user_role'] . "<br>";
        echo "Предыдущие события: " . $_SESSION['user_previous_events'] . "<br>";
        echo "День рождения: " . $_SESSION['user_birthday'] . "<br>";
    } else {
        // Если пользователь не авторизован, перенаправьте его на страницу входа
        header("Location: login.php");
    }
    ?>
</body>
</html>
