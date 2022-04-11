console.log('script start',1)

async function async1() {
    await async2()
    //等一个promise执行完之后才会执行 后面的代码
    console.log('async1 end',8) //又有一个微任务 微任务 - 4
}
async function async2() {
    console.log('async2 end',2)
    return Promise.resolve().then(()=>{
        console.log('async2 end1',5) //微任务-1 
    })
}
async1()

//宏任务 - 1
setTimeout(function() {
    console.log('setTimeout',9)
}, 0)

new Promise(resolve => {
    console.log('Promise',3)
    resolve()
})
.then(function() {
    console.log('promise1',6) //微任务 - 2
})
.then(function() {
    console.log('promise2',7) //微任务 - 3
})

console.log('script end',4)

let arr = [1,2,3,4,5,6,7]
const ss = arr.reduce((acc,item,index)=>{
  //acc就是我们的上一个状态
  acc = acc + item

  return acc
},0)
console.log(ss)
