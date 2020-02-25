class Game{
    constructor(playerOneColor,playerTwoColor,gameWon,isPlayerOneHuman,isPlayerTwoHuman,isRandom){
        this.playerOneColor = playerOneColor;
        this.playerTwoColor = playerTwoColor;
        this.isPlayerOneHuman = isPlayerOneHuman;
        this.isPlayerTwoHuman = isPlayerTwoHuman;
        this.gameWon = gameWon;
        this.playerOneScore = 0;
        this.playerTwoScore = 0;
        this.playerOneMoves = 0;
        this.playerTwoMoves = 0;
        this.playerOneGoesNext = true;
        this.unclaimedSquares = null;
        this.pieces = {};
        this.selectedLines = [];
        this.piecesAcross = 4;
        this.container = document.querySelector('#game-container');
        this.message = document.querySelector('#message-text');
        this.playerOneScoreContainer = document.querySelector('#player-one-score');
        this.playerOneMovesContainer = document.querySelector('#player-one-moves');
        this.playerTwoScoreContainer = document.querySelector('#player-two-score');
        this.playerTwoMovesContainer = document.querySelector('#player-two-moves');
        this.currentPlayerColorBlock = document.querySelector('#current-player-color-block');
        this.playerOneColorBlock = document.querySelector('#player-one-color-block');
        this.playerTwoColorBlock = document.querySelector('#player-two-color-block');
        this.fills = {};
        this.lines = {};
        this.new(isPlayerOneHuman,isPlayerTwoHuman,isRandom);
    }
    new = (isPlayerOneHuman,isPlayerTwoHuman,isRandom) => {
        console.log('new game')
        this.unclaimedSquares = this.piecesAcross * this.piecesAcross;
        this.message.innerHTML = "Player One's Turn";
        this.currentPlayerColorBlock.style.background = this.playerOneColor;
        this.playerOneColorBlock.style.background = this.playerOneColor;
        this.playerTwoColorBlock.style.background = this.playerTwoColor;
        //build game pieces
        const pieces = {}
        for(let i = 0; i < this.piecesAcross; i++){
            for(let j = 0; j < this.piecesAcross; j++){
                //create virtual "pieces" and 
                const name = i+"_"+j;
                pieces[name] = {};
                pieces[name]['won'] = false;
                pieces[name]['sides'] = 0;
                pieces[name]['edges'] = [];
                pieces[name]['edges'].push(i+","+(j*2));//top side
                pieces[name]['edges'].push((i+1)+","+((j*2)+1));//right
                pieces[name]['edges'].push(i+","+((j*2)+2));//bottom side
                pieces[name]['edges'].push((i+","+(j*2+1)));//left
            }
        }
        const allPieces = Object.keys(pieces);
        this.playerOne = isPlayerOneHuman ? null : new AI("Player One",allPieces);
        this.playerTwo = isPlayerTwoHuman ? null : new AI("Player Two",allPieces);
        console.log(pieces);
        this.pieces = pieces;
        this.buildBoard();
    }
    buildBoard = () => {
        const pieces = Object.keys(this.pieces);
        for(let i = 0; i < this.piecesAcross*2+1; i++){
            const row = document.createElement('div');
            row.className = 'row';
            if(i%2===0){
                //build horizontal rows
                for(let j = 0; j < this.piecesAcross+1;j++){
                    const dot = document.createElement('div');
                    dot.className = 'dot';
                    row.appendChild(dot);
                    if(j < this.piecesAcross){
                        const dash = document.createElement('div');
                        dash.className = 'dash horizontal-dash';
                        dash.setAttribute('data-x',j);
                        dash.setAttribute('data-y',i);
                        dash.addEventListener('click',this.clickLine);
                        // dash.innerHTML=j+","+i;
                        row.appendChild(dash);
                        this.lines[j+"_"+i] = dash;
                    }
                }
            } else {
                //build vertical rows
                for(let j = 0; j < this.piecesAcross+1;j++){
                    const dash = document.createElement('div');
                    dash.className = 'dash vertical-dash';
                    dash.setAttribute('data-x',j);
                    dash.setAttribute('data-y',i);
                    dash.addEventListener('click',this.clickLine);
                    // dash.innerHTML=j+","+i;
                    row.appendChild(dash);
                    this.lines[j+"_"+i] = dash;
                    if(j<this.piecesAcross){
                        const fill = document.createElement('div');
                        fill.className = 'fill';
                        const fillId = (j+"_"+(i-1)/2);
                        fill.id = fillId;
                        // fill.innerHTML = fillId;
                        this.fills[fillId] = fill;
                        row.appendChild(fill);
                    }
                }
            }
            this.container.appendChild(row);
        }
    }
    clickLine = (e) => {
        const x = e.target.getAttribute('data-x');
        const y = e.target.getAttribute('data-y');
        this.selectLine(x,y,e.target)
    }
    selectLine = (x,y,target) => {
        console.log('selecting line ' + x + "," + y );
        if(this.playerOneGoesNext){
            this.playerOneMoves++
        } else {
            this.playerTwoMoves++
        }
        const c = target.className.split(' ')[1];
        target.className = c + " selected";
        this.selectedLines.push(x+","+y);
        this.checkForSquare(x,y);
    }
    checkForSquare = (x,y) => {
        console.log('checking for square');
        let squareFound = false;
        if(this.selectedLines.length > 3){         
            const pieces = Object.keys(this.pieces);
            const squaresFound = pieces.filter((piece)=> this.pieces[piece]['edges'].includes(x+","+y) && !this.pieces[piece]['won'])          
            if(squaresFound.length){
                for(let i = 0; i < squaresFound.length; i++){
                    let matches = 0;
                    for(let j = 0; j< this.pieces[squaresFound[i]]['edges'].length; j++){
                        matches = testSquare(this.selectedLines,this.pieces[squaresFound[i]]);
                    }
                    if(matches ===this.pieces[squaresFound[i]]['edges'].length){
                        console.log('its a whole square')
                        if(!this.pieces[squaresFound[i]]['won']){
                            this.pieces[squaresFound[i]]['won'] = !this.playerOneGoesNext ? "PlayerTwo":"PlayerOne";
                            this.fills[squaresFound[i]].style.background = !this.playerOneGoesNext ? this.playerTwoColor: this.playerOneColor;
                            if(!this.playerOneGoesNext){
                                this.playerTwoScore++
                            } else {
                                this.playerOneScore++
                            }
                            this.unclaimedSquares--;
                            console.log('remaining squares',this.unclaimedSquares)
                            squareFound = true;
                        }
                    } 
                }
            } 
        }
        this.updateScore();
        if(!squareFound){
            this.nextTurn();  
        } else {
            if(this.unclaimedSquares <= 0){
                this.message.innerHTML = "GAME OVER"
                this.gameOver();            
            } 
        }
    }
    nextTurn = () => {
        this.playerOneGoesNext = !this.playerOneGoesNext;
        if(this.playerOneGoesNext && !this.isPlayerOneHuman){
            this.selectAI();
        }
        if(!this.playerOneGoesNext && !this.isPlayerTwoHuman){
            this.selectAI();
        }
        this.currentPlayerColorBlock.style.background = this.playerOneGoesNext ? this.playerOneColor : this.playerTwoColor;
        this.message.innerHTML = this.playerOneGoesNext ? "Player One's Turn" : "Player Two's Turn";
    }
    selectAI = () => {
        let move = null
        if(this.playerOneGoesNext){
            move = this.playerOne.playRandom(this.pieces,this.selectedLines);
        } else {
            move = this.playerTwo.playRandom(this.pieces,this.selectedLines);
        }
        const target = this.lines[move];
        const x = move.split("_")[0];
        const y =  move.split("_")[1];
        console.log('lines',this.lines)
        console.log('move',move )
        console.log('target',target)
        this.selectLine(x,y,target);
    }
    gameOver = () => {
        this.gameWon(this.playerOneGoesNext);
    }
    updateScore = () => {
        this.playerOneScoreContainer.innerHTML = 'Score: ' + this.playerOneScore;
        this.playerOneMovesContainer.innerHTML = 'Moves: ' + this.playerOneMoves;
        this.playerTwoScoreContainer.innerHTML = 'Score: ' + this.playerTwoScore;
        this.playerTwoMovesContainer.innerHTML = 'Moves: ' + this.playerTwoMoves;
    }
}