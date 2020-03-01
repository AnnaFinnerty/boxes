class Square{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.selected = false;
        this.selectedBy = null;
        this.selectedOnTurn = null;
    }
    select(selectedBy, turn){
        this.selected = true;
        this.selectedBy = selectedBy;
        this.selectedOnTurn = turn;
    }
}