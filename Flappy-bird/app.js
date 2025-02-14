const canvas = document.querySelector('canvas');
const wcanvas = canvas.width = 400
const hcanvas = canvas.height = 700
const ctx = canvas.getContext('2d');
const scoreGame = document.querySelector('.score-game');
const soundImg = document.querySelector('.soundImg');
const line = document.querySelector('.line');
const soundUtama = document.querySelector('.sound-utama');
const inputUsername = document.querySelector('.input-username');
const btnStart = document.querySelector('.btn-start');
const popupScreen = document.querySelector('.popup-screen');
const popupPause = document.querySelector('.popup-pause');

const soundPoint = document.querySelector('.sound-point');
const soundDie = document.querySelector('.sound-die');
const popupGameOver = document.querySelector('.popup-gameOver');
const usernameGameOver = document.querySelector('.username-gameOver');
const scoreGameOver = document.querySelector('.score-gameOver');
const btnStartGameOver = document.querySelector('.btn-start-gameOver');
const btnStartPause = document.querySelector('.btn-start-pause');
const popupTimerScreen = document.querySelector('.popup-timerScreen');
const timer = document.querySelector('#timer');

const popupLeadeboard = document.querySelector('.popup-leadeboard');
const btnClose = document.querySelector('.btn-close');
const btnLeadeboard = document.querySelector('.btn-leadeboard');
const btnLeadeboardGO = document.querySelector('.btn-leadeboard-gameOver');
const btnLeadeboardPause = document.querySelector('.btn-leadeboard-pause');
const colContent = document.querySelector('.col-content');




const pauseIcon = document.querySelector('.pauseIcon');




let wBird = 45
let hBird = 35
let velocity = 0
const birdImg = new Image();
let arrImgBird = [
    "./assets/flappybird0.png",
    "./assets/flappybird1.png",
    "./assets/flappybird2.png",
    "./assets/flappybird3.png",

];
let soundClick = false;
soundImg.addEventListener('click', function () {
    if (!soundClick) {
        soundUtama.play()
        soundUtama.currentTime = 0
        // soundUtama.volume='0.5'
        line.style.display = 'none'
        soundClick = true
    }
    else if (soundClick) {
        line.style.display = 'flex'
        soundUtama.pause()
        soundClick = false
    }
})
let isUsername = false;
inputUsername.value = ""
inputUsername.addEventListener('change', function () {
    if (inputUsername.value == "") {
        isUsername = false
    } else {
        isUsername = true

    }
})


btnLeadeboard.addEventListener('click', function () {
    popupLeadeboard.style.display = 'flex'
    colContent.innerHTML="";
    let data=JSON.parse(localStorage.getItem('data'));
    if (!data) {
        colContent.innerHTML = `<div class="tidak-ada-data">Tidak ada data</div>`;

    }
    data.sort((a,b)=>b.score-a.score);
    data.forEach((item,index)=>{
        colContent.innerHTML += `<div class="box-content">
            <div class="box-nomer">${index+1}</div>
            <div class="username-leadeboard">${item.username}</div>
            <div class="col-score-leadeboard">
                <img src="assets/piala.png" width="20" alt="">
                    <div class="text-score">${item.score}</div>
            </div>
        </div>`
    })

})
btnLeadeboardGO.addEventListener('click', function () {
    popupLeadeboard.style.display = 'flex'
    colContent.innerHTML = "";
    let data = JSON.parse(localStorage.getItem('data'));
    if (!data) {
        colContent.innerHTML = `<div class="tidak-ada-data">Tidak ada data</div>`;

    }
    data.sort((a, b) => b.score - a.score);
    data.forEach((item, index) => {
        colContent.innerHTML += `<div class="box-content">
            <div class="box-nomer">${index + 1}</div>
            <div class="username-leadeboard">${item.username}</div>
            <div class="col-score-leadeboard">
                <img src="assets/piala.png" width="20" alt="">
                    <div class="text-score">${item.score}</div>
            </div>
        </div>`
    })
})
btnLeadeboardPause.addEventListener('click', function () {
    popupLeadeboard.style.display = 'flex'
    colContent.innerHTML = "";
    let data = JSON.parse(localStorage.getItem('data'));
    if (!data) {
        colContent.innerHTML = `<div class="tidak-ada-data">Tidak ada data</div>`;

    }
    data.sort((a, b) => b.score - a.score);
    data.forEach((item, index) => {
        colContent.innerHTML += `<div class="box-content">
            <div class="box-nomer">${index + 1}</div>
            <div class="username-leadeboard">${item.username}</div>
            <div class="col-score-leadeboard">
                <img src="assets/piala.png" width="20" alt="">
                    <div class="text-score">${item.score}</div>
            </div>
        </div>`
    })
})
btnClose.addEventListener('click', function () {
    popupLeadeboard.style.display = 'none'
})
btnStart.addEventListener('click', function () {
    if (isUsername) {
        popupScreen.style.display = 'none'
        popupTimerScreen.style.display = 'flex';

        let timerCount = 3
        timer.innerHTML = timerCount

        let int
        int = setInterval(() => {
            timerCount--
            timer.innerHTML = timerCount
        }, 1000);
        setTimeout(() => {
            popupTimerScreen.style.display = 'none';
            main();
            clearInterval(int)
        }, 3000);
    }
})

