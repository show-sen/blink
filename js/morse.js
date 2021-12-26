
function giveProb(prob) {
    prob.toUpperCase();
    document.getElementById("problem").innerHTML = prob;
    document.getElementById("encode").innerHTML = "";
    MorseProblems = [];
    Array.prototype.forEach.call(prob, function (letter) {
        document.getElementById("encode").innerHTML += encodemap[letter] + ' / ';
        MorseProblems.push(encodemap[letter]);
    });

}

function recogMorse() {
    window.clearTimeout(Morsetimer);
    betweenTime = document.getElementById("betweenTime").value;
    Morsetimer = setTimeout(function () {
        if (decodemap[MorseCode] == "delete") document.getElementById("text").value = document.getElementById("text").value.slice(0, -1);
        else if (decodemap[MorseCode] != undefined) document.getElementById("text").value += decodemap[MorseCode];
        if (MorseProblems[0] == MorseCode) {
            MorseProblems.shift();

            tmp = document.getElementById("problem").innerHTML;
            document.getElementById("problem").innerHTML = tmp.slice(1);

            tmp = document.getElementById("encode").innerHTML;
            tmp = tmp.substring(tmp.indexOf('/') + 1);
            tmp = tmp.slice(1);
            document.getElementById("encode").innerHTML = tmp;
        } else {
            buzzer.pause();
            buzzer.currentTime = 0;
            buzzer.play();
        }
        if (MorseProblems.length == 0) giveProb(problems[getRandomInt(problems.length)]);
        document.getElementById("last").innerHTML = "last morse decode ---->" + MorseCode + "   to   " + decodemap[MorseCode];
        document.getElementById("display").innerHTML = "";
        MorseCode = "";
    }, 1000 * betweenTime);
}

function push_TelegraphKey() {
    if (timer == 0) {
    b.classList.add('active');
    audio.volume = 0.5;
    audio.play();
        timer = setInterval(function () {
            if (audio.ended) {
                audio.volume = 0.5;
                audio.currentTime = 1;
                audio.play();
            }
            recogMorse();
            count++;
            second = count / 100;
        }, 10);
    }
}

function pop_TelegraphKey() {
    if (count) {
        b.classList.remove('active');
        audio.pause();
        audio.currentTime = 0;
        clearInterval(timer);
        timer = 0;

        dotTime = document.getElementById("dotTime").value;
        if (second < dotTime) {
            MorseCode += '・';
            document.getElementById("display").innerHTML += '・';
        } else {
            MorseCode += '－';
            document.getElementById("display").innerHTML += '－';
        }
        r.textContent = (count / 100) + '秒長押しされました';
        count = 0;
    }
}

