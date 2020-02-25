class App{
    constructor(){
        this.isPlayerOneHuman = true;
        this.isPlayerTwoHuman = false;
        this.isRandom = true;
        this.playerOneColor = "firebrick";
        this.playerTwoColor = "dodgerblue";
        this.playerOneGamesWon = 0;
        this.playerTwoGamesWon= 0;
        this.playerOneGamesontainer = document.querySelector('#player-one-games');
        this.playerTwoGamesontainer = document.querySelector('#player-two-games');
        this.newGame()
    }
    gameWon = (isPlayerOneVictortious) => {
        console.log("game over!");
        if(isPlayerOneVictortious){
            this.playerOneGamesWon++
            this.playerOneGamesontainer.innerHTML = "Games: " + this.playerOneGamesWon;
        } else {
            this.playerTwoGamesWon++;
            this.playerTwoGamesontainer.innerHTML = "Games: " + this.playerTwoGamesWon;
        }
    }
    restart = () => {
        console.log('restarting');
        this.newGame();
    }
    newGame = () => {
        this.game = new Game(this.playerOneColor,this.playerTwoColor, this.gameWon, this.isPlayerOneHuman, this.isPlayerTwoHuman,this.isRandom);
    }
}


new App();

