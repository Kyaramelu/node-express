function register(firstName, lastName, email, password) {
  fetch('https://caramello.space/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    }),
  })
    .then(response => response.json())
    .then(data => {
      saveData(JSON.stringify(data.user))
      updateUser()

      console.log('Success:', data)
    })
    .catch((error) => {
      console.error('Error:', error)
    });
}

function updateUserState() {
  const local = localStorage.getItem("user")
  const user = local ? JSON.parse(local) : null

  const profile = document.getElementById("profile-wrapper")
  const login = document.getElementById("login-button")
  const logout = document.getElementById("logout-button")

  if (user) {
    console.log("A user is logged in.")

    document.getElementById("profile-name").textContent = user.email
    profile.style.display = "flex"
  } else {
    console.log("No user logged in.")
    login.style.display = "block"
  }
}

function logout() {
  fetch('https://caramello.space/logout', {
    method: 'POST',
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === "success") {
        localStorage.removeItem("user")
        location.href = "https://caramello.space/"
      }
    })
    .catch((error) => {
      console.error('Error:', error)
    });
}

updateUserState()