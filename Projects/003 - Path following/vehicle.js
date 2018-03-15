class Vehicle {
	constructor(x, y, max_speed, max_force) {
		this.pos = createVector(x, y);
		this.vel = createVector(max_speed, 0);
		this.acc = createVector(0, 0);
		this.max_speed = max_speed || 10;
		this.max_force = max_force || .1;
		this.r = 6;
	}
	
	update() {
		// Update velocity
		this.vel.add(this.acc);
		// Limit speed
		this.vel.limit(this.max_speed);
		this.pos.add(this.vel);
		// Reset acceleration to 0
		this.acc.mult(0);
	}

	draw() {
		// Draw triangle rotated in the direction of the velocity
		const tetha = this.vel.heading() + radians(90);
		fill(175);
		stroke(0);
		
		push();
		translate(this.pos.x, this.pos.y);
		rotate(tetha);

		// Draw triangle
		beginShape(TRIANGLES);
		vertex(0, -this.r * 2);
		vertex(-this.r, this.r * 2);
		vertex(this.r, this.r * 2);
		endShape();
		pop();
	}

	borders(path) {
		if(this.pos.x > path.getEnd().x + this.r) {
			this.pos.x = path.getStart().x - this.r;
			this.pos.y = path.getStart().y + (this.pos.y - path.getEnd().y);
		}
	}

	seek(target) {
		// Vector pointing from the position to the target
		const desired = p5.Vector.sub(target, this.pos);

		// If the magnitude of desired equals 0, skip out of here
		if (desired.mag() === 0) return;

		desired.setMag(this.max_speed);

		// Steering = Desired minus velocity
		const steer = p5.Vector.sub(desired, this.vel);
		steer.limit(this.max_force);

		this.applyForce(steer);
	}
	
	// A function to get the normal point from a point (p) to a line segment (a-b)
	// This function could be optimized to make fewer new Vector objects
	getNormalPoint(p, a, b) {
		// Vector from a to p
		const ap = p5.Vector.sub(p, a);

		// Vector from a to b
		const ab = p5.Vector.sub(b, a);
		ab.setMag(ap.dot(ab));

		return p5.Vector.add(a, ab);
	}

	// Transformed code into JS from https://github.com/shiffman/The-Nature-of-Code-Examples/blob/master/chp06_agents/NOC_6_06_PathFollowing/Vehicle.pde
	// This function implements Craig Reynolds' path following algorithm
	// http://www.red3d.com/cwr/steer/PathFollow.html
	follow(path) {
		// Predict position 50 (arbitrary choice) frames ahead
		// This could be based on speed 
		const predict = this.vel.copy();
		predict.setMag(50);

		const predictpos = p5.Vector.add(this.pos, predict);

		// Now we must find the normal to the path from the predicted position
		// We look at the normal for each line segment and pick out the closest one

		let normal = null;
		let target = null;
		let worldRecord = 1000000;  // Start with a very high record distance that can easily be beaten

		// Loop through all points of the path
		for (let i = 0; i < path.points.length - 1; i++) {

			// Look at a line segment
			const a = path.points[i];
			const b = path.points[i + 1];

			// Get the normal point to that line
			let normalPoint = this.getNormalPoint(predictpos, a, b);
			// This only works because we know our path goes from left to right
			// We could have a more sophisticated test to tell if the point is in the line segment or not
			if (normalPoint.x < a.x || normalPoint.x > b.x) {
				// This is something of a hacky solution, but if it's not within the line segment
				// consider the normal to just be the end of the line segment (point b)
				normalPoint = b.copy();
			}

			// How far away are we from the path?
			const distance = p5.Vector.dist(predictpos, normalPoint);
			// Did we beat the record and find the closest line segment?
			if (distance < worldRecord) {
				worldRecord = distance;
				// If so the target we want to steer towards is the normal
				normal = normalPoint;

				// Look at the direction of the line segment so we can seek a little bit ahead of the normal
				const dir = p5.Vector.sub(b, a);
				// This is an oversimplification
				// Should be based on distance to path & velocity
				dir.setMag(10);

				target = normalPoint.copy();
				target.add(dir);
			}
		}

		// Only if the distance is greater than the path's radius do we bother to steer
		if (worldRecord > path.radius) {
			this.seek(target);
		}

		// Draw predicted future position
		stroke(0);
		fill(0);
		line(this.pos.x, this.pos.y, predictpos.x, predictpos.y);
		ellipse(predictpos.x, predictpos.y, 4, 4);
	
		// Draw normal position
		stroke(0);
		fill(0);
		ellipse(normal.x, normal.y, 4, 4);
		// Draw actual target (red if steering towards it)
		line(predictpos.x, predictpos.y, normal.x, normal.y);

		if (worldRecord > path.radius) fill(255, 0, 0);
		noStroke();
		ellipse(target.x, target.y, 8, 8);
	}
	
	applyForce(force) {
		this.acc.add(force);
	}
}