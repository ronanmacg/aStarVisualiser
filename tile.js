function Tile (i,j,size) {
    this.i = i;
    this.j = j;
    this.x = i * size + 1;
    this.y = j * size + 1;
	this.g = 0;
	this.h = 0;
	this.f = 0;
	this.cameFrom;
    this.size = size;
    this.walkable = true;
    this.start = false;
    this.end = false;
    this.colour = "#FFFFFF"
}


Tile.prototype.draw = function() {
    fill(this.colour);
    stroke(0);
    rect(this.x, this.y, this.size, this.size);
}

Tile.prototype.contains = function(x,y) {
    return (x > this.x && x < this.x+this.size && y > this.y && y < this.y+this.size);
}

Tile.prototype.invert = function() {
    this.walkable = !this.walkable;
    if(!this.walkable){
        this.colour = "#000000";
    } else {
        this.colour = "#FFFFFF";
    }
    this.draw();
}

Tile.prototype.setStart = function() {
    this.walkable = true;
    this.start = true;
    this.colour = "#00FF00"
    this.draw();
}

Tile.prototype.setEnd = function() {
     this.walkable = true;
     this.end = true;
     this.colour = "#FF0000"
     this.draw();
}

Tile.prototype.clear = function() {
    this.walkable = true;
    this.end = false;
    this.start = false;
    this.colour = "#FFFFFF";
    this.draw();
}

Tile.prototype.open = function() {
    this.colour = "#99ebff";
    this.draw();
}

Tile.prototype.close = function() {
    this.colour = "#0000FF";
    this.draw();
}
