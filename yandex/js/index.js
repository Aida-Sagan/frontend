document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll("[data-include]");
    elements.forEach(function (element) {
        const fileName = element.getAttribute("data-include");
        fetch(fileName)
            .then((response) => response.text())
            .then((data) => {
                element.innerHTML = data;
            })
            .catch((error) => {
                console.error(`Ошибка загрузки файла ${fileName}: ${error}`);
            });
    });
});
