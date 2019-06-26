function server(io) {
	const Player = require("./Player.js");
	const Bullet = require("./Bullet.js");
	const SOCKET_LIST = {};

	Bullet.list = {};
	Player.list = {};

	io.sockets.on("connection", socket => {
		socket.id = Math.floor(Math.random() * 10000);
		SOCKET_LIST[socket.id] = socket;

		Player.onConnection(socket);

		socket.on("disconnect", () => {
			delete SOCKET_LIST[socket.id];
			Player.onDisconnect(socket);
		});
	});

	setInterval(() => {
		let pack = {
			player: Player.update(),
			bullet: Bullet.update()
		};
		
		for (let i in SOCKET_LIST) {
			let socket = SOCKET_LIST[i];
			socket.emit("newPositions", pack);
		}
	}, 1000 / 60);
}

module.exports = server;
