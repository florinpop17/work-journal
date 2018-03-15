class Path {
	constructor() {
		this.radius = 20;
		this.points = [];
	}

	draw() {
		// Draw the path's radius
		strokeWeight(2 * this.radius);
		stroke(100);
		noFill();
		beginShape()
		this.points.forEach(p => vertex(p.x, p.y));
		endShape()

		// Draw the line
		strokeWeight(1);
		stroke(0);
		noFill();
		beginShape()
		this.points.forEach(p => vertex(p.x, p.y));
		endShape()
	}

	addPoint(x, y) {
		const point = createVector(x, y);
		this.points.push(point);
	}
  
	getStart() {
		return this.points[0];
	}

	getEnd() {
		return this.points[this.points.length - 1];
	}
}