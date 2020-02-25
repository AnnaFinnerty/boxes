class App{
    constructor(){
        this.isPlayerOneHuman = false;
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
        this.openModal('settings');
        this.newGame();
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
        this.openModal('message','GAME OVER')
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
        if(this.modalWindow.firstChild){
            this.modalWindow.removeChild(this.modalWindow.firstChild)
        }
        this.modalWindow.className = "modal-window";
        this.modal = new Modal(this.modalWindow, this.emit,type,text)
    }
    closeModal = () => {
        this.modal = null;
        this.modalWindow.className = "hidden";
        this.modalWindow.removeChild(this.modalWindow.firstChild)
    }
    emit = (event) => {
        switch(event){
            case "close":
                this.closeModal();
            break

            case "new":
                this.newGame();
            break
        }
    }
}


new App();

