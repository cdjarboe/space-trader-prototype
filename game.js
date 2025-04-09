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
    const lastTime = Date.now();
    gameLoop(focus, lastTime, ctx); // Start the game loop
}