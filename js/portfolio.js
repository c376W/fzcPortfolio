
var alinks=document.querySelectorAll(".item");
var color="#de8787";
var active=false;
var angle=0;//animate the flakes


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



setInterval(drawFlakes,25);

window.addEventListener('resize',init,false);

	

// Clean up

function setColor(){
	alinks.forEach(el=>{
		el.classList.remove("active");
	})
}

function init(){
	var myWidth=window.innerWidth;
	var myHeight=window.innerHeight;
	ctx.canvas.width=myWidth;
	ctx.canvas.height=myHeight;
}
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


// jQuery Section

$(document).ready(function () {
    $(document).on("scroll", onScroll);
});

function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('.container a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        console.log(refElement.position().top);
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('.item').removeClass("active");
            currLink.addClass("active");
        }
        else{
            currLink.removeClass("active");
        }
    });
}