let grid = document.querySelector(".etch-a-sketch");

let mode      = "color";   // other modes: erase, rainbow
let mouseDown = false;

const colors = ["white", "blue", "yellow", "green", "orange", "purple",
                "black", "brown", "pink", "red", "gray", "cyan"]

let currentColor           = "black";
let currentColorIndex      = 0;
let currentBgColorIndex    = 0;
let currentBackgroundColor = "white";

// display the default slider value
let slider = document.querySelector(".slider");
let output = document.querySelector(".slider-value");
output.textContent = `Grid Size: ${slider.value} x ${slider.value}`; 
createGrid();

// update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.textContent = `Grid Size: ${this.value} x ${this.value}`;
  createGrid();
}

const colorButton              = document.querySelector(".color");
const colorIndicator           = document.querySelector(".color .color-indicator");
const backgroundColorButton    = document.querySelector(".background-color");
const backgroundColorIndicator = document.querySelector(".background-color .color-indicator");
const toggleEraser             = document.querySelector(".eraser");
const toggleRainbow            = document.querySelector(".rainbow");

// modify color indicator colors
colorIndicator.style.backgroundColor           = currentColor;
backgroundColorIndicator.style.backgroundColor = currentBackgroundColor;

// event listeners
colorButton.addEventListener("click", () => {
    mode = "color";
    changeColor();
    colorIndicator.style.backgroundColor = currentColor;
});

backgroundColorButton.addEventListener("click", () => {
    changeBgColor();
    backgroundColorIndicator.style.backgroundColor = currentBackgroundColor;
    createGrid();
});

toggleEraser.addEventListener("click", () => {
    mode = "erase";
})

toggleRainbow.addEventListener("click", () => {
    mode = "rainbow";
})

// track mouse state
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function createGrid() {
    grid.innerHTML = "";
    let size = slider.value;
    for (let i = 0; i < size; i++) {
        let row = document.createElement("div");
        row.style.display = "flex";

        for (let j = 0; j < size; j++) {
            let pixel = document.createElement("div");

            pixel.style.border          = "solid black 1px";
            pixel.style.flex            = "1 1 auto";
            pixel.style.aspectRatio     = "1 / 1";
            pixel.style.backgroundColor = currentBackgroundColor;

            pixel.onmousedown = pixel.onmouseover = function(event) {
                if (event.type === 'mouseover' && !mouseDown) return;

                if      (mode === "color")   color.call(this);
                else if (mode === "erase")   erase.call(this);
                else if (mode === "rainbow") rainbowColor.call(this);
            };

            row.append(pixel);
        }
        grid.append(row);
    }
}

function color() {
    this.style.backgroundColor = currentColor;
}

function erase() {
    this.style.backgroundColor = currentBackgroundColor;
}

function rainbowColor() {
    let min         = 0;
    let max         = colors.length - 1;
    let randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;

    this.style.backgroundColor = colors[randomIndex];
}

function changeColor() {
    currentColorIndex++;
    currentColor = colors[(currentColorIndex) % colors.length];
}

function changeBgColor() {
    currentBgColorIndex++;
    currentBackgroundColor = colors[(currentBgColorIndex) % colors.length];
}