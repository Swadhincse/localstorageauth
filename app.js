document.addEventListener('DOMContentLoaded', function () {
  const app = document.getElementById('app');
  const token = localStorage.getItem('token');

  if (token) {
    app.innerHTML = `
      <div id="profile" class="page">
        <h1>Profile</h1>
        <div id="user-details">
          <p><strong>Username:</strong> <span id="profile-username"></span></p>
          <p><strong>Email:</strong> <span id="profile-email"></span></p>
          <p><strong>Password:</strong> <span id="profile-password"></span></p>
        </div>
        <button onclick="logout()">Logout</button>
      </div>
    `;
    displayUserProfile();
  } else {
    app.innerHTML = `
      <div id="signup" class="page">
        <h1>Signup</h1>
        <div id="signup-form">
          <label for="username">Username:</label>
          <input type="text" id="username" required><br><br>

          <label for="email">Email:</label>
          <input type="email" id="email" required><br><br>

          <label for="password">Password:</label>
          <input type="password" id="password" required><br> <br>

          <label for="confirm-password">Confirm Password:</label>
          <input type="password" id="confirm-password" required><br> <br>

          <button onclick="signup()">Signup</button>
        </div>
        <div id="signup-message" class="message"></div>
      </div>
    `;
  }
});

function signup() {
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (!username || !email || !password || !confirmPassword) {
    displayErrorMessage('All fields are mandatory.');
    return;
  }

  if (password !== confirmPassword) {
    displayErrorMessage('Passwords do not match.');
    return;
  }

  const token = generateToken();

  localStorage.setItem('username', username);
  localStorage.setItem('email', email);
  localStorage.setItem('token', token);

  displaySuccessMessage('Signup successful! Redirecting to profile...');

  setTimeout(function () {
    redirectToProfile();
  }, 2000);
}

function displayUserProfile() {
  const usernameElement = document.getElementById('profile-username');
  const emailElement = document.getElementById('profile-email');

  const username = localStorage.getItem('username');
  const email = localStorage.getItem('email');

  usernameElement.textContent = username;
  emailElement.textContent = email;
}

function logout() {
  localStorage.removeItem('username');
  localStorage.removeItem('email');
  localStorage.removeItem('token');

  redirectToSignup();
}

function generateToken() {
  return Array.from({ length: 16 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join('');
}

function redirectToProfile() {
  window.location.hash = '#profile';
  document.getElementById('app').innerHTML = document.getElementById('profile').innerHTML;
  displayUserProfile();
}

function redirectToSignup() {
  window.location.hash = '#signup';
  document.getElementById('app').innerHTML = document.getElementById('signup').innerHTML;
}

function displaySuccessMessage(message) {
  const messageElement = document.getElementById('signup-message');
  messageElement.innerHTML = `<p class="success">${message}</p>`;
}

function displayErrorMessage(message) {
  const messageElement = document.getElementById('signup-message');
  messageElement.innerHTML = `<p class="error">${message}</p>`;
}