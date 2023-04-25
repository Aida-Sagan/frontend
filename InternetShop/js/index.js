const mainBlock = document.querySelector("main.items")

function showCart() {
	const shopBlock = document.querySelector(".shop-cart-block")

	shopBlock.classList.toggle("active");

	if(shopBlock.classList.contains("active"))
		mainBlock.style.width = "60%";
	else
		mainBlock.style.width = "90%"
}

items.forEach((item) =>{
	mainBlock.innerHTML += `<div class="item">
      <img src="${item.img}">
      <h4>${item.name} - ${item.price}$</h4>
      <p>${item.desc}</p>
      <div class="add-to-cart" onclick="addToCart(${item.id})">
        <i class="fa-solid fa-cart-shopping"></i>
      </div>
    </div>`;
});

let shopCart = [];

//получим все эелементы, кроме элемента у которого айди совп с айди переданной в ф-ию
if(localStorage.getItem("shopCart") != undefined) {
	shopCart = JSON.parse(localStorage.getItem("shopCart"));
	showCart();
	updateShopCart();
}

function addToCart(id) {
	let itemInCart = shopCart.find((item) => item.id == id);
	if(itemInCart) {
		changeCountItems("+", id);
	}else {
		let it = items.find((it) => it.id == id);
		shopCart.push({
			...it,
			count: 1
		});
	}
	
	updateShopCart();
}


const deleteAllButton = document.querySelector("#delete-all");
deleteAllButton.addEventListener("click", deleteAllItems);

function deleteAllItems() {
 	shopCart = [];
 	updateShopCart();
 	localStorage.setItem("shopCart", JSON.stringify(shopCart));
}


function updateShopCart() {
	const shopCartItems = document.querySelector("#shop-cart");
	/*очищаем обьект всегда, иначе дубликаты будут*/
	shopCartItems.innerHTML = "";

	let elementCount = 0;
	let totalPrice = 0;


	shopCart.forEach((el) => {
		shopCartItems.innerHTML += `<div class="shop-item">
      <div class="info">
        <img src="${el.name}}">
        <span class="title"></span>
      </div>  
      <div class="price">${el.price}$ </div>
      <div class="count">
        <button class="minus" onclick="changeCountItems('-', ${el.id})">-</button>
        <input type="number" value="${el.count}" min="1" max="${el.leftItems}" onchange="changeCountItems('update', ${el.id}, this.value)">>
        <button class="plus" onclick="changeCountItems('+', ${el.id})">+</button>
        <button class="delete-el" onclick="changeCountItems('X', ${el.id})">X</button>
      </div>
      <div class="remove-items" onclick="deleteAllItems(${el.id})"></div>

    </div>`;
    elementCount += el.count;
    totalPrice += el.price * el.count;
	});

	//формат оформления чисел
	let ft = new Intl.NumberFormat('en-US', {
		//валюта
		style : 'currency',
		currency : 'USD'
	});

//выводим количество внутри count-items
	document.querySelector("#count-items").textContent = elementCount;
	//document.querySelector(".go-shop b").textContent = totalPrice.toFixed(2);
	document.querySelector(".go-shop b").textContent = ft.format(totalPrice);

	//локальное хранилище, чтобы при перезагрузке страницы товары в корзине оставались
	localStorage.setItem("shopCart", JSON.stringify(shopCart));
}


function changeCountItems(action, id, newCount) {
	let item = shopCart.find((item) => item.id == id);


	if(action == "-" && item.count > 1){
		item.count--;
	}
	else if(action == "+" && item.count < item.leftItems) {
		item.count++;
	}
	else if(action == "update" && newCount >= 1 &&newCount < item.leftItems){
    	item.count = parseInt(newCount);
	}
  	else if (action == "update" && newCount < 1) {
    	alert("Количество товара не может быть меньше 1.");
   	 	return;
  	} 
  	else if (action == "update" && newCount > item.leftItems) {
    	alert(`Количество товара не может быть больше, чем ${item.leftItems}.`);
    	return;
  	} 
	//удаление товаров
	else if(action == '-' && item.count == 1){
		//получим все эелементы, кроме элемента у которого айди совп с айди переданной в ф-ию
		shopCart = shopCart.filter((item) => item.id != id);
	}
	else if(action == "X"){
		shopCart = shopCart.filter((item) => item.id != id);
	}

	//обновление корзины
	updateShopCart();
}