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

