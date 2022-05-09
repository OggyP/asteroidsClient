function checkSupported() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        return true
            // Canvas is supported
    } else {
        // Canvas is not supported
        alert("We're sorry, but your browser does not support the canvas tag. Please use any web browser other than Internet Explorer.");
        return false
    }
}

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
let players = []
let asteroids = []

let ownPlayerNum = 0

// Game Constants
const gameTickTime = 10 //ms
const amoRestockCooldown = 500 //ms
const playerSize = 0.035 //amt of the screen
const playerSizeSquared = (playerSize ** 2) //% of the screen
const acceleration = 0.00006 // movement change per game tick
const accelerationFriction = 0.99 // movement change per game tick
const turnSpeed = 0.003 // radians
const turnFriction = 0.92
const lineWidth = 0.002
const asteroidMovementSpeed = 0.0015
const bulletSpeed = 0.004 // Added to ship speed
const bulletLifeTime = 300

let canvasSize = {
    x: 100,
    y: 100
}

const offsets = [
    [-2, 0],
    [2, 0],
    [-2, -1],
    [-2, 1],
    [2, -1],
    [2, 1],
    [0, -1],
    [0, 1]
]


// const offsets = [
//     [-0.5, 0],
//     [0.5, 0],
//     [-0.5, -0.5],
//     [-0.5, 0.5],
//     [0.5, -0.5],
//     [0.5, 0.5],
//     [0, -0.5],
//     [0, 0.5]
// ]


function differentInPosSqu(pos1, pos2) {
    let lowestLength = differentInPosSquRaw(pos1, pos2)

    for (let i = 0; i < offsets.length; i++) {
        const offset = offsets[i]
        const checkPos = {
            x: pos1.x + offset[0],
            y: pos1.y + offset[1]
        }
        if ((checkPos.x > -0.2 && checkPos.x < 2.2) && (checkPos.y > -0.2 && checkPos.y < 1.2)) {
            const distance = differentInPosSquRaw(checkPos, pos2)
            if (distance < lowestLength)
                lowestLength = distance
        }
    }
    return lowestLength
}

function differentInPosSquRaw(pos1, pos2) {
    return ((pos1.x - pos2.x) ** 2) + ((pos1.y - pos2.y) ** 2)
}

function documentLoad() {
    if (!checkSupported())
        return

    getCanvasResolutionAndUpdate()
}

function positionOnScreen(pos, ignore) {
    let update = false
    let updateX = false
    let updateY = false
    if (pos.x < 0 && (!ignore || ignore.x !== -1)) {
        pos.x = 2 + pos.x
        update = true
        updateX = true
    } else if (pos.x > 2 && (!ignore || ignore.x !== 1)) {
        pos.x = pos.x - 2
        update = true
        updateX = true
    }

    if (pos.y < 0 && (!ignore || ignore.y !== -1)) {
        pos.y = 1 + pos.y
        update = true
        updateY = true
    } else if (pos.y > 1 && (!ignore || ignore.y !== 1)) {
        pos.y = pos.y - 1
        update = true
        updateY = true
    }

    if (update)
        return [pos, [updateX, updateY]]
    else
        return false
}




function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}