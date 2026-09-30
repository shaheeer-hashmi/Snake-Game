const board = document.querySelector('.board');
const startButton = document.querySelector('.btn-start');
const modal = document.querySelector('.modal');
const startGameModal = document.querySelector('.start');
const gameOverModal = document.querySelector('.game-over');
const restartButton = document.querySelector('.btn-restart')
const blockWidth = 50;
const blockHeight = 50;

const cols = Math.floor(board.clientWidth / blockWidth)
const rows = Math.floor(board.clientHeight / blockHeight)
let snake = [{x: 3, y:13}]
let food = {x: Math.floor(Math.random() * rows), y:Math.floor(Math.random() * cols)}

let direction = 'down';
let intervalId = null;


let blocks = []

// Adding the Rows and Colums

for (let row= 0; row <rows; row++){
  for (let col = 0; col < cols; col++) {
  const box = document.createElement('div');
  box.classList.add('box');
  board.appendChild(box);
  box.innerText = `${row}-${col}`
  blocks[`${row}-${col}`] = box
  }
}

// Rendering the Snake & The Logic of The movement of the Snake

function renderSnake(){

  blocks[`${food.x}-${food.y}`].classList.add('food')
  let head = null
  if (direction === 'left'){
    head = {x:snake[0].x, y: snake[0].y-1}
  }else if(direction ==='right'){
    head = {x:snake[0].x, y: snake[0].y+1}
  }else if(direction ==='down'){
    head = {x:snake[0].x+1, y: snake[0].y}
  }else if(direction ==='up'){
    head = {x:snake[0].x-1, y: snake[0].y}
  }
  if(head.x<0 ||  head.x>=rows || head.y<0 || head.y>=cols){
    modal.style.display = 'flex'
    startGameModal.style.display = 'none';
    gameOverModal.style.display = 'flex';
    clearInterval(intervalId)
    return
  }
  if(head.x == food.x && head.y == food.y){
    blocks[`${food.x}-${food.y}`].classList.remove('food');
    food = {x: Math.floor(Math.random() * rows), y:Math.floor(Math.random() * cols)}
    blocks[`${food.x}-${food.y}`].classList.add('food')
    snake.unshift(head)
  }


  snake.forEach(segment =>{
    blocks[`${segment.x}-${segment.y}`].classList.remove('fill')
  })
  snake.unshift(head)
  snake.pop();
  snake.forEach(segment =>{
    blocks[`${segment.x}-${segment.y}`].classList.add('fill')
  })


  
}

// Function For Restarting The Game. 

restartGame = ()=>{
  blocks[`${food.x}-${food.y}`].classList.remove('food');
  snake.forEach(segment =>{
    blocks[`${segment.x}-${segment.y}`].classList.remove('fill')
  })

  modal.style.display = 'none'
  snake = [{x: 5, y:6}]
  food =  {x: Math.floor(Math.random() * rows), y:Math.floor(Math.random() * cols)}
  intervalId = setInterval(()=>{
    renderSnake()
  },300)
}



restartButton.addEventListener('click',restartGame)


startButton.addEventListener('click', ()=>{
  modal.style.display = 'none';
  intervalId = setInterval(()=>{
    renderSnake()
  },300)
})



addEventListener('keydown',(val)=>{
  if(val.key==='ArrowUp'){
    direction = 'up'
  }else if(val.key==='ArrowDown'){
    direction = 'down'
  }else if(val.key==='ArrowLeft'){
    direction = 'left'
  }else if(val.key==='ArrowRight'){
    direction = 'right'
  }
})

