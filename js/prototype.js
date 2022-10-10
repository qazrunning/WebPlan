/**
 * 通过继承的方式 牵引出原型和原型链。补充相关案例
 */

class Animal {
  constructor(props) {
    this.call = props.call;
  }
  /**
   * 我认识的动物都会发出属于他独特的声音
   */
  speak() {
    console.log(this.call);
  }
}
class Dogs extends Animal {
  /**
   * 狗的特性，例如跑
   */
  run() {
    console.log("狗会跑哦～");
  }
}
class Snakes extends Animal {
  /**
   * 蛇的特性，例如爬
   */
  climb() {
    console.log("蛇会爬哦～");
  }
}
const Dog = new Dogs({ call: "汪、汪、汪" });
const Snake = new Snakes({ call: "si、si、si" });
// Dog.speak();
// Snake.speak();


function Person(){}
const P = new Person()
// console.log(Person.prototype)
console.log(P.__proto__ === Person.prototype)