const start = document.getElementById("start");
const colors = ['red','green','blue'];
const green = document.getElementById('green');
const blue = document.getElementById('blue');
const red = document.getElementById('red');
const score = document.getElementById("score");
const msg = document.getElementsByTagName("h2")[0];
const click = new Audio("audio/pop-39222.mp3");
const win = new Audio("audio/shine-11-268907.mp3");
const loose = new Audio("audio/fart-83471.mp3");
const table = document.getElementsByTagName("table")[0];
const formBox = document.getElementsByClassName("msg")[0];
const form = formBox.getElementsByTagName("form")[0];
//

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
        start: 'mouseenter',
        end: 'mouseleave',
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
        await sleep(700);
        element.classList.remove(`active-${color}`);
        await sleep(700);
    }
}

function removeEL(){
    
    red.removeEventListener("click", red.handler );
    // red.removeEventListener(FLAGS.start,rs);
    // red.removeEventListener(FLAGS.end,re);

    blue.removeEventListener("click", blue.handler );
    // blue.removeEventListener(FLAGS.end, be );
    // blue.removeEventListener(FLAGS.start, bs );

    green.removeEventListener("click", green.handler );
    // green.removeEventListener(FLAGS.start, gs );
    // green.removeEventListener(FLAGS.end, ge );
    
    
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
        red.addEventListener("click", red.handler = () => clickHandler(red));
        blue.addEventListener("click", blue.handler = () => clickHandler(blue));
        green.addEventListener("click", green.handler = () => clickHandler(green));


        // red.addEventListener(FLAGS.start, rs = () => {red.classList.add(`active-red`)});
        // red.addEventListener(FLAGS.end, re = () => {red.classList.remove(`active-red`)});
        // blue.addEventListener(FLAGS.start, bs = () => {blue.classList.add(`active-blue`)});
        // blue.addEventListener(FLAGS.end, be = () => {blue.classList.remove(`active-blue`)});
        // green.addEventListener(FLAGS.start, gs = () => {green.classList.add(`active-green`)});
        // green.addEventListener(FLAGS.end, ge = () => {green.classList.remove(`active-green`)});

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


async function stopGame(){
    removeEL();
    const data = await fetchHighScore();
    lastHighestScore = data[2].score;
    let topLevel = level
    if (lastHighestScore < level-2) {
        await updateHighScore(topLevel)
    }
    console.log("you lose");
    score.innerHTML = "0";
    start.innerHTML = "Play Again";
    level = 2;
    msg.innerHTML = "Game Over Try Again";
    start.style.display = "block";
}

async function displayHighScores(){
    const data = await fetchHighScore();
    for (let i = 0;i < data.length;i++) {
        let tr = document.createElement("tr");
        let tdName = document.createElement("td")
        let tdScore = document.createElement("td")
        tdName.innerHTML = data[i].player_name;
        tdScore.innerHTML = data[i].score;
        tr.appendChild(tdName);
        tr.appendChild(tdScore);
        table.appendChild(tr);
    }
}

async function updateHighScore(topLevel){
    formBox.style.opacity = "1";
    addEventListener("submit", async (e) => {
        let name = form.getElementsByTagName("input")[0].value;
        console.log("name : " + name);
        e.preventDefault();
        if (name.length < 25) {
            await saveScore(name,topLevel-2);
        }else{
            alert("NoNoNoNo")
        }
        formBox.style.opacity = "0";
    })
}

displayHighScores();
startGame();
