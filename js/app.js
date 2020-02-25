class App{
    constructor(){
        this.isPlayerOneHuman = true;
        this.isPlayerTwoHuman = false;
        this.isRandom = true;
        this.playerOneColor = "firebrick";
        this.playerTwoColor = "dodgerblue";
        this.playerOneGamesWon = 0;
        this.playerTwoGamesWon= 0;

        this.modal = null;

        this.playerOneGamesontainer = document.querySelector('#player-one-games');
        this.playerTwoGamesontainer = document.querySelector('#player-two-games');
        this.modalWindow = document.querySelector('#modal-window');

        this.newGame();
        this.openModal('message','test message')
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
    openModal = (type,text) => {
        console.log('opening modal');
        this.modalWindow.className = "modal-window";
        this.modal = new Modal(this.modalWindow, this.closeModal,type,text)
    }
    closeModal = () => {
        this.modal = null;
        this.modalWindow.className = "hidden";
        this.modalWindow.removeChild(this.modalWindow.firstChild)
    }
}


new App();

