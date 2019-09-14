// var projects=document.querySelectorAll(".project");
// var init_nones=document.querySelectorAll(".init-none");
// var imgs=document.querySelectorAll("img");

var alinks=document.querySelectorAll(".item");
var color="#de8787";
var active=false;
var c =document.querySelector("canvas");
document.body.style.background='url('+c.toDataURL()+')';


alinks.forEach((el)=>{
	el.addEventListener("click",function(){
		if(active===true){
			setColor();
			active=false;
		}
		if(this.style.color!=="#fff"){
			this.classList.add("active");
			active=true;
		}

	})
})

// projects.forEach((elem,i)=>{
// 	elem.addEventListener("mouseover",function(){
// 		init_nones[i].style.display="block";
// 		      imgs[i].style.display="none";
	
// 	})
// 	elem.addEventListener("mouseleave",function(){
// 		init_nones[i].style.display="none";
// 		imgs[i].style.display="block";
// 	})
// })

//get the canvas and context and store in vars
	var canvas=document.getElementById("sky");
	var ctx=canvas.getContext("2d");

	//set canvas dims to window height and width
	var W = window.innerWidth;
	var H = window.innerHeight;
	canvas.width=W;
	canvas.height=H;

	//generate the snowflakes and apply attributes
	var mf = 100; //max flakes
	var flakes = [];

	//loop through the empty flakes and apply attributes
	for (var i = 0;i<mf;i++){
		flakes.push({
			x: Math.random()*W,
			y: Math.random()*H,
			r: Math.random()*5+2,//min of 2px and max of 7px
			d: Math.random()+1 // density of the flake
		})
	}

	//draw flakes onto canvas
	function drawFlakes(){
		ctx.clearRect(0,0,W,H);
		ctx.fillStyle="#888";
		ctx.beginPath();
		for(var i=0;i<mf;i++){
			var f=flakes[i];
			ctx.moveTo(f.x,f.y);
			ctx.arc(f.x,f.y,f.r,0,Math.PI*2,true);
		}
		ctx.fill();
		moveFlakes();
	}

	//animate the flakes
	var angle=0;
	function moveFlakes(){
		angle +=0.01;
		for(var i=0;i<mf;i++){
			//store current flake
			var f= flakes[i];

			//update X and Y coordinates of each snowflake
			f.y+=Math.pow(f.d,2)+1;
			// f.y+=1;
			// f.x+=Math.sin(angle)*2;

			//if the snowflake reaches the bottom, send a new one to the top

			if(f.y>H){
				flakes[i]={x:Math.random()*W,y:0,r:f.r,d:f.d};
			}
		}
	}

	setInterval(drawFlakes,25);

	window.addEventListener('resize',init,false);

	function init(){
		var myWidth=window.innerWidth;
		var myHeight=window.innerHeight;
		ctx.canvas.width=myWidth;
		ctx.canvas.height=myHeight;
	}

// Clean up

function setColor(){
	alinks.forEach(el=>{
		el.classList.remove("active");
	})
}
