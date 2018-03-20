const VEHICLES = [];
const SCREEN_SIZE = Math.min(600, window.innerWidth);

function setup() {
    createCanvas(SCREEN_SIZE, SCREEN_SIZE);

    for(let i = 0; i < 50; i++) {
        VEHICLES.push(new Vehicle(random(width), random(height)));
    }
}

function draw() {
    background(200);

    for(let vehicle of VEHICLES) {
        vehicle.align(VEHICLES);
        vehicle.separate(VEHICLES);
        vehicle.update();
        vehicle.checkEdges();
        vehicle.draw();
    }
}

function mousePressed() {
    VEHICLES.push(new Vehicle(mouseX, mouseY));
}