<?php
// Подключение к базе данных
$mysqli = new mysqli("localhost", "u2293570_default", "lLL992qyiD6MfXER", "u2293570_default");

// Проверка подключения
if ($mysqli->connect_error) {
    die("Ошибка подключения к базе данных: " . $mysqli->connect_error);
}

// Получение данных из формы
$email = $_POST['email'];
$password = $_POST['password'];

// Поиск пользователя по почте
$query = "SELECT * FROM users WHERE email = ?";
$stmt = $mysqli->prepare($query);
$stmt->bind_param('s', $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    // Проверка пароля
    if (password_verify($password, $user['password'])) {
        echo "Вход выполнен успешно.";
        header("Location: main_site.php");
    } else {
        echo "Неверный пароль.";
    }
} else {
    echo "Пользователь с такой почтой не найден.";
}

// Закрытие соединения
$stmt->close();
$mysqli->close();
?>
