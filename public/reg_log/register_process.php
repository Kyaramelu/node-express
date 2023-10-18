<?php
// Подключение к базе данных
$mysqli = new mysqli("localhost", "u2293570_default", "lLL992qyiD6MfXER", "u2293570_default");

// Проверка подключения
if ($mysqli->connect_error) {
    die("Ошибка подключения к базе данных: " . $mysqli->connect_error);
}

// Получение данных из формы
$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];
$middle_name = $_POST['middle_name'];
$email = $_POST['email'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);
$school = $_POST['school'];
$languages = $_POST['languages'];
$role = $_POST['role'];
$previous_events = $_POST['previous_events'];
$birthday = $_POST['birthday'];

// Проверка, существует ли пользователь с такой почтой
$query = "SELECT * FROM users WHERE email = ?";
$stmt = $mysqli->prepare($query);
$stmt->bind_param('s', $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo "Пользователь с такой почтой уже существует.";
} else {
    // Регистрация пользователя
    $query = "INSERT INTO users (first_name, last_name, middle_name, email, password, school, languages, role, previous_events, birthday) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $mysqli->prepare($query);
    $stmt->bind_param('ssssssssss', $first_name, $last_name, $middle_name, $email, $password, $school, $languages, $role, $previous_events, $birthday);
    $stmt->execute();

    echo "Регистрация успешна. Вы будете перенаправлены на главную страницу.";
    header("Location: main_site.php");
}


// Закрытие соединения
$stmt->close();
$mysqli->close();
?>
