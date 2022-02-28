# TS

TS是JS的超集，是一门强类型语言。



```
npm view typescript version //查看ts版本 需要全局安装，或者项目局部安装
tsc xx.ts 编译ts
```

### 枚举

​	enum类型是对js标准数据类型的一个补充，使枚举类型可以为一组数值赋予友好的名字？

​	如果你需要一组固定不变的对象，那么请声明为枚举类型，应该挺重要的。可以用来存储一些值

```
/**
 * 如果你需要一组固定不变的对象，那么请声明为枚举类型
 * 可以方向取值，通过值取下标
 */
enum sex {'那','jkk'}
enum sexs {'那' = 4,'jkk' = 7}
console.log(sex[0],sex[1],sex['那'])
console.log(sex['那']) //4
```



## tsconfig.json

1. tsc -w   -->热更新需要结合json

```
{
  "compilerOptions": {
    	"declaration": false, // 为子项目生成.d.ts声明文件
      // 出口
    	"outDir": "./js",
  },
  // 入口
  "include": ["./ts/*.ts"],
}
```

## class

​	private私有的

```
补充一个案列的class 带继承
```

### 装饰器

​	视频讲得不太清晰，需要再去别的网站找一找。

*装饰器*是一种特殊类型的声明，它能够被附加到[类声明](https://www.tslang.cn/docs/handbook/decorators.html#class-decorators)，[方法](https://www.tslang.cn/docs/handbook/decorators.html#method-decorators)， [访问符](https://www.tslang.cn/docs/handbook/decorators.html#accessor-decorators)，[属性](https://www.tslang.cn/docs/handbook/decorators.html#property-decorators)或[参数](https://www.tslang.cn/docs/handbook/decorators.html#parameter-decorators)上。 装饰器使用 `@expression`这种形式，`expression`求值后必须为一个函数，它会在运行时被调用，被装饰的声明信息做为参数传入。

​	需要到config去配置

```
"target": "ES5",
"experimentalDecorators": true,
```



```
{
  "compilerOptions": {
    	"declaration": false, // 为子项目生成.d.ts声明文件
      // 出口
    	"outDir": "./js",
      "target": "ES5",
      "experimentalDecorators": true,
  },
  // 入口
  "include": ["./ts/*.ts"],
}
```

​	**根据我目前的了解，装饰器是增加类用的。因为某些原因我们不可以去具体的类里再去添加新的属性和方法。所以需要装饰器来增加我们需要的属性和方法**

​	装饰器是属于什么装饰器，就是什么装饰器。在类前使用就是类装饰器，在方法前使用就是方法装饰器。

​	方法装饰器的target特点

```
普通方法target对应的是累的prototype,静态方法里target对应的是类的构造函数

function zhuangshi(target:any,name:string){
	let old = target[name]
	...
	target[name] = function(){
		old()
	}
}

@zhuangshi
class Po(){}

class PPP(){
	@zhuangshi 
	get(){}
	
	@zhuangshi 
	static set(){}
}
```

