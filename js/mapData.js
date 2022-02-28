import {
  wwe
} from './data'
console.log(wwe)
// 假设pid > 20 才算有pid
const myMap = new Map()
wwe.data.forEach((item, index) => {
  let idHead = (item.id + '').substring(0, 2);
  if (!myMap.has(idHead)) {
    myMap.set(idHead, [item])
  } else {
    let newArr = myMap.get(idHead)
    if (item.pid > 15 && idHead == item.pid) {
      newArr.push(item)
    }
    myMap.set(idHead, newArr)
  }
});

function creatMaps(arr, pid, num = 3) {
  let newMaps = new Map()
  arr.forEach((item, index) => {
    let idHead = (item.id + '').substring(0, num);
    if (!newMaps.has(idHead)) {
      newMaps.set(idHead, [item])
    } else {
      let newArr = newMaps.get(idHead)
      newArr.push(item)
      newMaps.set(idHead, newArr)
    }
  })
  return newMaps
}

// 我的思路是和pid挂钩的
/**
 * 如果pid的和截取的相等，那么就输出
 * 我怎么知道有几层呢？
 * 我的截取找不到上级id时  就算停止？ 那停不下来啊 父级是一直存在的 
 * 那判断子类。child child为空就停止？
 * 所以后台的数据要 有结构 不能平铺
 * 
 * 平铺递归结束不了
 * 
 * 
 * 那就只能一路遍历下去。而且我不知道有几层。
 * 
 * 后端获取的数据肯定是平铺的。
 * 所以数据处理 肯定是后端做了。
 */