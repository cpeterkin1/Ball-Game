var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//Paddle Dimensions
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

//Bricks
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = [];
for (c=0; c<brickColumnCount; c++) {
	bricks[c] = [];
	for (r=0; r<brickRowCount; r++) {
		bricks[c][r] = { x:0 , y:0};
	}
}

//Key Presses
var rightPressed = false;
var leftPressed = false;

//Dislay Text
var display = 'CANYOUBEATTHISGAME?';
var i = 0;

var x = canvas.width/2;
var y = canvas.height-30;
var ballRadius = 10;

var dx = 2;
var dy = -2;

var color = "#0095DD";

function drawBall(color) {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = color;
	ctx.fill();
	ctx.closePath();
}

function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "0095DD";
	ctx.fill();
	ctx.closePath();
}

function drawBricks() {
	for (c=0; c<brickColumnCount; c++) {
		for (r=0; r<brickRowCount; r++) {
			bricks[c][r].x = 0;
			bricks[c][r].y = 0;
			ctx.beginPath();
			ctx.rect(0, 0, brickWidth, brickHeight);
			ctx.fillStyle = "0095DD";
			ctx.fill();
			ctx.closePath();
		}
	}
}

function draw() {
	//draw the ball
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall(color);
	drawPaddle();
	x += dx;
	y += dy;
	if (y + dy < ballRadius) {
		dy = -dy
		color = getRandomColor();
	}
	else if(y + dy > canvas.height-ballRadius){
		if(x>paddleX && x<paddleX+paddleWidth) {
			dy *= -1.1;
			//document.write(display[i]);
			i++;
		}
		else {
			alert("GAME OVER");
			document.location.reload();
		}
	}
	if (x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
		dx = -dx;
		color = getRandomColor();
	}
	if(rightPressed && paddleX < canvas.width-paddleWidth) {
		paddleX += 7;
	}
	else if (leftPressed && paddleX > 0) {
		paddleX -= 7;
	}
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
	if(e.keyCode == 39 || e.keyCode == 68) {
		rightPressed = true;
	}
	else if (e.keyCode==37 || e.keyCode == 65) {
		leftPressed = true;
	}
}

function keyUpHandler(e) {
	if(e.keyCode == 39 || e.keyCode == 68) {
		rightPressed = false;
	}
	else if (e.keyCode==37 || e.keyCode==65) {
		leftPressed = false;
	}
}

setInterval(draw, 10);