/**
 * init 函数库
 */
import proxyData from "./proxy";
import observe from './observe'
/**
 * 初始化状态 包括data computed watch
 * @param {*} vm
 */
function initState(vm) {
  let options = vm.$options;
  // 如果有data才执行
  if (options.data) {
    initData(vm);
  }
}
/**
 *
 * @param {*} vm
 */
function initData(vm) {
  //*要用一个临时的data来保存，不要直接修改原来的data
  let data = vm.$options.data;
  // 在vm上挂载临时的data 执行并绑定this
  data = vm._data = typeof data === "function" ? data.call(vm) : data || {};
  /**
   * *相当于下面这段 我需要判断data是不是一个函数，如果是就绑定上vm并且执行
   * *vm._data = (typeof data === "function" ? data.call(vm) : data || {});
   * *data = vm._data
   */
  // 添加代理 vm._data 可以让我们this.直接调用
  for(var key in data){
    proxyData(vm,'_data',key)
  }
  // 要对data进行观察，内部也要进行观察
  observe(vm._data)
}

export { initState };
