
var WINDOW_WIDTH=0;
var WINDOW_HEIGHT=0;
var Radius=8;
var MARGIN_TOP=160;
var MARGIN_LEFT=30;
var YEAR=2012,MONTH=0,DAY=6;HOUR=20,MIN=0,SEC=0;
const endTime=new Date(YEAR,MONTH,DAY,HOUR,MIN,SEC);
var curShowTimeSeconds=0;
var balls=[];
var Daytext="love纪念日";
var fontTextLeft="杜小杜中秋快乐";
var soundNum=3,a=0;

var fontTextRight="————代小代";
var img=[];
var audio=[];
var color1="red",color2="#0094ff",color3="pink",color4="blue",color5="green";
window.onload=function(){
    
	WINDOW_WIDTH=document.documentElement.clientWidth||document.body.clientWidth;
	WINDOW_HEIGHT=document.documentElement.clientHeight||document.body.clientHeight;
	MARGIN_LEFT=Math.round(WINDOW_WIDTH/10);
	MARGIN_TOP=Math.round(WINDOW_HEIGHT*2/6);
	Radius=Math.round(WINDOW_WIDTH*4/5/108)-1;

	var canvas=document.getElementById('canvas');
	var context=canvas.getContext("2d");

	canvas.width=WINDOW_WIDTH;
	canvas.height=WINDOW_HEIGHT;
	 init();
    // 取得秒数
    curShowTimeSeconds=getCurrentShowTimeSecond();
    loop(context);
    
	
}

function init(){

	changeImage();
	for(var i=0;i<10;i++){
		img[i]=new Image();
		img[i].src="du"+i+".png";
	}
	for(var i=0;i<soundNum;i++){
		audio[i]=new Audio();
		audio[i].src=getSound(i);
		audio[i].addEventListener('ended', function () {  
                 soundPlay();
        }, false);
	}
	var div=document.querySelector("#img");
	div.width=WINDOW_WIDTH;
	soundPlay();
}
function soundPlay(){
	a=Math.floor(Math.random()*soundNum);
	a=(++a)%3;
	audio[a].play();
}


function getCurrentShowTimeSecond(){
	var curTime=new Date();
	var ret=curTime.getTime()-endTime.getTime();
	ret=Math.round(ret/1000);
	return ret;
}
function changeImage(){
	 var image=document.getElementsByTagName("img")[0];

	 image.width=WINDOW_WIDTH;
	 image.height=WINDOW_HEIGHT;
	 var i=Math.floor(Math.random()*18);
	 image.src="bg"+i+".jpg";
}
function update(){
	var nextShowTimeSeconds=getCurrentShowTimeSecond();

	var nextdays=parseInt(nextShowTimeSeconds/3600/24);
	var nexthours=parseInt((nextShowTimeSeconds-nextdays*3600*24)/3600);
	var nextminutes=parseInt((nextShowTimeSeconds-nextdays*3600*24-nexthours*3600)/60);
	var nextseconds=parseInt(nextShowTimeSeconds%60);

	var curdays=parseInt(curShowTimeSeconds/3600/24);
	var curhours=parseInt((curShowTimeSeconds-curdays*3600*24)/3600);
	var curminutes=parseInt((curShowTimeSeconds-curdays*3600*24-curhours*3600)/60);
	var curseconds=parseInt(curShowTimeSeconds%60);
	if(nextseconds!=curseconds){
		if(parseInt(curhours/10)!=parseInt(nexthours/10)){
			addBalls(MARGIN_LEFT+0,MARGIN_TOP,parseInt(curhours/10));
		}
		if(parseInt(curhours%10)!=parseInt(nexthours%10)){
			addBalls(MARGIN_LEFT+15*(Radius+1),MARGIN_TOP,parseInt(curhours%10));
		}
		if(parseInt(curminutes/10)!=parseInt(nextminutes/10)){
			addBalls(MARGIN_LEFT+39*(Radius+1),MARGIN_TOP,parseInt(curminutes/10));
		}
		if(parseInt(curminutes%10)!=parseInt(nextminutes%10)){
			addBalls(MARGIN_LEFT+54*(Radius+1),MARGIN_TOP,parseInt(curminutes%10));
			changeImage();
		}
		if(parseInt(curseconds/10)!=parseInt(nextseconds/10)){
			addBalls(MARGIN_LEFT+78*(Radius+1),MARGIN_TOP,parseInt(curseconds/10));
			addPicBalls(MARGIN_LEFT+78*(Radius+1),MARGIN_TOP);
			changeImage();
		}
		if(parseInt(curseconds%10)!=parseInt(nextseconds%10)){
			addBalls(MARGIN_LEFT+93*(Radius+1),MARGIN_TOP,parseInt(curseconds%10));
			color1=getRandomColor();
			color2=getRandomColor();
			color3=getRandomColor();
			color4=getRandomColor();
			color5=getRandomColor();
		}

		curShowTimeSeconds=nextShowTimeSeconds;
	}
	updataBalls();
	console.log(balls.length);
}

