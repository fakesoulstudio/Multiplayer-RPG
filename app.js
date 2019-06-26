const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const server = require('./server/server');
server(io)
require("colors");

let port = 3000;

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/client/index.html");
});

app.use("/client", express.static(__dirname + "/client"));

http.listen(port, () => {
	console.log("[INFO] ".cyan + `Server on port: ` + port.toString().green);
});
