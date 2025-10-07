// auth.js

// Переключение вкладок Вход / Регистрация
document.addEventListener("DOMContentLoaded", () => {
  const showLogin = document.getElementById("show-login");
  const showRegister = document.getElementById("show-register");
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  showLogin.onclick = () => {
    loginForm.style.display = "block";
    registerForm.style.display = "none";
  };
  showRegister.onclick = () => {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
  };

  // Форма регистрации
  registerForm.innerHTML = `
    <h3>Регистрация</h3>
    <input type="text" id="reg-name" placeholder="Имя" required><br>
    <input type="email" id="reg-email" placeholder="Email" required><br>
    <input type="password" id="reg-password" placeholder="Пароль" required><br>
    <button id="register-btn">Зарегистрироваться</button>
    <div id="register-error" style="color:red;"></div>
  `;

  // Форма входа
  loginForm.innerHTML = `
    <h3>Вход</h3>
    <input type="email" id="login-email" placeholder="Email" required><br>
    <input type="password" id="login-password" placeholder="Пароль" required><br>
    <button id="login-btn">Войти</button>
    <div id="login-error" style="color:red;"></div>
  `;

  // Регистрация пользователя
  document.getElementById("register-btn").onclick = (e) => {
    e.preventDefault();
    const name = document.getElementById("reg-name").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const password = document.getElementById("reg-password").value;

    if (!name || !email || !password) {
      document.getElementById("register-error").textContent = "Заполните все поля!";
      return;
    }
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find(u => u.email === email)) {
      document.getElementById("register-error").textContent = "Пользователь с таким email уже существует!";
      return;
    }
    users.push(new User(name, email, password));
    localStorage.setItem("users", JSON.stringify(users));
    document.getElementById("register-error").style.color = "green";
    document.getElementById("register-error").textContent = "Регистрация успешна! Теперь войдите.";
  };

  // Вход пользователя
  document.getElementById("login-btn").onclick = (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    const userData = users.find(u => u.email === email && u.password === password);

    if (!userData) {
      document.getElementById("login-error").textContent = "Неверный email или пароль!";
      return;
    }
    localStorage.setItem("currentUser", JSON.stringify(userData));
    window.location.href = "index.html";
  };
});