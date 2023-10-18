function register(name, email, password) {
  fetch('https://caramello.space/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password
    }),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      saveData(data.user)
      console.log('Success:', data)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function saveData(value) {
  localStorage.setItem('user', value);
}

function loadData() {
  return localStorage.getItem('user');
}