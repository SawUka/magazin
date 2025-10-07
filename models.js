// Класс пользователя
class User {
  constructor(name, email, password) {
    this.name = name;     // Имя пользователя
    this.email = email;   // Email пользователя
    this.password = password; // Пароль пользователя (в реальных проектах так хранить нельзя!)
  }
  checkPassword(password) {
    // Проверяет, совпадает ли переданный пароль с сохранённым
    return this.password === password;
  }
}

// Класс товара
class Product {
  constructor(id, title, price, description, image, category) {
    this.id = id;                 // ID товара
    this.title = title;           // Название товара
    this.price = price;           // Цена товара
    this.description = description; // Описание товара
    this.image = image;           // Ссылка на изображение
    this.category = category;     // Категория товара
  }
  renderCard() {
    // Возвращает HTML-разметку для карточки товара (используется на главной)
    return `
      <div class="card">
        <img src="${this.image}" alt="${this.title}">
        <h3>${this.title}</h3>
        <p>${this.price} $</p>
        <a href="product.html?id=${this.id}">Подробнее</a>
      </div>
    `;
  }
}

// Класс элемента корзины (один товар в корзине)
class CartItem {
  constructor(product, quantity = 1) {
    this.product = product;   // Экземпляр Product
    this.quantity = quantity; // Количество такого товара в корзине
  }
  getTotalPrice() {
    // Возвращает общую цену этого товара (цена × количество)
    return this.product.price * this.quantity;
  }
}

// Класс корзины (вся корзина)
class Cart {
  constructor(items = []) {
    this.items = items; // Массив CartItem (элементов корзины)
  }
  addProduct(product) {
    // Добавляет товар в корзину (или увеличивает количество, если уже есть)
    const found = this.items.find(i => i.product.id === product.id);
    if (found) {
      found.quantity += 1;
    } else {
      this.items.push(new CartItem(product, 1));
    }
  }
  removeProduct(productId) {
    // Удаляет товар по id
    this.items = this.items.filter(i => i.product.id !== productId);
  }
  getTotal() {
    // Общая сумма корзины
    return this.items.reduce((sum, item) => sum + item.getTotalPrice(), 0);
  }
  clear() {
    // Очищает корзину
    this.items = [];
  }
}