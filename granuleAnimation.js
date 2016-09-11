

///默认参数
//var defaultoptions = {
//   d:canvasEle,
//   canvasW:400,//画布高
//   canvasH:400,
//   imgSrc: "img/jh.png",
//   delay: 100, //开始的延迟时间（多少s后开始）
//   duration: 1000,//持续时间
//   interval: 60,// 缓冲时间
//   x0: Math.random()*defaultoptions.canvasW,//初始位置x
//   y0:Math.random()*defaultoptions.canvasH//初始位置y
//};
var image = new Image(), data, ctx, particles = [],isAni=true;

function GranuleAnimation(options) {
    this.options = options;
    this.image = null;
    //创建一个Image对象，实现图片的预下载  
    this.init();
    this.calculate();
}
GranuleAnimation.prototype.init = function () {
    this.options.canvas.width = this.options.canvasW;
    this.options.canvas.height = this.options.canvasH;
    
    if (this.options.canvas.getContext) {
        ctx = this.options.canvas.getContext('2d');
    }
    image.src = this.options.imgSrc;
}

//计算并保存坐标
GranuleAnimation.prototype.calculate = function () {
    //只保存100行 100列的像素值
    var cols = options.canvasW,
        rows = options.canvasH;
    options = this.options;
    //设成100行，100列后的每个元素的宽高
    // image.onload = function () {
    //     ctx.drawImage(this, 0, 0);
    
    ctx.save();
    ctx.beginPath();
    ctx.font="bold "+WINDOW_HEIGHT/30+"px fontFamilu";
    ctx.strokeStyle="red";
    var text="距离 "+YEAR+" 年 "+(MONTH+1)+" 月 "+DAY+" 日 ";
    ctx.strokeText(text,MARGIN_LEFT,MARGIN_TOP/3-20);
    ctx.closePath();
    ctx.restore();//restore()
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle="pink";
    ctx.font="bolder "+WINDOW_HEIGHT/30+10+"px  Verdana";
    ctx.strokeText(Daytext,MARGIN_LEFT+300,MARGIN_TOP/3+70);
    var text1=" 已经 "+days+" 天 零";

    ctx.strokeText(text1,MARGIN_LEFT+30,MARGIN_TOP/3+150);
    ctx.closePath();
     ctx.restore();

    // ctx.save();
    // ctx.beginPath();
    // ctx.font="bolder "+(WINDOW_HEIGHT/30+50)+"px MicrosoftYaHei";
    //  ctx.strokeStyle="#0094ff";
    // var text1=" 已经 "+days+" 天 零";

    ctx.strokeText(text1,MARGIN_LEFT+30,MARGIN_TOP/3+150);
    ctx.closePath();
    ctx.restore();

        this.imgeData = ctx.getImageData(0, 0, options.canvasW, options.canvasH);
        data = this.imgeData.data;
        var s_width = 1,
            	    s_height = 1;
        var pos = 0; //数组中的位置
        var par_x, par_y; //粒子的x，y坐标
        var n =Math.floor( Math.random() * 10);
        for (var i = 1; i <= cols; i++) {
            for (var j = 1; j <= rows; j++) {
                //pos = [(j * s_height - 1) * this.width + (i * s_width - 1)] * 4;
                pos = [(j * s_height - 1) * options.canvasW + (i *s_width - 1)] * 4;
                //判断R值是否符合要求
               
                if (data[pos] > 0) {
                    var particle = {
                        //偏移， x，y值都随机一下
                        count: 0,
                        delay: options.delay * Math.random(),
                        currTime: 0,
                        duration: options.duration * (Math.random()+1),
                        interval: options.interval * Math.random(),
                        x0: getXY(n,i,j).x0,
                        y0: getXY(n,i,j).y0,
                        x1: i ,
                        y1: j, //+40
                        fillStyle: "rgba(" + data[pos] + "," + data[pos + 1] + "," + data[pos + 2] + "," + data[pos + 3] + ")"
                    }
                    //符合要求的的粒子保存在数组中
                    particles.push(particle);
                }
            }
        }
        function getXY(num,i,j) {
            switch (num) {
                case 0:
                    return {
                        x0: options.canvasW - 100,
                        y0: 100
                    }
                case 1:
                    return {
                        x0: options.canvasW * Math.random(),
                        y0: -90
                    }
                case 2:
                    return {
                        x0: -10,
                        y0: options.canvasH * Math.random()
                    }
                case 3:
                    return {
                        x0: 0,
                        y0: options.canvasH
                    }
                case 4:
                    return {
                        x0: options.canvasW,
                        y0: options.canvasH
                    }
                case 5:
                    return {
                        x0: Math.random() < 0.5 ? "0" : options.canvasW,
                        y0: Math.random() < 0.5 ? "0" : options.canvasH
                    }
                case 6:
                    return {
                        x0: i * 0.5+175,
                        y0: j * 0.5
                    }
                case 7:
                    return {
                        x0: i * 2 -175,
                        y0: j * 2-175
                    }
                case 8:
                    return {
                        x0: i * 0.4+105,
                        y0: j * 0.4+105
                    }
                case 9:
                    return {
                        x0: options.canvasW * Math.random(),
                        y0: options.canvasH+100
                    }
                default:
                    break;

            }
        }
    
}

