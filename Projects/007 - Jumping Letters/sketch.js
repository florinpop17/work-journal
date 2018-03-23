const letters = [];
const startLetters = 'HELLO!';

function setup () {
	createCanvas(window.innerWidth, window.innerHeight + 10);
	
	// Generate 5 initial letters
	for(let i = 0; i < startLetters.length; i++) {
		let newLetter = (i) => {
			setTimeout(() => {
				letters.push(new Letter(startLetters[i]));
			}, i * 400);
		};
		
		newLetter(i);
	}
}

function draw() {
	background(200);
	
	noStroke();
	fill(50);
	textSize(32);
	textAlign(CENTER, CENTER);
	text('Start Typing', width / 2, height / 2);
	
	letters.forEach(letter => {
		letter.update();
		letter.draw();
	});
}

function keyPressed() {
	letters.push(new Letter(key));
	setTimeout(function() {
		letters.splice(0, 1);
	}, 5000)
}