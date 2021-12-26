let prev_btn = document.querySelector('.prev_btn')
let next_btn = document.querySelector('.next_btn')
let list = document.querySelector('.swiper_img_list')
// 克隆第一张图片 并且放到最后
let cloneImg = list.firstElementChild.cloneNode();
list.appendChild(cloneImg)
// 起始位
let index = 0
const _len = list.children.length - 1 //从o开始计数的 所以要减一
// 设置函数节流锁
let lock = true
const sw = -(document.querySelector('#swiper').offsetWidth);
// 从左往右移动
function leftToRight() {
    // 函数在执行，直接退出
    if (!lock) return
    index++
    // 要移动多少？
    list.style.left = index * sw + 'px'
    // 添加移动的类名
    list.style.transition = "all 0.5s ease";
    if (index === _len) {
        index = 0
        setTimeout(() => {
            list.style.left = 0;
            list.style.transition = "none";
        }, 500)
    }
    // contains
    // 同步小圆点
    setDot()
    // 关锁
    lock = true
    let lockTime = setTimeout(() => {
        lock = true
        clearTimeout(lockTime)
    }, 500)
}
// 给next绑定
next_btn.addEventListener('click', leftToRight)

// 从右往左移动
function rightToLeft() {
    // 函数在执行，直接退出
    if (!lock) return
    index--
    if (index === -1) {
        // 要移动多少？
        list.style.left = _len * sw + 'px'
        list.style.transition = "none";
        index = _len - 1
        setTimeout(() => {
            list.style.left = index * sw + 'px'
            list.style.transition = "all 0.5s ease";
        }, 0)
    } else {
        list.style.left = index * sw + 'px'
    }
    // contains
    // 同步小圆点
    setDot()
    // 关锁
    lock = false
    let lockTime = setTimeout(() => {
        lock = true
        clearTimeout(lockTime)
    }, 500)
}
prev_btn.addEventListener('click', rightToLeft)


// 创建dot
function creatDot(){
    let _html = ''
    for(let i = 0;i<_len;i++){
        
        _html += i == 0 ? `<li class="dot_item active" data-n="${i}"></li>` : `<li class="dot_item" data-n="${i}"></li>`
    }
    _html = `<ul class="dot_list">${_html}</ul>`
    document.querySelector('.swiper_main').insertAdjacentHTML('beforeend',_html)
}
creatDot()
const circles = document.querySelectorAll(".dot_item");
function setDot() {
    for (let i = 0; i < circles.length; i++) {
        if (i === index) {
            circles[i].classList.add("active");
        } else {
            circles[i].classList.remove("active");
        }
    }
}

// 自动轮播
let autoplay = setInterval(leftToRight, 2000);
const oWrap = document.getElementById("swiper");
// 移入停止轮播
oWrap.addEventListener("mouseenter", () => {
    clearInterval(autoplay);
});
// 移出继续轮播
oWrap.addEventListener("mouseleave", () => {
    // 设表先关
    clearInterval(autoplay);
    autoplay = setInterval(leftToRight, 2000);
});
