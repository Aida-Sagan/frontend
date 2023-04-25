const canvas = document.getElementById("canvas");
const color_input = document.getElementById("color-input")

//2d objecs
const ctx = canvas.getContext('2d');

let x, y;
let isPressed = false; 
let lineColor = "blue";

canvas.addEventListener("mousedown", (e) => {
		isPressed = true;

		x = e.offsetX;
		y = e.offsetY;
});

canvas.addEventListener("mouseup", (e) => {
		isPressed = false;

		x = undefined;
		y = undefined;
});

canvas.addEventListener("mousemove", (e) =>{
		if(isPressed) {
			drawLine(x,y, e.offsetX, e.offsetY);
			x = e.offsetX;
			y = e.offsetY;
		}
});

color_input.addEventListener("change", (e) =>{
		lineColor = e.target.value;
});

function drawLine(x1, y1, x2, y2) {
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.strokeStyle = lineColor;
		ctx.lineWidth = 5;
		ctx.stroke()
}
