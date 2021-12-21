//画流程图
//画所有的图形：画图和画对应的箭头
function drawFlowChart(context,canvas,flowdata,initTop, initSpaceH,colorStyle){
    // init()
    this.bgColor = colorStyle.bgColor
    Step.prototype.bgColor = colorStyle.bgColor
    this.fontColor = colorStyle.fontColor
    Step.prototype.fontColor = colorStyle.fontColor
    //1、判断是否有需要平均计算x的数据
    flowdata.forEach(function(row){
      if(row.isAverage){
        row.data = calChartX(canvas.width,row.data, row.y);
      }
    });
    //2、先要画完所有的图形
    flowdata.forEach(function(row,rowIndex){
      row.y = row.y ? row.y : ( rowIndex==0 ? initTop + initSpaceH : initTop + initSpaceH*rowIndex);
      row = drawRowChart(context, row);  //画图形
    });
    //3、添加要指向的对象，必须要在画完所有图形之后
    flowdata.forEach(function(row){
      row.data.forEach(function(item){
        if(item.arrowArr && item.arrowArr.length){
          item.arrowArr.forEach(function(mItem){
            mItem = addToObj(mItem,flowdata);
          })
        }
      })
    });
    //4、给所有图形画上对应的画箭头，必须要在前两步完成之后
    flowdata.forEach(function(row,rowIndex){
      row.data.forEach(function(item){
        if(item.arrowArr && item.arrowArr.length){
          drawSingleArrow(context,item);//画箭头
        }
      })
    });
    //5、给所有元素添加点击和悬浮事件
    addMethod(canvas,flowdata)
  }
  //当一行有n个图形并且需要平均排列时用此方法计算每个图形的x
  function calChartX(canvasW,data, dataY){
    var startW = 80;
    var stepW = 120;
    var CondW = 30;
    var count = 0;
    for(var i=0;i<data.length;i++){
      if(data[i].type == 'Step'){
        count += stepW;
      }else if(data[i].type == 'Start' || data[i].type == 'End'){
        count += startW;
      }else if(data[i].type == 'Condition'){
        count += CondW;
      }
    }
    //spaceW 计算一行中每个图形的平均间距
    var spaceW = parseInt((canvasW - count)/(data.length+1));
    //计算坐标x
    var prevDiv = [], curW = 0;
    for(var i=0;i<data.length;i++){
      if(data[i].type == 'Step'){
        prevDiv.push(stepW);
        curW = stepW/2;
      }else if(data[i].type == 'Start' || data[i].type == 'End'){
        prevDiv.push(startW);
        curW = startW/2;
      }else if(data[i].type == 'Condition'){
        prevDiv.push(CondW);
        curW = CondW/2;
      }
      var preLength = 0;
      for(var j=0;j<i;j++){
        preLength += prevDiv[j];
      }
      var x = spaceW*(i+1)+preLength+curW;
      var y = data[i].y;
      data[i]['x'] = x;
      data[i]['y'] = y ? y : dataY;
    }
    return data;
  }
  //生成每列对应的图形
  function drawRowChart(context, row){
    row.data.forEach(function(item,index){
      var s = null;
      item.y =  item.y ? item.y : row.y;
      if(item.type == 'Step'){
        s = new Step(context,item.x,item.y,item);
      }else if(item.type == 'Condition'){
        s = new Condition(context,item.x,item.y,item);
      }else if(item.type == 'End'){
        s = new End(context,item.x,item.y,item);
      }else if(item.type == 'Start'){
        s = new Start(context,item.x,item.y,item);
      }
      item.chartObj = s;
    })
    return row;
  }
  //绘制单个的图形
  function drawSingleChart(context,item){
    var s = '';
    if(item.type == 'Step'){
      s = new Step(context,item.x,item.y,item);
    }else if(item.type == 'Condition'){
      s = new Condition(context,item.x,item.y,item);
    }else if(item.type == 'End'){
      s = new End(context,item.x,item.y,item);
    }else if(item.type == 'Start'){
      s = new Start(context,item.x,item.y,item);
    }
    item.chartObj = s;
    return item;
  }
  //每个对象的坐标范围
  function calRange(obj){
    var newObj = {
      minX:obj.x-obj.w/2,
      maxX:obj.x+obj.w/2,
      minY:obj.y-obj.h/2,
      maxY:obj.y+obj.h/2
    }
    return newObj;
  }
  //处理每一个箭头需要指向的对象
  function addToObj(arrObj,flowData){
    flowData.forEach(function(rows){
      rows.data.forEach(function(item){
        if(item.name == arrObj.to){
          arrObj.to = item.chartObj;
        }
      })
  
    })
    return arrObj;
  }
  //话每个图形的箭头指向
  function drawSingleArrow(context,data){
    var step1 = data.chartObj;
    if(data.arrowArr && data.arrowArr.length){
      data.arrowArr.forEach(function(item){
        step1[item.arrow](item.to,context);
      })
    }
  }
  //清除单个图形
  function repaintSingleChart(context,item){
    var range  = item.chartObj.range;
    //清除之前画的图形
    context.clearRect(range.minX-1,range.minY-1,item.chartObj.w+2,item.chartObj.h+3);
  
  }
  //给所有图形添加事件
  function addMethod(canvas,flowData){
    //给所有图形添加点击事件
    canvas.onclick=function(ev){
      var ev = ev || window.event;
      var ua = navigator.userAgent.toLowerCase();
      var isIE = ua.indexOf("compatible") > -1 && ua.indexOf("msie") > -1 && !ua.indexOf("opera") > -1; //IE浏览器
      var isEdge= ua.indexOf("Edge") > -1;
      var isIE11 = ua.toLowerCase().match(/rv:([\d.]+)\) like gecko/);
      var curx = (isIE || isEdge || isIE11) ? ev.offsetX : ev.layerX;
      var cury = (isIE || isEdge || isIE11)  ? ev.offsetY : ev.layerY;
      flowData.forEach(function(row,listIndex){
        row.data.forEach(function(item){
          var range  = item.chartObj.range;
          if(curx>=range.minX && curx<=range.maxX && cury>=range.minY && cury<=range.maxY){
            var clickMethod = null;
            if(row.method && row.method.onclick){ //如果每行定义了事件
              //判断每个元素是否有单独定义事件，如果有，取改元素定义的事件，如果没有取每行定义的事件
              if(item.method && item.method.onclick){
                clickMethod = item.method.onclick
              }else{
                clickMethod = row.method.onclick
              }
            }else{
              if(item.method && item.method.onclick){
                clickMethod = item.method.onclick
              }else{
                clickMethod = null;
              }
            }
            if(clickMethod instanceof Function){
              clickMethod(item);
            }
          }
        })
      });
    };
    var timer = null;
    //给所有图形添加mousemove事件
    canvas.onmousemove=function(ev){
      var ev = ev || window.event;
      var ua = navigator.userAgent.toLowerCase();
      var isIE = ua.indexOf("compatible") > -1 && ua.indexOf("msie") > -1 && !ua.indexOf("opera") > -1; //IE浏览器
      var isEdge= ua.indexOf("Edge") > -1;
      var isIE11 = ua.toLowerCase().match(/rv:([\d.]+)\) like gecko/);
      var curx = (isIE || isEdge || isIE11) ? ev.offsetX : ev.layerX;
      var cury = (isIE || isEdge || isIE11)  ? ev.offsetY : ev.layerY;
      clearTimeout(timer);
      flowData.forEach(function(row,listIndex){
        row.data.forEach(function(item){
          var range  = item.chartObj.range;
          if(curx>=range.minX && curx<=range.maxX && cury>=range.minY && cury<=range.maxY){
            var clickMethod = null;
            if(row.method && row.method.onmousemove){ //如果每行定义了事件
              //判断每个元素是否有单独定义事件，如果有，取改元素定义的事件，如果没有取每行定义的事件
              if(item.method && item.method.onmousemove){
                clickMethod = item.method.onmousemove
              }else{
                clickMethod = row.method.onmousemove
              }
            }else{
              if(item.method && item.method.onmousemove){
                clickMethod = item.method.onmousemove
              }else{
                clickMethod = null;
              }
            }
            if(clickMethod instanceof Function){
              timer = setTimeout(function(){
                clickMethod(item);
              },1000)
            }
          }
        })
      });
    }
    //给所有图形添加mouseleave事件
    canvas.onmouseleave=function(ev){
      var ev = ev || window.event;
      var ua = navigator.userAgent.toLowerCase();
      var isIE = ua.indexOf("compatible") > -1 && ua.indexOf("msie") > -1 && !ua.indexOf("opera") > -1; //IE浏览器
      var isEdge= ua.indexOf("Edge") > -1;
      var isIE11 = ua.toLowerCase().match(/rv:([\d.]+)\) like gecko/);
      var curx = (isIE || isEdge || isIE11) ? ev.offsetX : ev.layerX;
      var cury = (isIE || isEdge || isIE11)  ? ev.offsetY : ev.layerY;
      clearTimeout(timer);
      flowData.forEach(function(row){
        row.data.forEach(function(item){
          var range  = item.chartObj.range;
          if(curx>=range.minX && curx<=range.maxX && cury>=range.minY && cury<=range.maxY){
            var clickMethod = null;
            if(row.method && row.method.onmouseleave){ //如果每行定义了事件
              //判断每个元素是否有单独定义事件，如果有，取改元素定义的事件，如果没有取每行定义的事件
              if(item.method && item.method.onmouseleave){
                clickMethod = item.method.onmouseleave
              }else{
                clickMethod = row.method.onmouseleave
              }
            }else{
              if(item.method && item.method.onmouseleave){
                clickMethod = item.method.onmouseleave
              }else{
                clickMethod = null;
              }
            }
            if(clickMethod instanceof Function){
              clickMethod(item);
            }
          }
        })
      });
    }
  }
  
  /////////////////////////////////////////基本画图形start////////////////////////////////////////////////////////
  //画圆角矩形
  function drawRoundRect(context, x, y, w, h, item, radius) {
    radius = radius || 20;
    context.beginPath();
    context.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 3 / 2);
    context.lineTo(w - radius + x, y);
    context.arc(w - radius + x, radius + y, radius, Math.PI * 3 / 2, Math.PI * 2);
    context.lineTo(w + x, h + y - radius);
    context.arc(w - radius + x, h - radius + y, radius, 0, Math.PI * 1 / 2);
    context.lineTo(radius + x, h +y);
    context.arc(radius + x, h - radius + y, radius, Math.PI * 1 / 2, Math.PI);
    context.closePath();
    context.fillStyle = item.color ? (item.color.bgColor ? item.color.bgColor: 'rgba(91,155,213,1)'):this.bgColor ; //背景颜色
    context.fill();
    context.strokeStyle= item.color ? (item.color.borderColor ? item.color.borderColor: '#5B9BD5'):'#5B9BD5' ; //边框颜色
    context.font = 'normal 14px 微软雅黑';
    context.fillStyle = item.color ? (item.color.fontColor ? item.color.fontColor: '#5B9BD5'):this.fontColor; //文字颜色
    context.textAlign="center";
    context.fillText(item.text, x+w/2, y+h/2+6);
    context.stroke();
  }
  //画菱形
  function drawRhombus(context,x, y, l, h, item) {
    context.beginPath();
    context.moveTo(x, y + h);
    context.lineTo(x - l * 2-40, y);
    context.lineTo(x, y - h);
    context.lineTo(x + l * 2+40, y);
    context.closePath();
    context.strokeStyle= item.color ? (item.color.borderColor ? item.color.borderColor: '#5B9BD5'):'#5B9BD5' ; //边框颜色
    context.fillStyle = item.color ? (item.color.bgColor ? item.color.bgColor: 'rgba(91,155,213,0.5)'):this.bgColor ; //背景颜色
    context.fill();
    context.fillStyle = item.color ? (item.color.fontColor ? item.color.fontColor: '#5B9BD5'):this.fontColor ; //文字颜色
    context.font = 'normal 14px 微软雅黑';
    context.fillText(item.text, x, y+3);
    context.stroke();
  }
  //计算文本的宽高
  function textSize(fontSize,fontFamily,text){
    var span = document.createElement("span");
    var result = {};
    result.width = span.offsetWidth;
    result.height = span.offsetHeight;
    span.style.visibility = "hidden";
    span.style.fontSize = fontSize;
    span.style.fontFamily = fontFamily;
    span.style.display = "inline-block";
    document.body.appendChild(span);
    if(typeof span.textContent != "undefined"){
      span.textContent = text;
    }else{
      span.innerText = text;
    }
    result.width = parseFloat(window.getComputedStyle(span).width) - result.width;
    result.height = parseFloat(window.getComputedStyle(span).height) - result.height;
    return result;
  }
  //Start 圆角矩形对象
  function Start(context,x, y, item, h, w) {
    this.flag = 'start';
    var textStyle = textSize('14px','微软雅黑',item.text);
    w = parseInt(textStyle.width)+30;
    this.h = h || 40;
    this.w = w || 2 * this.h;
    this.x = x;
    this.y = y;
    this.text = item.text;
    this.range = calRange(this);
    drawRoundRect(context,x - this.w / 2, y - this.h / 2, this.w, this.h, item);
  }
  //End 圆角矩形对象
  function End(context, x, y, item, h, w) {
    this.flag = 'end';
    var textStyle = textSize('14px','微软雅黑',item.text);
    w = parseInt(textStyle.width)+30;
    this.h = h || 40;
    this.w = w || 2 * this.h;
    this.x = x;
    this.y = y;
    this.text = item.text;
    this.range = calRange(this);
    drawRoundRect(context, x - this.w / 2, y - this.h / 2, this.w, this.h, item, 20);
  }
  //Step 矩形对象
  function Step(context,x, y, item) {
    this.flag = "step";
    var textStyle = textSize('14px','微软雅黑',item.text);
    var w = parseInt(textStyle.width)+30;
    this.h = 40;
    this.w = w;
    this.x = x;
    this.y = y;
    this.text = item.text;
    this.range = calRange(this);
    context.strokeStyle= item.color ? (item.color.borderColor ? item.color.borderColor: '#5B9BD5'):'#5B9BD5' ; //边框颜色
    context.strokeRect(x - this.w / 2, y - this.h / 2, this.w, this.h);
    context.fillStyle = item.color ? (item.color.bgColor ? item.color.bgColor: 'rgba(91,155,213,0.5)'): this.bgColor ; //背景颜色
    context.fillRect(x - this.w / 2, y - this.h / 2,this.w,this.h);
    context.fillStyle = item.color ? (item.color.fontColor ? item.color.fontColor: '#5B9BD5'):this.fontColor ; //文字颜色
    context.textAlign = 'center';
    context.font = 'normal 14px 微软雅黑';
    if(item.text){context.fillText(item.text,x, y+4);}
  }
  //Condition 菱形对象
  function Condition(context, x, y, item) {
    this.flag = "condition";
    var textStyle = textSize('14px','微软雅黑',item.text);
    var w = parseInt(textStyle.width)/4;
    this.l = w;
    this.h = 40;
    this.w = w;
    this.x = x;
    this.y = y;
    this.text = item.text;
    this.range = calRange(this);
    drawRhombus(context,x, y, this.l,this.h, item);
  }
  
  /////////////////////////////////////////基本画图形end////////////////////////////////////////////////////////
  
  
  
  ////////////////////////////////////////////画箭头/////////////////////////////////////////////////////////////
  //箭头从start圆角矩形bottom——>top
  Start.prototype.drawBottomToTop = function(obj,context) {
    if(obj.flag == "step") {
      var arrow = new Arrow(this.x, this.y + this.h / 2, obj.x, obj.y - obj.h / 2);
      arrow.drawBottomToTop(context);
    } else if(obj.flag == "condition") {
      var arrow = new Arrow(this.x, this.y + this.h / 2, obj.x, obj.y - obj.l);
      arrow.drawBottomToTop(context);
    }
  }
