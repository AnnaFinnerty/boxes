function AI(name,allPieces,squaresAcross){
    this.name = name;
    this.allPieces = allPieces;
    this.squaresAcross = squaresAcross;
    console.log('ai all pices',allPieces);
    this.setup();
}

AI.prototype.setup = function(){
    const heatmap = [];
    for(let i = 0; i < this.squaresAcross; i++){
        const row = [];
        for(let j = 0; j < this.squaresAcross; j++){
            row.push(0);
        }
        heatmap.push(row);
    }
    return heatmap
} 

AI.prototype.play = function(pieces,selectedLines){
    console.log(this.name + "'s turn")
    if(this.selectedLines.length < 5){
        return this.playRandom(selectedLines); 
    }
    const emptyHeatmap = this.setup();
    const heatmapOne = this.heatmapOne(emptyHeatmap,pieces,selectedLines);
    console.log('heatmap 1',heatmapOne)
    return this.playRandom(selectedLines);
}

AI.prototype.heatmapOne = function(heatmap,pieces,selectedLines){
    for(let p in pieces){
        const x = p.split(",")[0];
        const y = p.split(",")[1];
        console.log(x,y)
        for(let i = 0; i < pieces[p]['edges'].length; i++){
            if(selectedLines.includes(pieces[p]['edges'][i])){
                heatmap[x][y] = heatmap[x][y] + 1;
            }
        }
    }
    return heatmap
}

AI.prototype.playRandom = function(selectedLines){
    const playablePieces = this.allPieces.filter((piece)=> !selectedLines.includes(piece))
    return this.randomFromArray(playablePieces);
}

AI.prototype.randomFromArray = function(arr){
    return arr[Math.floor(Math.random()*arr.length)]
}
