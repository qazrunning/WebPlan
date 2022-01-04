let list = document.querySelector('.swiper_img_list')
let circles = document.querySelectorAll('.dot_item')
// 起始位
let index = 0
// 设置函数节流锁
let sw = -860
// 处理点击事件的函数 
function handleClickDot() {
    let cur = Number(this.getAttribute('data-cur'))
    index = cur
    list.style.left = index * sw + 'px'
    list.style.transition = "all 0s ease";

    // 显示隐藏 display
    // for(let i = 0;i<list.children.length;i++){
    //     list.children[i].style.display = "none"
    //     if(i === cur){

    //         list.children[i].style.display = "block"
    //     }
    // }
}
for (let i = 0; i < circles.length; i++) {
    circles[i].addEventListener('click', handleClickDot)
}