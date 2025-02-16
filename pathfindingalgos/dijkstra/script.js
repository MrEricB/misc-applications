// dikstras
let openSet = [];
let closedSet = [];
let path = [];
let current;
let noSolution = false;  
function setup() {
  createCanvas(400, 400);

  createMaze();

  openSet.push(start);
}

function draw() {
  if (openSet.length > 0) {
    let lowestIndex = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[lowestIndex].f) {
        lowestIndex = i;
      }
    }

    current = openSet[lowestIndex];

    if (current === end) {
      noLoop();
      console.log("DONE!");
    }

    removeFromArray(openSet, current);
    closedSet.push(current);

    let neighbors = current.neighbors;
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];

      if (!closedSet.includes(neighbor) && !neighbor.wall) {
        let tempG = current.g + 1;

        let newPath = false;
        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
            newPath = true;
          }
        } else {
          neighbor.g = tempG;
          newPath = true;
          openSet.push(neighbor);
        }

        if (newPath) {
          neighbor.h = heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;
        }
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

  for (let i = 0; i < closedSet.length; i++) {
    closedSet[i].show(color(255, 0, 0));
  }

  for (let i = 0; i < openSet.length; i++) {
    openSet[i].show(color(0, 255, 0));
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

function removeFromArray(arr, elt) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == elt) {
      arr.splice(i, 1);
    }
  }
}

function heuristic(a, b) {
  let d = dist(a.i, a.j, b.i, b.j);
  return d;
}