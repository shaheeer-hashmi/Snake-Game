// ! Selection of the elements
const board = document.querySelector('.board');
const startButton = document.querySelector('.btn-start');
const modal = document.querySelector('.modal');
const startGameModal = document.querySelector('.start');
const gameOverModal = document.querySelector('.game-over');
const restartButton = document.querySelector('.btn-restart');
const highScoreElement = document.querySelector('#high-score');
const scoreElement = document.querySelector('#score');
const timeElement = document.querySelector('#time')
const blockWidth = 50;
const blockHeight = 50;

let highScore = localStorage.getItem('highScore') || 0;
let score = 0;
let time = `00:00`;



// Display the saved high score when the game loads
highScoreElement.innerHTML = highScore



// Calculate how many columns and rows can fit inside the board
const cols = Math.floor(board.clientWidth / blockWidth)
const rows = Math.floor(board.clientHeight / blockHeight)


// Starting position of the snake
let snake = [{x: 3, y:13}]


// Generate a random starting position for the food
let food = {x: Math.floor(Math.random() * rows), y:Math.floor(Math.random() * cols)}


// Current direction of the snake
let direction = 'down';


// Store the interval IDs so we can stop the game later
let intervalId = null;
let timerIntervalId = null;


// ! Array used to store every box created on the board
let blocks = []


// ! Adding the Rows and Columns

for (let row= 0; row <rows; row++){
  for (let col = 0; col < cols; col++) {

  // Create one box for every row/column position
  const box = document.createElement('div');
  box.classList.add('box');

  // Add the box to the board
  board.appendChild(box);

  // Store the box using its row-column coordinates as the key
  blocks[`${row}-${col}`] = box
  }
}



// ! Rendering the Snake & The Logic of The movement of the Snake

function renderSnake(){

  // Get the latest high score from localStorage
  let highScore = localStorage.getItem('highScore') || 0;
  highScoreElement.innerHTML = highScore


  // Display the food on the board
  blocks[`${food.x}-${food.y}`].classList.add('food')


  // This will contain the next position of the snake's head
  let head = null


  // Calculate the next head position based on the current direction
  if (direction === 'left'){
    head = {x:snake[0].x, y: snake[0].y-1}
  }else if(direction ==='right'){
    head = {x: snake[0].x, y: snake[0].y+1}
  }else if(direction ==='down'){
    head = {x:snake[0].x+1, y: snake[0].y}
  }else if(direction ==='up'){
    head = {x:snake[0].x-1, y: snake[0].y}
  }


  // Wall Collision
  // If the snake's head goes outside the board, end the game
  if(head.x<0 ||  head.x>=rows || head.y<0 || head.y>=cols){

    // Show the game-over modal
    modal.style.display = 'flex'
    startGameModal.style.display = 'none';
    gameOverModal.style.display = 'flex';

    // Stop the snake movement
    clearInterval(intervalId)

    return
  }


  // Food Consumption
  // Check if the snake's new head position is the same as the food
  if(head.x == food.x && head.y == food.y){

    // Remove the old food from the board
    blocks[`${food.x}-${food.y}`].classList.remove('food');


    // Generate a new random position for the food
    food = {x: Math.floor(Math.random() * rows), y:Math.floor(Math.random() * cols)}


    // Display the new food
    blocks[`${food.x}-${food.y}`].classList.add('food')


    // Add the new head without removing the tail
    // This makes the snake grow by one segment
    snake.unshift(head)


    // Increase the score
    score += 10;
    scoreElement.innerText = score


    // Check whether the current score is higher than the previous high score
    if(score>highScore){
      highScore = score

      // Save the new high score in localStorage
      localStorage.setItem('highScore',highScore.toString())
    }
  }


  // Remove the visual appearance of every current snake segment
  snake.forEach(segment =>{
    blocks[`${segment.x}-${segment.y}`].classList.remove('fill')
  })


  // Add the new head to the beginning of the snake array
  snake.unshift(head)


  // Remove the last segment of the snake
  // This creates the movement effect
  snake.pop();


  // Draw the snake again using the updated positions
  snake.forEach(segment =>{
    blocks[`${segment.x}-${segment.y}`].classList.add('fill')
  })



}



// ! Function For Restarting The Game.

restartGame = ()=>{

  // Remove the current food from the board
  blocks[`${food.x}-${food.y}`].classList.remove('food');


  // Remove all visible snake segments
  snake.forEach(segment =>{
    blocks[`${segment.x}-${segment.y}`].classList.remove('fill')
  })


  // Reset the score and timer
  score = 0
  time = `00:00`


  // Update the displayed score and time
  scoreElement.innerText = score
  timeElement.innerText = time


  // Display the current high score
  highScoreElement.innerText = highScore


  // Hide the modal
  modal.style.display = 'none'


  // Reset the snake to its starting position
  snake = [{x: 5, y:6}]


  // Generate new random food
  food =  {x: Math.floor(Math.random() * rows), y:Math.floor(Math.random() * cols)}


  // Start the snake movement again
  intervalId = setInterval(()=>{
    renderSnake()
  },300)
}


restartButton.addEventListener('click',restartGame)



// ! Start Button

startButton.addEventListener('click', ()=>{

  // Hide the starting modal
  modal.style.display = 'none';


  // Start moving the snake every 300 milliseconds
  intervalId = setInterval(()=>{
    renderSnake()
  },300)


  // Start the game timer
  timerIntervalId = setInterval(()=>{

    // Convert the current time into separate minute and second numbers
    let [min, sec] = time.split(':').map(Number)


    // If seconds reach 59, increase the minute and reset seconds
    if(sec==59){
      min+=1
      sec = 0
    }else{
      sec+=1
    }


    // Convert the updated time back into a string
    time = `${min}:${sec}`


    // Display the updated time
    timeElement.innerText = time
  },1000)
})




// ! Keyboard Controls

addEventListener('keydown',(val)=>{

  // Move the snake upward
  if(val.key==='ArrowUp'){
    direction = 'up'

  // Move the snake downward
  }else if(val.key==='ArrowDown'){
    direction = 'down'

  // Move the snake to the left
  }else if(val.key==='ArrowLeft'){
    direction = 'left'

  // Move the snake to the right
  }else if(val.key==='ArrowRight'){
    direction = 'right'
  }
})
