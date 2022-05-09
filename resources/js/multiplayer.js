const params = new URLSearchParams(document.location.search);
const playerAmt = params.get("players"); // is the string "Jonathan"

const validGameModes = ['2', '3', '4']

if (!playerAmt || !validGameModes.includes(playerAmt))
    window.location.href = '/multiPlayer?players=2'

const ws = new WebSocket('wss://api.oggyp.com/ws/asteroids/gameMode/' + playerAmt);

ws.onopen = (ev) => {
    $("#text-display-h1").text("")
    console.log("Connected to OggyP Asteroids Web Socket")
}

ws.onerror = (error) => {
    $("#text-display-h1").html("An Error Occoured Connecting To The Server. Is the url correct?<br>You can always play single player:")
    $(".single-player.button").show()
    console.log("Error connecting to OggyP Asteroids Web Socket", error)
}

let gameTickInterval = null
let spamServerInterval = null

function collision() {

}

ws.onmessage = (ev) => {
    try {
        const message = JSON.parse(ev.data);
        switch (message.type) {
            case ('queue'):
                $("#text-display-h1").text(message.data.display)
                break
            case ('gameFound'):
                $("#text-display-h1").text("")
                players = message.data.players
                ownPlayerNum = message.data.playerNum
                gameTickInterval = setInterval(gameTick, 10);
                spamServerInterval = setInterval(sendServerPlayerInfo, 20);
                KeyboardController({
                    37: function() { Turn(turnSpeed); }, // Left
                    39: function() { Turn(-turnSpeed); }, // Right
                    38: function() { Accelerate(acceleration); }, // Up
                    // 32: function() { Fire() } // Space Bar
                }, 10);
                if (ownPlayerNum === 0)
                    randomAsteroid();
                break
            case ('gameInfo'):
                const newPlayers = message.data.players
                for (let i = 0; i < newPlayers.length; i++)
                    if (ownPlayerNum !== i)
                        players[i] = newPlayers[i]
                if (ownPlayerNum !== 0) {
                    console.log(message.data.asteroids)
                    asteroids = message.data.asteroids
                }
            case ('error'):
                $("#text-display-h1").text(message.data.error)
        }
    } catch (e) {
        console.log(e)
    }
}

function sendToWs(ws, eventType, data) {
    let wsMsg = {}
    wsMsg.type = eventType
    if (data.constructor === Array) {
        wsMsg.data = {}
        data.forEach(item => {
            wsMsg.data[item[0]] = item[1]
        })
    } else {
        wsMsg.data = data
    }
    // console.log(JSON.stringify(wsMsg))
    ws.send(JSON.stringify(wsMsg))
}

function sendServerPlayerInfo() {
    sendToWs(ws, 'gameInfo', {
        players: players[ownPlayerNum],
        asteroids: asteroids
    })
}

// On resize
window.addEventListener("resize", function() {
    getCanvasResolutionAndUpdate()
});