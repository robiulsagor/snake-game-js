var blockSize = 25
var rows = 20
var cols = 20
var board
var context

var soundEat = document.getElementById("eat")
var collide = document.getElementById("collide")

var high = 0

if (localStorage.getItem("high")) {
    high = localStorage.getItem("high")
} else {
    high = 0
}


var score = 0
var scoreContainer = document.getElementById("score")
var highScoreContainer = document.getElementById("high")
scoreContainer.innerHTML = score
highScoreContainer.innerHTML = high

// snake head
var snakeX = blockSize * 5
var snakeY = blockSize * 5

// food
var foodX
var foodY

var velocityX = 0
var velocityY = 0

var snakeBody = []

var gameOver = false

window.onload = function () {
    board = document.getElementById("board")
    context = board.getContext("2d")

    board.height = blockSize * rows
    board.width = blockSize * cols

    document.addEventListener("keydown", changeDirection)

    placeFood()

    setInterval(update, 1000 / 10)
}

function update() {
    if (gameOver) {
        return
    }

    context.fillStyle = "#333"
    context.fillRect(0, 0, board.height, board.width)

    context.fillStyle = "blue"
    context.fillRect(foodX, foodY, blockSize, blockSize)

    context.fillStyle = "red"
    context.fillRect(snakeX, snakeY, blockSize, blockSize)
    snakeX += velocityX * blockSize
    snakeY += velocityY * blockSize

    if (snakeX === foodX && snakeY === foodY) {
        snakeBody.push([snakeX, snakeY])
        placeFood()
        score += 10
        scoreContainer.innerHTML = score
        soundEat.play()
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1]
    }

    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY]
    }

    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize)
    }

    // game over logics
    if (snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows * blockSize) {
        collide.play()
        gameOver = true

        if (!localStorage.getItem("high")) {
            localStorage.setItem("high", score)
        } else {
            if (score > localStorage.getItem("high")) {
                localStorage.setItem("high", score)
            }
        }
        highScoreContainer.innerHTML = localStorage.getItem("high")
        alert("Game Over!!!")
    }

    // for (let i = 0; i < snakeBody.length; i++) {
    //     if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
    //         gameOver = true
    //         // alert("Game over!!")
    //         // It does not working, I don't know why!!!
    //     }
    // }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize
    foodY = Math.floor(Math.random() * rows) * blockSize
}

function changeDirection(e) {
    if (e.code === "ArrowUp" && velocityY !== 1) {
        velocityX = 0
        velocityY = -1
    }
    else if (e.code === "ArrowDown" && velocityY !== -1) {
        velocityX = 0
        velocityY = 1
    }
    else if (e.code === "ArrowLeft" && velocityX !== 1) {
        velocityX = -1
        velocityY = 0
    }
    else if (e.code === "ArrowRight" && velocityX !== -1) {
        velocityX = 1
        velocityY = 0
    }
}