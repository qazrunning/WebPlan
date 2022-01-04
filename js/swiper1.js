let prev_btn = document.querySelector('.prev_btn')
let next_btn = document.querySelector('.next_btn')
let list = document.querySelector('.swiper_img_list')
let circles = document.querySelectorAll('.dot_item')
// 起始位
let index = 0
let _len = list.children.length - 1
// 设置函数节流锁
let lock = true
let sw = -860
// -(document.querySelector('#swiper').offsetWidth)

// 克隆复制第一张放到list的最后
let cloneImg = list.firstElementChild.cloneNode()
list.appendChild(cloneImg)
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
    // 同步执行
    setDot()
    lock = false
    setTimeout(()=>{
        lock = true
    },500)
}
function setDot(){
    for(let i = 0;i<circles.length;i++){
        circles[i].classList.remove('active')
        if(i === index){
            circles[i].classList.add('active')
        }
    }
}
// 处理点击事件的函数 
function handleClickDot(){
    let cur = Number(this.getAttribute('data-cur'))
    index = cur
    list.style.left = index * sw + 'px'
    list.style.transition = "all 0s ease";
    // 显示隐藏
    // for(let i = 0;i<list.children.length;i++){
    //     list.children[i].style.display = "none"
    //     if(i === cur){
        
    //         list.children[i].style.display = "block"
    //     }
    // }
}
for(let i = 0;i<circles.length;i++){
    circles[i].addEventListener('click',handleClickDot)
}

// 绑定事件
// prev_btn.addEventListener('click',rightToLeft)
// next_btn.addEventListener('click',leftToRight)

