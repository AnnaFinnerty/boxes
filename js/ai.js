function ai(name){
    this.name = name;
}

ai.prototype.play = function(){
    console.log(this.name + "'s turn")
}
