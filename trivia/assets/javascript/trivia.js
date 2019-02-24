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

var game = {
    questions: [question1, question2],
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
            url:"https://api.giphy.com/v1/gifs/search?apikey=4Bh49w1RjN3aa88cRyxeNpd7ppM0htYQ&q=correct+answer&limit=1",
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
    timeUnitNextQuestion(){
        setTimeout(function (){game.displayQuestion()}, 3000)

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
            else {this.displayErrorNoAnswer()}


    }
}

game.displayQuestion()
$(document).on("click", "#submitAnswerBtn", function () {
    game.submitAnswer()})



