const start = document.getElementById("start");
const colors = ['red','green','blue'];
const green = document.getElementById('green');
const blue = document.getElementById('blue');
const red = document.getElementById('red');
const score = document.getElementById("score");
const msg = document.getElementsByTagName("h2")[0];
const compareArrays = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
};
const sleep = (ms)=> {
    return new Promise(resolve => setTimeout(resolve, ms));
}


let level = 2;
let playerMove =[];



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
        if (color === "red") {
            red.classList.add("active-red");
            setTimeout(() => {
                red.classList.remove('active-red');
            }, 1000);
        }
        if (color === "blue") {
            blue.classList.add("active-blue");
            setTimeout(() => {
                blue.classList.remove('active-blue');
            }, 1000);
        }
        if (color === "green") {
            green.classList.add("active-green");
            setTimeout(() => {
                green.classList.remove('active-green');
            }, 1000);
        }
        await sleep(1700)
    }
}
function addEL(machineMove,playerMove){
    msg.innerHTML = " Your turn ";
    red.addEventListener("click", red.handler = () => {
        playerMove.push(red.getAttribute("value"));
        if (playerMove.length === level){
            check(machineMove,playerMove);
        }
    })
    blue.addEventListener("click",blue.handler = () => {
        playerMove.push(blue.getAttribute("value"));
        if (playerMove.length === level){
            check(machineMove,playerMove);
        }
    })
    green.addEventListener("click",green.handler = () => {
        playerMove.push(green.getAttribute("value"));
        if (playerMove.length === level){
            check(machineMove,playerMove);
        }
    })
}
function removeEL(){
    red.removeEventListener("click", red.handler );
    blue.removeEventListener("click", blue.handler );
    green.removeEventListener("click", green.handler );
}

function check(playerMove,machineMove){
    removeEL();
    msg.innerHTML = "Simon Says";
    console.log(playerMove,machineMove)
    if(compareArrays(playerMove,machineMove)){
        console.log("you won");
        level++;
        let int = parseInt(score.innerHTML);
        int += 1;
        score.innerHTML = int;
        playerMove =[];
        main(level);
    }else{
        console.log("you lose");
        score.innerHTML = 0;
        level = 2 ;
        playerMove =[];
    }
}

async function main(level){
    
    let machineMove = generateMachineMove(level);
    displayMachineMove(machineMove);
    await new Promise(resolve => setTimeout(resolve, level*2700));
    addEL(machineMove,playerMove);
}