function offerLeadershipBoard() {
    btnSave = document.getElementById("saveBtn");
    btnSave.disabled = false;
}

function clickButton(event) {
    $('.item').click(function(event) {
        //Gets the item that is being clicked
        let clicked = this.innerHTML;
        console.log("this is: ", this);
        console.log("you clicked: ", clicked);

        let player1 = getPlayer1();
        if(player1 == "X") {
            $(this).addClass("cross");
            $(this).html("X");
        }
        if(player1 == "0") {
            $(this).addClass("zero");
            $(this).html("0");
        }
        playGame();
    })    
}
clickButton(event);

//Player1 always goes first.
function checkTurn() {
    let current;
    let crossCount = getCrossCount();
    console.log("Check turn: crossCount: ", crossCount);
    let zeroCount = getZeroCount();
    console.log("Check turn: zeroCount: ", zeroCount);

    if(getCrossCount()) {
        //If it is 1, x has already made a move
        //then current player would be 0
    }
    else {
        //if it is 0, current player would be 1
    }
    
}