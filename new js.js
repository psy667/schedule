var width = 100;
var height = 200;

var born = {6:'',7:'',8:'',9:'',9:'',9:''};
//	born = survive = {6:'',7:'',8:'',5:'',9:'',9:''};
var survive = {3:'',4:'',5:'',6:'',7:'',8:''};

var coun = 0

function update(arr){
	var matrix  = arr;
	var b = copy(matrix)

	function check(x,y){
		var sum = 0;
		var arr1;
		var arr2;

		if (matrix[x][y] !==0){
			sum-=matrix[x][y];
		}

		arr1 = arr2 = [-1,0,1];

		if(x===0){
			arr1 = [0,1];
		}
		else if(x == height-1){
			arr1 = [-1,0];
		}

		if(y===0){
			arr2 = [0,1];
		}
		else if(y == width-1){
			arr2 = [-1,0];
		}

		for(var k = 0; k< arr1.length; k++){
			for(var l = 0; l< arr2.length; l++){
				sum+=matrix[x + arr1[k]][y + arr2[l]];
			}
		}
		return sum
	}
//	B678/S345678
//	B5678/S5678



	for(var x=0; x<height; x++){
		for(var y=0; y<width; y++){

			if (matrix[x][y] === 0){
				if(check(x,y) in born){
//				if(check(x,y) in [5,6,7,8]){
					b[x][y] = 1;
				}
				else{
					b[x][y] = 0
				}
			}
			else{
				if(check(x,y)  in survive){
//				if(check(x,y) in [5,6,7,8]){
					b[x][y] = 1;
				}
				else{
					b[x][y] = 0;
				}
			}
		}
	}

	return b
}

function createMatrix(){
	var arr = [];
	for(var i=0; i<height; i++){
		arr.push([])

		for(var j=0; j<width; j++){
			arr[i].push(Math.round(Math.random()+0.04) )
//			arr[i].push(0)
		}
	}

	arr[2][1] = 1;arr[2][2] = 1;arr[2][3] = 1;
	return arr;
}

function copy(n){
	return JSON.parse(JSON.stringify(n))
}

var m = createMatrix();

function create(){
	m = createMatrix();
}

function output(){
	m = update(m);
	draw();
	coun++;
}

var cellSize = 15;
function draw(){
	var bg = document.getElementById('bg');
	var ctx = bg.getContext('2d');



	bg.width = height*cellSize/2;
	bg.height = width*cellSize/2;
	ctx.fillStyle = '#222';
	ctx.fillRect(0,0,bg.width, bg.height);

	for(var x=0; x<height; x++){
		for(var y=0; y<width; y++){
			if (m[x][y] === 1){
				ctx.fillStyle = '#f55';
				ctx.fillRect(x*cellSize/2 + cellSize+1, y*cellSize/2 + cellSize+1,cellSize/2-1,cellSize/2-1)

			}
		}
	}
	//
}

function div(a,b){
	return (a-a%b)/b;
}

var delay = 1000;
var stop = -1
var timerID
function start(){
	stop*=-1
	if (stop == 1){
		timerID = setInterval(output,delay);
		document.getElementById('start').innerHTML = 'STOP';
	}
	else{
		clearTimeout(timerID);
		document.getElementById('start').innerHTML = 'START';
	}
}


function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}
var canvas = document.getElementById('bg');
var context = canvas.getContext('2d');

var move = 0;
canvas.addEventListener('mousedown', function(){move =1})
canvas.addEventListener('mouseup', function(){move =0})

canvas.addEventListener('mousemove', function(evt) {
	if (move === 1){
		var mousePos = getMousePos(canvas, evt);
		var x = div(mousePos.x,cellSize/2)-2;
		var y = div(mousePos.y,cellSize/2)-2;
		var xy = m[x][y];


		n1 = xy == 1 ? 1 : 1;

		for(var xx = -2; xx<3;xx++){
			for(var yy = -2; yy<3;yy++){
				m[x+xx][y+yy] = n1;

			}
		}


		console.log(x,y)
		draw();
	}
}, false);


if(coun < 15){
	born = {6:'',7:'',8:'',9:'',9:'',9:''};
	survive = {3:'',4:'',5:'',6:'',7:'',8:''};
setInterval(output, 500)
}

else if(coun < 50){
	born = survive = {5:'',6:'',7:'',8:''};

setInterval(output, 500)
}
else{
born = {}

setInterval(output, 500)
}