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
let bullets = []

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

// Testing
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

let canvasSize = {
    x: 100,
    y: 100
}


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
}

// On resize
window.addEventListener("resize", function() {
    getCanvasResolutionAndUpdate()
});

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

function Fire() {
    if (players[0].amunition <= 0) return
    players[0].amunition -= 1
    bullets.push({
        position: {
            x: players[0].position.x + Math.sin(players[0].facing) * playerSize,
            y: players[0].position.y + Math.cos(players[0].facing) * playerSize
        },
        movementVector: {
            x: Math.sin(players[0].facing) * bulletSpeed + players[0].movementVector.x,
            y: Math.cos(players[0].facing) * bulletSpeed + players[0].movementVector.y
        },
        facing: players[0].facing,
        lifeTime: 0,
    })
}

function Turn(amt) {
    players[0].turnMomentum += amt
}

function Accelerate(amt) {
    players[0].movementVector.x += amt * Math.sin(players[0].facing)
    players[0].movementVector.y += amt * Math.cos(players[0].facing)
}


// Arrow key movement. Repeat key five times a second
//
KeyboardController({
    37: function() { Turn(turnSpeed); }, // Left
    39: function() { Turn(-turnSpeed); }, // Right
    38: function() { Accelerate(acceleration); }, // Up
    // 32: function() { Fire() } // Space Bar
}, 10);

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