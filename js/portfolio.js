
var alinks=document.querySelectorAll(".item");
var color="#de8787";
var active=false;
var angle=0;//animate the flakes
AOS.init();
AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
  

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});


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
		r: Math.random()*1+2,//min of 2px and max of 7px
		d: Math.random()+1 // density of the flake
	})
}



setInterval(drawFlakes,25);

window.addEventListener('resize',init,false);

//Nav bar hamburger
var ham_button=document.querySelector(".nav-hamburger");
var collapseSec=document.querySelector(".collapsed-navlinks");
ham_button.addEventListener("click",function(){
	if(collapseSec.classList[1]!=="collapse-show"){
		collapseSec.classList.add("collapse-show");
	}else{
		collapseSec.classList.remove("collapse-show");
	}
	
})


//Nav bar fly away
collapseSec.addEventListener("mouseleave",function(){
	console.log(collapseSec.classList);
	collapseSec.classList.remove("collapse-show");
})
var flyaway=document.querySelector(".flyaway-wrapper");
flyaway.addEventListener("click",function(){
	collapseSec.classList.remove("collapse-show");
})	

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
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('.item').removeClass("active");
            currLink.addClass("active");
        }
        else{
            currLink.removeClass("active");
        }
    });
}