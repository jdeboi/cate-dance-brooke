/*
* p5.mapper
* Gif on quad surface
* 
* Jenna deBoisblanc
* jdeboi.com
* 11/16/2021
* 
*/

let pMapper;
let quadMap;

let gifs = [];
let isPlaying = false;

let myFont;
let currentIndex = 0;

let maskImg;
let pg;

function preload() {
    myFont = loadFont('assets/Roboto.ttf');
    // for (let i = 0; i < 12; i++) {
    //     gifs[i] = loadImage("assets/" +  i + ".gif");
    // }
    gifs[0] = loadImage("assets/" +  6 + ".gif");
    maskImg = loadImage("assets/mask2.png");
    // video.hide();
}

function change() {
    if (frameCount % (60*4) === 0) {
        currentIndex++;
        currentIndex %= gifs.length;
        console.log(currentIndex)
    }
}
function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);

    textFont(myFont);

    pMapper = createProjectionMapper(this);
    quadMap = pMapper.createQuadMap(gifs[0].width, gifs[0].height);
    pMapper.load("maps/map.json");

    for (const gif of gifs) {
        gif.play();
    }
    maskImg.resize(width, height);
    gifs[0].resize(width, height);
    pg = createGraphics(maskImg.width, maskImg.height);
    noCursor();
}

function draw() {
    background(0);

    // displayFrameRate();

    // quadMap.clear();
    // quadMap.translate(-quadMap.width / 2, -quadMap.height / 2);

    // quadMap.image(gif, 0, 0);
    // quadMap.noFill();

  

    translate(-width/2, -height/2);
    // gifs[currentIndex].mask(maskImg);
    image(gifs[currentIndex], 0, 0, width, height);
    image(maskImg, 0, 0, width, height);
    // change();
}

function keyPressed() {
    switch (key) {
        case 'c':
            pMapper.toggleCalibration();
            break;
        case 'f':
            let fs = fullscreen();
            document.getElementById("header").style.display = "none";
            fullscreen(!fs);
            break;
        case 'l':
            pMapper.load("maps/map.json");
            break;

        case 's':
            pMapper.save("map.json");
            break;
    }
}

function mousePressed() {
    isPlaying = true;
    // video.play();
    // gifs.play();
    pMapper.onClick();
}

function mouseDragged() {
    pMapper.onDrag();
}

function mouseReleased() {
    pMapper.onRelease();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function displayFrameRate() {
    fill(255);
    noStroke();
    text(round(frameRate()), -width / 2 + 20, -height / 2 + 20);
}