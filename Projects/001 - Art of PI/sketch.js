const COLORS = ['#543121', '#D87C46', '#4A2B68', '#C058C7', '#125D5E', '#26CCCA', '#0C3B81', '#0E7AFA', '#35482B', '#8CBA5F'];
const TOTAL_ARCS = 10;
const ARC_LEN = Math.PI * 2 / TOTAL_ARCS;
const OFFSET = 10;
const NUMBER_OF_POINTS = 1000;
const ANGLE = Math.PI * 2 / NUMBER_OF_POINTS;
let points = [];

function setup() {
	createCanvas(min(windowWidth, windowHeight, 700), min(windowWidth, windowHeight, 700));

	for(let i = 0; i < PI_DIGITS.length; i++) {
		let category = +PI_DIGITS[i];
		let x = (width / 2 - OFFSET * 2) * cos(ANGLE * pointsInCategory(category) + ANGLE * category * 100 + ANGLE * OFFSET / 2) + (width / 2);
		let y = (height / 2 - OFFSET * 2) * sin(ANGLE * pointsInCategory(category) + ANGLE * category * 100 + ANGLE * OFFSET / 2) + (height / 2);
		
		if(pointsInCategory(category) < 100) {
			points.push({ x, y, category });
		}
	}
	drawArcs();
	drawBezierCurves();
}

function drawBezierCurves() {
	strokeWeight(1);
	noFill();
	points.forEach((p, idx, allP) => {
		stroke(colorAlpha(COLORS[p.category], 0.7));
		let p2 = {};
		// last item
		if(idx === allP.length - 1) {
			p2 = { ...allP[0] };
		} else {
			p2 = { ...allP[idx + 1] };
		}
		bezier(p.x, p.y, width / 2, height / 2, width / 2, height / 2, p2.x, p2.y);
	});
}

function drawArcs() {
	fill(0);
	strokeWeight(OFFSET);
	for(let i = 0; i < TOTAL_ARCS; i++) {
		stroke(COLORS[i]);
		strokeCap(PROJECT);
		arc(
			width / 2,
			height / 2,
			width - OFFSET,
			height - OFFSET,
			i * ARC_LEN + ARC_LEN / 10,
			(i + 1) * ARC_LEN
		);
	}	
}

function pointsInCategory(category) {
	return points.filter(p => p.category === category).length;
}

// source: https://gist.github.com/bcardiff/3b39ba8e2d00fed68435
function colorAlpha(aColor, alpha) {
	var c = color(aColor);
	return color('rgba(' +  [red(c), green(c), blue(c), alpha].join(',') + ')');
}