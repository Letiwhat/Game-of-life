class Herbívoro{
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
        let emptyCells = this.findNeighbors(0);
        if (emptyCells.length > 0) {
            let newCell = random(emptyCells);
            let newX = newCell[0];
            let newY = newCell[1];

            if (matrix[newY][newX] !== 4) {
                matrix[this.y][this.x] = 0;
                matrix[newY][newX] = 2;

                this.x = newX;
                this.y = newY;
            }
        }
    }

    // Eat grass
    eat() {
        let grassCells = this.findNeighbors(1);
        if (grassCells.length > 0) {
            let grassCell = random(grassCells);
            let grassX = grassCell[0];
            let grassY = grassCell[1];

            matrix[this.y][this.x] = 0;
            matrix[grassY][grassX] = 2;

            for (let i = 0; i < grassArr.length; i++) {
                if (grassArr[i].x === grassX && grassArr[i].y === grassY) {
                    grassArr.splice(i, 1);
                    break;
                }
            }

            matrix[this.y][this.x] = 0;
            matrix[grassY][grassX] = 2;

            this.x = grassX;
            this.y = grassY;

            this.energy += 2;
        } else {
            this.energy--;
            this.move();
        
       
        }
    }

    // Reproduzir
    reproduzir(){

        let x = Math.floor(random(0, side));
        let y = Math.floor(random(0, side));
        if(matrix[y][x]!==4){
            matrix[y][x] = 2; 
            herbivoroArr.push(new Herbívoro(x, y));
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

