class Letter {
	constructor(letter) {
		this.position = createVector(random(width / 4, width / 4 * 3), height);
		this.velocity = createVector(0.1, 0);
		this.acceleration = createVector(0, 0);
		this.max_speed = 20;
		this.angle = 0;
		this.angle_speed = random(0.05, 0.25);
		this.letter = letter;
		let upForce = createVector(random(-5, 5), random(-5, -15));
		this.applyForce(upForce);
	}
	
	update() {
		this.position.add(this.velocity);
		this.velocity.add(this.acceleration);
		this.velocity.limit(this.max_speed);
		this.acceleration.mult(0);
		
		let gravity = createVector(0, 0.2);
		this.applyForce(gravity);
	}
	
	applyForce(f) {
		this.acceleration.add(f);
	}
	
	draw() {
		push();
		translate(this.position.x, this.position.y);
		rotate(this.angle);
		noStroke();
		fill(30);
		textSize(100);
		textAlign(CENTER, CENTER);
		text(this.letter, 0, 0);
		pop();
		
		this.angle+= this.angle_speed;
	}
}