class Rio{
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

 // novas direções pra andar
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

    findNeighbors() {
        var found = [];
        this.updateDirections();
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            //console.log(x, y)
            if(x >= 0 && x < 40 && y >= 0 && y < 40) {
                if(matrix[y][x] !== 4){
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    spread(){
        let neighbors = this.findNeighbors(); 
        if (neighbors.length > 0){
            let randomNeighbor = random(neighbors);
            let newX = randomNeighbor[0];
            let newY = randomNeighbor[1];
            matrix[newY][newX] = 4; //4 representa a água
            rioArr.push(new Rio(newX, newY));
        }
    }
}