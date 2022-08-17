let carts = [];

const inputCart = document.getElementById('input-cart'); //поле задач инпут
const btnCart = document.getElementById('add-cart'); //кнопка добавить задачу
const blockNewCart = document.getElementById('block-new-task'); // сюда добавляються задачи
const btnAll = document.getElementById('all-clear-task'); //очистить все задачи

//забираем с хранилища Local Storage значения и парсим их
const getItemLocal = () => {
  if (localStorage.getItem('todoCart') !== null) {
    return JSON.parse(localStorage.getItem('todoCart'));
  }
  return [];
};

//Отправляем в хранилище Local Storage строку задач из массива carts c status: false
const setItemLocal = () => {
  const arr = carts.filter((el) => {
    return !el.status;
  });
  const obj = JSON.stringify(arr);
  //отправляем в хранилище Local Storage строку obj
  localStorage.setItem('todoCart', obj);
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
  localStorage.setItem('todoCart', obj);
};

// Функция меняет статус на true в задаче если id совпадает
const clearCart = (id) => {
  const newArr = carts.map((cart) => {
    if (cart.id === id) {
      cart.status = true;
    }
  });
  return newArr;
};

//Фунция render добавляет задачу в html, если её статус в массиве carts status:false
const render = () => {
  let html = '';
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
  blockNewCart.innerHTML = html;
};
carts = getItemLocal();
render();

//При нажатии на кнопку добавить добавляем новую задачу и обнуляем строку
btnCart.addEventListener('click', function (event) {
  event.preventDefault();
  const value = inputCart.value;
  if (value == '') {
    alert('Нужно добавить задачу');
  } else if (value !== '') {
    addCart(value);
  }
  render();
  inputCart.value = '';
});

//Добавляем задачу при нажатии кнопкой Enter
inputCart.addEventListener('keyup', (event) => {
  event.preventDefault();
  const value = inputCart.value;
  if (event.key !== 'Enter' && value == '') {
    alert('Нужно добавить задачу');
  } else if (event.key == 'Enter' && value !== '') {
    addCart(value);
    inputCart.value = '';
  }
  render();
});

//Удаляем задачу
blockNewCart.addEventListener('click', (event) => {
  event.preventDefault();
  const id = event.target.dataset.id;
  if (event.target.className !== 'trello__cart-icon _icon-delete') {
    return;
  }
  clearCart(id); //сравниваем id , если id иконки и id задачи совпадают, меняем статус на true
  setItemLocal(); //отправляем задачи co status:false в хранилище Local Storage
  carts = getItemLocal(); // забираем задачи
  render(); //обновляем список задач
});

//Очистить весь список задач
btnAll.addEventListener('click', (event) => {
  event.preventDefault();
  const newArray = carts.map((cart) => {
    if (cart.status !== true) {
      cart.status = true;
    }
  });
  setItemLocal(); //отправляем задачи co status:false в хранилище Local Storage
  carts = getItemLocal(); // забираем задачи
  render(); //обновляем список задач
  return newArray;
});
