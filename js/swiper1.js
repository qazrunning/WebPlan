let prev_btn = document.querySelector('.prev_btn')
let next_btn = document.querySelector('.next_btn')
let list = document.querySelector('.swiper_img_list')

// 克隆复制第一张放到list的最后
let cloneImg = list.firstElementChild.cloneNode()
list.appendChild(cloneImg)

// 起始位
let index = 0
let _len = list.children.length - 1
// 设置函数节流锁
let lock = true
let sw = -(document.querySelector('#swiper').offsetWidth)
// 从左往右 下一张
function leftToRight(){
    if(!lock){return}
    lock = false
    index++
    // 1230px
    list.style.left = index * sw + 'px'
    list.style.transition = "all 0.5s ease";
    if(index === _len){
        index = 0
        setTimeout(()=>{
            list.style.left = 0 
            list.style.transition = "none"
        },500)
    }
    setDot()
    
    setTimeout(()=>{
        lock = true
    },500)
    
}
// 给dom元素绑定事件，以及对应的方法
next_btn.addEventListener('click',leftToRight)
// 从右往左 上一张
function rightToLeft(){
    if(!lock) return
    index--
    
    if(index === -1){
        // 替换成我们克隆的最后一张
        list.style.left = _len * sw + 'px'
        list.style.transition = "none";
        index = _len - 1
        setTimeout(()=>{
            list.style.left = index * sw + 'px'
            list.style.transition = "all 0.5s ease";
        },0)
    }else{
        list.style.left = index * sw + 'px'
        list.style.transition = "all 0.5s ease";
    }
    setDot()
    lock = false
    setTimeout(()=>{
        lock = true
    },500)
}
prev_btn.addEventListener('click',rightToLeft)

let circles = document.querySelectorAll('.dot_item')
function setDot(){
    for(let i = 0;i<circles.length;i++){
        if(i === index){
            circles[i].classList.add('active')
        }else{
            circles[i].classList.remove('active')
        }
    }
}