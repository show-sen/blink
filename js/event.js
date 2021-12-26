b.addEventListener('mousedown', function (e) {
    e.preventDefault();
    push_TelegraphKey();
})

b.addEventListener('mouseup', function (e) {
    e.preventDefault();
    pop_TelegraphKey();
});

document.body.addEventListener("keydown", function (e) {
    if (e.keyCode == 16) {
        e.preventDefault();
        push_TelegraphKey();
    }
});

document.body.addEventListener("keyup", function (e) {
    if (e.keyCode == 16) {
        e.preventDefault();
        pop_TelegraphKey();
    }
});

function start() {
    giveProb(problems[getRandomInt(problems.length)]);
}

function webcamCtrl() {
    let w = document.getElementById("webcam-container");
    if (w.hidden == false) {
        w.hidden = true;
    } else if (w.hidden == true) {
        w.hidden = false;
    }
}

function recogSwitch(){
    if(recog == true){
        recog = false;
    }else if(recog == false){
        recog = true;
    }
}