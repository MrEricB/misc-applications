let cols = 30;
let rows = 30;
let grid = new Array(cols);
let w, h;
let start;
let end;

function createMaze() {
  w = width / cols;
  h = height / rows;

  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i, j);
    }
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }

  start = grid[0][0];
  end = grid[cols - 1][rows - 1];
  start.wall = false;
  end.wall = false;
}

function Spot(i, j) {
  this.i = i;
  this.j = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.neighbors = [];
  this.previous = undefined;
  this.wall = false;

  if (random(1) < 0.3) {
    this.wall = true;
  }

  this.show = function(col) {
    fill(col);
    if (this.wall) {
      fill(0);
    }
    noStroke();
    rect(this.i * w, this.j * h, w - 1, h - 1);
  };

  this.addNeighbors = function(grid) {
    let i = this.i;
    let j = this.j;
    if (i < cols - 1) {
      this.neighbors.push(grid[i + 1][j]);
    }
    if (i > 0) {
      this.neighbors.push(grid[i - 1][j]);
    }
    if (j < rows - 1) {
      this.neighbors.push(grid[i][j + 1]);
    }
    if (j > 0) {
      this.neighbors.push(grid[i][j - 1]);
    }
  };
}