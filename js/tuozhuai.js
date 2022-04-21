function Rem(num) {
  let _baseSize = 37.5;
  return (num / _baseSize).toFixed(4) + "rem";
}
/**
 * 1.先渲染
 * 2.绑定事件
 */
let idioms = ["自由自在", "张灯结彩", "卧薪尝胆", "一夫当关"];
let question_main = document.querySelector(".question-main");
let answer_items = document.querySelectorAll(".answer-cell-item .item");
let areasArr = [];
let answerArr = [];
let answerList = []; //保存答案的数组
const answer_item_width = answer_items[0].offsetWidth;
const answer_itemheight = answer_items[0].offsetHeight;
let _qCellItem = null,
  startX = 0, //触摸的初始位置
  startY = 0, //触摸的初始位置
  cellX = 0, //元素外边距离屏幕左侧距离
  cellY = 0, //元素外边距离屏幕顶部距离
  mouseX = 0, //触摸点在元素的内部的相对位置
  mouseY = 0; //触摸点在元素的内部的相对位置

// 初始化函数
function init() {
  const _qArr = creatQArray(idioms);
  render(_qArr);
  _qCellItem = question_main.querySelectorAll(".question-cell-item .item");
  setAreas(answer_items, answerArr);
  setAreas(_qCellItem, areasArr);
  bindEvent();
}

// 生成数组
function creatQArray(arr) {
  let _arr = [];
  arr.forEach((item) => {
    _arr = _arr.concat(item.split(""));
  });
  return _arr.sort(sortArr);
}
function sortArr(a, b) {
  return Math.random() > 0.5 ? 1 : -1;
}

function render(arr) {
  let str = "";
  arr.forEach((item, index) => {
    str += tempHtml(item, index);
  });
  question_main.innerHTML = str;
}
function tempHtml(item, index) {
  return `
    <div class="question-cell-item" data-index="${index}">
        <div class="item" data-index="${index}">${item}</div>
      </div>
    `;
}
// 给生成的元素添加位置信息
function setAreas(domArr, arr) {
  let cellX = 0,
    cellY = 0,
    item = null;
  for (let i = 0; i < domArr.length; i++) {
    item = domArr[i];
    cellX = item.offsetLeft;
    cellY = item.offsetTop;
    arr.push({
      cellX,
      cellY,
    });
  }
}
//绑定事件
function bindEvent() {
  let _qItem = null;

  _qCellItem.forEach((item, index) => {
    item.addEventListener("touchstart", handleTouchStart, false);
    item.addEventListener("touchmove", handleTouchMove, false);
    item.addEventListener("touchend", handleTouchEnd, false);
  });
}
/**
 * 先动起来
 */
function handleTouchStart(e) {
  // console.log(this, "start");
  // 1.获取元素宽高并进行设置
  const itemWidth = this.offsetWidth,
    itemHeight = this.offsetHeight;
  this.style.width = Rem(itemWidth);
  this.style.height = Rem(itemHeight);
  // 2.获取元素信息
  cellX = this.offsetLeft;
  cellY = this.offsetTop;
  startX = e.touches[0].clientX; //只是为了算出mouseX 才获取的
  startY = e.touches[0].clientY; //只是为了算出mouseY 才获取的
  mouseX = startX - cellX;
  mouseY = startY - cellY;

  this.style.position = "fixed";
  setPosition(this, { cellX: cellX, cellY: cellY });
}
// 移动
function handleTouchMove(e) {
  e.preventDefault(); //阻止默认事件
  const moveX = e.touches[0].clientX,
    moveY = e.touches[0].clientY;
  cellX = moveX - mouseX;
  cellY = moveY - mouseY;

  setPosition(this, { cellX: cellX, cellY: cellY });
}
//吸附 回弹
function handleTouchEnd(e) {
  // 答案框吸附
  let answerItem = null;
  for (let i = 0; i < answerArr.length; i++) {
    answerItem = answerArr[i];
    if (answerList[i] !== undefined) {
      // 如果答案列表的该项为空，那么退出这次循环
      continue;
    }

    //分左右？
    if (
      (cellX > answerItem.cellX &&
        cellX < answerItem.cellX + answer_item_width / 2 &&
        cellY > answerItem.cellY &&
        cellY < answerItem.cellY + answer_itemheight / 2) ||
      (cellX + answer_item_width > answerItem.cellX + answer_item_width / 2 &&
        cellX + answer_item_width < answerItem.cellX + answer_item_width &&
        cellY > answerItem.cellY &&
        cellY < answerItem.cellY + answer_itemheight / 2)
    ) {
      setPosition(this, { cellX: answerItem.cellX, cellY: answerItem.cellY });
      return;
    }
  }

  const _index = this.dataset.index;
  cellX = areasArr[_index].cellX;
  cellY = areasArr[_index].cellY;
  setPosition(this, { cellX: cellX, cellY: cellY });
}

function setPosition(el, { cellX, cellY }) {
  el.style.left = Rem(cellX);
  el.style.top = Rem(cellY);
}

// 保存答案
init();
