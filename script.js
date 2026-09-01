const board = document.querySelector('.board');
const blockWidth = 50;
const blockHeight = 50;

const cols = Math.floor(board.clientWidth / blockWidth)
const rows = Math.floor(board.clientHeight / blockHeight)
const snake = [{x: 3, y:13}]

let blocks = []



for (let row= 0; row <rows; row++){
  for (let col = 0; col < cols; col++) {
  const box = document.createElement('div');
  box.classList.add('box');
  board.appendChild(box);
  box.innerText = `${row}-${col}`
  blocks[`${row}-${col}`] = box
  }
}


function renderSnake(){
  snake.forEach(segment =>{
    blocks[`${segment.x}-${segment.y}`].classList.add('fill')
  })
}

let direction = 'right';
renderSnake();
setInterval(() => {

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
  snake.forEach(segment =>{
    blocks[`${segment.x}-${segment.y}`].classList.remove('fill')
  })

  if(head.x<0 ||  head.x>=rows || head.y<0 || head.y>=cols){
    alert("Game Over...")
  }
  snake.unshift(head)
  snake.pop();


  renderSnake()
}, 800);


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