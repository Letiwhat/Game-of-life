class Grass{
    constructor(x, y) {
    this.x = x;
    this.y = y;
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

    findNeighbors(character) {
        var found = [];
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

    mul(){
        this.maturity++
        let emptyCells = this.findNeighbors(0);
        let newCell = random(emptyCells);
        if (newCell && this.maturity >= 2) {
            let newX = newCell[0];
            let newY = newCell[1];

        matrix[newY][newX] = 1;

        let grass = new Grass(newX, newY);
        grassArr.push(grass);
        this.maturity = 0;
        }
    }

    crescer_relva(){
        for(let i=0; i<grassArr.length; i++){
        grassArr[i].mul();
        }
    }


}


    