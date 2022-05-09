const deadColours = ['#600c00', '#0f0d53', '#015500', '#4f1476']

function gameTick() {
    // console.log('game tick')
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    updateAsteroids()

    let allPlayersDead = true

    let ownBulletsNum = 0

    for (let j = 0; j < bullets.length; j++) {
        const bullet = bullets[j]
        if (bullet.player === ownPlayerNum) {
            ownBulletsNum++
        }
        if (updateBullet(bullet))
            bullets.splice(j, 1)
    }

    players[ownPlayerNum].ammunition = amoAmount - ownBulletsNum

    for (let i = 0; i < players.length; i++) {
        const player = players[i]

        if (!player.alive) player.colour = deadColours[i]
        else allPlayersDead = false
        drawPlayer(player)

        if (player.alive) {
            player.facing += players[i].turnMomentum
            player.turnMomentum *= turnFriction

            player.position.x += players[i].movementVector.x
            player.position.y += players[i].movementVector.y
            player.movementVector.x *= accelerationFriction
            player.movementVector.y *= accelerationFriction

            const newPos = positionOnScreen(player.position)
            if (newPos[0])
                player.position = newPos[0]

            let collieded = false

            for (let j = 0; j < asteroids.length; j++) {
                const asteroid = asteroids[j]
                if (differentInPosSqu(player.position, asteroid.position) < (playerSize + asteroid.size) ** 2)
                    collieded = true
            }
            if (collieded)
                collision(i)
        }
    }

    if (allPlayersDead) {
        clearInterval(gameTickInterval)
        if (spamServerInterval) clearInterval(spamServerInterval)
        sendServerPlayerInfo()
        $("#text-display-h1").text("Game Over")
        $(".reload-page").show()
    }
}

function updateBullet(bullet) {
    drawBullet(bullet)

    bullet.position.x += bullet.movementVector.x
    bullet.position.y += bullet.movementVector.y

    const newPos = positionOnScreen(bullet.position)
    if (newPos[0])
        bullet.position = newPos[0]

    bullet.lifeTime += 1

    let killBullet = false

    if (ownPlayerNum === 0)
        for (let j = 0; j < asteroids.length; j++) {
            const asteroid = asteroids[j]
            if (differentInPosSqu(bullet.position, asteroid.position) < asteroid.size ** 2) {
                killBullet = true
                asteroids.splice(j, 1)
                console.log(asteroid.asteroidLevel)
                if (asteroid.asteroidLevel > 0) {
                    const angleOffsets = [-0.2, 0.2]
                    angleOffsets.forEach(offset => {
                        const actualSize = asteroidSizes[asteroid.asteroidLevel - 1]
                        const angle = Math.atan2(asteroid.direction.y, asteroid.direction.x)
                        const speed = Math.hypot(asteroid.direction.y, asteroid.direction.x)
                        let direction = {
                            x: (Math.random() / 2) + speed / 2 * Math.cos(angle + offset),
                            y: (Math.random() / 2) + speed / 2 * Math.sin(angle + offset)
                        }

                        if (asteroid.startPos.x !== 0)
                            direction.x = -asteroid.startPos.x * Math.abs(direction.x)
                        if (asteroid.startPos.y !== 0)
                            direction.y = -asteroid.startPos.y * Math.abs(direction.y)


                        const testAsteroid = {
                            position: {
                                x: asteroid.position.x,
                                y: asteroid.position.y
                            },
                            direction: direction,
                            size: actualSize,
                            asteroidLevel: asteroid.asteroidLevel - 1,
                            startPos: {
                                x: asteroid.startPos.x,
                                y: asteroid.startPos.y
                            },
                            allOffsetRender: asteroid.allOffsetRender,
                            drawInfo: getRandomAsteroidAngles(actualSize),
                            spin: asteroid.spin,
                            facing: Math.random()
                        }
                        console.log(offset, testAsteroid)
                        asteroids.push(testAsteroid)
                    })
                }

                break
            }
        }

    if (bullet.lifeTime > bulletLifeTime)
        killBullet = true

    return killBullet
}