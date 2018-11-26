var gameWord;
var currentScore        = 0;
const txtEmail          = document.getElementById('emailInput');
const txtPassword       = document.getElementById("pwInput");
const btnLogin          = document.getElementById('loginBtn');
const btnSignup         = document.getElementById('registerBtn');
const btnLogout         = document.getElementById('logoutBtn');
const authmsg           = document.getElementById('authmessage');
const gameContent       = document.getElementById('gamecontent');

// Creates buttons A-Z 
function startGame() {
    var letter, button, p, container;
    for(var i = 65; i < 91; i++) {
        if(i == 65 || i == 75 || i == 91) {
            p = document.createElement("p");
        }
        var letter          = String.fromCharCode(i);
        button = document.createElement("button");
        button.innerHTML    = letter;
        button.setAttribute("data-letter", letter);
        button.setAttribute("id", letter);
        button.setAttribute("class", "btn btn-primary btn-lg");
        button.addEventListener("click", buttonClicked, false)
        p.appendChild(button);
        if(i == 74 || i == 74 || i == 90) {
            let container = document.getElementById("buttonHolder");
            container.appendChild(p);
        }

    }
    generateWord();
};

function createWordView(word, def) {
    //Show word definition
    let defDiv          = document.getElementById("defHolder");
    defP                = document.createElement("p");
    defP.innerHTML      = def;
    defDiv.appendChild(defP);
    
    //Show empty letter slots
    gameWord        = word;
    pLetter         = document.createElement("p");
    for(var i = 0; i < gameWord.length; i++) {
        span                = document.createElement("span");
        wordLetter          = word.charAt(i);
        span.innerHTML      = "&nbsp&nbsp&nbsp;_";
        span.setAttribute("class", wordLetter + '_' + wordLetter);
        pLetter.appendChild(span);
    }
    let letterDiv   = document.getElementById("wordHolder");
    letterDiv.appendChild(pLetter);
};

// Reveal the matchig letters in the view
function revealLetters(ch) {
    spanMatched             = document.getElementsByClassName(ch + '_' + ch);
    for(var i = 0; i < spanMatched.length; i++) {  
        spanMatched[i].innerHTML    = ch;
    }
};

//Increase the score by num upon a correct guess
function increaseScore(num) {
    let scoreHolder          = document.getElementById("scoreNum");
    currentScore            += num;
    scoreHolder.value    = currentScore;
};

// Decrese the score by 1 upon an incorrect guess.
function decreaseScore() {
    let scoreHolder          = document.getElementById("scoreNum");
    --currentScore;
    scoreHolder.value   = currentScore;
};

//Decrease number of chances  by 1 for view.
function decreaseChance(num) {
    let chanceHolder      = document.getElementById("chanceNum");
    chanceHolder.innerHTML  = num;
};

//Update view's chance to be full
function resetChance() {
    let chanceHolder      = document.getElementById("chanceNum");
    chanceHolder.innerHTML  = 7;
    chances = 7;
};

//Outputs a congratulatory message upon a correct guess.
function expressCongrats() {
    let msgHolder           = document.getElementById("message");
    msgHolder.innerHTML     = "Congrats!";
};

//Retracts a congratulatory message upon an incorrect guess.
function retractCongrats() {
    let msgHolder           = document.getElementById("message");
    msgHolder.innerHTML     = " ";
};

// Replace div contents with "GAME OVER", prevent further advancement
function gameOver(score) {
    let msgHolder           = document.getElementById("message");
    let chanceHolder        = document.getElementById("chanceNum");
    msgHolder.innerHTML     = "GAME OVER.";
    chanceHolder.innerHTML = 0;
    container = document.getElementById("buttonHolder");
    container.innerHTML     = " ";
    wordHolder.innerHTML    = " ";
    defHolder.innerHTML     = " ";
    offerLeadershipBoard();
    };

function offerLeadershipBoard() {
    btnSave = document.getElementById("saveBtn");
    btnSave.disabled = false;
}