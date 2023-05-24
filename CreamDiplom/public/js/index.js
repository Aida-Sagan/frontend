// В документе особо многое не поменялось
// Те строки, что были изменены помечены комментариями
const mainBlock = document.querySelector("main.items");

function showCart() {
    const shopBlock = document.querySelector(".shop-cart-block");
    if(shopBlock !== null){
        shopBlock.classList.toggle("active");
    } else{
        console.error('The shopBlock is null.');
    }

    if (shopBlock.classList.contains("active"))
        mainBlock.style.width = "65%";
    else
        mainBlock.style.width = "100%";
}

let items = []
async function loadData() {
    await fetch('http://localhost:7000/api/cream-items')
        .then(res => { return res.json() })
        .then(data => {
            items = data
            data.forEach((item) => {
                mainBlock.innerHTML += `<div class="item">
                    <img src="img/${item.img}">
                    <h2>${item.name} </h2>
                    <b>${item.title}</b>
                    <h5>Цена: ${item.price} KZT</h5>
                    <div class="add-to-cart" onclick="addToCart(${item.id})"><i class="fas fa-cart-plus"></i></div>
                    <a href="../public/product.html?id=${item.id}"><button class="read-more-btn">Узнать о товаре</button><a>
                </div>
                    
`;
            });
            console.log(items)
        })
}

loadData()


let shopCart = [];
if (localStorage.getItem("shopCart") != undefined) {
    shopCart = JSON.parse(localStorage.getItem("shopCart"));
    showCart();
    updateShopCart();
}

function addToCart(id) {
    let itemInCart = shopCart.find((item) => item.id == id);
    if (itemInCart) {
        changeCountItems('+', id);
    } else {
        let item = items.find((item) => item.id == id);
        shopCart.push({
            ...item,
            count: 1
        });
    }

    updateShopCart();
}

function updateShopCart() {
    const shopCartItems = document.querySelector("#shop-cart");
    shopCartItems.innerHTML = "";

    let elementCount = 0, totalPrice = 0;
    shopCart.forEach((el) => {

        // Объяснение по поводу текстового поля для ввода количества:

        // Здесь мы лишь изменили вывод количества.
        // Вместо span теперь используется тег input.
        // В нем важно указать:
        // value – выводим в поле количество товаров
        // id – нужно чтобы мы могли найти это поле из функции в JS
        // onfocusout - обработчик события, что срабатывает когда мы забираем курсор из поля. В нем вызывается метод changeCountItems

        // Объяснение по поводу кнопки для удаления:
        // Для кнопки с удалением товара мы лишь реализовали обработчик события deleteItem, в который передается id объекта
        shopCartItems.innerHTML += `<div class="shop-item">
                <div class="info">
                    <img src="img/${el.img}" alt="${el.name}">
                    <span class="title">${el.name}</span>
                </div>
                <div class="price">${el.price} KZT</div>
                <div class="count">
                    <button class="minus" onclick="changeCountItems('-', ${el.id})">-</button>
                    <input value="${el.count}" id="item-${el.id}" onfocusout="changeCountItems('', ${el.id})">
                    <button class="plus" onclick="changeCountItems('+', ${el.id})">+</button>
                    <button class="delete" onclick="deleteItem(${el.id})"><i class="fas fa-trash-alt"></i></button>
                </div>
            </div>`;

        elementCount += el.count;
        totalPrice += el.price * el.count;
    });

    let ft = new Intl.NumberFormat('kz-KZ', {
        style: 'currency',
        currency: 'KZT'
    });

    document.querySelector("#count-items").textContent = elementCount;
    document.querySelector(".go-shop b").textContent = ft.format(totalPrice);

    localStorage.setItem("shopCart", JSON.stringify(shopCart));
}

function changeCountItems(action, id) {
    let item = shopCart.find((item) => item.id == id);
    if (action == '-' && item.count > 1)
        item.count--;
    else if (action == '+' && item.count < item.leftItems)
        item.count++;
    else if (action == '-' && item.count == 1)
        deleteItem(id); // теперь проще вызвать метод для удаления (это по желанию)

    // Ниже условие для обработки установки своего значения
    // Если action пустой, то этот метод был вызван из оббработчика onfocusout
    else if (action == '') {
        // Сперва обращаемся к нужному input полю и берем его значение
        // Также значение обязательно преобразовываем в число Number.parseInt()
        let newCount = Number.parseInt(document.querySelector(".shop-item #item-" + id).value);

        // Проверяем верно ли все ввели
        // Если больше за 0 и меньше, чем доступно элементов,
        // то в таком случае ставим введенное значение в качестве
        // количества элементов
        if (newCount > 0 && newCount <= item.leftItems)
            item.count = newCount;
        else // Если нет, то выдаем уведомление
            alert(`Указано неверное значение. Должно быть от 1 до ${item.leftItems}`);
    }

    updateShopCart();
}

// Метод для удаления одного товара
function deleteItem(id) {
    // Мы создаем фильтр для нахождения всех товаров, помимо того что передан в функцию
    shopCart = shopCart.filter((item) => item.id != id);
    updateShopCart(); // Обновляем корзину
}

// Эта функция срабатывает при нажатии на кнопку Удалить всё
function deleteAll() {
    shopCart = []; // Очищаем массив с товарами
    localStorage.removeItem("shopCart"); // Удаляем значение из хранилища
    updateShopCart(); // Обновляем содержимое корзины (корзина будет пустой)
}


async function makeOrder() {
    let insertOrder = []
    shopCart.forEach(el => {
        insertOrder.push({item_id: el.id, count: el.count})
    })

    //ссылаемся к определенному юрл адресу на стороне сервера и там добавление внутри новой коллекции
    const result = await fetch('http://localhost:7000/api/cream-items', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        //переводит в виде строки
        //передаем данные через тело (body) документа
        body: JSON.stringify(insertOrder)
    })

    if(result.status == 200) {
        localStorage.removeItem("shopCart")
        shopCart = []
        updateShopCart()
        document.querySelector(".go-shop").textContent = 'Заказ оформлен'

    }
}

const navItem = document.querySelectorAll("nav span")
navItem.forEach(el => {
    el.addEventListener("click", () => {
        mainBlock.innerHTML = ""
        items.forEach(item => {
            if (el.classList.value == item.category || el.classList.value == "all") {
                mainBlock.innerHTML += `<div class="item" >
                    <img src="img/${item.img}">
                    <h4>${item.name} – ${item.title}$ </h4>
                    <h5>Цена: ${item.price} KZT</h5>
                    <div class="add-to-cart" onclick="addToCart(${item.id})"><i class="fas fa-cart-plus"></i></div>
                    <a href="../public/product.html?id=${item.id}"><button class="read-more-btn">Узнать о товаре</button><a>
                </div>`;
            }
        })
    })
})