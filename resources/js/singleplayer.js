players.push({
        colour: 'red',
        position: {
            x: 1,
            y: 0.5
        },
        facing: 0,
        turnMomentum: 0,
        amunition: amoAmount,
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

// Arrow key movement. Repeat key five times a second
//
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