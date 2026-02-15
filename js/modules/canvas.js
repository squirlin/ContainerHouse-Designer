// canvas.js

// Initialize the canvas
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Variables to control rendering
let animationFrameId;

// Function to clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Drawing function
function draw() {
    clearCanvas();
    // Add your drawing logic here, for example:
    ctx.fillStyle = 'blue';
    ctx.fillRect(50, 50, 100, 100);
    // Request the next animation frame
    animationFrameId = requestAnimationFrame(draw);
}

// Start the rendering loop
function startRendering() {
    draw();
}

startRendering();