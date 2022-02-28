// 使用 Mock

import Mock from 'mockjs'
// Mock.Random.cword(3 | 4)
let baseConfig = {
  data: null,
  status: 200,
  msg: "请求成功"
}
const dataNav = Mock.mock([{
    name: '首页',
    "id|1000-9999": 1000
  },
  {
    name: '物流服务',
    "id|1000-9999": 1000,
    "children|0-10": [{
      "name|": '@cword(3,5)',
      "id|10000-99999": 10000,
      "children|0-10": [{
        "name|": '@cword(4,5)',
        "id|100000-999999": 100000,

      }]
    }]
  },
  {
    name: '智慧科技',
    "id|1000-9999": 1000
  },
  {
    name: '服务支持',
    "id|1000-9999": 1000,
    "children|0-10": [{
      "name|": '@cword(3,5)',
      "id|10000-99999": 10000,
      "children|0-10": [{
        "name|": '@cword(4,5)',
        "id|100000-999999": 100000,

      }]
    }]
  },
  {
    name: '可持续发展',
    "id|1000-9999": 1000,
    "children|0-10": [{
      "name|": '@cword(3,5)',
      "id|10000-99999": 10000
    }]
  },
  {
    name: '投资者关系',
    "id|1000-9999": 1000,
    "children|0-10": [{
      "name|": '@cword(3,5)',
      "id|10000-99999": 10000
    }]
  },
  {
    name: '关于我们',
    "id|1000-9999": 1000,
    "children|0-10": [{
      "name|": '@cword(3,5)',
      "id|10000-99999": 10000
    }]
  },
])
const fuwuList = Mock.mock([{
    name: '快递服务',
    'list|2': [{
      'id|1000-9999': 1000,
      imgUrl: Mock.Random.image('600x214', 'Hello Mock.js!'),
      'title': '@ctitle(4,6)',
      'content': '@cparagraph(1, 3)'
    }]
  },
  {
    name: '快运服务',
    'list|2': [{
      'id|1000-9999': 1000,
      imgUrl: Mock.Random.dataImage('600x214', 'Hello Mock.js!'),
      'title': '@ctitle(4,6)',
      'content': '@cparagraph(1, 3)'
    }]
  },
  {
    name: '冷运服务',
    'list|2': [{
      'id|1000-9999': 1000,
      imgUrl: Mock.Random.dataImage('600x214', 'Hello Mock.js!'),
      'title': '@ctitle(4,6)',
      'content': '@cparagraph(1, 3)'
    }]
  },
  {
    name: '医药服务',
    'list|2': [{
      'id|1000-9999': 1000,
      imgUrl: Mock.Random.dataImage('600x214', 'Hello Mock.js!'),
      'title': '@ctitle(4,6)',
      'content': '@cparagraph(1, 3)'
    }]
  },
  {
    name: '国际服务',
    'list|2': [{
      'id|1000-9999': 1000,
      imgUrl: Mock.Random.dataImage('600x214', 'Hello Mock.js!'),
      'title': '@ctitle(4,6)',
      'content': '@cparagraph(1, 3)'
    }]
  }
])

//mock练习
const Random = Mock.Random
/**
 * 目前mock自己提供的常用的就这些
 * id : Random.id()/'@id'/'@id()' ==>18位的身份证号 我们也可以用来做我们的唯一id
 * guid : Random.guid()/'@guid'/'@guid()'  ==>很多位的guid 也是唯一标识
 * boolean : Random.boolean()/'@boolean'/'@boolean()'
 * natural : 自然数
 * integer : 随机整数 包含负数
 * string : 随机字符串（英文+ 字符）  默认取3-7个
 * range : Random.range()/'@range'/'@range(min,max,step)' ==>返回一个数组。
 * date : Random.date()/'@date'/'@date(yyyy-MM-dd HH:mm:ss)'  ==>返回时间
 * datetime : Random.datetime()  =>默认返回yyyy-MM-dd HH:mm:ss格式的时间
 * now : Random.now()  ==>返回当前时间
 * image Random.image()/'@image'/'@image(size)'
 * dataImage Random.dataImage(size?,text?)
 * color : Random.color()/'@color'/'@color()'
 * rgba/rgb : 同color a是有透明度的
 * paragraph : Random.paragraph()/'@paragraph'/'@paragraph(min,max)'  随机生成一段英文文本  默认3-7个句子
 * cparagraph : Random.cparagraph()/'@cparagraph'/'@cparagraph(min,max)' 随机生成一段中文文本  默认3-7个句子
 * csentence : Random.csentence()/'@csentence'/'@csentence(min,max)'/'@csentence(len)' 随机生成一段中文文本 可填文本长度
 * ctitle : Random.ctitle()/'@ctitle'/'@ctitle(min,max)' 生成中文标题 意义不大 其他生成中文的方式可以替代
 * first : Random.first()/'@first'/'@first()'  随机英文名
 * last : 同上  随机英文姓
 * cfirst : 中文姓
 * clast : 中文名
 * cname : 中文姓名
 */
const mockTest = Mock.mock({
  id1: Random.id(),
  id2: '@id',
  id3: '@id()',
  guid: Random.guid(),
  boolean: '@boolean(1,9,false)', //=> 有(1/1+9)的概率出现false ，即max越大 出现true的概率越大
  natural: '@natural(100,900)', //取一个100-900之间的自然数
  string: '@string(20,30)',
  range: '@range(1,100,10)', //返回1-100之间 从1开始间隔为10的所有数字的 数组
  date: '@date(T)', //时间戳
  image: Random.image('600x400', Random.color(), Random.color(), Random.string(3, 5)), //生成一张 600x400大小，背景颜色随机，文字颜色随机，文字随机的图片
  paragraph: '@paragraph(4,10)',
  cparagraph: Random.cparagraph(),
  csentence: '@csentence(2,5)',
  ctitle: '@ctitle',
  first: '@first',
  cname: '@cname',
  cfirst: '@cfirst',
  clast: "@clast"
})


// Mock 还有一个拓展功能  可以让我们根据自己的需求 添加上对应的拓展 例如手机号
Random.extend({
  // 手机号码
  phone: function () {
    let phonePrePool = `1${Random.cword('348',1)}${Mock.mock(/\d{9}/)}`
    return Number(phonePrePool)
  },
  qqemail: function () {
    return `${Mock.mock(/\d{8,10}/)}@qq.com`
  },
})
let t = Random.qqemail()
// 输出结果


export const wwe = Mock.mock({
  "data|10-30": [{
    "id|1000-3099": 1000,
    "pid|10-30": 10,
    name:'@cname',
    nums:'@natural(0,1500)',
    imgssa:'@image'
  }]
})