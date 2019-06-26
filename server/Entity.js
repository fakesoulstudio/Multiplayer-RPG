class Entity {
	constructor(id) {
		this.x = 100;
		this.y = 100;
		this.id = id;
        this.speedX = 0;
        this.speedY = 0;
    }
    
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

module.exports = Entity;
