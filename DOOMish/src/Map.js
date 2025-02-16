class Map {
    constructor() {
        // this.grid = [
        //     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        //     [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        //     [1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        //     [1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1],
        //     [1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1],
        //     [1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1],
        //     [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        //     [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        //     [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1],
        //     [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        //     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        // ];
        this.grid = this.generateMaze(15,11)
    }
    hasWallAt(x, y) {
        if (x < 0 || x > WINDOW_WIDTH || y < 0 || y > WINDOW_HEIGHT) {
            return true;
        }
        var mapGridIndexX = Math.floor(x / TILE_SIZE);
        var mapGridIndexY = Math.floor(y / TILE_SIZE);
        return this.grid[mapGridIndexY][mapGridIndexX] != 0;
    }
    render() {
        for (var i = 0; i < MAP_NUM_ROWS; i++) {
            for (var j = 0; j < MAP_NUM_COLS; j++) {
                var tileX = j * TILE_SIZE;
                var tileY = i * TILE_SIZE;
                var tileColor = this.grid[i][j] == 1 ? "#222" : "#fff";
                stroke("#222");
                fill(tileColor);
                rect(
                    MINIMAP_SCALE_FACTOR * tileX,
                    MINIMAP_SCALE_FACTOR * tileY,
                    MINIMAP_SCALE_FACTOR * TILE_SIZE,
                    MINIMAP_SCALE_FACTOR * TILE_SIZE
                );
            }
        }
    }
    
    generateMaze(cols, rows) {
        // Initialize the maze with all walls
        let maze = Array(rows).fill().map(() => Array(cols).fill(1));
    
        // Directions for moving in the maze (right, down, left, up)
        const directions = [
            { dx: 1, dy: 0 },
            { dx: 0, dy: 1 },
            { dx: -1, dy: 0 },
            { dx: 0, dy: -1 }
        ];
    
        // shuffle the directions array
        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }
    
        // carve out the maze
        function carveMaze(x, y) {
            // Shuffle directions to ensure randomness
            let shuffledDirections = shuffle(directions.slice());
    
            // Try each direction
            for (let i = 0; i < shuffledDirections.length; i++) {
                let nx = x + shuffledDirections[i].dx * 2;
                let ny = y + shuffledDirections[i].dy * 2;
    
                // Check if the new cell is within bounds and is a wall
                if (nx >= 0 && ny >= 0 && nx < cols && ny < rows && maze[ny][nx] === 1) {
                    // Carve a path to the new cell
                    maze[ny][nx] = 0;
                    maze[y + shuffledDirections[i].dy][x + shuffledDirections[i].dx] = 0;
    
                    // Recursively carve from the new cell
                    carveMaze(nx, ny);
                }
            }
        }
    
        // Start carving from the top-left corner (1, 1)
        maze[1][1] = 0;
        carveMaze(1, 1);
    
        return maze;
    }
     
}
