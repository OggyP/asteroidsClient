function drawPlayer(player) {
    drawSinglePlayer(player)

    offsets.forEach((offset) => {
        const playerClones = {
            colour: player.colour,
            facing: player.facing,
            position: {
                x: player.position.x + offset[0],
                y: player.position.y + offset[1]
            }
        }
        if ((player.position.x > -0.2 && player.position.x < 2.2) && (player.position.y > -0.2 && player.position.y < 1.2))
            drawSinglePlayer(playerClones)
    })
}

function drawBullet(bullet) {
    const pixPos = {
        x: bullet.position.x * canvasSize.y,
        y: bullet.position.y * canvasSize.y
    }

    const dir = bullet.facing

    const drawRadius = 0.02 * canvasSize.y

    ctx.beginPath();
    ctx.beginPath();
    ctx.lineWidth = canvasSize.y * lineWidth * 3
    ctx.strokeStyle = 'white';
    ctx.moveTo(pixPos.x, pixPos.y) // Centre
    ctx.lineTo(pixPos.x + (Math.sin(dir) * drawRadius), pixPos.y + (Math.cos(dir) * drawRadius)); // Foward
    ctx.stroke();
}

const startAmoAngle = Math.PI - 1
const amoAngleChange = -0.2
const amoAmount = 3

let amoDispalyVectors = []
for (let i = 0; i < amoAmount; i++) {
    amoDispalyVectors.push({
        x: Math.sin(startAmoAngle + (amoAngleChange * i)),
        y: Math.cos(startAmoAngle + (amoAngleChange * i))
    })
}

function drawSinglePlayer(player) {
    const pixPos = {
        x: player.position.x * (canvasSize.x / 2),
        y: player.position.y * canvasSize.y
    }

    const dir = player.facing

    const playerRadius = playerSize * canvasSize.y - 2

    ctx.beginPath();
    ctx.lineWidth = canvasSize.y * lineWidth
    ctx.strokeStyle = player.colour;
    ctx.fillStyle = 'black';
    ctx.arc(pixPos.x, pixPos.y, playerRadius + 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.lineWidth = canvasSize.y * lineWidth
    ctx.strokeStyle = player.colour;
    ctx.fillStyle = player.colour;
    ctx.moveTo(pixPos.x, pixPos.y) // Centre
    ctx.lineTo(pixPos.x + (Math.sin(dir + Math.PI * -0.75) * playerRadius), pixPos.y + (Math.cos(dir + Math.PI * -0.75) * playerRadius)); //Left
    ctx.lineTo(pixPos.x + (Math.sin(dir) * playerRadius), pixPos.y + (Math.cos(dir) * playerRadius)); // Foward
    ctx.lineTo(pixPos.x + (Math.sin(dir + Math.PI * 0.75) * playerRadius), pixPos.y + (Math.cos(dir + Math.PI * 0.75) * playerRadius)); // Right
    ctx.lineTo(pixPos.x, pixPos.y) // Centre
    ctx.fill()

    const amoDrawSize = 0.005 * canvasSize.y

    // Draw Amo Remaining
    ctx.fillStyle = 'white';
    for (let i = 0; i < player.ammunition; i++)
        ctx.fillRect(
            pixPos.x + amoDispalyVectors[i].x * (playerRadius * 1.4) - 2,
            pixPos.y + amoDispalyVectors[i].y * (playerRadius * 1.4) - 2,
            amoDrawSize, amoDrawSize) // fill in the pixel at (10,10)

    ctx.stroke();
}

function drawAsteroid(asteroid) {
    drawSingleAsteroid(asteroid)

    for (let i = 0; i < offsets.length; i++) {
        const offset = offsets[i]
        if (!asteroid.allOffsetRender && (
                (offset[0] !== 0 && Math.sign(-offset[0]) === asteroid.startPos.x) ||
                (offset[1] !== 0 && Math.sign(-offset[1]) === asteroid.startPos.y))) {} else {
            let asteroidClone = {
                // colour: player.colour,
                direction: asteroid.direction,
                size: asteroid.size,
                facing: asteroid.facing,
                drawInfo: asteroid.drawInfo,
                position: {
                    x: asteroid.position.x + offset[0],
                    y: asteroid.position.y + offset[1]
                }
            }
            if ((asteroidClone.position.x > -0.2 && asteroidClone.position.x < 2.2) && (asteroidClone.position.y > -0.2 && asteroidClone.position.y < 1.2))
                drawSingleAsteroid(asteroidClone)
        }
    }
}

function drawSingleAsteroid(asteroid) {


    const pixPos = {
        x: asteroid.position.x * canvasSize.y,
        y: asteroid.position.y * canvasSize.y
    }

    // // Show bounding box
    // ctx.beginPath();
    // ctx.lineWidth = canvasSize.y * lineWidth
    // ctx.strokeStyle = 'black';
    // ctx.fillStyle = 'black';
    // ctx.arc(pixPos.x, pixPos.y, asteroid.size * canvasSize.y, 0, 2 * Math.PI);
    // ctx.fill()
    // ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = canvasSize.y * lineWidth
    ctx.strokeStyle = 'white';

    ctx.moveTo(
        pixPos.x + (Math.sin(asteroid.facing + asteroid.drawInfo[0].angle) * (asteroid.size + asteroid.drawInfo[0].size) * canvasSize.y),
        pixPos.y + (Math.cos(asteroid.facing + asteroid.drawInfo[0].angle) * (asteroid.size + asteroid.drawInfo[0].size) * canvasSize.y)
    )

    for (let i = 1; i < asteroid.drawInfo.length; i++) {
        const info = asteroid.drawInfo[i]
        ctx.lineTo(
            pixPos.x + (Math.sin(asteroid.facing + info.angle) * (asteroid.size + info.size) * canvasSize.y),
            pixPos.y + (Math.cos(asteroid.facing + info.angle) * (asteroid.size + info.size) * canvasSize.y)
        )
    }

    ctx.lineTo(
        pixPos.x + (Math.sin(asteroid.facing + asteroid.drawInfo[0].angle) * (asteroid.size + asteroid.drawInfo[0].size) * canvasSize.y),
        pixPos.y + (Math.cos(asteroid.facing + asteroid.drawInfo[0].angle) * (asteroid.size + asteroid.drawInfo[0].size) * canvasSize.y)
    )

    ctx.stroke();
}