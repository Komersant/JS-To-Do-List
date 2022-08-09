let carts = [];

const inputCart = document.querySelector(".trello__input-cart"); //поле задач инпут
const btnCart = document.querySelector(".trello__input-btn-cart"); //кнопка добавить задачу
const TrelloCart = document.querySelector(".trello__carts"); // сюда добавляються задачи
const btnAll = document.querySelector(".allclear"); //очистить все задачи

//забираем с хранилища Local Storage значения и парсим их
const getItemLocal = () => {
  if (localStorage.getItem("todoCart") !== null) {
    carts = JSON.parse(localStorage.getItem("todoCart"));
  }
};

//Отправляем в хранилище Local Storage строку задач из массива carts
const setItemLocal = () => {
  return localStorage.setItem("todoCart", JSON.stringify(carts));
};

//Обновляем задачи в хранилище Local Storage. , фильтруем, оставляем с статусом false и отправляем назад строку задач
const updateLocal = () => {
  //Забираем задачи с хранилище Local Storage
  carts = JSON.parse(localStorage.getItem("todoCart"));
  //фильтруем задачи и оставляем со статусом false
  const arr = carts.filter((el) => {
    if (el.status) {
      return;
    } else {
      return el;
    }
  });
  //переменная obj хранит задачи с статусом false и переводит в строку фильтрованный массив
  const obj = JSON.stringify(arr);
  //отправляем в хранилище Local Storage строку obj
  localStorage.setItem("todoCart", obj);
  return obj;
};

//Добавляем новую задачу в инпут и хранилище Local Storage
const addCart = (nameCart) => {
  //добавляем новую задачу
  const cart = {
    nameCart,
    status: false,
    id: `${Math.random()}`,
  };
  //пушим её в массив carts
  carts.push(cart);
  //отправляем хранилище Local Storage новую задачу
  const obj = JSON.stringify(carts);
  localStorage.setItem("todoCart", obj);
};

// Функция меняет статус на true в задаче если id отличаеться
const clearCart = (id) => {
  carts.forEach((cart) => {
    if (cart.id === id) {
      cart.status = true;
    }
  });
};

//Фунция render добавляет задачу в html, если её статус в массиве carts = false
const render = () => {
  let html = "";
  carts.forEach((cart) => {
    if (cart.status) {
      return;
    }

    html += `
	 	<div class="trello__cart">
			<div class="trello__cart-text">${cart.nameCart}</div>
			<div data-id=${cart.id} class="trello__cart-icon _icon-delete"></div>
		</div>
		`;
  });
  TrelloCart.innerHTML = html;
};
getItemLocal(); //отправляем массив в хранилище Local Storage
render();

//При нажатии на кнопку добавить добавляем новую задачу и обнуляем строку
btnCart.addEventListener("click", function (event) {
  const value = inputCart.value;
  if (value == "") {
    alert("Нужно добавить задачу");
  } else if (value !== "") {
    addCart(value);
  }
  render();
  inputCart.value = "";
});

//Добавляем задачу при нажатии кнопкой Enter
inputCart.addEventListener("keyup", function (event) {
  const value = inputCart.value;
  if (event.key == "Enter" && value !== "") {
    addCart(value);
    inputCart.value = "";
  }
  render();
});

//Удаляем задачу
TrelloCart.addEventListener("click", function (event) {
  const id = event.target.dataset.id;
  if (event.target.tagName !== "DIV") {
    return;
  }
  clearCart(id); //сравниваем id , если id иконки и id задачи совпадают, меняем статус на true
  render(); //обновляем список задач
  setItemLocal(); //отправляем задачи в хранилище Local Storage
  updateLocal(); // забираем задачи с хранилище Local Storage, фильтруем и отправляем назад задачи со статусом false
});

//Очистить весь список задач
btnAll.addEventListener("click", function () {
  carts.forEach((cart) => {
    if (cart.status !== true) {
      cart.status = true;
    }
  });
  render(); //обновляем список задач
  setItemLocal(); //отправляем задачи в хранилище Local Storage
  updateLocal(); // забираем задачи с хранилище Local Storage, фильтруем и отправляем назад задачи со статусом false
});
