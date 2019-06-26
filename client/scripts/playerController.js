canvas.font = "30px Arial";

document.onkeydown = function(event) {
    if(event.keyCode === 68) socket.emit('keyPress', {inputID: "right", state: true})
    else if(event.keyCode === 83) socket.emit('keyPress', {inputID: "down", state: true})
    else if(event.keyCode === 65) socket.emit('keyPress', {inputID: "left", state: true})
    else if(event.keyCode === 87) socket.emit('keyPress', {inputID: "up", state: true});
};


document.onkeyup = function(event) {
    if(event.keyCode === 68) socket.emit('keyPress', {inputID: "right", state: false})
    else if(event.keyCode === 83) socket.emit('keyPress', {inputID: "down", state: false})
    else if(event.keyCode === 65) socket.emit('keyPress', {inputID: "left", state: false})
    else if(event.keyCode === 87) socket.emit('keyPress', {inputID: "up", state: false});
};

document.onmousedown = function (event) {
    socket.emit('keyPress', { inputID: 'attack', state: true });
}

document.onmouseup = function (event) {
    socket.emit('keyPress', { inputID: 'attack', state: false });
}

document.onmousemove = function (event) {
    let x = 75 + event.clientX - 8;
    let y = 75 + event.clientY - 8;
    let angle = Math.atan2(y,x) / Math.PI * 180;
    socket.emit('keyPress', { inputID: 'mouseAngle', state: angle });
}

socket.on("newPositions", data => {
	canvas.clearRect(0, 0, 1360, 720);
	for (let i = 0; i < data.player.length; i++) {
		canvas.fillText("P", data.player[i].x, data.player[i].y);
    }
    
    for (let i = 0; i < data.bullet.length; i++) {
		canvas.fillRect(data.bullet[i].x - 5, data.bullet[i].y - 5, 5, 5);
	}
});