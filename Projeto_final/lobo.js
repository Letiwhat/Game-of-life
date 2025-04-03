class Lobo{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 8; 
        this.maturity = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y ],
            [this.x + 1, this.y ],
            [this.x - 1, this.y + 1],
            [this.x , this.y + 1],
            [this.x + 1, this.y + 1]
            ];
        }

 // novas direções para andar
    updateDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    findNeighbors(character) {
        var found = [];
        this.updateDirections();
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            //console.log(x, y)
            if(x >= 0 && x < 40 && y >= 0 && y < 40 && matrix[y][x] == character ) {
                found.push(this.directions[i]);
            }
        }
        return found;
    }
    move() {
        this.energy--;
        let possibleMoves = this.directions.filter(([newX, newY]) => {
            return newX >= 0 && newX < 40 && newY >= 0 && newY < 40 && matrix[newY][newX] !== 4;
        });
        console.log(possibleMoves)

        if (possibleMoves.length > 0) {
            let [newX, newY] = random(possibleMoves);

            if (matrix[newY][newX] == 0) {
                matrix[this.y][this.x] = 0;
            } else if (matrix[newY][newX] == 1) {
                matrix[this.y][this.x] = 1;
            }

            matrix[newY][newX] = 3;

            this.x = newX;
            this.y = newY;
        }
    }

    // Eat grass
    eat() {
        let herbivoroCells = this.findNeighbors(2);
        if (herbivoroCells.length > 0) {
            let herbivoro = random(herbivoroCells);
            let herbivoroX = herbivoro[0];
            let herbivoroY = herbivoro[1];

            for (let i = 0; i < herbivoroArr.length; i++) {
                if (herbivoroArr[i].x === herbivoroX && herbivoroArr[i].y === herbivoroY) {
                    herbivoroArr.splice(i, 1);
                    console.log("Comeu uma ovelha");
                    break;
                }
            }

            matrix[this.y][this.x] = 0;
      
            matrix[herbivoroY][herbivoroX] = 3;

            this.x = herbivoroX;
            this.y = herbivoroY;

            this.energy += 5;
        } else {
            this.move();
        }
    }

    reproduzir(){
        let emptyCells = this.findNeighbors(0); 
        if (emptyCells.length > 0) {
            let newCell = random(emptyCells);
            let newX = newCell[0];
            let newY = newCell[1];

        matrix[newY][newX] = 3;
        loboArr.push(new Lobo(newX, newY));
        }
    }
    //Sem energia
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            return true;
        }
        return false;
    }


}