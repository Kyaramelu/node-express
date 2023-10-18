function register(firstName, lastName, dob, email, password) {
  fetch('https://caramello.space/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      dob: dob,
      email: email,
      password: password
    }),
  })
    .then(response => response.json())
    .then(data => {
      localStorage.setItem("user", (JSON.stringify(data.user)))
      updateUserState()

      window.location.href = "https://caramello.space/";
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
    logout.style.display = "block"
  } else {
    console.log("No user logged in.")
    login.style.display = "block"
  }
}

function logout() {
  fetch('https://caramello.space/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // set the content type to JSON
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data.status === "success") {
        localStorage.removeItem("user");
        window.location.href = "https://caramello.space/";
      } else {
        console.error('Logout failed:', data.error || 'Unknown error');
      }
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
}

updateUserState()