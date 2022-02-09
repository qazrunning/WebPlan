
let arr = [
  {
    name:'动画',
    id:'342',
    num:'999+'
  },
  {
    name:'音乐',
    id:'342',
    num:'999+'
  },{
    name:'鬼畜',
    id:'342',
    num:'234'
  },{
    name:'舞蹈',
    id:'342',
    num:'110'
  },{
    name:'只是',
    id:'342',
    num:'978'
  },{
    name:'动画',
    id:'342',
    num:'999+'
  },{
    name:'动画',
    id:'342',
    num:'999+'
  },{
    name:'动画',
    id:'342',
    num:'999+'
  },{
    name:'动画',
    id:'342',
    num:'999+'
  },{
    name:'动画',
    id:'342',
    num:'999+'
  },{
    name:'动画',
    id:'342',
    num:'999+'
  },{
    name:'动画',
    id:'342',
    num:'999+'
  },{
    name:'动画',
    id:'342',
    num:'999+'
  },{
    name:'动画',
    id:'342',
    num:'999+'
  },{
    name:'动画',
    id:'342',
    num:'999+'
  },{
    name:'更多',
    id:'34222',
    num:'0'
  },
]
function createdLi(){
  let str = ``
  arr.forEach((item)=>{
    if(item.id === '34222'){
      str += `
    <li class="nav-main-center-li"><a href="#${item.id}">
            <div class="a-title">
              ${item.name}<span class="icon-jiantouxia iconfont"></span>
            </div>
            <div class="a-hover-box">
              dsssd
            </div>
          </a></li>
    `
    }else{
      str += `
    <li class="nav-main-center-li"><a href="#${item.id}">
            <div class="a-title">
              ${item.name}<span class="a-title-span">${item.num}</span>
            </div>
            <div class="a-hover-box">
              dsssd
            </div>
          </a></li>
    `
    }
    
  })
  document.querySelector('.nav-main-center-ul').innerHTML = str
}
createdLi()


// bili-live-tabs 类名的点击切换
/**
 * bili-live-switch我设为display:none;了，所以先默认显示第一个，b站是第三个。根据自己实际情况来
 */
let bili_live_tabs_index = 0
let bili_live_switch = document.querySelectorAll('.bili-live-switch')
bili_live_switch[0].style.display = 'block'
// 遍历添加点击事件
let bili_live_tabs_li = document.querySelectorAll('.bili-live-tabs-li')
bili_live_tabs_li.forEach((item)=>{
  item.onclick = (e)=>{
    if(bili_live_tabs_index == Number(e.target.getAttribute('data-tabs'))){
      //如果点击的是同一个 不执行后面的代码。
      return
    }
    // 保存 index
    bili_live_tabs_index = Number(e.target.getAttribute('data-tabs'))
    // 通过设置display属性显示隐藏响应的模块
    bili_live_switch.forEach(item =>{
      item.style.display = 'none'
    })
    bili_live_switch[bili_live_tabs_index].style.display = 'block'
    // 删除/添加 对应位置的active标签
    bili_live_tabs_li.forEach(item =>{
      item.classList.remove('active')
    })
    bili_live_tabs_li[bili_live_tabs_index].classList.add('active')
  }
})
