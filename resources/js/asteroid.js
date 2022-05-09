const startingTime = new Date()

function timeTillAsteroid(timeSinceStart) {
    return 1000 / (timeSinceStart + 100)
}

const asteroidSizes = [0.03, 0.06, 0.09, 0.12]

function randomAsteroid() {
    generateNewAsteroid(Math.floor(Math.random() * 3.999))

    const currentTime = new Date()

    const differenceInTime = (currentTime - startingTime) / 1000 * (1 + (players.length - 1) * 0.6)

    setTimeout(randomAsteroid, 1000 * timeTillAsteroid(differenceInTime))
}

function getRandomAsteroidAngles(actualSize) {
    let angleSum = 0

    let drawInfo = []

    while (true) {
        const angle = Math.random() + 0.05
        if (angle + angleSum > Math.PI * 2) {
            break
        }
        drawInfo.push({
            angle: angleSum + angle,
            size: (((Math.random() - 0.5) / 2) * actualSize)
        })
        angleSum += angle
    }

    drawInfo.push({
        angle: 0,
        size: (((Math.random() - 0.5) / 2) * actualSize)
    })

    return drawInfo
}

function generateNewAsteroid(size) {
    // console.log('asteroid added')

    let posToSpawn
    let validPosFound = false
    let direction
    let startPos

    const actualSize = asteroidSizes[size]

    while (!validPosFound) {
        console.log('test')
        if (Math.random() >= (2 / 3)) {
            // Top or bottom
            const xVal = Math.random() * 2
            const yVal = (Math.random() >= 0.5) ? -actualSize : 1 + actualSize
            posToSpawn = {
                x: xVal,
                y: yVal
            }
            direction = {
                x: Math.random() * 4 - 2,
                y: (Math.sign(yVal - 1) === -1) ? Math.random() * 2 : -Math.random() * 2
            }
            startPos = {
                x: 0,
                y: Math.sign(yVal - 0.5)
            }
        } else {
            // Left or right
            const xVal = (Math.random() >= 0.5) ? -actualSize : 2 + actualSize
            const yVal = Math.random()
            posToSpawn = {
                x: xVal,
                y: yVal
            }
            direction = {
                x: (Math.sign(xVal - 1) === -1) ? Math.random() * 2 : -Math.random() * 2,
                y: Math.random() * 4 - 2
            }
            startPos = {
                x: Math.sign(xVal - 1),
                y: 0
            }
        }
        if (players.length) {
            for (let i = 0; i < players.length; i++)
                if (differentInPosSqu(players[i].position, posToSpawn) <= 0.5)
                    continue
                else
                    validPosFound = true
        } else
            validPosFound = true

    }



    spinSpeed = (Math.random() - 0.5) / 50

    asteroids.push({
        position: posToSpawn,
        direction: direction,
        size: actualSize,
        asteroidLevel: size,
        startPos: startPos,
        allOffsetRender: false,
        drawInfo: getRandomAsteroidAngles(actualSize),
        spin: spinSpeed,
        facing: Math.random()
    })
}