function getCart() {
  // Загружает корзину из LocalStorage и восстанавливает объекты Cart и CartItem
  const data = localStorage.getItem("cart");
  if (data) {
    const parsed = JSON.parse(data);
    const items = (parsed.items || []).map(item =>
      new CartItem(
        new Product(
          item.product.id,
          item.product.title,
          item.product.price,
          item.product.description,
          item.product.image,
          item.product.category
        ),
        item.quantity
      )
    );
    return new Cart(items);
  }
  return new Cart();
}

function saveCart(cart) {
  // Сохраняет корзину в LocalStorage
  localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
  // Отрисовывает корзину на странице
  const cart = getCart();
  const container = document.getElementById("cart-items");
  if (!container) return;

  // Если корзина пуста — показать сообщение
  if (cart.items.length === 0) {
    container.innerHTML = "<p>Корзина пуста</p>";
    document.getElementById("cart-total").textContent = "0 $";
    return;
  }

  // В цикле выводит все товары
  container.innerHTML = cart.items.map((item, idx) => `
    <div class="cart-item">
      <img src="${item.product.image}" alt="${item.product.title}" style="width:50px;">
      <span>${item.product.title}</span>
      <span>Цена: ${item.product.price} $</span>
      <span>Кол-во: ${item.quantity}</span>
      <button class="remove-btn" data-idx="${idx}">Удалить</button>
    </div>
  `).join("");
  document.getElementById("cart-total").textContent = cart.getTotal() + " $";

  // Кнопки "Удалить" — удаляют товар из корзины
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.onclick = function() {
      const idx = parseInt(this.dataset.idx);
      cart.items.splice(idx, 1);
      saveCart(cart);
      renderCart();
    };
  });
}

// Вызываем отрисовку корзины при загрузке страницы
document.addEventListener("DOMContentLoaded", renderCart);