class Game{
    constructor(){
        this.playerOneColor = "lightgray";
        this.playerTwoColor = "dimgray";
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
        this.fills = {};
        this.new();
    }
    new = () => {
        console.log('new game')
        this.unclaimedSquares = this.piecesAcross * this.piecesAcross;
        this.message.innerHTML = "Player One's Turn"
        //build game pieces
        const pieces = {}
        for(let i = 0; i < this.piecesAcross; i++){
            for(let j = 0; j < this.piecesAcross; j++){
                //create virtual "pieces" and 
                const name = i+"_"+j;
                pieces[name] = {};
                pieces[name]['won'] = false;
                pieces[name]['edges'] = [];
                pieces[name]['edges'].push(i+","+(j*2));//top side
                pieces[name]['edges'].push((i+1)+","+((j*2)+1));//right
                pieces[name]['edges'].push(i+","+((j*2)+2));//bottom side
                pieces[name]['edges'].push((i+","+(j*2+1)));//left
            }
        }
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
                        dash.addEventListener('click',this.selectLine);
                        // dash.innerHTML=j+","+i;
                        row.appendChild(dash);
                    }
                }
            } else {
                //build vertical rows
                for(let j = 0; j < this.piecesAcross+1;j++){
                    const dash = document.createElement('div');
                    dash.className = 'dash vertical-dash';
                    dash.setAttribute('data-x',j);
                    dash.setAttribute('data-y',i);
                    dash.addEventListener('click',this.selectLine);
                    // dash.innerHTML=j+","+i;
                    row.appendChild(dash);
                    const fill = document.createElement('div');
                    fill.className = 'fill';
                    const fillId = (j+"_"+(i-1)/2);
                    fill.id = fillId;
                    // fill.innerHTML = fillId;
                    this.fills[fillId] = fill;
                    row.appendChild(fill);
                }
            }
            this.container.appendChild(row);
        }
    }
    selectLine = (e) => {
        if(this.playerOneGoesNext){
            this.playerOneMoves++
        } else {
            this.playerTwoMoves++
        }
        const x = e.target.getAttribute('data-x');
        const y = e.target.getAttribute('data-y');
        console.log('selecting line ' + x + "," + y );
        const c = e.target.className.split(' ')[1];
        e.target.className = c + " selected";
        this.selectedLines.push(x+","+y);
        this.checkForSquare(x,y);
    }
    checkForSquare = (x,y) => {
        console.log('checking for square');
        let squareFound = false;
        if(this.selectedLines.length > 3){         
            const pieces = Object.keys(this.pieces);
            const squaresFound = pieces.filter((piece)=> this.pieces[piece]['edges'].includes(x+","+y) && !this.pieces[piece]['won'])
            console.log(squaresFound)
            
            if(squaresFound.length){
                for(let i = 0; i < squaresFound.length; i++){
                    console.log(squaresFound[i])
                    console.log(this.selectedLines)
                    console.log(this.pieces[squaresFound[i]]['edges']);
                    let matches = 0;
                    for(let j = 0; j< this.pieces[squaresFound[i]]['edges'].length; j++){
                        if(this.selectedLines.includes(this.pieces[squaresFound[i]]['edges'][j])){
                            matches++;
                            console.log(matches);
                            console.log(this.pieces[squaresFound[i]]['edges'].length)
                        }
                    }
                    if(matches ===this.pieces[squaresFound[i]]['edges'].length){
                        console.log('its a whole square')
                        if(!this.pieces[squaresFound[i]]['won']){
                            this.pieces[squaresFound[i]]['won'] = this.playerOneGoesNext ? "PlayerTwo":"PlayerOne";
                            this.fills[squaresFound[i]].style.background = this.playerOneGoesNext ? this.playerTwoColor: this.playerOneColor;
                            if(this.playerOneGoesNext){
                                this.playerTwoScore++
                            } else {
                                this.playerOneScore++
                            }
                            squareFound = true;
                        }
                    } 
                }
            } 
        }
        this.updateScore();
        if(!squareFound){
            this.nextTurn();
        } 
    }
    nextTurn = () => {
        this.playerOneGoesNext = !this.playerOneGoesNext;
        this.message.innerHTML = this.playerOneGoesNext ? "Player One's Turn" : "Player Two's Turn";
    }
    updateScore = () => {
        this.playerOneScoreContainer.innerHTML = 'Score: ' + this.playerOneScore;
        this.playerOneMovesContainer.innerHTML = 'Moves: ' + this.playerOneMoves;
        this.playerTwoScoreContainer.innerHTML = 'Score: ' + this.playerTwoScore;
        this.playerTwoMovesContainer.innerHTML = 'Moves: ' + this.playerTwoMoves;
    }
}

class App{
    constructor(){
        console.log('app running');
        console.log(this.container);
        this.awake()
    }
    awake = () => {
        console.log('awake');
        this.game = new Game();
    }
}


new App();

