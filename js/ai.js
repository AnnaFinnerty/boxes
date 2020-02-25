function AI(name,allPieces){
    this.name = name;
    this.allPieces = allPieces;
}

AI.prototype.play = function(pieces,selectedLines){
    console.log(this.name + "'s turn")
}

AI.prototype.playRandom = function(pieces,selectedLines){
    console.log(this.name + " makes a random move");
    const playablePieces = this.allPieces.filter((piece)=> !selectedLines.includes(piece))
    return this.randomFromArray(playablePieces);
}

AI.prototype.randomFromArray = function(arr){
    return arr[Math.floor(Math.random()*arr.length)]
}
