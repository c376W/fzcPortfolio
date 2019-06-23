var projects=document.querySelectorAll(".project");
var init_nones=document.querySelectorAll(".init-none");
var imgs=document.querySelectorAll("img");

projects.forEach((elem,i)=>{
	elem.addEventListener("mouseover",function(){
		init_nones[i].style.display="block";
		      imgs[i].style.display="none";
	
	})
	elem.addEventListener("mouseleave",function(){
		init_nones[i].style.display="none";
		imgs[i].style.display="block";
	})
})
