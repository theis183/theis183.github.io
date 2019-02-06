wordBank=["test", "magic"];
gamesWon=0
gamesLost=0
word=wordBank[Math.floor(Math.random()*wordBank.length)];
guessed=[]
guessedWrong=[]
guessedRight=[]
chances=6
numWrong=0
gameOver=false;


document.onkeyup = function(event) {
    var key=event.key.toLowerCase();
    console.log(word);
    console.log(key);
    if(word.includes(key)){
        guessed.push(key);
        guessedRight.push(key);
        console.log(guessed);
        console.log(guessedRight);
    }
    else if (guessed.includes(key)){
        console.log('duplicate guess');
    }

    else{
        guessed.push(key);
        guessedWrong.push(key);
        numWrong++
        console.log(guessed);
        console.log(guessedWrong);
        console.log(numWrong + " Wrong Guess")
        
    }

    if (numWrong >= chances){
        gameOver=true
        gamesLost++
        console.log("gameover " + gameOver)
        console.log("games lost " + gamesLost)
    }
}