// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// the link to your model provided by Teachable Machine export panel
const URL = "./my_model/";

let model, webcam, labelContainer,graphContainer, maxPredictions;
let tmp;
let dotTime = document.getElementById("dotTime").value;
let betweenTime = document.getElementById("betweenTime").value;
let count = 0, second, timer = 0;
const ua = navigator.userAgent.toLowerCase();
const b = document.getElementById('button');
const r = document.getElementById('r');
let LPF = [0.0, 0.0], lastLPF = [0.0, 0.0], k = 0.95;
let countBLINK = 0, playnow = 0, BLINKtimer, Morsetimer;
var audio = new Audio("sqare.wav");
audio.volume = 0.2;
var buzzer = new Audio("buzzer.mp3");
buzzer.volume = 0.2;
let MorseCode = "";
let MorseProblems = [];
let recog = false;
let decodemap = {
    "・－": "A",
    "－・・・": "B",
    "－・－・": "C",
    "－・・": "D",
    "・": "E",
    "・・－・": "F",
    "－－・": "G",
    "・・・・": "H",
    "・・": "I",
    "・－－－": "J",
    "－・－": "K",
    "・－・・": "L",
    "－－": "M",
    "－・": "N",
    "－－－": "O",
    "・－－・": "P",
    "－－・－": "Q",
    "・－・": "R",
    "・・・": "S",
    "－": "T",
    "・・－": "U",
    "・・・－": "V",
    "・－－": "W",
    "－・・－": "X",
    "－・－－": "Y",
    "－－・・": "Z",
    "・・・・・・・・": "delete",
    "・・・－－－・・・": "SOS"
};

let encodemap = {
    "A": "・－",
    "B": "－・・・",
    "C": "－・－・",
    "D": "－・・",
    "E": "・",
    "F": "・・－・",
    "G": "－－・",
    "H": "・・・・",
    "I": "・・",
    "J": "・－－－",
    "K": "－・－",
    "L": "・－・・",
    "M": "－－",
    "N": "－・",
    "O": "－－－",
    "P": "・－－・",
    "Q": "－－・－",
    "R": "・－・",
    "S": "・・・",
    "T": "－",
    "U": "・・－",
    "V": "・・・－",
    "W": "・－－",
    "X": "－・・－",
    "Y": "－・－－",
    "Z": "－－・・"
};

let problems = [
    "APPLE",
    "FISH",
    "TOMATO",
    "ENGLISH",
    "MAGE",
    "SQUID",
    "EXPLAIN",
    "SOUND",
    "BOTTLE",
    "ZONE",
    "AREA",
    "WATER",
    "KETER",
    "EUCLID",
    "SAFE",
    "MATTER",
    "YEAR",
    "SOS",
    "JULY",
    "KOREA",
    "VVV"
]