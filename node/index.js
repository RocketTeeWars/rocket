var rocket = require("./rocketlauncher.js");
var io     = require("socket.io")(80);

rocket.command("connect");

io.on("connection", function(socket) {
    console.log("NEW CONNECTION from client");
    socket.on("left", function() {
        rocket.command("left");
        console.log("RECEIVED COMMAND 'left' from client");
    });
    socket.on("right", function() {
        rocket.command("right");
        console.log("RECEIVED COMMAND 'right' from client");
    });
    socket.on("up", function() {
        rocket.command("up");
        console.log("RECEIVED COMMAND 'up' from client");
    });
    socket.on("down", function() {
        rocket.command("down");
        console.log("RECEIVED COMMAND 'down' from client");
    });
    socket.on("fire", function() {
        rocket.command("fire");
        console.log("RECEIVED COMMAND 'fire' from client");
    });
    socket.on("stop", function() {
        rocket.command("stop");
        console.log("RECEIVED COMMAND 'stop' from client");
    });
});

console.log("LISTENTING to clients");