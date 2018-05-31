'use strict';

let matrix = new Matrix(64,64);

let cells = [new Cell(), new Cell()];

function Food(){
    this.type = 'food';
    this.foodRate = 50;
}



function Cell(){
    //TODO: добавить типы клеток на картей (живая(своя/чужая), еда, падаль и тд)
    this.type = 'cell';
    this.genome = Array(32);
    this.healt
    this.x
    this.y
    this.damage = 50;
    
    
    let self = this;
    
    let n = 0;
    
    while(n < this.genome.length){
        switch(this.genome[n]) {
            case 0:
                n+= this.look();
                break;
                
            case 1:
                move(-1,-1);
                break;
            case 2:
                move(0,-1);
                break;
            case 3:
                move(1,-1);
                break;
            case 4:
                move(-1,0);
                break;
            case 5:
                move(0,0);
                break;
            case 6:
                move(1,0);
                break;
            case 7:
                move(-1,1);
                break;
            case 8:
                move(0,1);
                break;
            case 9:
                move(1,1);
                break;
                
            case 10:
                hit();
                break;
            case 11:
                eat();
                break;
            case 12:
                reproduce();
                break;
                
        }
        n++
    }
    
    
    function move(x,y){
        this.x+=x;
        this.y+=y;
    }
    
    function look(){
        for (let l = -1; l < 2; l++) {
            for (let k = -1; k < 2; k++) {
                if (l || k){
                    switch(cells.get(x+l, y+k).type){
                        case 'food': return 2;
                        case 'cell': return 3;
                        case 'corpse': return 4;
                    }
                    
                }
            }
        }
        return 1;
    }
    
    function hit(){
        for (let l = -1; l < 2; l++) {
            for (let k = -1; k < 2; k++) {
                if (l || k){
                    cells.get(x+l, y+k).damage(self.damage);
                }
            }
        }
    }
    
    
    function eat(){
        for (let l = -1; l < 2; l++) {
            for (let k = -1; k < 2; k++) {
                if (l || k){
                    if(cells.get(x+l, y+k).type == 'food'){
                        cells.delete(x+l, y+k);
                        self.health += cell.get(x+l, y+k).foodRate;
                    }
                }
            }
        }
    }
    function reproduce(){
        //TODO сделать размножение
    }
    
    this.born = function(){
        self.health = 50;
    }
    
    this.die = function(){
        self.health = 0;
        self.type = 'corpse';
    }
    
    this.damage = function(hp){
        self.health-=hp;
        if(self.health < 0){
            self.die();
        }
    }
    
    
}





function Canvas(){
    this.cellSize = 10;
    this.canvas;
    this.ctx;
    this.colors = ['#555', '#171717', '#f44336', '#2196f3', '#4caf50'];
    let self = this;
    
    
    this.createElement = function(width, height){
        width*=self.cellSize;
        height*=self.cellSize;
        self.canvas = document.createElement('canvas');
        self.canvas.width = width;
        self.canvas.height = height;
        self.ctx = self.canvas.getContext('2d');
        self.canvas.style.display = 'block';
        self.canvas.style.margin = 'auto';
        document.body.appendChild(self.canvas);
    }
    
    this.drawField = function(matrix){
        
        self.ctx.fillRect(0, 0, self.canvas.width, self.canvas.height);
        
        for (let x = 0; x < self.canvas.height / self.cellSize; x++) {
            for (let y = 0; y < self.canvas.width / self.cellSize; y++) {
                
                self.ctx.fillStyle = self.colors[matrix[x][y]];
                self.ctx.fillRect(x * self.cellSize, y * self.cellSize, self.cellSize, self.cellSize);
            }
        }
        
    }
    
    
    this.drawPoint = function(x,y,color){
        self.ctx.fillStyle = self.colors[color];
        self.ctx.fillRect(x * self.cellSize, y * self.cellSize, self.cellSize, self.cellSize);
    }
    
    
}

function Matrix(width, height){
    this.matrix;
    this.width = width;
    this.height = height;
    this.canvas = new Canvas();
    let self = this;
    
    this.get = function(){
        return self.matrix;
    }
    
    this.set = function(x,y,value){
        self.matrix[x][y] = value;
        self.canvas.drawPoint(x,y,value);
    }
    
    this._create = function(){
        self.canvas.createElement(self.width, self.height);
        self.matrix = [];
        
        for(let i=0; i<self.height; i++){
            self.matrix.push([]);
            for(var j=0; j<self.width; j++){
                self.matrix[i].push(1);
            }
        }
        self.canvas.drawField(self.matrix);
    }
    
    this.clear = function(){
        self.matrix = [];
        
        for(let i=0; i<self.height; i++){
            self.matrix.push([]);
            for(var j=0; j<self.width; j++){
                self.matrix[i].push(1);
            }
        }
        self.canvas.drawField(self.matrix);
    }
    
    if(!this.matrix){
        self._create();
    }
    
    this.line = function(x1,y1,x2,y2){ // БАГИ!
        
        function f(n){
            n = n - x1;
            let k = (x2-x1)/(y2-y1);
            return n/k + y1
        }
        for(let i = x1; i<x2; i++){
            self.set(i, Math.round(f(i)) ,3);
        }
    }
    
    
}





