
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