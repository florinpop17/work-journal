const color1 = document.querySelectorAll('.color1');
const color2 = document.querySelectorAll('.color2');
const color3 = document.querySelectorAll('.color3');
const colorbg = document.querySelectorAll('.colorbg');
const stars = document.querySelectorAll('.star');

let currentColors = undefined;

const setColors = (
        col1 = getRandomColor(), 
        col2 = getRandomColor(),
        col3 = getRandomColor(),
        // In order to have a darker background color
        colbg = getRandomColor(150)
    ) => {

        // Set the current colors to the selected ones
        currentColors = {
            col1,
            col2,
            col3,
            colbg
        };

        color1.forEach(color => {
            color.style.color = col1;
        });
        color2.forEach(color => {
            color.style.color = col2;
        });
        color3.forEach(color => {
            color.style.color = col3;
        });
        colorbg.forEach(color => {
            color.style.backgroundColor = colbg;
        });
    };

const getRandomColorValue = (maxVal) => {
    return Math.floor(Math.random() * maxVal);
};

// Random color of form: rgb(200, 150, 125)
const getRandomColor = (maxVal = 255) => {
    return `rgb(${getRandomColorValue(maxVal)}, ${getRandomColorValue(maxVal)}, ${getRandomColorValue(maxVal)})`;
}

// Remove active class for all .star elements
const removeActiveStars = () => {
    stars.forEach(star => {
        star.classList.remove('active');
    });
}

// Rate theme by clicking the stars
const rateTheme = (rate) => {
    
}

// Set initial random colors
setColors();

// Add eventListener to the stars
stars.forEach((star, idx) => {
    star.addEventListener('mouseover', () => {
        let currentIdx = idx;

        // Initially remove all .active stars
        removeActiveStars();

        while(currentIdx-- >= 0) {
            stars[currentIdx].classList.add('active');
        }
    });

    star.addEventListener('click', () => {
        rateTheme(idx / 4);
    });

    star.addEventListener('mouseleave', () => {
        removeActiveStars();
    });
});

