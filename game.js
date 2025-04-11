import { CelestialBody } from './celestialBody.js';
import { zoom_to_scale } from './constant_defs.js';
import system_dict from './system_dict.js';

// Variables for pause/play and speed control
let isPaused = false;
let speedMultiplier = 1;

let gameDate = new Date('March 10, 2112 00:00:00'); // Initial game date

// Variables for pan and zoom
// let scale = 1;
let zoom = 3; // Initial zoom level
let translatePos = { x: 0, y: 0 };
let lastTouchDistance = null;
let lastTouchPosition = null;

// Variables for mouse and touch events
let camera = {'x': 0, 'y': 0}; // Camera position
let selectedBody = null; // Variable to store the selected celestial body

// Resize canvas and adjust center
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  centerX = canvas.width / 2;
  centerY = canvas.height / 2;
}

function gameLoop(focus, lastTime, ctx) {
    const currentTime = Date.now();
    const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds

    // Clear the canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    focus.update(deltaTime); // Update the focus celestial body

    draw(focus, ctx); // Draw the focus celestial body and its satellites

    // Request the next frame
    requestAnimationFrame(() => gameLoop(focus, currentTime, ctx));
    
}

function draw(focus, ctx) {
    // Draw the celestial body and its satellites
    focus.draw(ctx, focus);
}

export function initGame(focus, ctx) {
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    let sun = new CelestialBody(
        system_dict['name'],
        system_dict['color'],
        system_dict['mass'],
        system_dict['radius'],
        system_dict['orbit_radius'],
        system_dict['orbital_period'],
        system_dict['type'],
        system_dict['satellites'],
        null, // No parent for the sun
        0
    );
    const lastTime = Date.now();
    gameLoop(sun, lastTime, ctx); // Start the game loop
}