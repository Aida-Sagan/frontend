const filmData = {
    "youtube" : {
        "name" :"YouTube",
        "image" : "https://cdn2.iconfinder.com/data/icons/social-flat-buttons-3/512/youtube-256.png"
    },
    "netflix" : {
        "name" : "Netflix",
        "image" : "https://cdn2.iconfinder.com/data/icons/colorful-guache-social-media-logos-1/159/social-media_netflix-white-256.png"
    },
    "IMDb" : {
        "name" : "IMDb",
        "image" : "https://cdn3.iconfinder.com/data/icons/popular-services-brands/512/imdb-256.png"
    }
}

let favFilmArr = [];

if(localStorage.getItem("favFilms") != undefined){
    favFilmArr = localStorage.getItem("favFilms").split(",");
    showFavs();
}

//entries перебирает разоичные обьекты
Object.entries(filmData).forEach((el) => {
    let div = document.createElement('div');
    div.classList.add('film');
    div.innerHTML = `<img src="${el[1].image}">
                <h2>${el[1].name}</h2>
                <button class="btn btn-outline-danger" id="${el[0]}">В избранное</button>`

    document.querySelector("main.films").appendChild(div);
});

const filmsBtn = document.querySelectorAll(".film button");
filmsBtn.forEach((btn) => {
    btn.addEventListener("click", function(e) {
        if (!favFilmArr.includes(e.target.id)){
             //на ту кнопку которую нажимаем target
            favFilmArr.push(e.target.id);
            
            e.target.classList.toggle("active");
            e.target.textContent = "Добавлено";
            showFavs()
        }
       
    });
});

function showFavs() {
    let favFilms = document.querySelector(".fav-films");
    favFilms.innerHTML = "";
    if(favFilmArr.length == 0)
        return;

    let ul = document.createElement('ul');
    favFilms.appendChild(ul);

    favFilmArr.forEach((el) => {
        let item = `<li><img id="${el}" src="${filmData[el].image}"><span>${filmData[el].name}</span></li>`

        let li = document.createElement('li');
        li.innerHTML = item;
        document.querySelector(".fav-films ul").appendChild(li)
    });

    localStorage.setItem("favFilms", favFilmArr.join())

    const favFilmsImg = document.querySelectorAll(".fav-films li img");
    favFilmsImg.forEach((film) => {
        film.addEventListener("click", (e) => {
         //получить айди на то изображение которое нажали
            let id = e.target.id;
            let index = favFilmArr.indexOf(id);
            /*передаю индекс и удаляю 1 эл*/
            favFilmArr.splice(index, 1);
            showFavs();

            let button = document.querySelector(".film button#" + id);
            button.classList.toggle("active");
            button.textContent = "В избарнное";
        });
    });
}


