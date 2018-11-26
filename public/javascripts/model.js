wordList    = ["tattoo", "electricity", "rabbit", "dewlap", "binky", "hare", "cat", "dog", "beetle", "cockroach"];
wordDef     = ["A form of body modification where a design is made by inserting ink.",
    "The set of physical phenomena associated with the presence and motion of electric charge.",
    "a burrowing, gregarious, plant-eating mammal with long ears, long hind legs, and a short tail.",
    "a fold of loose skin hanging from the neck or throat of a rabbit.",
    "an expression of joy from a rabbit",
    "a fast-running, long-eared mammal that resembles a large rabbit",
    "a small domesticated carnivorous mammal with soft fur, a short snout, and retractile claws.",
    "a domesticated carnivorous mammal that typically has a long snout, and an acute sense of smell.",
    "an insect of an order distinguished by forewings typically modified into hard wing cases.",
    "a beetlelike insect with long antennae and legs, feeding by scavenging."];
var gameWord;
var chances = 7;
var userId = null;

// Check if the letter is in the gameWord. 
function checkLetter(x, score) {
    var indexNums;
    var indexArrCount   = 0;
    counter             = 0;
    for(var i = 0; i < gameWord.length; i++) {
        if(gameWord.charAt(i) == x) {
            counter++;
        }
    }
    if(counter != 0) {
        revealLetters(x);
        expressCongrats();
        increaseScore(counter);
    } else {
        if(chances == 1) {
            gameOver(score);
        } else {
            chances--;
            retractCongrats();
            decreaseScore();
            decreaseChance(chances);
        }
    }
};

//pick a random word from the "dictionary"
function generateWord() {
    x           = Math.floor((Math.random() * 10));
    gameWord    = wordList[x]
    createWordView(wordList[x], wordDef[x]);
};