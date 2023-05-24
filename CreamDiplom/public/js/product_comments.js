let btnForm = document.querySelector("#comments-form button");
let countComments = 0;
let idComment = 0;
const url = new URL(window.location)

// Отправка комментария на сервер
btnForm.onclick = async function() {
    idComment++;
    let form = document.querySelector("#comments-form");
    if(form.name.value.length < 4) {
        document.querySelector("#error").innerHTML = "Длина имени не менее 4 символов";
        return false;
    } else if(form.comment.value.length < 10) {
        document.querySelector("#error").innerHTML = "Длина сообщения не менее 10 символов";
        return false;
    }

    document.querySelector("#error").innerHTML = "";

    // Установим новое значение для подсчета комментариев
    if(countComments == 0)
        document.querySelector("#comments").innerHTML = "";

    countComments++;
    document.querySelector(".count-comm").innerHTML = countComments;

    let newComment = "<div class='comment' id='block-" + idComment + "'>" +
        "<span class='delete' onclick='delComm(" + idComment + ")'>&times;</span>" +
        "<p class='name'>" + form.name.value + "</p>" +
        "<p class='mess'>" + form.comment.value + "</p>" +
        "</div>";

    document.querySelector("#comments")
        .insertAdjacentHTML('afterbegin', newComment); // beforeend

    const comment = form.comment.value; // Сохраняем значение комментария
    form.comment.value = ""; // Очищаем поле комментария


    try {
        const response = await fetch('http://localhost:7000/api/comments/' + url.searchParams.get('id'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: form.name.value,
                comment: comment // Используем сохраненное значение комментария
            })
        });

        const data = await response.json();
        console.log('Ответ сервера:', data);
    } catch (err) {
        console.log('Ошибка при отправке комментария:', err);
    }

};

// Загрузка комментариев с сервера
window.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('http://localhost:7000/api/comments/' + url.searchParams.get('id'));
        const data = await response.json();
        console.log('Комментарии с сервера:', data);

        // Отображение комментариев на странице
        if (data.length > 0) {
            document.querySelector("#comments").innerHTML = "";
            countComments = data.length;
            document.querySelector(".count-comm").innerHTML = countComments;

            for (let i = data.length - 1; i >= 0; i--) {
                let newComment = "<div class='comment' id='block-" + data[i]._id + "'>" +
                    "<span class='delete' onclick='delComm(" + data[i]._id + ")'>&times;</span>" +
                    "<p class='name'>" + data[i].name + "</p>" +
                    "<p class='mess'>" + data[i].comment + "</p>" +
                    "</div>";

                document.querySelector("#comments").insertAdjacentHTML('afterbegin', newComment);
            }
        }
    } catch (err) {
        console.log('Ошибка при загрузке комментариев:', err);
    }
});
