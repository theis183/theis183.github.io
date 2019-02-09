var wordBank = ["test", "magic"];
var hangManImages = ["assets/image/hangman0.png",
    "assets/image/hangman1.png",
    "assets/image/hangman2.png",
    "assets/image/hangman3.png",
    "assets/image/hangman4.png",
    "assets/image/hangman5.png",
    "assets/image/hangman6.png"];

var game = {

    won: 0,
    lost: 0,
    word: wordBank[Math.floor(Math.random() * wordBank.length)],
    guessed: [],
    guessedWrong: [],
    guessedRight: [],
    chances: 6,
    numWrong: 0,
    gameOver: false,
    displayWord: [],
    displayHangMan: function (number) {
        document.getElementById("hangMan").setAttribute("src", hangManImages[number])
    },
    newGame: function () {
        this.word = wordBank[Math.floor(Math.random() * wordBank.length)];
        this.guessed = [];
        this.guessedRight = [];
        this.guessedWrong = [];
        this.numWrong = 0;
        this.gameOver = false;
        this.resetDisplayWord();
        this.displayHangMan(0);
        this.showGamesLost();
        this.showGamesWon();
        this.showDisplayWord();
        this.showGuesses();
    },



    resetDisplayWord: function () {
        for (i = 0; i < this.word.length; i++) {
            this.displayWord[i] = '_'
        }
    },

    updateDisplayWord: function () {
        for (i = 0; i < this.word.length; i++) {
            if (this.guessedRight.includes(this.word[i])) {
                this.displayWord[i] = this.word[i];
            }
        }
    },

    showDisplayWord: function () {
        document.getElementById("wordClue").innerText = this.displayWord
    },

    showGamesWon: function () {
        document.getElementById("gamesWon").innerText = "Games Won: " + this.won
    },

    showGamesLost: function () {
        document.getElementById("gamesLost").innerText = "Games Lost: " + this.lost
    },

    showGuesses: function (){
        document.getElementById("guesses").innerText = "Guessed: " + this.guessed
    }


}

game.displayHangMan(0);
game.resetDisplayWord();
game.showDisplayWord();
game.showGamesWon();
game.showGamesLost();
game.showGuesses();


document.onkeyup = function (event) {
    if (game.gameOver) {
        game.newGame();
    }
    else {
        var key = event.key.toLowerCase();
        console.log(game.word);
        console.log(key);
        if (game.word.includes(key)) {
            game.guessed.push(key);
            game.guessedRight.push(key);
            console.log(game.guessed);
            console.log(game.guessedRight);
            game.updateDisplayWord();
            game.showDisplayWord();
            game.showGuesses();
            console.log(game.displayWord);
        }
        else if (game.guessed.includes(key)) {
            console.log('duplicate guess');
        }

        else {
            game.guessed.push(key);
            game.guessedWrong.push(key);
            game.numWrong++;
            game.displayHangMan(game.numWrong);
            game.showGuesses();
            console.log(game.guessed);
            console.log(game.guessedWrong);
            console.log(game.numWrong + " Wrong Guess");

        }

        if (game.numWrong >= game.chances) {
            game.gameOver = true;
            game.lost++;
            game.showGamesLost();
            console.log("gameover " + game.gameOver)
            console.log("games lost " + game.lost)
        }

        else if (!(game.displayWord.includes("_"))){
            game.gameOver = true;
            game.won++;
            game.showGamesWon();
        }
    }

}