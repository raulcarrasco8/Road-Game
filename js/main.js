



let nivel = 0;
let lastSide = "left"; // último borde alcanzado ("left" o "right")
let obstacleDelay = 2000;
let intervalId;
let obstacleSpeed = 1;



function updateLevelUI() {
    const el = document.getElementById("score");
    if (el) el.innerText = "Nivel: " + nivel;
}

//Si hay un intervalo, lo cancelamos
function startNextLevel() {
    if (intervalId) clearInterval(intervalId);


    const augmentLevels = 3;i
    if (nivel % augmentLevels === 0 && obstacleDelay > 500) { // límite inferior de 500ms
        obstacleDelay -= 200; // disminuye el delay, más frecuencia
        console.log(`Nivel ${nivel}: nuevo delay ${obstacleDelay}ms`);
    }


    intervalId = setInterval(() => {
        // Generamos 1 o 2 obstáculos aleatorios por intervalo
        const obstaclesToGenerate = Math.floor(Math.random() * 2) + 1; // 1 o 2
        const usedLanes = []; // esto nos assegura de no poner los obstaculos en el mismo carril


            //Bucle donde generamos obstaculos
        for (let i = 0; i < obstaclesToGenerate; i++) {
            let lane;
            do {
                lane = lanes[Math.floor(Math.random() * lanes.length)];
            } while (usedLanes.includes(lane)); //elige un carril aleatorio y repite mientras ya haya sido usado
            usedLanes.push(lane);

            const newObstacle = new Obstacle(lane, obstacleSpeed);
            obstaclesArr.push(newObstacle); // añadimos el obstaculo al arr global para que se mueva y podamos detectar colision.
        }
    }, obstacleDelay);
}

updateLevelUI(); // inicializa UI


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

    checkCrossing() {
        // Si llega al borde izquierdo y antes estaba en la derecha -> suma nivel
        if (this.positionX <= 0 && lastSide === "right") {
            nivel++;
            lastSide = "left";
            updateLevelUI();
            increaseDifficulty();
        }

        // Si llega al borde derecho y antes estaba en la izquierda -> suma nivel
        if (this.positionX + this.width === 100 && lastSide === "left") {
            nivel++;
            lastSide = "right";
            updateLevelUI();
            increaseDifficulty();
        }
    }



    // este if nos permite marcar limite para no salir el player por el borde izquierdo

    moveLeft() {
        if (this.positionX > 0) {
            this.positionX -= 10;
            this.userInterface()
            this.checkCrossing()
        } else {
            // Si intentas moverte y ya estás en el borde, también comprobamos
            this.checkCrossing()
        }
    }
    moveRight() { // este if nos permite no salirnos del board por la parte derecha
        if (this.positionX + this.width < 100) {
            this.positionX += 10;
            this.userInterface()
            this.checkCrossing()
        } else {
            this.positionX = 100 - this.width;
            this.userInterface();
            this.checkCrossing()
        }

    }
    moveUp() {
        if (this.positionY + this.height < 90) {
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
    constructor(x, speed = obstacleSpeed) {

        this.width = 10;
        this.height = 10;
        this.positionX = x;
        this.positionY = 100 - (this.height);
        this.speed = speed;
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
        this.positionY-= this.speed;
        this.updateUi()
    }
}

// Hace que la dificultad augmente cada 3 niveles

function increaseDifficulty() {
    const augmentLevels = 3; // cada 3 niveles
    if (nivel % augmentLevels === 0) {
        obstacleSpeed += 0.5; // aumenta la velocidad
        startNextLevel();
    }
}

const obstaclesArr = [] // guardamos instancias de la clase Obstacle

const lanes = [20, 30, 40, 50, 60, 70, 80];
// aqui creamos los obstaculos

updateLevelUI();
startNextLevel(); // inicia la cración de obstaculos con la velocidad y delay que toca


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



