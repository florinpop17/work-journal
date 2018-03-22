const SCREEN_SIZE = Math.min(800, window.innerWidth);
let points = [];
let savedPixels;
let img;
let slider;

function preload() {
    img = loadImage('map.jpg');
}

function setup() {
    // Create slider and add change event
    slider = createSlider(1, 10, 3, 1);
    slider.changed(() => {
        drawImageFromPoints();
    });

    // Create canvas
    createCanvas(SCREEN_SIZE, SCREEN_SIZE * 3 / 4);
    pixelDensity(1);

    // Get image and center it on the screen
    imageMode(CENTER);
    img.resize(SCREEN_SIZE, SCREEN_SIZE);
    image(img, width / 2, height / 2);

    // Save pixels
    loadPixels();
    drawImageFromPoints();    
}

function getPoints(sliderValue) {
    // reset points array
    points = []

    // Save all points
    for(let x = 0; x < width; x+= sliderValue) {
        for(let y = 0; y < height; y+= sliderValue) {
            let index = (x + y * width) * 4;

            // Only get the non-white values
            if(pixels[index] < 200) {
                points.push({
                    x,
                    y
                });
            }
        }
    }
}

function drawImageFromPoints() {
    let sliderValue = slider.value();

    getPoints(sliderValue);

    background(0);
    points.forEach(p => {
        noStroke();
        fill(255);
        ellipse(p.x, p.y, sliderValue, sliderValue);
    });
}