// для обработки событий нажатия на кнопки и вывода текста
const locationDescription = document.getElementById("locationDescription");
const btnVolga = document.getElementById("btnVolga");
const btnValdai = document.getElementById("btnValdai");
const btnVazuza = document.getElementById("btnVazuza");
const btnSeliger = document.getElementById("btnSeliger");

// Функции для вывода текста при нажатии на кнопки
btnVolga.addEventListener("click", () => {
    locationDescription.textContent = "Волга — одна из самых величественных и красивых рек в России, а также самая многоводная в Европе. Ее путь простирается через обширные леса, горы и холмы. Растительный и животный мир реки впечатляет своим многообразием. Это место силы с богатой историей и уникальной природой, идеальное для жизни, отдыха и ведения бизнеса.";
});

btnValdai.addEventListener("click", () => {
    locationDescription.textContent = "Валдай по праву называется озерным краем, здесь расположено несколько десятков озер. Самые крупные из них — Велье, Селигер, Ужин, Ильмень, Боровно.Район отличается кристально чистым воздухом, а незабываемые виды на чистые и глубокие лесные озера Валдая делают это место особенным.";
});

btnVazuza.addEventListener("click", () => {
    locationDescription.textContent = "Территория подойдет тем, кто высоко ценит индивидуальность, высококлассную инфраструктуру. Здесь есть все,  что необходимо для жизни и отдыха в гармонии: прекрасная экология, ощущение свободы и городской уровень комфорта. Открывается много возможностей  для отдыха: прогулки на лодках и яхтах, дайвинг, катание на гидроциклах, пейнтбол, купание, рыбалка, охота, зимние виды спорта, зимняя рыбалка";
});

btnSeliger.addEventListener("click", () => {
    locationDescription.textContent = "Селигер — одно из красивейших озер европейской части России. Это не просто озеро, а система озер, соединенных между собой короткими проливами, образуя настоящий водный лабиринт.  Здесь можно насладиться отличной рыбалкой, собирать грибы и ягоды, а также отправиться в увлекательное путешествие по озеру на лодке, чтобы посетить Нилову пустынь — овеянный легендами действующий монастырь";
});

// Функция для открытия модального окна с URL
function openModalWithUrl(url) {
    const modal = UIkit.modal.dialog(`<iframe src="${url}" class="uk-modal-full" frameborder="0" uk-video></iframe>`);
    modal.show();
}
const buttons = document.querySelectorAll('.look-fields-btn');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const modalUrl = 'https://vt.bigland.ru/vt/eac40732-a3bc-4b16-b4a5-64381e88f54a/index.html';
        openModalWithUrl(modalUrl);
    });
});
