const SCREEN_SIZE = Math.min(480, window.innerWidth, window.innerHeight - 100);
const GRID_SIZE = 3;
const PIECE_SIZE = SCREEN_SIZE / GRID_SIZE;
const PUZZLE = [];
const DIFFICUTY = 200;

let gameEnded = false;
let gameFroze = true;
let lastPiece;
let img;

// DOM
const btn = document.getElementById('btn');
let canvas;

btn.addEventListener('click', (e) => {
    e.target.disabled = true;

    // Randomize the pieces
    for(let i = 0; i < DIFFICUTY; i++) {
        setTimeout(randomize, 10 * i);
    }

    // Unfroze the keyboard && restart the game if needed
    gameFroze = false;
    gameEnded = false;

    // Start the loop
    loop();
});

function preload() {
    img = loadImage('puzzle.jpg');
}

function setup() {
    canvas = createCanvas(SCREEN_SIZE, SCREEN_SIZE);
    for(let x = 0; x < GRID_SIZE; x++) {
        PUZZLE.push([]);
        for(let y = 0; y < GRID_SIZE; y++) {
            PUZZLE[x].push(new Piece(x, y, PIECE_SIZE, img));
        }
    }

    lastPiece = PUZZLE[GRID_SIZE - 1][GRID_SIZE - 1];
    // Empty out the last spot
    lastPiece.isEmpty = true;
}

function draw() {
    background(255);

    if(!gameEnded) {
        PUZZLE.forEach(row => row.forEach(piece => {
            piece.draw();
        }));
    } else {
        background(200);
        stroke(0);
        textSize(width / 10);
        text('YOU WON!', width / 2, height / 2);
        textSize(width / 30);
        text('Click the start button to play again!', width / 2, height / 2 + 50);
        noLoop();

        btn.disabled = false;
    }
}

function keyPressed() {
    if(!gameFroze) {
        if (keyCode === UP_ARROW) {
            moveLastPiece('up');
        }
        if (keyCode === RIGHT_ARROW) {
            moveLastPiece('right');
        }
        if (keyCode === DOWN_ARROW) {
            moveLastPiece('down');
        }
        if (keyCode === LEFT_ARROW) {
            moveLastPiece('left');
        }
        checkGame();
    }
}

function moveLastPiece(direction) {
    const { x, y } = lastPiece;
    let targetedPiece;

    switch (direction) {
        case 'up': {
            const targetY = y - 1;
            if(targetY > -1) {
                targetedPiece = findPieceByPosition(x, targetY);
            }
            break;
        }
        case 'right': {
            const targetX = x + 1;
            if(targetX < GRID_SIZE) {
                targetedPiece = findPieceByPosition(targetX, y);
            }
            break;
        }
        case 'down': {
            const targetY = y + 1;
            if(targetY < GRID_SIZE) {
                targetedPiece = findPieceByPosition(x, targetY);
            }
            break;
        }
        case 'left': {
            const targetX = x - 1;
            if(targetX > -1) {
                targetedPiece = findPieceByPosition(targetX, y);
            }
            break;
        }
    }

    if(targetedPiece) {
        let { x: tempX, y: tempY } = targetedPiece;
        let tempPos = targetedPiece.pos.copy();
        targetedPiece.x = lastPiece.x;
        targetedPiece.y = lastPiece.y;
        targetedPiece.pos = lastPiece.pos.copy();
        lastPiece.x = tempX;
        lastPiece.y = tempY;
        lastPiece.pos = tempPos;
    }
}

function findPieceByPosition(x, y) {
    for(let i = 0; i < PUZZLE.length; i++) {
        for(let j = 0; j < PUZZLE[i].length; j++) {
            let current = PUZZLE[i][j];
            if(current.x === x && current.y === y) {
                return current;
            }
        }
    }
}

function randomize() {
    let ran = random();
    let pos;
    if(ran < 0.25) {
        pos = 'up';
    } else if (ran < 0.5) {
        pos = 'right';
    } else if (ran < 0.75) {
        pos = 'down';
    } else if (ran < 1) {
        pos = 'left';
    }
    moveLastPiece(pos);
}

function checkGame() {
    for(let i = 0; i < PUZZLE.length; i++) {
        for(let j = 0; j < PUZZLE[i].length; j++) {
            let current = PUZZLE[i][j];
            if(
                current.targetPos.x !== current.pos.x ||
                current.targetPos.y !== current.pos.y
            ) {
                return;
            }
        }
    }

    gameFroze = true;
    gameEnded = true;
    canvas.canvas.classList.add('woop');
}