function updataBalls(){
	for(var i=0;i<balls.length;i++){
		balls[i].x+=balls[i].vx;
		balls[i].y+=balls[i].vy;
		balls[i].vy+=balls[i].g;
		if(balls[i].t){
			if(balls[i].y>=WINDOW_HEIGHT-175){
				balls[i].y=WINDOW_HEIGHT-175;
				balls[i].vy=-balls[i].vy*balls[i].xishu;
			}
			if(balls[i].x-175<0&&balls[i].y<WINDOW_HEIGHT-350){
				balls[i].x=175;
				balls[i].vx=-balls[i].vx;
			}
			if(balls[i].x+175>WINDOW_WIDTH&&balls[i].y<WINDOW_HEIGHT-175){
				balls[i].x=WINDOW_WIDTH-175;
				balls[i].vx=-balls[i].vx;
			}
		}else{
			if(balls[i].y>=WINDOW_HEIGHT-Radius){
				balls[i].y=WINDOW_HEIGHT-Radius;
				balls[i].vy=-balls[i].vy*balls[i].xishu;
			}
			if(balls[i].x-Radius<0&&balls[i].y<WINDOW_HEIGHT-26*Radius){
				balls[i].x=Radius;
				balls[i].vx=-balls[i].vx;
			}
			if(balls[i].x+Radius>WINDOW_WIDTH&&balls[i].y<WINDOW_HEIGHT-26*Radius){
				balls[i].x=WINDOW_WIDTH-Radius;
				balls[i].vx=-balls[i].vx;
			}
	    }
	}
	var cnt=0;
	// 循环小球 看当前的小球的位置有没有出去边界 没有就把这个小球放到前面 例如：0位置的是
	//放在0，1不是 不管，2是，就把2的小球放倒1位置。。。以此类推
	for(var i=0;i<balls.length;i++){
		if(balls[i].t){
			if(balls[i].x+175>0&&balls[i].x-175<WINDOW_WIDTH){
				balls[cnt++]=balls[i];
			}
		}else{
			if(balls[i].x+Radius>0&&balls[i].x-Radius<WINDOW_WIDTH){
				balls[cnt++]=balls[i];
			}
	    }
	}
	while(balls.length>cnt){
		balls.pop();
	}
}

function addBalls(x,y,num){
	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num].length;j++){
			if(digit[num][i][j]==1){
				var aBall={
					x:x+j*2*(Radius+1)+Radius+1,
					y:y+i*2*(Radius+1)+Radius+1,
					g:1.5+Math.random(),
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*8,
					vy:Math.pow(-1,Math.ceil(Math.random()*1000))*15,
					color:getRandomColor(),
					xishu:(Math.random()*30+60)/100
				}
				balls.push(aBall);
			}
		}
	}
}
function addPicBalls(x,y){
	    var i=Math.floor(Math.random()*10);
		var aBall={
		           t:"img",
					x:Math.floor(Math.random()*WINDOW_WIDTH),
					y:Math.floor(Math.random()*WINDOW_HEIGHT/2),
					img:img[i],
					g:0.5+Math.random(),
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*2,
					vy:-4+Math.pow(-1,Math.ceil(Math.random()*1000))*2,
					xishu:(Math.random()*30+60)/100
				}
	
	    balls.push(aBall);

}

