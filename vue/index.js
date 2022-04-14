/**
 * 数据劫持
 * 1.利用Object.defineProperty 完成数据劫持
 * 2.我们希望 在我们数据变化的过程中  做一些操作。 所以需要拦截
 */

import { initState } from './init'
function Vue(options){
  this._init(options)
}
// 初始化 数据
Vue.prototype._init = function(options){
  // 保存实例
  let vm = this
  // 挂载实例
  vm.$options = options
  // 挂载状态（数据） --只处理data
  initState(vm)
}

export default Vue