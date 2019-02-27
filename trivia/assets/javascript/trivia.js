//will be interval, set global so multiple function can access
var clock

//all questions to be asked saved as objects with the possible answers and correct answer
var question1 = {
    question: "The unit of measurement Astronotical Unit (AU) measures what?",
    possibleAnswers: ["The distance from Earth to the Sun", "The distance from Earth to the Moon", "The distance from Earth to Mars", "The distance from Earth to Alpha Centauri"],
    correctAnswer: 0,
}

var question2 = {
    question: "Which planet would float on water?",
    possibleAnswers: ["Earth", "Venus", "Mars", "Saturn"],
    correctAnswer: 3,
}

var question3 = {
    question: "Traveling at the speed of light, how long would it take to travel to Alpha Centauri?",
    possibleAnswers: ["About 120 days", "About 1 Year", "About 4 years", "About 100 years"],
    correctAnswer: 2,
}

var question4 = {
    question: "Which planet in our solar system has the hottest surface tempurature?",
    possibleAnswers: ["Mercury", "Venus", "Mars", "Saturn"],
    correctAnswer: 1,
}

var question5 = {
    question: "What is at the center of the Milky Way?",
    possibleAnswers: ["A Wormhole", "A Black Hole", "A Star", "A Pulsar"],
    correctAnswer: 1,
}

var question6 = {
    question: "How many stars are in the Milky Way?",
    possibleAnswers: ["1", "Thousands", "Millions", "Billions"],
    correctAnswer: 3,
}

var question7 = {
    question: "The sun accounts for how much of our solar systems mass?",
    possibleAnswers: ["10%", "40%", "80%", "99.8%"],
    correctAnswer: 3,
}

var question8 = {
    question: "What is the most common type of matter?",
    possibleAnswers: ["Dark Matter", "Dark Energy", "Observable Matter", "Hydrogen"],
    correctAnswer: 0,
}

var game = {
    //array with all question objects
    questions: [question1, question2, question3, question4, question5, question6, question7, question8],
    //variables that contain display information and which question we are on
    numberCorrect: 0,
    numberWrong: 0,
    currentQuestion: 0,
    timer: 15,
    //resets DOM and then displays question and possible answers
    displayQuestion: function () {
        console.log("in displayQuestion")
        var myQuestion = this.questions[this.currentQuestion]
        this.timerStart()
        console.log("myQuestion is " + myQuestion)
        $("#question").html(myQuestion.question)
        $("#answers").html('')
        $("#display").html('')
        for (var i = 0; i < myQuestion.possibleAnswers.length; i++) {
            $("#answers").append('<div class="custom-control custom-radio">\
            <input type="radio" class="custom-control-input" id="answer' + i + '" name="groupOfDefaultRadios"> \
            <label class="custom-control-label" for="answer' + i + '">' + myQuestion.possibleAnswers[i] + '</label>\
            </div>')
        }
        $("#answers").append('<button type="button" class="btn btn-primary" id="submitAnswerBtn">Submit</button>')
    },
    //removes question and answers and display a correct giphy
    displayCorrectAnswerBanner(){
        $.ajax({
            url:"https://api.giphy.com/v1/gifs/search?apikey=4Bh49w1RjN3aa88cRyxeNpd7ppM0htYQ&q=thats+correct&limit=1",
            method: "GET"
        }).then(function (response){
            $("#question").html("")
            $("#answers").html("")
            $("#display").html('<img src="' + response.data[0].images.original.url +'" >')

        })
    },
    //removes question and answers and display an incorrect giphy
    displayWrongAnswerBanner(){
        $.ajax({
            url:"https://api.giphy.com/v1/gifs/search?apikey=4Bh49w1RjN3aa88cRyxeNpd7ppM0htYQ&q=wrong+answer&limit=1",
            method: "GET"
        }).then(function (response){
            $("#question").html("")
            $("#answers").html("")
            $("#display").html('<img src="' + response.data[0].images.original.url +'" >')

        })
        
    },
    //removes question and answers and displays how many questions the user got correct
    displayStats(){
        $("#question").html("")
        $("#answers").html("")
        $("#display").html('<h1>Congratulations!</h1><br>\
                <h2>You got ' + this.numberCorrect + ' out of ' + this.questions.length + ' questions right! </h2><br>')
                $.ajax({
                    url:"https://api.giphy.com/v1/gifs/search?apikey=4Bh49w1RjN3aa88cRyxeNpd7ppM0htYQ&q=good+job&limit=1",
                    method: "GET"
                }).then(function (response){
                    $("#display").append('<img src="' + response.data[0].images.original.url +'" >')
                })


    },
//removes question and answers and display a times up giphy
    displayTimesUpBanner(){
        $.ajax({
            url:"https://api.giphy.com/v1/gifs/search?apikey=4Bh49w1RjN3aa88cRyxeNpd7ppM0htYQ&q=times+up&limit=1",
            method: "GET"
        }).then(function (response){
            $("#question").html("")
            $("#answers").html("")
            $("#display").html('<img src="' + response.data[0].images.original.url +'" >')

        })
        
    },

    //starts timer and resets to 15
    timerStart(){
        clock = setInterval(this.updateTimer , 1000)
        this.timer = 15
        $("#timer").html(this.timer)
    },
//stops timer and removes from DOM
    timerStop(){
        clearInterval(clock)
        $("#timer").html("")
        console.log("Stopping Timer")
    },
//decrement timer and handles time up logic
    updateTimer(){
        game.timer--
        $("#timer").html(game.timer)
        console.log("Updated Timer to " + game.timer)
        //time up logic
        if(game.timer == 0) { 
            game.timerStop()
            game.displayTimesUpBanner()
            game.numberWrong++
            game.currentQuestion++
            if(game.currentQuestion < game.questions.length){
                game.timeUnitNextQuestion()
            }
            else{game.timeUntilDisplayStats()}

        }
    },

//sets the interval to display giphy then proceeds to display stats
    timeUntilDisplayStats(){
        setTimeout(function(){game.displayStats()}, 2500)
    },
//sets the interval to display giphy then proceeds to next questtion    
    timeUnitNextQuestion(){
        setTimeout(function (){game.displayQuestion()}, 2500)

    },
//checks the answer then calls the correct banner to display, also determines if all the questions have been asked and stops timer    
    checkAnswer(submitted){
        this.timerStop()
        var myQuestion = this.questions[this.currentQuestion]
        if (submitted === myQuestion.correctAnswer) {
            this.numberCorrect++
            this.displayCorrectAnswerBanner()
        }
        else{
            this.numberWrong++
            this.displayWrongAnswerBanner()
        }
        this.currentQuestion++
        if(this.currentQuestion < this.questions.length){
            this.timeUnitNextQuestion()
        }
        else{this.timeUntilDisplayStats()}

    },
//checks if the user has checked a  box, if has calls submit question    
    submitAnswer: function () {    
            var found = false
            var answerToSubmit
            var myQuestion = this.questions[this.currentQuestion]
            for (var i = 0; i < myQuestion.possibleAnswers.length; i++) {
                if ($("#answer" + i).prop("checked")) {
                    found = true
                    answerToSubmit = i
                    console.log("found the checked box at " + answerToSubmit)
                }
            }
            if (found) { this.checkAnswer(answerToSubmit)}


    }
}
//initiates the start of the game
$(document).on("click", "#newGame", function(){
    game.displayQuestion()
})
//handles submit button
$(document).on("click", "#submitAnswerBtn", function () {
    game.submitAnswer()})