// 打造每个数字的小球
function render(cxt){
	cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
	var days=parseInt(curShowTimeSeconds/3600/24);
	var hours=parseInt((curShowTimeSeconds-days*3600*24)/3600);
	var minutes=parseInt((curShowTimeSeconds-days*3600*24-hours*3600)/60);
	var seconds=parseInt(curShowTimeSeconds%60);
	cxt.textAlign="left";
    cxt.textBaseline="top";
  
    cxt.beginPath();
    cxt.font="bold "+WINDOW_HEIGHT/30+"px Arial";

    cxt.strokeStyle=color1;
    var text="距离 "+YEAR+" 年 "+(MONTH+1)+" 月 "+DAY+" 日 ";
    cxt.strokeText(text,MARGIN_LEFT,MARGIN_TOP/3);
    cxt.closePath();

    cxt.beginPath();
    cxt.font="bolder "+WINDOW_HEIGHT/30+10+"px Arial";
    cxt.fillText(Daytext,MARGIN_LEFT+300,MARGIN_TOP/3+80);
    cxt.closePath();


    cxt.beginPath();
    cxt.font="bolder "+(WINDOW_HEIGHT/30+20)+"px MicrosoftYAHEi";
    cxt.fillStyle=color2;
    var text1=" 已经过去 "+days+" 天 零";
    cxt.fillText(text1,MARGIN_LEFT+30,MARGIN_TOP/3+140);
    cxt.closePath();

   

     cxt.beginPath();
    cxt.font="bolder "+WINDOW_HEIGHT/30+10+"px 楷体jb2312";
    cxt.fillStyle=color4;
    cxt.fillText(fontTextLeft,MARGIN_LEFT+20,MARGIN_TOP*2);
    cxt.closePath();

     cxt.beginPath();
    cxt.font="bolder "+WINDOW_HEIGHT/30+10+"px 楷体jb2312";
    cxt.fillStyle=color5;
    cxt.fillText(fontTextRight,MARGIN_LEFT+300,MARGIN_TOP*2+20);
    cxt.closePath();


	renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),cxt);
	renderDigit(MARGIN_LEFT+15*(Radius+1),MARGIN_TOP,parseInt(hours%10),cxt);

	renderDigit(MARGIN_LEFT+30*(Radius+1),MARGIN_TOP,10,cxt);

	renderDigit(MARGIN_LEFT+39*(Radius+1),MARGIN_TOP,parseInt(minutes/10),cxt);
	renderDigit(MARGIN_LEFT+54*(Radius+1),MARGIN_TOP,parseInt(minutes%10),cxt);

	renderDigit(MARGIN_LEFT+69*(Radius+1),MARGIN_TOP,10,cxt);

	renderDigit(MARGIN_LEFT+78*(Radius+1),MARGIN_TOP,parseInt(seconds/10),cxt);
	renderDigit(MARGIN_LEFT+93*(Radius+1),MARGIN_TOP,parseInt(seconds%10),cxt);

	for(var i=0;i<balls.length;i++){
		if(balls[i].t){
            cxt.beginPath();
            //drawImage(this, 0, 0);
			cxt.drawImage(balls[i].img,balls[i].x-175,balls[i].y-175,350,350);
			cxt.closePath();
		}
		else{
			cxt.fillStyle=balls[i].color;
			cxt.beginPath();
			cxt.arc(balls[i].x,balls[i].y,Radius,0,2*Math.PI,true);
			cxt.closePath();

			cxt.fill();
	    }
	}

}

  //绘制每个小球 centerX：x+j＊2（R+1）＋R+1
     //centerY:y+i*2*(R+1)+(R+1)
function renderDigit(x,y,num,cxt){
    
	cxt.fillStyle=color3;
	for(var i=0;i<digit[num].length;i++)
		for(var j=0;j<digit[num][i].length;j++)
			if(digit[num][i][j]==1){
				cxt.beginPath();
				cxt.arc(x+j*2*(Radius+1)+Radius+1,y+i*2*(Radius+1)+Radius+1,Radius,0,2*Math.PI);
				cxt.closePath();
				cxt.fill();
			}
}
function getRandomColor(){
	var r=Math.round(Math.random()*255);
	var g=Math.round(Math.random()*255);
	var b=Math.round(Math.random()*255);
	var a=Math.round(Math.random()*10+10)/20;

    return "rgba("+r+","+g+","+b+","+a+")"

}

//执行动画
function loop(context){
	
	render(context);
	update()
	window.requestAnimationFrame(function(){
		loop(context);
	});
}

function getSound(num) {
           switch (num) {
               // case 0:
               //     return "zlx.mp3";
               case 0:
               return "Everytime.mp3";
               case 1:
                   return "Need You Now.mp3";
               // case 2:
               //     return "星月神话.mp3";
               // case 3:
               //     return "和你一样.mp3";
               case 2:
                   return "穿越时空的思念.mp3";
               // case 5:
               //     return "心愿.mp3";
               // case 6:
               //     return "演员.mp3";


               default:
                   break;

           }
}


