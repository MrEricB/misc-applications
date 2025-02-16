class Player {
    constructor() {
        this.x = WINDOW_WIDTH / 2;
        this.y = WINDOW_HEIGHT / 7;
        this.radius = 4;
        this.turnDirection = 0; // -1 if left, +1 if right
        this.walkDirection = 0; // -1 if back, +1 if front
        this.rotationAngle = Math.PI / 2;
        this.moveSpeed = 4.0;
        this.rotationSpeed = 3 * (Math.PI / 180);
    }
    update() {
        this.rotationAngle += this.turnDirection * this.rotationSpeed;

        var moveStep = this.walkDirection * this.moveSpeed;

        var newPlayerX = this.x + Math.cos(this.rotationAngle) * moveStep;
        var newPlayerY = this.y + Math.sin(this.rotationAngle) * moveStep;

        if (!grid.hasWallAt(newPlayerX, newPlayerY)) {
            this.x = newPlayerX;
            this.y = newPlayerY;
        }
    }
    render() {
        noStroke();
        fill("blue");
        circle(
            MINIMAP_SCALE_FACTOR * this.x,
            MINIMAP_SCALE_FACTOR * this.y,
            MINIMAP_SCALE_FACTOR * this.radius
        );
        stroke("blue");
        line(
            MINIMAP_SCALE_FACTOR * this.x,
            MINIMAP_SCALE_FACTOR * this.y,
            MINIMAP_SCALE_FACTOR * (this.x + Math.cos(this.rotationAngle) * 30),
            MINIMAP_SCALE_FACTOR * (this.y + Math.sin(this.rotationAngle) * 30)
        );
    }
}
