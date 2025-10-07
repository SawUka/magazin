// Работа с пользователем
function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

function logoutUser() {
  localStorage.removeItem("currentUser");
  window.location.reload();
}


// Шапка
function renderHeader() {
  const header = document.getElementById("header");
  if (!header) return;

  const user = getCurrentUser();

  header.innerHTML = `
    <div class="header-inner">
      <a href="index.html" class="header-logo">Магазин</a>
      <nav>
        <a href="index.html">Главная</a>
        <a href="cart.html">Корзина</a>
        ${
          user
            ? `<span class="username" style="color:#ffe600;font-weight:600;margin-right:10px;">${user.name}</span>
               <button id="logout-btn" class="logout-btn">Выйти</button>`
            : `<a href="auth.html" id="auth-link">Вход / Регистрация</a>`
        }
      </nav>
    </div>
  `;

  if (user) {
    document.getElementById("logout-btn").addEventListener("click", () => {
      logoutUser();
    });
  }
}

document.addEventListener("DOMContentLoaded", renderHeader);