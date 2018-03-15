## Done
1. Fixed [Art of PI](https://codepen.io/FlorinPop17/pen/xWZRxa) sketch to look good on mobile.
2. Created [Steering points in image](../Projects/002%20-%20Steering%20points%20in%20image) project.

## What I've learned today?
1. I (re)learned how to apply physics in JS and steering behaviors from [this](https://www.youtube.com/watch?v=4hA7G3gup-4) video.
2. Worked a lot with Matrices and Arrays, and how to convert from one to another:
- From Array to Matrix:
    ```javascript
        let row = Math.floor(i / length);
        let col = i % length;
    ```
- from Matrix to Array:
    ```javascript
        let i = row * lenght + col;
    ```
3. Be aware of what you name your variables. (I had issues on Codepen because I was reseting some of p5js's global variables)