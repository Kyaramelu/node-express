<!DOCTYPE html>
<html>
<head>
    <title>Регистрация</title>
</head>
<body>
    <h1>Регистрация</h1>
    <form method="post" action="register_process.php">
        <label for="first_name">Имя:</label>
        <input type="text" name="first_name" id="first_name" required><br><br>
        <label for="last_name">Фамилия:</label>
        <input type="text" name="last_name" id="last_name" required><br><br>
        <label for="middle_name">Отчество:</label>
        <input type="text" name="middle_name" id="middle_name" required><br><br>
        <label for="email">Почта:</label>
        <input type="email" name="email" id="email" required><br><br>
        <label for="password">Пароль:</label>
        <input type="password" name="password" id="password" required><br><br>
        <label for="school">Школа:</label>
        <input type="text" name="school" id="school" required><br><br>
        <label for="languages">Языки:</label>
        <input type="text" name="languages" id="languages" required><br><br>
        <label for="role">Роль:</label>
        <input type="text" name="role" id="role" required><br><br>
        <label for="previous_events">Предыдущие события:</label>
        <input type="text" name="previous_events" id="previous_events" required><br><br>
        <label for="birthday">День рождения:</label>
        <input type="text" name="birthday" id="birthday" required><br><br>
        <input type="submit" value="Зарегистрироваться">
    </form>
</body>
</html>
