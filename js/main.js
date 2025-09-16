

class Player {
    constructor() {

        this.width = 10;
        this.height = 10;
        this.positionX = 0;
        this.positionY = 50;

        this.userInterface();
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
            this.positionX -= 10;
            this.userInterface()
        }   // este if nos permite marcar limite para no salir el player por el borde izquierdo
    }
    moveRight() {
        if (this.positionX + this.width < 100) {
            this.positionX += 10;
            this.userInterface()
        }  // este if nos permite no salirnos del board por la parte derecha

    }
    moveUp() {
        if (this.positionY + this.height < 100) {
            this.positionY += 10;
            this.userInterface()
        }
    }
    moveDown() {
        if (this.positionY > 0) {
            this.positionY -= 10;
            this.userInterface()
        }
    }
}


const player = new Player() // damos movimiento al player hacia todos los lados

document.addEventListener('keydown', (movement) => {
    if (movement.code === "ArrowLeft") {
        player.moveLeft()
    } else if (movement.code === "ArrowRight") {
        player.moveRight()
    } else if (movement.code === "ArrowUp") {
        player.moveUp()
    } else if (movement.code === "ArrowDown")
        player.moveDown()
})



class Obstacle {
    constructor(x) {

        this.width = 10;
        this.height = 10;
        this.positionX = x;
        this.positionY = 100 - (this.height);
        this.ObstacleElm = null

        this.createDomObstacle()
        this.updateUi()
    }

    createDomObstacle() {
        this.ObstacleElm = document.createElement('div')

        this.ObstacleElm.className = "obstacle"

        const parentElm = document.getElementById("board")
        parentElm.appendChild(this.ObstacleElm)
    }
    updateUi() {
        this.ObstacleElm.style.left = this.positionX + "vw"
        this.ObstacleElm.style.bottom = this.positionY + "vh"
        this.ObstacleElm.style.width = this.width + "vw"
        this.ObstacleElm.style.height = this.height + "vh"
    }
    moveDown() {
        this.positionY--
        this.updateUi()
    }
}




const obstaclesArr = [] // guardamos instancias de la clase Obstacle


const lanes = [20, 30, 40, 50, 60, 70, 80];
// aqui creamos los obstaculos
setInterval(() => {
    const randomLane = lanes[Math.floor(Math.random() * lanes.length)];
    const newObstacle = new Obstacle(randomLane);
    obstaclesArr.push(newObstacle);
}, 2000);


// Actualiza los obstaculos
setInterval(() => {
    obstaclesArr.forEach((obstacleInstance) => {

        //muevo el obstaculo
        obstacleInstance.moveDown()

        //Detecto colision
        if (player.positionX < obstacleInstance.positionX + obstacleInstance.width &&
            player.positionX + player.width > obstacleInstance.positionX &&
            player.positionY < obstacleInstance.positionY + obstacleInstance.height &&
            player.positionY + player.height > obstacleInstance.positionY
        ) {

            console.log("game over.")
            location.href = "gameover.html"

        }
    })
}, 50)



