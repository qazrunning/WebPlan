
function remFunc(){
  let _w = document.documentElement.clientWidth
  console.log(_w)
  // 一般都是把屏幕分为10等份
  let font_size = _w / 10
  document.documentElement.style.fontSize = font_size + 'px'
}
// 初始化执行
remFunc()
// 监听屏幕发生改变
window.onresize = function(){
  remFunc()
}

/**
 * 第一步设置我们的html根节点
 * 第二步，vscode 下载cssrem
 * 第三部，配置cssrem的根节点 的字体大小 这样我们在写css时就可以 直接转换了
 */