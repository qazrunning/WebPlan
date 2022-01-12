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
const fuwuList = Mock.mock([
  
])
// 输出结果
console.log(dataNav)