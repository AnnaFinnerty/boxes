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
        this.container = document.querySelector('#game-container');

        document.querySelector('#new-button').addEventListener('click',()=>this.newGame())

        // this.openModal('settings');
        this.newGame();
    }
    gameWon(isPlayerOneVictortious){
        console.log("game over!");
        if(isPlayerOneVictortious){
            this.playerOneGamesWon++
            this.playerOneGamesontainer.innerHTML = "Games: " + this.playerOneGamesWon;
        } else {
            this.playerTwoGamesWon++;
            this.playerTwoGamesontainer.innerHTML = "Games: " + this.playerTwoGamesWon;
        }
        this.openModal('over')
    }
    restart(){
        console.log('restarting');
        this.newGame();
    }
    newGame(){
        while(this.container.firstChild){
            this.container.removeChild(this.container.firstChild)
        }
        this.game = new Game(this.playerOneColor,this.playerTwoColor, this.gameWon, this.isPlayerOneHuman, this.isPlayerTwoHuman,this.isRandom);
    }
    openModal(type,text){
        console.log('opening modal');
        if(this.modalWindow.firstChild){
            this.modalWindow.removeChild(this.modalWindow.firstChild)
        }
        this.modalWindow.className = "modal-window";
        this.modal = new Modal(this.modalWindow, this.emit,type,text)
    }
    closeModal(){
        this.modal = null;
        this.modalWindow.className = "hidden";
        this.modalWindow.removeChild(this.modalWindow.firstChild)
    }
    emit(event){
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

