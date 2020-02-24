class App{
    constructor(){
        this.playerOneColor = "firebrick";
        this.playerTwoColor = "dodgerblue";
        this.playerOneGamesWon = 0;
        this.playerTwoGamesWon= 0;
        this.newGame()
    }
    gameWon = (isPlayerOneVictortious) => {
        if(isPlayerOneVictortious){
            this.playerOneGamesWon++
        } else {
            this.playerTwoGamesWon++
        }
    }
    restart = () => {
        console.log('restarting');
    }
    // awake = () => {
        
    // }
    newGame = () => {
        this.game = new Game(this.playerOneColor,this.playerTwoColor, this.gameWon);
    }
}


new App();

