const VEHICLES = [];

function setup() {
    createCanvas(640, 640);
    VEHICLES.push(new Vehicle(random(width), random(height)));
}

function draw() {
    background(200);

    for(vehicle of VEHICLES) {
        vehicle.run();
    }
}