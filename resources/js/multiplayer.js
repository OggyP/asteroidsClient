const params = new URLSearchParams(document.location.search);
const playerAmt = params.get("players"); // is the string "Jonathan"

const validGameModes = ['2', '3', '4']

if (!playerAmt || validGameModes.includes(playerAmt))
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

ws.onmessage = (ev) => {
    try {
        const message = JSON.parse(ev.data);

        console.log(message)

        if (message.type === 'queue') {
            $("#text-display-h1").text(message.data.display)
        }
    } catch (e) {
        console.log(e)
    }
}