// 绘图案
GranuleAnimation.prototype.draw = function () {

    var draw = function () {
        ctx.clearRect(0, 0, options.canvas.width, options.canvas.height);
        var len = particles.length, cur_particle = null;
        var cur_x, cur_y;
        var cur_time = 0, duration = 0, cur_delay = 0;
        //把保存的粒子全部绘制到画布里
        for (var i = 0; i < len; i++) {
            cur_particle = particles[i];
            //设置填充颜色
            if(!isAni) break;
            if (cur_particle.count++ > cur_particle.delay) {
                ctx.fillStyle = cur_particle.fillStyle;
                //canvas.ctx.fillRect(cur_particle.x1, cur_particle.y1, 1, 1);
                //获取当前的time和持续时间的延迟
                cur_time = cur_particle.currTime;
                duration = cur_particle.duration;
                cur_delay = cur_particle.interval;
                //如果最后一个也执行完了就停止动画并return
              
               if (particles[len - 1].duration < particles[len - 1].currTime) {
                  ctx.fillRect(cur_particle.x1, cur_particle.y1, 1, 1);
                  isAni=false;
               }else
                 if (cur_time < duration) {
                    //当前粒子正在运动就算出此时的x的坐标
                    cur_x = Math.easeInOutExpo(cur_time, cur_particle.x0, cur_particle.x1 - cur_particle.x0, duration);
                    cur_y = Math.easeInOutExpo(cur_time + cur_delay, cur_particle.y0, cur_particle.y1 - cur_particle.y0, duration);
                    ctx.fillRect(cur_x, cur_y, 1, 1);
                    //当前时间++
                    cur_particle.currTime++;
                } else {
                    //终点绘制在画布上
                    ctx.fillRect(cur_particle.x1, cur_particle.y1, 1, 1);
                }
            }
        }
    }
    
    function drawText(){
        ctx.beginPath();
        ctx.font="bold "+WINDOW_HEIGHT/30+"px fontFamilu";
        ctx.fillStyle=color1;
        var text="距离 "+YEAR+" 年 "+(MONTH+1)+" 月 "+DAY+" 日 ";
        ctx.fillText(text,MARGIN_LEFT,MARGIN_TOP/3-20);
        ctx.closePath();

        ctx.beginPath();
        ctx.font="bolder "+WINDOW_HEIGHT/30+10+"px  Verdana";
        ctx.fillStyle=color3;
        ctx.fillText(Daytext,MARGIN_LEFT+300,MARGIN_TOP/3+70);

        var text1=" 已经 "+days+" 天 零";
        ctx.fillText(text1,MARGIN_LEFT+30,MARGIN_TOP/3+150);
        ctx.closePath();


        // ctx.beginPath();
        // ctx.font="bolder "+(WINDOW_HEIGHT/30+20)+"px MicrosoftYaHei";
        // ctx.fillStyle=color2;
        // ctx.closePath();
     }

    gameloop();
    function gameloop() {
       requestId =  requestAnimationFrame(gameloop);
        draw();
        if(!isAni){
          drawText();
        }
    }
}

//缓动函数
Math.easeInOutExpo = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    t--;
    return c / 2 * (-Math.pow(2, -10 * t) + 2) + b;
}
