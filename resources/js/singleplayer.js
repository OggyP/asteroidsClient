players.push({
        colour: '#bf2c17',
        position: {
            x: 1,
            y: 0.5
        },
        bullets: [],
        facing: 0,
        turnMomentum: 0,
        ammunition: 3,
        movementVector: {
            x: 0,
            y: 0
        }
    })
    // End Testing

function collision() {
    clearInterval(gameTickInterval)
    $("#text-display-h1").text("Game Over")
    $(".reload-page").show()
}

let gameTickInterval = setInterval(gameTick, 10);

randomAsteroid();

KeyboardController({
    37: function() { Turn(turnSpeed); }, // Left
    39: function() { Turn(-turnSpeed); }, // Right
    38: function() { Accelerate(acceleration); }, // Up
    // 32: function() { Fire() } // Space Bar
}, 10);

// On resize
window.addEventListener("resize", function() {
    getCanvasResolutionAndUpdate()
});