const colorBox = document.querySelectorAll(".color-box");
const colorPicker = document.querySelector("#color-picker");
const widthRange = document.querySelector("#brush-size");
const brushSizezDisplay = document.querySelector(".brush-size-display");
const resetBtn = document.querySelector("#reset");
const undoBtn = document.querySelector("#undo");


let BrushColor = "black";
let lineWdith = 8;

let drawingStatus = false;
let mouseCondition = false;
let colorStatus = false;

let paintHistory =[];
let paintHistoryIndex = -1;


const canvas = document.querySelector("#canvas");
canvas.width = window.innerWidth-80;
canvas.height = 450;
let ctx = canvas.getContext("2d");



class ChangeColor {
	constructor(value){
		BrushColor = value;
	}
}


colorBox.forEach(btn =>{
	btn.onclick =(e)=>{
		let color =  new ChangeColor(e.target.style.background);

		document.querySelector(".color-container .active").classList.remove("active");
		btn.classList.add("active");

		brushSizezDisplay.style.color = e.target.style.background;

	}
});

let picker = (value)=>{
	let color = new ChangeColor(value);
}

let brushWidth = (value)=>{
	lineWdith = value;

	// display

	brushSizezDisplay.innerHTML=value;

}


//clear board
resetBtn.onclick =()=>{
	reset();
}

let reset =()=>{
	ctx.clearRect(0,0,window.innerWidth-80,450);
	paintHistory =[];
	paintHistoryIndex = -1; 
}

//undo 
undoBtn.onclick=()=>{

	paintHistoryIndex--;

	if(paintHistoryIndex < 0){
		reset();
	}else{

		paintHistory.pop();
	
		ctx.putImageData(paintHistory[paintHistory.length - 1],0,0)
	}

	 
}



let start =(e)=>{
	drawingStatus = !drawingStatus;
	mouseCondition = !mouseCondition;

	ctx.beginPath();
	ctx.strokeStyle = BrushColor;
	ctx.lineWidth= lineWdith;
	ctx.moveTo(e.clientX - canvas.offsetLeft , e.clientY - canvas.offsetTop);
}

let draw =(e)=>{
	if(drawingStatus && mouseCondition ){
		ctx.lineTo(e.clientX - canvas.offsetLeft , e.clientY - canvas.offsetTop)
		ctx.stroke();

		// path style
		ctx.strokeStyle = BrushColor;
		ctx.lineJoin = "round";
		ctx.lineCap = "round";
		ctx.lineWidth= lineWdith;

	}
	
}



let stop =(e)=>{
	drawingStatus = false;
	mouseCondition = false;


	if(event.type == "mouseup"){
		let history = ctx.getImageData(0,0,window.innerWidth-80,450);

		paintHistory.push(history);

		paintHistoryIndex++;
	}
	
}




canvas.addEventListener("mousedown",start);
canvas.addEventListener("touchstart",start);

canvas.addEventListener("mousemove",draw);
canvas.addEventListener("touchmove",draw);


canvas.addEventListener("mouseup",stop);
canvas.addEventListener("mouseout",stop);
canvas.addEventListener("touchend",stop);




window.onload=()=>{

}