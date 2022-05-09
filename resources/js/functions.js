function getCanvasResolutionAndUpdate() {
    let newWidth = Math.min(($(window).height() * 2) - 50, $(window).width() - 50)
    canvasSize = {
        x: newWidth,
        y: (newWidth / 2)
    }

    canvas.setAttribute('width', canvasSize.x);
    canvas.setAttribute('height', canvasSize.y);
    canvas.style.width = canvasSize.x;
    canvas.style.height = canvasSize.y;

    console.log('update')
}

function updateAsteroids() {
    for (let i = 0; i < asteroids.length; i++) {
        const asteroid = asteroids[i]

        drawAsteroid(asteroid)

        asteroid.position.x += asteroid.direction.x * asteroidMovementSpeed
        asteroid.position.y += asteroid.direction.y * asteroidMovementSpeed

        asteroid.facing += asteroid.spin

        const newPos = positionOnScreen(asteroid.position, asteroid.startPos)
        if (newPos[0]) {
            asteroid.position = newPos[0]
            if ((asteroid.startPos.x && newPos[1][0]) || (asteroid.startPos.y && newPos[1][1]))
                asteroid.allOffsetRender = true
        }
    }

}

function Fire() {
    const player = players[ownPlayerNum]
    if (player.ammunition <= 0) return
    player.ammunition -= 1
    const playerSpeed = Math.hypot(player.movementVector.x, player.movementVector.y)
    player.bullets.push({
        position: {
            x: player.position.x + Math.sin(player.facing) * playerSize,
            y: player.position.y + Math.cos(player.facing) * playerSize
        },
        movementVector: {
            x: Math.sin(player.facing) * (bulletSpeed + playerSpeed),
            y: Math.cos(player.facing) * (bulletSpeed + playerSpeed)
        },
        facing: player.facing,
        lifeTime: 0,
    })
}

function Turn(amt) {
    const player = players[ownPlayerNum]
    player.turnMomentum += amt
}

function Accelerate(amt) {
    const player = players[ownPlayerNum]
    player.movementVector.x += amt * Math.sin(player.facing)
    player.movementVector.y += amt * Math.cos(player.facing)
}