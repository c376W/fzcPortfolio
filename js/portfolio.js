// var projects=document.querySelectorAll(".project");
// var init_nones=document.querySelectorAll(".init-none");
// var imgs=document.querySelectorAll("img");

var alinks=document.querySelectorAll(".item");
var color="#de8787";
var active=false;


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

// Clean up

function setColor(){
	alinks.forEach(el=>{
		el.classList.remove("active");
	})
}
