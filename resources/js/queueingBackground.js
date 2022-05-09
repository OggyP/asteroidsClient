const background = $("#asteroid-background")
const asteroidAmt = 20

players = []

for (let i = 0; i < asteroidAmt; i++) {
    generateNewAsteroid(Math.floor(Math.random() * 3.999))
}

canvasSize = {
    x: $(window).width(),
    y: $(window).height(),
}

canvas.setAttribute('width', canvasSize.x);
canvas.setAttribute('height', canvasSize.y);
canvas.style.width = canvasSize.x;
canvas.style.height = canvasSize.y;

function backgroundTick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateAsteroids();
}

// On resize
window.addEventListener("resize", function() {
    getCanvasResolutionAndUpdate()
});

setInterval(backgroundTick, 10)