//   继承
  //箭头从step矩形bottom——>right
  Step.prototype.drawBottomToRight = function(obj,context) {
    var arrow = null;
    if(obj.flag == "step") {
      arrow = new Arrow(this.x, this.y + this.h / 2, obj.x + obj.w / 2 , obj.y);
    } else if(obj.flag == "condition") {
      arrow = new Arrow(this.x , this.y + this.h / 2, obj.x + obj.l*2+40 , obj.y);
    }else if(obj.flag == "start" || obj.flag == "end"){
      arrow = new Arrow(this.x , this.y + this.h / 2, obj.x + obj.w/2 , obj.y);
    }
    arrow.drawBottomToRight(context);
  }
  //箭头从step矩形bottom——>left
  Step.prototype.drawBottomToLeft = function(obj,context) {
    var arrow = null;
    if(obj.flag == "step") {
      arrow = new Arrow(this.x, this.y + this.h / 2, obj.x - obj.w / 2 , obj.y);
    } else if(obj.flag == "condition") {
      arrow = new Arrow(this.x , this.y + this.h / 2, obj.x - obj.l*2-40 , obj.y);
    }else if(obj.flag == "start" || obj.flag == "end"){
      arrow = new Arrow(this.x , this.y + this.h / 2, obj.x - obj.w/2 , obj.y);
    }
    arrow.drawBottomToRight(context);
  }
  //箭头从step矩形bottom——>top
  Step.prototype.drawBottomToTop = function(obj,context) {
    if(obj.flag == "step") {
      var arrow = new Arrow(this.x, this.y + this.h / 2, obj.x, obj.y - obj.h / 2);
      arrow.drawBottomToTop(context);
    } else if(obj.flag == "condition") {
      var arrow = new Arrow(this.x, this.y + this.h / 2, obj.x, obj.y - obj.h);
      arrow.drawBottomToTop(context);
    }
  }
  //箭头从step矩形right——>left
  Step.prototype.drawRightToLeft = function(obj,context) {
    var arrow = null;
    if(obj.flag == "step") {
      arrow = new Arrow(this.x + this.w / 2, this.y, obj.x - obj.w / 2 , obj.y);
    } else if(obj.flag == "condition") {
      arrow = new Arrow(this.x + this.w / 2, this.y, obj.x-obj.l*2 , obj.y);
    }else if(obj.flag == "start" || obj.flag == "end"){
      arrow = new Arrow(this.x + this.w / 2, this.y, obj.x-obj.w/2 , obj.y);
    }
    arrow.drawLeftToRightOrRightToLeft(context);
  }
  
  //箭头从Condition菱形Bottom——>top
  Condition.prototype.drawBottomToTop = function(obj,context) {
    if(obj.flag == "step") {
      var arrow = new Arrow(this.x, this.y + this.h, obj.x, obj.y - obj.h / 2);
      arrow.drawBottomToTop(context);
    } else if(obj.flag == "condition") {
      var arrow = new Arrow(this.x, this.y + this.l, obj.x, obj.y - obj.l);
      arrow.drawBottomToTop(context);
    }
  }
  //箭头从Condition菱形right——>top
  Condition.prototype.drawRightToTop = function(obj, context) {
    if(obj.flag == "step") {
      var arrow = new Arrow(this.x + this.l * 2, this.y, obj.x, obj.y - obj.h / 2);
      arrow.drawLeftOrRightToTop(context);
    } else if(obj.flag == "condition") {
      var arrow = new Arrow(this.x + this.l * 2, this.y, obj.x, obj.y - obj.l);
      arrow.drawLeftOrRightToTop(context);
    }
  }
  //箭头从Condition菱形left——>top
  Condition.prototype.drawLeftToTop = function(obj,context) {
    if(obj.flag == "step") {
      var arrow = new Arrow(this.x - this.l * 2, this.y, obj.x, obj.y - obj.h / 2);
      arrow.drawLeftOrRightToTop(context);
    } else if(obj.flag == "condition") {
      var arrow = new Arrow(this.x - this.l * 2, this.y, obj.x, obj.y - obj.l);
      arrow.drawLeftOrRightToTop(context);
    }
  }
  //箭头从Condition菱形right——>left
  Condition.prototype.drawRightToLeft = function(obj,context) {
    if(obj.flag == "step") {
      var arrow = new Arrow(this.x + this.l * 2, this.y, obj.x - this.w / 2, obj.y);
      arrow.drawLeftToRightOrRightToLeft(context);
    } else if(obj.flag == "condition") {
      var arrow = new Arrow(this.x + this.l * 2, this.y, obj.x - this.l * 2, obj.y);
      arrow.drawLeftToRightOrRightToLeft(context);
    }
  }
  //箭头从Condition菱形left——>right
  Condition.prototype.drawLeftToRight = function(obj, context) {
    if(obj.flag == "step") {
      var arrow = new Arrow(this.x - this.l * 2, this.y, obj.x + this.w / 2, obj.y);
      arrow.drawLeftToRightOrRightToLeft(context);
    } else if(obj.flag == "condition") {
      var arrow = new Arrow(this.x - this.l * 2, this.y, obj.x + this.l * 2, obj.y);
      arrow.drawLeftToRightOrRightToLeft(context);
    }
  }
  
  
  /////////////////////////////////////////画箭头start/////////////////////////////////////
  function Arrow(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.tmpX1 = null;
    this.tmpY1 = null;
    this.tmpX2 = null;
    this.tmpY2 = null;
    this.color = "#5B9BD5";
  
  }
  Arrow.prototype.setColor = function(color) {
    this.color=color;
  }
  /**
   *
   * @param {Object} x1起始点横坐标
   * @param {Object} y1起始点纵坐标
   * @param {Object} x2结束点横坐标
   * @param {Object} y2结束点纵坐标
   */
  Arrow.prototype.setP = function(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }
  //第一个拐点
  Arrow.prototype.setP1 = function(tmpX1,tmpY1) {
    this.tmpX1=tmpX1;
    this.tmpY1=tmpY1;
  }
  //第二个拐点
  Arrow.prototype.setP2 = function(tmpX2,tmpY2) {
    this.tmpX2=tmpX2;
    this.tmpY2=tmpY2;
  }
  Arrow.prototype.drawBottomToTop = function(ctx) {
    if (this.x1 != this.x2) {
      this.setP1(this.x1,(this.y1+this.y2)/2);
      this.setP2(this.x2,(this.y1+this.y2)/2);
      this.draw(ctx);
    }else{
      this.draw(ctx);
    }
  }
  Arrow.prototype.drawLeftOrRightToTop = function(ctx) {
    this.setP1(this.x2,this.y1);
    this.draw(ctx);
  }
  Arrow.prototype.drawLeftToRightOrRightToLeft = function(ctx) {
    if (this.y1 != this.y2) {
      this.setP1((this.x1+this.x2)/2,this.y1);
      this.setP2((this.x1+this.x2)/2,this.y2);
      this.draw(ctx);
    }else{
      this.draw(ctx);
    }
  }
  Arrow.prototype.drawBottomToRight = function(ctx) {
    if (this.y1 != this.y2) {
      this.setP1(this.x1,this.y2);
      this.draw(ctx);
    }else{
      this.draw(ctx);
    }
  }
  Arrow.prototype.draw = function(ctx) {
    // arbitrary styling
    ctx.strokeStyle = this.color;
    ctx.fillStyle = this.color;
    // draw the line
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    if(this.tmpX1 != null && this.tmpY1 != null && this.tmpX2 != null && this.tmpY2 != null) {
      ctx.lineTo(this.tmpX1, this.tmpY1);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(this.tmpX1, this.tmpY1)
      ctx.lineTo(this.tmpX2, this.tmpY2);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(this.tmpX2, this.tmpY2);
      ctx.lineTo(this.x2, this.y2);
      ctx.closePath();
      ctx.stroke();
      var endRadians = Math.atan((this.y2 - this.tmpY2) / (this.x2 - this.tmpX2));
      endRadians += ((this.x2 >= this.tmpX2) ? 90 : -90) * Math.PI / 180;
      this.drawArrowhead(ctx, this.x2, this.y2, endRadians);
    } else if(this.tmpX1 != null && this.tmpY1 != null && this.tmpX2 == null && this.tmpY2 == null) {
      ctx.lineTo(this.tmpX1, this.tmpY1);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(this.tmpX1, this.tmpY1)
      ctx.lineTo(this.x2, this.y2);
      ctx.closePath();
      ctx.stroke();
      var endRadians = Math.atan((this.y2 - this.tmpY1) / (this.x2 - this.tmpX1));
      endRadians += ((this.x2 >= this.tmpX1) ? 90 : -90) * Math.PI / 180;
      this.drawArrowhead(ctx, this.x2, this.y2, endRadians);
    }else if(this.tmpX1 == null && this.tmpY1 == null && this.tmpX2 == null && this.tmpY2 == null){
      ctx.lineTo(this.x2, this.y2);
      ctx.closePath();
      ctx.stroke();
      var endRadians = Math.atan((this.y2 - this.y1) / (this.x2 - this.x1));
      endRadians += ((this.x2 >= this.x1) ? 90 : -90) * Math.PI / 180;
      this.drawArrowhead(ctx, this.x2, this.y2, endRadians);
    }
  }
  Arrow.prototype.drawArrowhead = function(ctx, x, y, radians) {
    ctx.save();
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.rotate(radians);
    ctx.moveTo(0, 0);
    ctx.lineTo(5, 10);
    ctx.lineTo(-5, 10);
    ctx.closePath();
    ctx.restore();
    ctx.fill();
  }
  /////////////////////////////////////////画箭头end/////////////////////////////////////
  