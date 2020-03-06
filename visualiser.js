var startHeld = false;
var endHeld = false;
var cols;
var rows;
var grid;
var size = 20;
var startNode;
var endNode;
var state = "idle";

function create2DArray(cols,rows) {
    var arr = new Array(cols);
    for (var i = 0; i < arr.length; i++) {
        arr[i]= new Array(rows);
    }
    return arr;
}

function setup() {
    createCanvas(401, 401);
    cols = floor(width / size);
    rows = floor(height / size);
    grid = create2DArray(cols,rows);
    for (var i = 0; i < cols; i++){
        for (var j = 0; j < rows; j++) {
            grid[i][j] = new Tile(i, j, size);
        }
    }
    startNode = grid[3][9];
    endNode = grid[16][9];
    startNode.setStart();
    endNode.setEnd();
    background(255);
    for (var i = 0; i < cols; i++){
        for (var j = 0; j < rows; j++) {
            grid[i][j].draw();
        }
    }
}

function mousePressed() {
    if (state == "idle") {
	    for (var i = 0; i < cols; i++){
		for (var j = 0; j < rows; j++) {
		    if (grid[i][j].contains(mouseX, mouseY)) {
		        if (startHeld) {
		            if (!grid[i][j].end) {
		                grid[i][j].setStart();
		                startNode = grid[i][j];
		                startHeld = false;
		            } else { console.log("Cannot hold end tile while holding start tile") }
		        } else if (endHeld) {
		            if (!grid[i][j].start) {
		                grid[i][j].setEnd();
		                endNode = grid[i][j];
		                endHeld = false;
		            } else { console.log("Cannot hold start tile while holding end tile") }
		        } else if (grid[i][j].start) {
		            grid[i][j].clear();
		            startHeld = true;
		        } else if (grid[i][j].end) {
		            grid[i][j].clear();
		            endHeld=true
		        } else {
		            grid[i][j].invert();
		        }
		    }
		}
	    }
    }
}

function resetTiles() {
    for (var i = 0; i < cols; i++){
        for (var j = 0; j < rows; j++) {
            grid[i][j].clear();
        }
    }
    startNode = grid[3][9];
    endNode = grid[16][9];
    startNode.setStart();
    endNode.setEnd();
}

function getNeighbours(current) {
    let arr = [];
    if(current.i + 1 < cols && grid[current.i+1][current.j].walkable) arr.push(grid[current.i+1][current.j]);
    if(current.i - 1 >= 0 && grid[current.i-1][current.j].walkable) arr.push(grid[current.i-1][current.j]);
    if(current.j + 1 < rows && grid[current.i][current.j+1].walkable) arr.push(grid[current.i][current.j+1]);
    if(current.j - 1 >= 0 && grid[current.i][current.j-1].walkable) arr.push(grid[current.i][current.j-1]);
    return arr;
}

function resetState() {
	state = "complete";
}

document.getElementById("Start").onclick = function() {
	if (state == "idle"){		
	    state = "running";
        aStar(startNode, endNode);
	} else {
		console.log("Already running or has ran");
	}
}

document.getElementById("Reset").onclick = function() {
	if (state != "running"){		
	    resetTiles();
		state = "idle";
	} else {
		console.log("Already running!");
	}
}
