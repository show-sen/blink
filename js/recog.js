window.onload = async function init() {
    //const modelURL = URL + "model.json";
    //const metadataURL = URL + "metadata.json";
    const modelURL = "https://show-sen.github.io/blink/my_model/model.json";
    const metadataURL = "https://show-sen.github.io/blink/my_model/metadata.json";
    //const modelURL = "https://show-sen.github.io/openmouth/my_model1/model.json";
    //const metadataURL = "https://show-sen.github.io/openmouth/my_model1/metadata.json";


    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(300, 300, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append elements to the DOM
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    graphContainer = document.getElementById("graph-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
        graphContainer.appendChild(document.createElement("div"));
        graphContainer.childNodes[i].classList.add("graph");
    }
}
//
async function loop() {
    webcam.update(); // update the webcam frame
    await predict();

    window.requestAnimationFrame(loop);//goto loop
}



// run the webcam image through the image model
async function predict() {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);

    for (let i = 0; i < maxPredictions; i++) {
        lastLPF[i] = LPF[i];
        LPF[i] = (1 - k) * lastLPF[i] + k * prediction[i].probability.toFixed(2);

        const classPrediction =
            prediction[i].className + ": " + prediction[i].probability.toFixed(2);

        if (LPF[i].toPrecision(2) > 0.01) labelContainer.childNodes[i].innerHTML = prediction[i].className + ": " + LPF[i].toPrecision(2);
        else labelContainer.childNodes[i].innerHTML = prediction[i].className + ": " + 0.00;
        graphContainer.childNodes[i].style.width = (LPF[i].toPrecision(2)*140).toString() + 'px';

    }
    if (recog) {
        if (LPF[1] >= 0.80 && lastLPF[1] < 0.70) {
            push_TelegraphKey();
        }

        if (LPF[1] < 0.80 && lastLPF[1] >= 0.70) {
            pop_TelegraphKey();
        }
    }
}
