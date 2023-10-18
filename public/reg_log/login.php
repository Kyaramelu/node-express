<!DOCTYPE html>
<html>
<head>
    <title>Вход</title>
</head>
<body>
    <h1>Вход</h1>
    <form method="post" action="login_process.php">
        <label for="email">Почта:</label>
        <input type="email" name="email" id="email" required><br><br>
        <label for="password">Пароль:</label>
        <input type="password" name="password" id="password" required><br><br>
        <input type="submit" value="Войти">
    </form>
</body>
</html>
