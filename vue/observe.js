/**
 * 负责观察数据
 */
// 观察程序 判断是否添加观察者
function observe(data){
  if(typeof data !== 'object' || data === null )return
  return new Observer(data)
}
// 观察者 ？
/**
 * {} defineProperty
 * [] 要写自己的方法
 * @param {*} data 
 */
function Observer(data){
  if(Array.isArray(data)){

  }else{
    this.walk(data)
  }
}
Observer.prototype.walk = function(data){
  // 获取key值和key-value值  因为我们需要具体的每个key-value
  console.log(data,888)
  // 为什么这里不直接便利对象？性能问题？
  var keys = Object.keys(data)
  for(var i = 0;i<keys.length;i++){
    var key = keys[i],
        value = data[key]
    // 这里我就知道了 他的key和value
    
    defineReactiveData(data,key,value)
  }
}
// reactive  处理响应式
function defineReactiveData(data,key,value){
  // console.log(data,key,value)
  // 因为value可能还是对象  递归点用
  observe(value)
  Object.defineProperty(data,key,{
    get(){
      // console.log('我被调用了～～',value)
      return value
    },
    set(newVal){
      // console.log('我被设置了～～～',newVal)
      if(newVal === value) return
      // 赋值 有可能还是对象
      observe(value)
      value = newVal
    }
  })
}
export default observe