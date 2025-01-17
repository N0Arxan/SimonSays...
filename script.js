let start = document.getElementById("start");
const colors = ['red','green','blue'];
const green = document.getElementById('green');
const blue = document.getElementById('blue');
const red = document.getElementById('red');
let level = 1;
let playerNumMove = 0;
let playerMove = [];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms)); // Fixed sleep function
}

function generateMachineMove(num){
    let machineMove = [];
    for (let i = 0;i < num;i++){
        let randomElem = colors[Math.floor(Math.random() * colors.length)];
        machineMove.push(randomElem);
    }
    return machineMove;
}

async function displayMachineMove(array = ["red", "blue", "green"]) {
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
function addEL(){
    red.addEventListener("click", red.handler = () => {
        playerMove.push(red.getAttribute("value"));
        playerNumMove++
    })
    blue.addEventListener("click",blue.handler = () => {
        playerMove.push(blue.getAttribute("value"));
        playerNumMove++
    })
    green.addEventListener("click",green.handler = () => {
        playerMove.push(green.getAttribute("value"));
        playerNumMove++
    })
}
function removeEL(){
    red.removeEventListener("click", red.handler );
    blue.removeEventListener("click", blue.handler );
    green.removeEventListener("click", green.handler );
}