let score = 0
scoreGame.innerHTML = score
let xBird = 50
const topPipeImg = new Image();
topPipeImg.src = "./assets/toppipe.png"
topPipeImg.onload = () => {
    drawTopPipe();
}
const bottomPipeImg = new Image();
bottomPipeImg.src = "./assets/bottompipe.png"
bottomPipeImg.onload = () => {
    drawBottomPipe();
}
btnStartGameOver.addEventListener('click', function () {
    restartGame();
    popupGameOver.style.display = 'none'

})
let intervalPipe;
let arrPipe = [];
function startIntervalPipe() {
    intervalPipe = setInterval(() => {
        let hRandTop = Math.floor(Math.random() * 500);
        let yRandBottom = hRandTop + 180
        arrPipe.push({ x: 450, h: hRandTop, y: yRandBottom })
        drawTopPipe();
        drawBottomPipe()
        console.log(arrPipe);
    }, 2000);
}

function drawTopPipe() {
    arrPipe.forEach((arr, item) => {
        ctx.drawImage(topPipeImg, arr.x, 0, 80, arr.h);
        if (!gameOverStatus) {
            arr.x -= 2

        }
    })
}
function drawBottomPipe() {
    arrPipe.forEach((arr, item) => {
        ctx.drawImage(bottomPipeImg, arr.x, arr.y, 80, 750);
        if (!gameOverStatus) {
            arr.x -= 2

        }

    })
}
let gameOverStatus = false
pauseIcon.addEventListener('click', function () {
    popupPause.style.display = 'flex';
    pauseGame();
})
btnStartPause.addEventListener('click', function () {
    resumeGame();
    popupPause.style.display = 'none';

})
function pauseGame() {
    clearInterval(intervalPipe)
    clearInterval(animationBird)
}
function resumeGame() {
    popupTimerScreen.style.display = 'flex';

    let timerCount = 3
    timer.innerHTML = timerCount

    let int
    int = setInterval(() => {
        timerCount--
        timer.innerHTML = timerCount
    }, 1000);
    setTimeout(() => {
        popupTimerScreen.style.display = 'none';
        startIntervalPipe()
        startAnimationBird()
        clearInterval(int)
    }, 3000);

}
function gameOver() {
    clearInterval(intervalPipe)
    clearInterval(animationBird)
    gameOverStatus = true
    let dataOld = JSON.parse(localStorage.getItem('data') || "[]");
    let newData = { username: inputUsername.value, score: scoreGame.innerHTML }
    dataOld.push(newData);
    localStorage.setItem('data', JSON.stringify(dataOld));
    soundDie.play();
    soundDie.currentTime = '0'
    usernameGameOver.innerHTML = inputUsername.value
    scoreGameOver.innerHTML = scoreGame.innerHTML
    setTimeout(() => {
        arrPipe = [];

        popupGameOver.style.display = 'flex'
    }, 1500);
}



let yBird = 50
let frame = 0
let animationBird
function startAnimationBird() {
    animationBird = setInterval(() => {
        ctx.clearRect(0, 0, wcanvas, hcanvas);
        frame++
        if (frame >= arrImgBird.length) {
            frame = 0
        }
        birdImg.src = arrImgBird[frame]
        velocity += 1
        yBird += velocity
        drawTopPipe()
        drawBottomPipe()
        drawBird();

        arrPipe.forEach((arr, item) => {
            if (yBird < arr.h && xBird > arr.x && xBird < arr.x + 80 || yBird > arr.y && xBird > arr.x && xBird < arr.x + 80) {
                gameOver()
                startIntervalAnimasiGameOver()
            } else if (yBird > arr.h && xBird > arr.x && xBird < arr.x + 5 || yBird < arr.y && xBird > arr.x && xBird < arr.x + 5) {
                score += 1
                scoreGame.innerHTML = score
                soundPoint.play();
                soundPoint.currentTime = "0"
            }
        })

    }, 30);
}
let intervalAnimasiGameOver;
function startIntervalAnimasiGameOver() {
    intervalAnimasiGameOver = setInterval(() => {
        ctx.clearRect(0, 0, wcanvas, hcanvas);
        velocity = -10
        yBird -= velocity

        drawTopPipe()
        drawBottomPipe()
        drawBird()
        clearInterval(intervalPipe)
    }, 30);
}
birdImg.onload = () => {
    drawBird();
}
function drawBird() {
    ctx.drawImage(birdImg, xBird, yBird, wBird, hBird);
}
function restartGame() {
    yBird = 50
    frame = 0
    score = 0;
    scoreGame.innerHTML = '0'
    velocity = 0
    arrPipe = [];
    gameOverStatus = false
    clearInterval(intervalAnimasiGameOver)
    popupTimerScreen.style.display = 'flex';

    let timerCount = 3
    timer.innerHTML = timerCount

    let int;
    int = setInterval(() => {

        timerCount--
        timer.innerHTML = timerCount
    }, 1000);
    setTimeout(() => {
        popupTimerScreen.style.display = 'none';
        startIntervalPipe();
        startAnimationBird()
        clearInterval(int)
    }, 3000);

}
function main() {
    drawBird();
    startAnimationBird()
    document.addEventListener('keyup', function (e) {
        if (e.key == " ") {

            velocity = -10
        }
    });

    canvas.addEventListener('click', function () {
        velocity = -10

    })
    drawTopPipe()
    drawBottomPipe()
    startIntervalPipe()
}
// main();