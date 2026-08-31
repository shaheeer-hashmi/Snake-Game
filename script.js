const board = document.querySelector('.board');
const blockWidth = 50;
const blockHeight = 50;

const cols = Math.floor(board.clientWidth / blockWidth)
const rows = Math.floor(board.clientHeight / blockHeight)
const snake = [{x: 3, y:6},{x: 3, y:5},{x: 3, y:4},]
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
  blocks.forEach(segment =>{
    blocks[`${segment.x}-${segment.y}`].classList.add('fill')
  })
}