let path;
let vehicles = [];

function setup() {
    createCanvas(600, 400);
    newPath();

    vehicles.push(new Vehicle(0, height / 2, 6, .03));
}

function draw(){
    background(200);

    path.draw();

    vehicles.forEach(v => {
        // The boids follow the path
        v.follow(path);
        v.update();
        v.draw();
        v.borders(path);
    });
}


function newPath() {
    // A path is a series of connected points
    // A more sophisticated path might be a curve
    path = new Path();

    const points = 6;
    for(let i = 0; i <= points; i++) {
        path.addPoint(i * width / points, random(height / 10 * 5, height / 10 * 6));
    }
}

function mousePressed() {
    vehicles.push(new Vehicle(mouseX, mouseY, random(5, 8), random(.01, .05)))
}