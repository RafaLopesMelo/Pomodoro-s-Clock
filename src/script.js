const playButton = document.body.querySelector("img#play");
const resetButton = document.body.querySelector("#reset");
const timer = document.body.querySelector("main");
const WorkTimer = document.body.querySelector("#work");
const RestTimer = document.body.querySelector("#rest");
const longRest = document.body.querySelector("input#lRest")
const alarm = new Audio("../audio/alert.mp3");

let minTimerWork = 25;
let minTimerRest = 5;
let segTimerWork = 00;
let segTimerRest = 00;

let play = false;

WorkTimer.addEventListener("input", () => {
    if (play == false) {
        minTimerWork = document.body.querySelector("#work").value;
        segTimerWork = 00;
        timer.innerHTML = "<h1>" + minTimerWork + ":" + segTimerWork + "</h1>";
    }
})

RestTimer.addEventListener("input", () => {
    if (play == false) {

        segTimerRest = 00;
        minTimerRest = document.body.querySelector("#rest").value;
        
    }
})

playButton.addEventListener("click", () => {

    if (play == false) {

        playButton.src = "../imagens/pause.png";

        WorkTimer.readOnly = "true";
        RestTimer.readOnly = "true";

        play = true;

        if (minTimerWork >= 0 && segTimerWork >= 0) {

            work();

        } else {

            rest();

        }


    } else if (play == true) {

        playButton.src = "../imagens/play.png"

        WorkTimer.removeAttribute("readonly");
        if (longRest.checked == false){
        RestTimer.removeAttribute("readonly");
        }
        play = false;
    }
})


function work() {


    if (play == true && segTimerWork > 0 && minTimerWork >= 0) {
        setTimeout(() => {
            if (play == true) {

                --segTimerWork;

                timer.innerHTML = "<h1>" + minTimerWork + ":" + segTimerWork + "</h1>";

                work();
            }

        }, 1000);
    }
    else if (play == true && segTimerWork == 0) {

        segTimerWork = 60;

        minTimerWork--

        work();

    }
    else if (play == true) {

        segTimerRest = 0;

        minTimerRest = document.body.querySelector("#rest").value;

        alarm.play();

        rest();

    }
}

function rest() {

    if (play == true && segTimerRest > 0 && minTimerRest >= 0) {
        setTimeout(() => {
            if (play == true) {

                --segTimerRest

                timer.innerHTML = "<h1>" + minTimerRest + ":" + segTimerRest + "</h1>";

                rest();
            }
        }, 1000)
    }
    else if (play == true && segTimerRest == 0) {

        segTimerRest = 60;

        minTimerRest--;

        rest();

    }
    else if (play == true) {

        segTimerWork = 00;

        minTimerWork = document.body.querySelector("#work").value;

        alarm.play();

        work()
    }
}

resetButton.addEventListener("click", async () => {

    play = false;

    segTimerWork = 00;

    minTimerWork = document.body.querySelector("#work").value;

    minTimerRest = document.body.querySelector("#rest").value;

    segTimerRest = 0;

    timer.innerHTML = "<h1>" + minTimerWork + ":" + segTimerWork + "</h1>";

    playButton.src = "../imagens/play.png"

    work();
})

longRest.addEventListener("click", () => {

    if (longRest.checked == true) {

        RestTimer.value = 10;
        RestTimer.readOnly = true;

    } else {

        RestTimer.removeAttribute("readonly");

    }
})

