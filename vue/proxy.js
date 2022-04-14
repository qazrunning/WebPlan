// 代理
/**
 * todo 做了数据劫持
 * 了解编程思想
 * !‘代理’:相当于经纪人和明星 数据劫持  这里相当于经纪人？
 * @param {*} vm 
 * @param {*} target 
 * @param {*} key 
 */
function proxyData(vm,target,key){
  // 定义对象中的属性 vm是我们的对象  key是vm的键值 
  // 当我们访问 vm[key] 的时候 也就是访问vm._data[key]
  Object.defineProperty(vm,key,{
    get(){
      // 当代码调用 vm[key] 时进行拦截，返回vm._data对应的key值
      return vm[target][key]
    },
    set(newVal){
      // 当我们设置vm[key]时 同样也给vm._data对应的key赋值
      vm[target][key] = newVal
    }
  })
}
export default proxyData