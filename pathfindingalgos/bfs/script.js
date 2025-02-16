let queue = [];
let visited = [];
let path = [];
let current;
let noSolution = false; 

function setup() {
  createCanvas(400, 400);
  createMaze();

  for (let i = 0; i < cols; i++) {
    visited[i] = new Array(rows).fill(false);
  }

  queue.push(start);
  visited[start.i][start.j] = true;
}

function draw() {
  background(255);

  if (queue.length > 0) {
    current = queue.shift();

    if (current === end) {
      noLoop();
      console.log("DONE!");
    }

    let neighbors = current.neighbors;
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];

      if (!visited[neighbor.i][neighbor.j] && !neighbor.wall) {
        queue.push(neighbor);
        visited[neighbor.i][neighbor.j] = true;
        neighbor.previous = current;
      }
    }
  } else if (!noSolution) {
    console.log("No solution");
    noLoop();
    noSolution = true;
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show(color(255));
    }
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (visited[i][j]) {
        grid[i][j].show(color(255, 0, 0));
      }
    }
  }

  path = [];
  let temp = current;
  path.push(temp);
  while (temp.previous) {
    path.push(temp.previous);
    temp = temp.previous;
  }

  for (let i = 0; i < path.length; i++) {
    path[i].show(color(0, 0, 255));
  }

  if (noSolution) {
    fill(0, 0, 255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("No Solution", width / 2, height / 2);
  }
}
