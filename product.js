document.addEventListener("DOMContentLoaded", async () => {
  // Получить id товара из адресной строки (?id=3)
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) return;

  // Получить данные товара с API
  const data = await getProductById(id);
  const product = new Product(
    data.id, data.title, data.price, data.description, data.image, data.category
  );

  // Показать карточку товара
  document.getElementById("product-details").innerHTML = `
    <img src="${product.image}" alt="${product.title}" style="max-width:200px;">
    <h2>${product.title}</h2>
    <p>${product.description}</p>
    <p><b>Цена: ${product.price} $</b></p>
    <button id="add-to-cart">Добавить в корзину</button>
  `;

  // Кнопка "Добавить в корзину"
  document.getElementById("add-to-cart").onclick = () => {
    let cartData = JSON.parse(localStorage.getItem("cart")) || { items: [] };
    const cart = new Cart(cartData.items.map(
      item => new CartItem(new Product(
        item.product.id,
        item.product.title,
        item.product.price,
        item.product.description,
        item.product.image,
        item.product.category
      ), item.quantity)
    ));
    cart.addProduct(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Товар добавлен в корзину!");
  };

  // Кнопки для перехода
  document.getElementById("to-catalog").onclick = () => {
    window.location.href = "index.html";
  };
  document.getElementById("to-cart").onclick = () => {
    window.location.href = "cart.html";
  };
});