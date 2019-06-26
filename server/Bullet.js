const Entity = require("./Entity.js");

class Bullet extends Entity {
	constructor(angle) {
		super(Math.random());
		this.speedX = Math.cos((angle / 180) * Math.PI) * 10;
        this.speedY = Math.sin((angle / 180) * Math.PI) * 10;
        
		this.remove = false;
		this.timer = 0;
		Bullet.list[this.id] = this;
	}

	updatePosition() {
        if (this.timer > 100) this.remove = true;
        else this.timer++;
        super.update();
	}

	static update() {
		let pack = [];
		for (const i in Bullet.list) {
			let bullet = Bullet.list[i];
			bullet.update();
			pack.push({
				x: bullet.x,
				y: bullet.y
			});
		}
		return pack;
	}
}

module.exports = Bullet;
