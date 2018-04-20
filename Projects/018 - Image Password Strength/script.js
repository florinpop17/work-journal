let imgSrc = 'night.jpg';
let img;
let quality = [];

function preload() {
    img = loadImage(imgSrc);
}

function setup() {
    createCanvas(img.width, img.height);
    // pixelDensity(1);
    
    image(img, 0, 0);
    loadPixels();
}

function getPoints(step) {
    let points = [];

    // Save all points
    for(let x = 0; x < width; x+= step) {
        for(let y = 0; y < height; y+= step) {
            let index = (x + y * width) * 4;

            points.push({
                x,
                y,
                c: [
                    pixels[index],
                    pixels[index+1],
                    pixels[index+2]
                ],
                s: step
            });
        }
    }

    return points;
}

function drawImageFromPoints(step) {
    const points = getPoints(step);

    points.forEach(p => {
        let color = p.c;
        noStroke();
        fill(...color);
        rect(p.x, p.y, p.s, p.s);
    });
}