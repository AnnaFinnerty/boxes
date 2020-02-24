function ai(name){
    this.name = name;
}

ai.prototype.play = function(pieces,selectedLines){
    console.log(this.name + "'s turn")
}
