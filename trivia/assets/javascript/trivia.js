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
    questions: [question1, question2, question3, question4, question5, question6, question7, question8],
    numberCorrect: 0,
    numberWrong: 0,
    currentQuestion: 0,
    displayQuestion: function () {
        console.log("in displayQuestion")
        var myQuestion = this.questions[this.currentQuestion]
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
    timeUntilDisplayStats(){
        setTimeout(function(){game.displayStats()}, 2000)
    },
    timeUnitNextQuestion(){
        setTimeout(function (){game.displayQuestion()}, 2000)

    },
    checkAnswer(submitted){
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

game.displayQuestion()
$(document).on("click", "#submitAnswerBtn", function () {
    game.submitAnswer()})



