const TOTAL_ARCS = 10;
const ARC_LEN = Math.PI * 2 / TOTAL_ARCS;
const POINT_SIZE = 32;
const WIDTH = Math.floor(window.innerWidth / POINT_SIZE) * POINT_SIZE;
const HEIGHT = Math.floor(window.innerHeight / POINT_SIZE) * POINT_SIZE;
const SIZE = Math.min(640, WIDTH, HEIGHT);
let points = [];
let targets = [];

function setup() {
	createCanvas(SIZE, SIZE);

	for(let i = 0; i < TOTAL_ARCS; i++) {
		let x = SIZE / 4 * cos(ARC_LEN * i - Math.PI / 2) + SIZE / 2;
		let y = SIZE / 4 * sin(ARC_LEN * i - Math.PI / 2) + SIZE / 2;
		targets.push(createVector(x, y));
		targets[i].value = i.toString();
	}

	let index = 0;
	for(let i = 0; i < width; i+= POINT_SIZE) {
		for(let j = 0; j < height; j+= POINT_SIZE) {
			let value = PI_DIGITS[index];
			let x = j + POINT_SIZE / 2;
			let y = i + POINT_SIZE / 2;
			let target = targets.find(t => t.value === value);
			points.push(new Point(x, y, value, target));
			index++;
		}
	}

	noLoop();

	setTimeout(loop, 2000);
	setTimeout(noLoop, 6000);
}

function draw() {
	background(0);

	for(let p of points) {
		p.update();
		p.draw();
	}
}