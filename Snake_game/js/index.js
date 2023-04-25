const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

//отобразить игровое поле
const ground = new Image();
ground.src = "img/ground.png";

//создать картинку еды
const foodImg = new Image();
foodImg.src = "img/food.png";

//за ширину/высоту одного квадратика
let box = 32;

let score = 0;

let food = {
	x : Math.floor((Math.random() * 17 + 1)) * box, 
	y :Math.floor((Math.random() * 15 + 3)) * box
};

let snake = [];
snake[0] = {
	x : 9 * box,
	y : 10 * box
};

document.addEventListener("keydown", direction);

let dir;

function direction(e) {
	if(e.keyCode == 37 && dir != "right")
		dir = "left"
	else if(e.keyCode == 38 && dir != "down")
		dir = "up"
	else if(e.keyCode == 39 && dir != "left")
		dir = "right"
	else if(e.keyCode == 40 && dir != "up")
		dir = "down"
}

function eatTail(head, arr) {
	for(let i = 0; i < arr.length; i++) {
		if(arr[i].x == head.x && arr[i].y == head.y) {
			clearInterval(game);
		}
	}
}

function drawGame() {
	//рисует определенную картинку по координатам
	ctx.drawImage(ground, 0, 0);

	ctx.drawImage(foodImg, food.x, food.y)

	for(let i = 0; i < snake.length; i++) {
		ctx.fillStyle = i == 0 ? "green" : "purple";
		ctx.fillRect(snake[i].x, snake[i].y, box, box);
	}

	ctx.fillStyle = "white";
	ctx.font = "50px Arial";
	ctx.fillText(score, box * 2.5, box * 1.8)

	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	//змейка кушает еду
	if(snakeX == food.x && snakeY == food.y) {

		score++;
		food = {
			x : Math.floor((Math.random() * 17 + 1)) * box, 
			y :Math.floor((Math.random() * 15 + 3)) * box
		};
	} else {
		//удаляем последний эелмент в массиве
		snake.pop();
	}

	if(snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17) {
		clearInterval(game);
	}


	if(dir == "left") snakeX -= box;
	if(dir == "right") snakeX += box;
	if(dir == "up") snakeY -= box;
	if(dir == "down") snakeY += box;

	let newHead = {
		x : snakeX,
		y : snakeY
	};
	eatTail(newHead, snake);

	snake.unshift(newHead);
}

let game = setInterval(drawGame, 320);