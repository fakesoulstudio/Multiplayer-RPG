const Entity = require("./Entity.js");
const Bullet = require("./Bullet.js");

class Player extends Entity {
	constructor(id) {
		super(id);
		this.moveUp = false;
		this.moveDown = false;
		this.moveLeft = false;
        this.moveRight = false;
        this.maxSpeed = 2;

        this.attack = false;
        this.mouseAngle = 0;

        Player.list[id] = this;
    }
    
    update() {
        this.updateSpeed();
        super.update();

        if (this.attack == true)
        this.shoot(this.mouseAngle);
    }

	updateSpeed() {
        if (this.moveUp == true) this.speedY = -this.maxSpeed;
        else if (this.moveDown == true) this.speedY = this.maxSpeed;
        else this.speedY = 0;
        
        if (this.moveLeft == true) this.speedX = -this.maxSpeed;
        else if (this.moveRight == true) this.speedX = this.maxSpeed;
        else this.speedX = 0;
    }
    
    shoot(angle) {
        let b = new Bullet(angle);
        b.x = this.x;
        b.y = this.y;
    }

    static users() {
        let users = 0;
        for(let i in Player.list) users++;
        return users;
    }
    
    static onConnection(socket) {
        let player = new Player(socket.id);
        let users  = Player.users();
        console.log("[INFO] ".cyan + `A user connected. // users connected ${users.toString().green}`.gray);
        socket.on("keyPress", data => {
			if (data.inputID === "up") player.moveUp = data.state;
			else if (data.inputID === "down") player.moveDown = data.state;
			else if (data.inputID === "right") player.moveRight = data.state;
            else if (data.inputID === "left") player.moveLeft = data.state;
            
            if (data.inputID === "attack") player.attack = data.state;
            if (data.inputID === "mouseAngle") player.mouseAngle = data.state;
		});
    }

    static onDisconnect(socket){
        delete Player.list[socket.id];
        let users  = Player.users();
        console.log("[INFO] ".cyan + `User disconnected. // users left ${users}`.gray);
    }

    static update(){
        let pack = [];
		for (const i in Player.list) {
			let player = Player.list[i];
			player.update();
			pack.push({
				x: player.x,
				y: player.y
			});
        }
        return pack;
    }
}

module.exports = Player;
