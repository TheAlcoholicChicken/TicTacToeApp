(function () {
    // Load the script
    var script = document.createElement("SCRIPT");
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
    script.type = 'text/javascript';
    script.onload = function () {
        var $ = window.jQuery;
        var currentScore = 0;

        function offerLeadershipBoard() {
             let btnSave = document.getElementById("saveBtn");
             $("save").html(btnSave);
        }

        function clickButton(event) {
            $(".item").click(function (event) {
                var thingClicked = this.innerHTML
                console.log("0. this is: ", this)
                console.log("0. you clicked: ", thingClicked)
                var playerOne = getPlayerOne()
                if (playerOne === "heart") {
                    $(this).addClass("blue") //playerOne is always blue
                    $(this).html("&#10084;")
                }
                if (playerOne === "star") {
                    $(this).addClass("blue") //playerOne is always blue
                    $(this).html("&#9733;")
                }
                playGame() //call playGame after every click, to check for winner & whose turn
            })
        }
        clickButton(event)


        function checkWhoseTurn() { //for this game, playerOne goes first
            var currentTurn
            var redCount = getRedCount()
            var blueCount = getBlueCount()
            var playerOneTurn = !blueCount || redCount > blueCount || blueCount && redCount == blueCount
            var computerTurn = redCount < blueCount
            if (playerOneTurn) {
                console.log("checkWhoseTurn: it is playerOne's turn")
                var notBlueOrRed = document.querySelectorAll("div.item:not(.blue):not(.red)")
                $(notBlueOrRed).removeClass('unclickable')
                $("#compTurn").removeClass('yellow blackText')
                $("#yourTurn").addClass('yellow blackText')
                currentTurn = "playerOneTurn"
                return currentTurn
            }
            if (computerTurn) {
                console.log("checkWhoseTurn: it is computer's turn")
                var allItems = document.querySelectorAll("div.item")
                $(allItems).addClass('unclickable') //need to remove this on playerOne's turn
                $("#yourTurn").removeClass('yellow blackText')
                $("#compTurn").addClass('yellow blackText')
                setTimeout(computerTakeTurn, 1000) //call after 1 second...
                currentTurn = "computerTurn"
                return currentTurn
            }
        }


        function computerTakeTurn() {
            var computer = getComputer()
            console.log('computerTakeTurn: computer is: ', computer)
            var notBlueOrRed = document.querySelectorAll("div.item:not(.blue):not(.red)")
            console.log('computerTakeTurn: notBlueOrRed: ', notBlueOrRed)
            //choose one at random
            var randomItem = notBlueOrRed[Math.floor(Math.random() * notBlueOrRed.length)]
            console.log('computerTakeTurn: randomItem is: ', randomItem)
            //addClass red to that random item and show computer chose it
            $(randomItem).addClass("red unclickable")
            $(randomItem).html(computer)
            console.log('computerTakeTurn: computer clicked: ', randomItem)
            playGame()
        }


        function setPlayerOne() {
            $("#playerForm input").on("change", function () {
                var playerOne = $("input[name='radio']:checked", "#playerForm").val()
                console.log(`player selected: ${playerOne}`)
                $("#playerForm").addClass("displayNone")
                $("#playerOne").html(`You are: <span id="playerOneSpan" class="yellow">${playerOne}</span>`)
                $("#gameInfo, #resetButton, #gameGrid").removeClass("displayNone")
            })
        }
        setPlayerOne()


        function getPlayerOne() {
            if (document.getElementById("playerOneSpan") != null) {
                var playerOne = document.getElementById("playerOneSpan").innerHTML
                return playerOne
            }
        }


        function getComputer() {
            var playerOne = getPlayerOne()
            var computer;

            var computer = (playerOne === "heart") ? ("&#9733;") : ("&#10084;")
            return computer
        }


        function hardResetOnclick(event) { //returns user to form, asking &#10084; or &#9733;
            $("#resetButton").click(function (event) {
                console.log("hardResetOnclick: resetting game...")
                $("#playerForm").removeClass("displayNone")
                document.getElementById("playerForm").reset()
                $("#playerOne, #gameResult, #congratsOrSorry").html("")
                $("#gameInfo, #gameGrid, #congratsOrSorry, #save").addClass("displayNone")
                $(".item").removeClass("blue red gray unclickable")
                $(".item").html("&#10084;/&#9733;")
                // let btnSave = document.getElementById("saveBtn");
                // btnSave.disabled = true;
            })
        }
        hardResetOnclick()


        function reset() { //resets game for new game

            console.log("reset: resetting game, for new game...")
            $("#gameInfo").removeClass("displayNone")
            $("#gameResult, #congratsOrSorry").addClass("displayNone")
            $(".item").removeClass("blue red gray unclickable")
            $(".item").html("&#10084;/&#9733;")
        }


        function getRedCount() {
            var redCount = $('#gameGrid .red').length
            return redCount
        }

        function getBlueCount() {
            var blueCount = $('#gameGrid .blue').length
            return blueCount
        }


        function checkForWinner() {
            console.log("checking for winner...")
            var winner;

            var eightWinningCombos = [
                "#one.COLOR, #two.COLOR, #three.COLOR",
                "#four.COLOR, #five.COLOR, #six.COLOR",
                "#seven.COLOR, #eight.COLOR, #nine.COLOR",
                "#one.COLOR, #four.COLOR, #seven.COLOR",
                "#two.COLOR, #five.COLOR, #eight.COLOR",
                "#three.COLOR, #six.COLOR, #nine.COLOR",
                "#one.COLOR, #five.COLOR, #nine.COLOR",
                "#seven.COLOR, #five.COLOR, #three.COLOR"
            ]

            var blueWinArray = getWinningArray(eightWinningCombos, "blue")
            var redWinArray = getWinningArray(eightWinningCombos, "red")
            var blueWins = blueWinArray.includes(true)
            var redWins = redWinArray.includes(true)
            var fullGrid = getRedCount() + getBlueCount()
            var draw = (fullGrid === 9) && (!blueWins) && (!redWins)

            if (blueWins) { //playerOne is always blue
                playerOneWins()
                increaseScore();
                return winner = blueWins
            }
            if (redWins) { //red is computer
                computerWins()
                decreaseScore();
                return winner = redWins
            }
            if (draw) {
                drawGame()
                decreaseScore();
                return winner = draw
            } else {
                console.log('game on...')
            }
            console.log("score: ", currentScore);
        }

        //Increase the score by num
        function increaseScore() {
            let scoreHolder = document.getElementById("scoreNum");
            currentScore += 1;
            scoreHolder.value = currentScore;
        };

        // Decrese the score to 0 
        function decreaseScore() {
            let scoreHolder = document.getElementById("scoreNum");
            currentScore = 0;
            scoreHolder.value = currentScore;
        };

        function getWinningArray(array, string) {
            return array.map(function (combo) {
                var eachCombo = combo.replace(/COLOR/g, string)
                return eachCombo = $(eachCombo).length === 3
            })
        }

        function playerOneWins() {
            var playerOne = getPlayerOne()
            console.log(`${playerOne} wins!`)
            $("#gameResult").html(`<span class='yellowBig'>${playerOne} wins!</span>`)
            $("#congratsOrSorry").html("<span class='yellow'>Congratulations! You won!</span>")
            $("#save").removeClass("displayNone")
            winLoseOrDraw()
        }

        function computerWins() {
            var computer = getComputer()
            console.log(`${computer} wins!`)
            $("#gameResult").html(`<span class='redBig'>${computer} wins!</span>`)
            $("#congratsOrSorry").html("<span class='red'>Sorry, you lost.</span>")
            $("#save").removeClass("displayNone")
            winLoseOrDraw()
        }

        function drawGame() {
            console.log('Draw game!')
            $("#gameResult").html(`<span class='redBig'>Game is a draw.</span>`)
            $("#congratsOrSorry").html("<span>Game ended in a draw.</span>")
            $("#save").removeClass("displayNone")
            winLoseOrDraw()
        }

        function winLoseOrDraw() {
            $("#gameResult, #congratsOrSorry").removeClass("displayNone")
            $("#save").removeClass("displayNone")
            let btnSave = document.getElementById("saveBtn");
            btnSave.disabled = false;
           // $("#gameInfo").addClass("displayNone")
            disableRemainingItems()
        }

        function disableRemainingItems() {
            var notBlueOrRed = document.querySelectorAll("div.item:not(.blue):not(.red)")
            $(notBlueOrRed).addClass("gray")
            $(notBlueOrRed).html("¯\\_(ツ)_/¯")
            $(notBlueOrRed).addClass("unclickable")
            return
        }

        function playGame() {
            console.log('play game!')
            var winner = checkForWinner()
            if (!winner) {
                console.log('no winner yet...')
                checkWhoseTurn()
            }
            if (winner) {
                console.log('game over, resetting game')
                offerLeadershipBoard();
            }
        }
        playGame()
    };
    document.getElementsByTagName("head")[0].appendChild(script);
})();
