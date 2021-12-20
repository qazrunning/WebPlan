
// 科学计数法 nuber的10的几次幂
var number = 24.001
// 还需判断当前是整数还是小数,还有一个负数。取绝对值就好了。不会就自己想
function mi(number) {
    let mi_numer = 0 //几次幂
    let num_str = number.toString()
    let litle = ''
    let dian_len = num_str.indexOf(".")
    if(dian_len){
        litle = num_str.slice(0, 1) + '.' + num_str.slice(1,dian_len) + num_str.slice(dian_len + 1)
    }else{
        // 不是小数
        litle = num_str.slice(0, 1) + '.' + num_str.slice(1)
    }
    let _number = Number(litle)
    let res = 0
    let str = ""
   
    while(res !== number){
        res = _number * Math.pow(10, mi_numer);
        str = `${_number} * 10^${mi_numer}`
        mi_numer += 1
        
    }
    // for循环的方法
    // 你这个数大过10的999999 你后端的字段长度也存不进去。
    // for (mi_numer; mi_numer < 999999; mi_numer++) {
    //     res = _number * Math.pow(10, mi_numer);
    //     if (res === number) {
    //         str = `${_number} * 10${mi_numer}`
    //         break
    //     }
    // }
    return str
}
let ress = mi(number)