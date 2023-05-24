const mainBlock = document.querySelector("main.items");
const commentForm = document.querySelector("div.comments-form")


async function loadData() {
    const url = new URL(window.location)

    await fetch('http://localhost:7000/api/cream-items/' + url.searchParams.get('id'))
        .then(res => {
            return res.json()
        })
        //data - данные которые получили от сервера
        .then(data => {
            console.log(data)
            mainBlock.innerHTML += `<div class="item">
                    <img src="img/${data.img}">
                    <h1>${data.name}</h1>
                    <h4>${data.title}</h4>
                    <p>${data.text}</p>
                    <p>Осталось: ${data.leftItems} шт.</p>`
        })
}

loadData()
