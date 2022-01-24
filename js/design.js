console.log(888)
// 观察者模式
let a = [2,3,4,{a:'x'}]
let b = [...a]
a[0] = 5
a[3] = {a:'xx'}
// b不会改变，b的指向没有改变？
console.log(a,b)


// 定义变量的方式，规则
// 答：只能以字母下划线开头
// 有var，let，const三种方式定义变量
var arr = []
let _str = 'sdfs'
const obj = {}
// 5.for循环，for循环数组，for循环对象 输出对应每个元素。
let arr1 = [1,2,34,45,0]
for(let i = 0;i<arr1.length;i++){
  console.log(arr1[i])
}
let obj1 = {
  a:'456',
  name:'sdsfds',
  age:78
}
for(let key in obj1){
  console.log(obj1[key])
}