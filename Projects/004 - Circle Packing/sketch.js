const CIRCLES = [];
const NR_OF_CIRCLES = 15;
const CIRCLES_PER_FRAME = 50;
// Stop after this number of attempts
const ALLOWED_NR_OF_ATTEMPTS = 1000;
let img;

function preload() {
    img = loadImage('minions.jpg');
}

function setup() {
    createCanvas(600, 600);
    
    img.resize(0, height);
    imageMode(CENTER);
    image(img, width / 2, height / 2);
    loadPixels();
    background(0);
}

function draw() {
    createNewCircles();

    for(c of CIRCLES) {
        if(c.growing) {
            
            // Check the edges of the canvas
            if(c.edges()) {
                c.growing = false;
            
            // Check with each other circle
            } else {
                for(other of CIRCLES) {
                    if(c !== other) {
                        let d = dist(c.x, c.y, other.x, other.y);
                        if(d < c.r + other.r) {
                            c.growing = false;
                            break;
                        }
                    }
                }
            }
        }
        c.grow();
        c.draw();
    }
}

function createNewCircles() {
    let count = 0;
    let attempts = 0;
    while(count < CIRCLES_PER_FRAME) {
        let x = Math.floor(random(width));
        let y = Math.floor(random(height));
        let valid = true;

        // Don't allow creating of a new circle if it is inside another circle
        for(c of CIRCLES) {
            let d = dist(x, y, c.x, c.y);

            if(d < c.r) {
                valid = false;
                break;
            }
        }

        if(valid) {
            let index = x + y * width;
            let c = getColorFromPosition(x, y)
            CIRCLES.push(new Circle(x, y, c));
            count++;
        } else {
            attempts++;
        }

        if(attempts >= ALLOWED_NR_OF_ATTEMPTS) {
            console.log('Drawing stopped!')
            noLoop();
            break;
        }
    }
}

function getColorFromPosition(x, y) {
    let r, g, b, a, d = pixelDensity();

    for (var i = 0; i < d; i++) {
        for (var j = 0; j < d; j++) {
            // loop over
            let idx = 4 * ((y * d + j) * width * d + (x * d + i));
            r = pixels[idx];
            g = pixels[idx+1];
            b = pixels[idx+2];
            a = pixels[idx+3];
        }
    }
    return color(r, g, b, a);
}