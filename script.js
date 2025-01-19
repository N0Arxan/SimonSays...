const start = document.getElementById("start");
const colors = ['red','green','blue'];
const green = document.getElementById('green');
const blue = document.getElementById('blue');
const red = document.getElementById('red');
const score = document.getElementById("score");
const msg = document.getElementsByTagName("h2")[0];
const click = new Audio("pop-39222.mp3");
const win = new Audio("shine-11-268907.mp3");
const loose = new Audio("fart-83471.mp3");
const compareArrays = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
};
const sleep = (ms)=> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
if (navigator.userAgent.search('Mobile') > 0) {
    window.FLAGS = {
        start: 'touchstart',
        end: 'touchend',
        move: 'touchmove',
        click: 'click',
        touchScreen: true
    };
} else {
    window.FLAGS = {
        start: 'mousedown',
        end: 'mouseup',
        move: 'mousemove',
        click: 'click',
        touchScreen: false
    };
}

let level = 2;

function generateMachineMove(level){
    let machineMove = [];
    for (let i = 0;i < level;i++){
        let randomElem = colors[Math.floor(Math.random() * colors.length)];
        machineMove.push(randomElem);
    }
    return machineMove;
}

async function displayMachineMove(array = ["red", "blue", "green"]) {
    msg.innerHTML = "Look carefully ... ";
    for (const color of array) {
        const element = document.getElementById(color);
        element.classList.add(`active-${color}`);
        await sleep(1000);
        element.classList.remove(`active-${color}`);
        await sleep(1000);
    }
}

function removeEL(){
    red.removeEventListener("click", red.handler );
    blue.removeEventListener("click", blue.handler );
    green.removeEventListener("click", green.handler );
}




async function check(machineMove,playerMove){
    msg.innerHTML = "Simon Says";
    console.log(playerMove,machineMove)
    if(compareArrays(playerMove,machineMove)){
        console.log("you won");
        await win.play();
        level++;
        console.log(level);
        let int = parseInt(score.innerHTML);
        int += 1;
        score.innerHTML = int.toString();
        await playGame();
    }else{
        stopGame();
        await loose.play();
    }
}

async function playGame(){

    let playerMove = [];

    let machineMove = generateMachineMove(level);
    await displayMachineMove(machineMove);


    function addEL() {
        msg.innerHTML = "Your turn ...";
        removeEL();
        red.addEventListener("click", red.handler = () => clickHandler(red));
        blue.addEventListener("click", blue.handler = () => clickHandler(blue));
        green.addEventListener("click", green.handler = () => clickHandler(green));

        colors.forEach(color => {
            const element = document.getElementById(color);

            element.addEventListener(FLAGS.start, () => {
                element.classList.add(`active-${color}`);
            });

            element.addEventListener(FLAGS.end, () => {
                element.classList.remove(`active-${color}`);
            });
        });

    }



    addEL()

    async function clickHandler(color) {
        console.log("clicked");
        await click.play();
        playerMove.push(color.getAttribute("value"));
        if (playerMove.length === level) {
            removeEL();
            await check(machineMove,playerMove);
        }
    }
}


function startGame(){
    start.addEventListener("click", async () => {
        start.style.display = "none";
        await playGame();
    });
}
startGame();

function stopGame(){
    removeEL();
    console.log("you lose");
    score.innerHTML = "0";
    start.innerHTML = "Play Again";
    level = 2;
    msg.innerHTML = "Game Over Try Again";
    start.style.display = "block";
}