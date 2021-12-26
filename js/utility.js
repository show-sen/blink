function dot() {
    audio.play();
    recogMorse();
    tontimer = setTimeout(function () {
        audio.pause();
        audio.currentTime = 0;
        MorseCode += '・';
        document.getElementById("morse").innerHTML = MorseCode;
    }, 2500);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function printT(a){
    document.getElementById("test").innerHTML = a.toString();
}