const NR_OF_ITERATIONS = 50000;
const color1 = document.querySelectorAll('.color1');
const color2 = document.querySelectorAll('.color2');
const color3 = document.querySelectorAll('.color3');
const colorbg = document.querySelectorAll('.colorbg');
const stars = document.querySelectorAll('.star');
const themesContainer = document.querySelector('.themes-container');
const data = [];

let currentColors = undefined;

const generateTheme = (
        col1 = getRandomColor(), 
        col2 = getRandomColor(),
        col3 = getRandomColor(),
        // In order to have a darker background color
        colbg = getRandomColor(50)
    ) => {

        // Set the current colors to the selected ones
        currentColors = {
            col1,
            col2,
            col3,
            colbg
        };

        color1.forEach(color => {
            const [r, g, b] = col1;
            color.style.color = `rgb(${r}, ${g}, ${b})`;
        });
        color2.forEach(color => {
            const [r, g, b] = col2;
            color.style.color = `rgb(${r}, ${g}, ${b})`;
        });
        color3.forEach(color => {
            const [r, g, b] = col3;
            color.style.color = `rgb(${r}, ${g}, ${b})`;
        });
        colorbg.forEach(color => {
            const [r, g, b] = colbg;
            color.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        });
    };

const getRandomColorValue = (maxVal) => {
    return Math.floor(Math.random() * maxVal);
};

// Random color of form: [200, 150, 125]
const getRandomColor = (maxVal = 255) => {
    const r = getRandomColorValue(maxVal);
    const g = getRandomColorValue(maxVal);
    const b = getRandomColorValue(maxVal);
    return [r, g, b];
}

// Remove active class for all .star elements
const removeActiveStars = () => {
    stars.forEach(star => {
        star.classList.remove('active');
    });
}

// Convert an object with arrays into an array with 12 values
// Each value has to be between 0 and 1
const formatColors = (colors) => {
    return Object.keys(colors)
        .map(key => colors[key])
        .reduce((acc, array) => acc.concat([...array]), [])
        .map(color => Math.round(color / 2.55) / 100);
}

const getRGBStringFromColorArray = (color) => {
    return `rgb(${Math.round(color[0])}, ${Math.round(color[1])}, ${Math.round(color[2])})`;
}

const addNewTheme = ({ col1, col2, col3, colbg, score }) => {
    const newTheme = document.createElement('div');
    newTheme.classList.add('col-sm-6')
    const col1Style = `style="color: rgb(${col1[0]}, ${col1[1]}, ${col1[2]})"`;
    const col2Style = `style="color: rgb(${col2[0]}, ${col2[1]}, ${col2[2]})"`;
    const col3Style = `style="color: rgb(${col3[0]}, ${col3[1]}, ${col3[2]})"`;
    const colbgStyle = `style="background-color: rgb(${colbg[0]}, ${colbg[1]}, ${colbg[2]})"`;

    const col1RGB = 

    newTheme.innerHTML = `
        <div class="theme-demo-container">
            <div class="theme-demo" ${colbgStyle}>
                <span ${col1Style}>import</span> React <span ${col1Style}>from</span> <span ${col2Style}>"react"</span><br />
                <span ${col1Style}>import</span> ReactDOM <span ${col1Style}>from</span> <span ${col2Style}>"react-dom"</span><br /><br />
                
                <span ${col1Style}>import</span> App <span ${col1Style}>from</span> <span ${col2Style}>"./components/App"</span><br /><br />
                
                <span ${col1Style}>const</span> root = document.<span ${col2Style}>getElementById</span>(<span ${col3Style}>"app"</span>);<br />
                ReactDOM.render(<<span ${col3Style}>App</span> />, root)
            </div>
            <p>
                Score ${score} <br />
                Background ${getRGBStringFromColorArray(colbg)} <br />
                Color1 ${getRGBStringFromColorArray(col1)} <br />
                Color2 ${getRGBStringFromColorArray(col2)} <br />
                Color3 ${getRGBStringFromColorArray(col3)}
            </p>
        </div>
    `;

    themesContainer.appendChild(newTheme);
}

const predictThemeCombinations = () => {
    const net = new brain.NeuralNetwork({
        activation: 'leaky-relu'
    });
    const results = [];

    net.train(data);

    for(let i = 0; i < NR_OF_ITERATIONS; i++) {
        const col1 = getRandomColor();
        const col2 = getRandomColor();
        const col3 = getRandomColor();
        // In order to have a darker background color
        const colbg = getRandomColor(50);
        const colors = { col1, col2, col3, colbg };
        const formatedColors = formatColors(colors);

        const [ score ] = net.run(formatedColors);
        results.push({ ...colors, score });
    }

    // Sort results
    const sortedResults = results.sort((a, b) => b.score - a.score);
    
    // Reset themeContainer
    themesContainer.innerHTML = '';

    // Save just the top 10 results
    for(let i = 0; i < 10; i++) {
        addNewTheme(sortedResults[i]);
    }
}

// Rate theme by clicking the stars
const rateTheme = (rate) => {
    data.push({
        input: formatColors(currentColors),
        output: [rate]
    });

    predictThemeCombinations();
    generateTheme();
}

// Add eventListener to the stars
stars.forEach((star, idx) => {
    star.addEventListener('mouseover', () => {
        let currentIdx = idx;

        // Initially remove all .active stars
        removeActiveStars();

        while(currentIdx-- > 0) {
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

// Set initial random colors
generateTheme();