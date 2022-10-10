let str = 'sdfdsfsdfsdf'

let obj = str.split("").reduce((acc,cur)=>{
  if(acc[cur]){
    acc[cur] = acc[item]++
  }else{
    acc[cur] = 1
  }
  return acc
},{})
str.split("").map(item =>{
  if(obj[item]){
    obj[item] = obj[item]++
  }else{
    obj[item] = 1
  }
})

