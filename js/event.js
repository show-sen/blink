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

function randomProblem() {
    giveProb(problems[getRandomInt(problems.length)]);
}

function getProblem(){
    giveProb(document.getElementById("input").value);
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
        document.getElementById("recogS").innerHTML = "not recognition now";
    }else if(recog == false){
        recog = true;
        document.getElementById("recogS").innerHTML = "recognition now";
    }
}