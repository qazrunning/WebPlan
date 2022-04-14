/**
 * 响应式原理
 * define Property ->定义属性
 * Property 特征
 */
/**
 * Object.defineProperty(obj,prop,descriptor)
 * obj ->要定义的对象
 * prop ->要定义对象的key值
 * descriptor 要定义的属性的描述
 * * 默认不可修改、不可枚举、不可删除
 *
 * *able 单词后接able
 *
 * ! proxy是代理，和defineProperty直接定义属性是不一样的概念
 */
let oss = {};
Object.defineProperty(oss, "a", {
  // todo value/writable 不能同时和get()/set()设置 会报错因为他们作用时候可以相互替代的（互斥） 这是规定！反正你也改不了
  // value: "1", //定义值 默认时undefined
  // writable:true,//默认false 不可修改（不可写）
  // todo 纯描述符
  // enumerable:true,//默认false 是否可以枚举
  // configurable:true,//是否能够被改变，包含删除。 默认false
  get() {
    return "sss";
  },
  set(newVal) {
    console.log(newVal);
  },
});
/**
 * 每当定义属性的时候，getter 和setter 都是存在的
 * getter 获取的时候，额外做什么操作
 * setter 设置属性的时候，额外做什么操作
 */
// console.log(oss);

// 定义多个  这个不做讨论
function more() {
  let _obj = {};
  // 默认不可修改、不可枚举、不可删除
  Object.defineProperties(_obj, {
    as: {
      value: "55",
    },
    er: {
      value: "2131313",
    },
  });
  return _obj;
}

/**
 * 这两个不一样的
 * 订阅模式
 * 观察者模式
 */

/**
 * 节点_虚拟dom是 最难的
 */
/**
 * defineProperty定义数组
 */

/**
 * proxy 可以用在数组上
 * Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。
 * ? 有什么用
 * *自定义对象属性的获取、赋值、枚举、函数调用等功能
 */
let target = {
  da: "445",
  www: "sdafda",
};
let objs = new Proxy(target, {
  get(target, prop) {
    console.log(target[prop], 999);
    return target[prop];
  },
  set(target, prop, newVal) {
    console.log(target, prop, newVal, 666);
    target[prop] = newVal;
    return true //一定要返回一个布尔值 true表示成功 false有错 默认是false
  },
});

// console.log(objs.da);
// objs.www = "sdfqqqqq";
/**
 * new Proxy(target,handler)
 * target 目标对象
 * handler 容器，可以处理对象属性的方法
 * 
 * 
 */
/**
 * 直接操作对象的14种方法
 * JS 很多命令都是 关键字 不是方法式
 * 函数式 更好用
 */
var _sobj = {a:1,b:2}
// getPrototypeOf 无性能上的问题
// 1.获取原型
var proto = Object.getPrototypeOf(_sobj)

// 2.设置原型的属性（prototype）
// 相当于 _sobj.prototype = {c:3}
Object.setPrototypeOf(_sobj,{c:3})
// 3.获取对象的可扩展性 
let extens = Object.isExtensible(_sobj)

// Object.freeze(_sobj) 冻结对象  不可修改、不可写、可读
// Object.seal(_sobj) 封闭对象 不可修改（包好不可删除）但是可写

// 4.获取对象的自有属性 
// console.log(Object.getOwnPropertyNames(_sobj))

// 5.禁止扩展对象
// Object.preventExtensions(_sobj)

// 6.拦截对象操作
// Object.defineProperty(_sobj,"c",{...})

// 7.判断是否是自身属性 [[HasProperty]]
// console.log(_sobj.hasOwnProperty(''))

// 8.[[GET]]
// console.log('a' in obj)
// obj.a

// 9.[[SET]] 设置
// obj.a = 3
// obj['c'] = 2

// 10.[[Delete]]
// delete obj.a

// 11.[[Enumerate]]  枚举
// for(var k in obj){...}

// 12.获取键集合 [[OwnPropertyKeys]]
// console.log(Object.keys(obj))

// ? 13.[[Function]] 函数调用、方法调用  因为函数也是一个对象嘛

// 14.new 实例化对象

/**
 * 重写proxy
 * 
 *
 */
function MyProxy(target,handler){

  // 1.深拷贝数据
  // 2.Object.defineProperty重写

}
// todo Reflect 反射 内置对象 方法集合的容器 
