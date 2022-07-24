let carts = [];

const inputBtn = document.querySelector(".trello__input-btn");
const inputCart = document.querySelector(".trello__input-cart");
const btnCart = document.querySelector(".trello__input-btn-cart");
const TrelloCart = document.querySelector(".trello__carts");
const btnAll = document.querySelector(".allclear");

const getItemLocal = () => {
  if (localStorage.getItem("todoCart") !== null) {
    carts = JSON.parse(localStorage.getItem("todoCart"));
  }
};

const setItemLocal = () => {
  return localStorage.setItem("todoCart", JSON.stringify(carts));
};

const updateLocal = () => {
  carts = JSON.parse(localStorage.getItem("todoCart"));
  const arr = carts.filter((el) => {
    if (el.status) {
      return;
    } else {
      return el;
    }
  });
  const obj = JSON.stringify(arr);
  localStorage.setItem("todoCart", obj);
  return obj;
};

const addCart = (nameCart) => {
  const cart = {
    nameCart,
    status: false,
    id: `${Math.random()}`,
  };
  carts.push(cart);
  const obj = JSON.stringify(carts);
  localStorage.setItem("todoCart", obj);
};

const clearCart = (id) => {
  carts.forEach((cart) => {
    if (cart.id === id) {
      cart.status = true;
    }
  });
};

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
getItemLocal();
render();

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

inputCart.addEventListener("keyup", function (event) {
  const value = inputCart.value;
  if (event.key == "Enter" && value !== "") {
    addCart(value);
    inputCart.value = "";
  }
  render();
});

TrelloCart.addEventListener("click", function (event) {
  const id = event.target.dataset.id;
  if (event.target.tagName !== "DIV") {
    return;
  }
  clearCart(id);
  render();
  setItemLocal();
  updateLocal();
});

btnAll.addEventListener("click", function () {
  carts.forEach((cart) => {
    if (cart.status !== true) {
      cart.status = true;
    }
  });
  render();
  setItemLocal();
  updateLocal();
});

