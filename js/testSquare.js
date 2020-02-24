function testSquare(selectedLines,piece){
    let matches = 0;
    for(let j = 0; j< piece['edges'].length; j++){
        if(selectedLines.includes(piece['edges'][j])){
            matches++;
        }
    }
    return matches
}