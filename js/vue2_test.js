import Vue from '../vue/index.js'


const vm = new Vue({
  el:"#app",
  data(){
    return{
      list:'jajaj',
      ffs:true
    }
  }
})

console.log('vue的输出:',vm.list)
vm.list = '56466'