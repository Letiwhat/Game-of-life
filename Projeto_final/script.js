var matrix = [];
var side = 40;
var grassArr,
    emptyCells,
    loboArr,
    herbivoroArr,
    rioArr;
let sessions = 0;
let numLobos = 7;
let sheepImg, wolfImg;
let aguas = 40;


function preload() {
    sheepImg = loadImage('images/ovelha.png');
    wolfImg = loadImage('images/lobo.png');
}

function setup() {
    grassArr = [];
    herbivoroArr = [];
    loboArr = [];
    rioArr = [];

    //pôr zeros e depois relva
    for (let y = 0; y < side; y++) {
        matrix[y] = [];
        for (let x = 0; x < side; x++) {
            matrix[y][x] = 0;
        }
    }

    //pôr relva
    for (let grassAdded = 0; grassAdded < 50; grassAdded++) {

        let x = Math.floor(random(0, side));
        let y = Math.floor(random(0, side));
        if (matrix[y][x] != 1) {
            matrix[y][x] = 1;
            grassArr.push(new Grass(x, y));

        }

    }
    //pôr água
        let x = Math.floor(random(0, side));
        let y = Math.floor(random(0, side));
        rioArr[0]=new Rio(x,y);
        for (let n = 0; n < aguas; n++) {
            console.log(rioArr[n])
            rioArr[n].spread();
        }
        
    //pôr herbívoros
    for (let herbivorosAdded = 0; herbivorosAdded < 20; herbivorosAdded++) {
        let x = Math.floor(random(0, side));
        let y = Math.floor(random(0, side));

        if (matrix[y][x] !== 2 && matrix[y][x]!==4) {
            matrix[y][x] = 2;
            herbivoroArr.push(new Herbívoro(x, y));
        }
    }


    for (let loboAdded = 0; loboAdded < numLobos; loboAdded++) {
        let x = Math.floor(random(0, side));
        let y = Math.floor(random(0, side));

        if (matrix[y][x] !== 3 && matrix[y][x]!==4) {
            matrix[y][x] = 3;
            loboArr.push(new Lobo(x, y));
        }
    }

    

    frameRate(1);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');


    emptyCells = [];
    for (let ind = 0; ind < grassArr.length; ind++) {
        var character = 0;
        var procura_espaco = grassArr[ind].findNeighbors(character);
        emptyCells.push(procura_espaco);
    }


    console.log("Matrix", matrix, "Todos os espaços verdes:", grassArr, "Células sem verde à volta : ", emptyCells);

}


function draw() {
    sessions++;
    console.log("Sessão", sessions, "Matrix", matrix, "Herbívoros", herbivoroArr.length);


    //crescer relva
    console.log("Relva", grassArr.length);
    if (sessions > 2 && grassArr.length < 600) {
        crescer_relva();
    }

    //herbivoros comportamento
    for (let i = herbivoroArr.length - 1; i >= 0; i--) {
        herbivoroArr[i].eat();
        if (herbivoroArr[i].die()) {
            herbivoroArr.splice(i, 1);
            //console.log("Morreu");
        }
    }

    for (let i = 0; i < herbivoroArr.length; i++) {
        if ((herbivoroArr[i].energy >= 15 || herbivoroArr.length < 10) && herbivoroArr.length < 80) {
            herbivoroArr[i].reproduzir();
            //console.log("Reproduziu uma ovelha")

        }
    }

    //lobos comportamento
    for (let i = loboArr.length - 1; i >= 0; i--) {
        loboArr[i].eat();
        if (loboArr[i].die()) {
            loboArr.splice(i, 1);
            i--; 
            //console.log("Morreu um lobo");
        }
    }
    //reproduzir lobos
    for (let i = 0; i < loboArr.length; i++) {
        if (loboArr[i].energy >= 15 && loboArr.length < 40) {
            loboArr[i].reproduzir();
            
            //console.log("Reproduziu um lobo")
        }
    }

    if ((loboArr.length == 0 || herbivoroArr.length > loboArr.length * 3) && loboArr.length < 40) {
        let x = Math.floor(random(0, side));
        let y = Math.floor(random(0, side));

        if (matrix[y][x] === 0) {
            matrix[y][x] = 3;
            loboArr.push(new Lobo(x, y));
            //console.log("Reproduziu um lobo")
        }
    }

    //desenhar
    for (let y = 0; y < side; y++) {
        for (let x = 0; x < side; x++) {
            fill("#acacac");
            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * 50, y * 50, 50, 50);
            } else if (matrix[y][x] == 2) {

                image(sheepImg, x * 50, y * 50, 50, 50);
            } else if (matrix[y][x] == 3) {
                image(wolfImg, x * 50, y * 50, 50, 50);
            }
            else if (matrix[y][x] == 4) {
                fill("blue");
                rect(x * 50, y * 50, 50, 50);
            } else {
                rect(x * 50, y * 50, 50, 50);
            }
        }
    }

}
