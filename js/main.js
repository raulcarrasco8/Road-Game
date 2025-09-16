

class Player {
    constructor() {

        this.width = 10;
        this.height = 10;
        this.positionX = 0;
        this.positionY = 50 - (this.height / 2);


        this.userInterface()
    }
}

class Obstacle {
    constructor() {

        this.width = 15;
        this.height = 15;
        this.positionX = 50;
        this.positionY = 100;
    }
}


userInterface() {
    const playerElm = document.getElementById("player")
    playerElm.style.left = this.positionX + "vw"
    playerElm.style.bottom = this.positionY + "vh"
    playerElm.style.width = this.width + "vw"
    playerElm.style.height = this.height + "vh"
}

moveLeft() {
    if (this.positionX > 0) {
        this.positionX--;
        this.userInterface()
    }   // este if nos permite marcar limite para no salir el player por el borde izquierdo
}
moveRight() {
    if (this.positionX + this.width < 100) {
        this.positionX++;
        this.userInterface()
    }  // este if nos permite no salirnos del board por la parte derecha

}


const player = new Player()

document.addEventListener('keydown', (movement) => {
    if (movement.code === "ArrowLeft") {
        player.moveLeft()
    } else if (movement.code === "ArrowRight") {
        player.moveRight()
    }
})


