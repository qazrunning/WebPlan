 /**
  * 6
张三 3 3 3000
李四 3 4 3000
王五 3 3 4000
赵六 4 3 3000
陆奇 4 4 4000
闫八 4 4 3980.99
  */
 function paiming(num,arr){
  let newArr = []
  arr.map((item)=>{
    let arrs = item.split(" ")
    let obj = {
      lev0:arrs[0],
      lev1:arrs[1],
      lev2:arrs[2],
      lev3:arrs[3]
    }
    newArr.push(obj)
  })
  let _arr = newArr.reduce((acc,cur,index)=>{
    if(index === 0){
      acc.push(cur)
    }
    return acc
  },[])
 }
 paiming(6,['张三 3 3 3000','李四 3 4 3000','王五 3 3 4000','赵六 4 3 3000','陆奇 4 4 4000','闫八 4 4 3980.99'])