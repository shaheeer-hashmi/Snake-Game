const board = document.querySelector('.board');
const blockWidth = 30;
const blockHeight = 30;

const cols = Math.floor(board.clientWidth / blockWidth)
const rows = Math.floor(board.clientHeight / blockHeight)


for (let index = 0; index < rows*cols; index++) {
  const box = document.createElement('div');
  box.classList.add('box');
  board.appendChild(box);
}