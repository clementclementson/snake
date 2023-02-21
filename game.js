// Define global variables
var canvas = document.getElementById("gameBoard");
var context = canvas.getContext("2d");
var boardWidth = canvas.width;
var boardHeight = canvas.height;
var gridSize = 10;
var snake = [
  { x: gridSize * 3, y: 0 },
  { x: gridSize * 2, y: 0 },
  { x: gridSize, y: 0 },
];
var snakeDirection = "right";
var food = null;
var score = 0;
var gameSpeed = 200;
var gameLoop;
var isGameOver = false;
// Define the update function
function update() {
    // Game logic goes here
    // Move the snake
    var head = { x: snake[0].x, y: snake[0].y };
    if (snakeDirection === "right") {
      head.x += gridSize;
    } else if (snakeDirection === "left") {
      head.x -= gridSize;
    } else if (snakeDirection === "down") {
      head.y += gridSize;
    } else if (snakeDirection === "up") {
      head.y -= gridSize;
    }
    snake.unshift(head);
    //snake.pop();
  
    // Check for collision with walls
    if (
      head.x < 0 ||
      head.x >= boardWidth ||
      head.y < 0 ||
      head.y >= boardHeight
    ) {
      gameOver();
      return;
    }
  
    // Check for collision with food
    if (head.x === food.x && head.y === food.y) {
      score += 10;
      generateFood();
    } else {
      // Remove the tail only if the snake did not collide with food
      snake.pop();
    }
  
    // Check for self-collision
    for (var i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        gameOver();
        return;
      }
    }
  
    // Draw the game board
    context.clearRect(0, 0, boardWidth, boardHeight);
    drawSnake();
    drawFood();
    drawScore();
  }
  
  // Generate the initial food object
  generateFood();
  
  // Start the game loop
  gameLoop = setInterval(update, gameSpeed);

// Define the drawSnake function
function drawSnake() {
    // Set the color of the snake
    context.fillStyle = "green";
  
    // Draw each segment of the snake
    for (var i = 0; i < snake.length; i++) {
      // Add a border to the snake segments
      context.strokeStyle = "black";
      context.strokeRect(snake[i].x, snake[i].y, gridSize, gridSize);
  
      context.fillRect(snake[i].x, snake[i].y, gridSize, gridSize);
    }
  }
  

// Define the drawFood function
function drawFood() {
    // Set the color of the food
    context.fillStyle = "red";
  
    // Draw the food as a rectangle
    context.fillRect(food.x, food.y, gridSize, gridSize);
  }
  

// Define the drawScore function
function drawScore() {
    // Set the color and font of the score text
    context.fillStyle = "black";
    context.font = "20px Arial";
  
    // Calculate the width of the score text
    var scoreTextWidth = context.measureText("Score: " + score).width;
  
    // Calculate the x position to center the score text above the grid
    var scoreX = (boardWidth - scoreTextWidth) / 2;
  
    // Draw the score text
    context.fillText("Score: " + score, scoreX, 20);
  }
  
  

// Define the generateFood function
function generateFood() {
    // Generate a random x and y position for the food
    var foodX = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
    var foodY = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
  
    // Create a new food object with the random position
    var newFood = {
      x: foodX,
      y: foodY
    };
  
    // Set the food variable to the new food object
    food = newFood;
  }
  

// Define the gameOver function
function gameOver() {
  // Game over code goes here
  // ...
  clearInterval(gameLoop);

  if (!isGameOver)
  {      
    alert("Game Over");
  }

  isGameOver = true;
}

// Add event listener to start over button
var startOverButton = document.getElementById("startOverButton");
startOverButton.addEventListener("click", function() {
  // Reset game state
  snake = [
    { x: gridSize * 3, y: 0 },
    { x: gridSize * 2, y: 0 },
    { x: gridSize, y: 0 },
  ];
  snakeDirection = "right";
  food = 0;
  score = 0;
  var gameSpeed = 200;
  context.clearRect(0, 0, boardWidth, boardHeight);
  generateFood();
  isGameOver = false;
  gameLoop = setInterval(update, gameSpeed);
});

// Add event listener for arrow key presses
document.addEventListener("keydown", function(event) {
    if (event.code === "ArrowRight" && snakeDirection !== "left") {
      snakeDirection = "right";
    } else if (event.code === "ArrowLeft" && snakeDirection !== "right") {
      snakeDirection = "left";
    } else if (event.code === "ArrowDown" && snakeDirection !== "up") {
      snakeDirection = "down";
    } else if (event.code === "ArrowUp" && snakeDirection !== "down") {
      snakeDirection = "up";
    }
  });
  

// Start the game loop
gameLoop = setInterval(update, gameSpeed);
