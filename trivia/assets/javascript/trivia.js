var question1= {
    question: "The unit of measurement Astronotical Unit (AU) measures what?",
    possibleAnswers:["The distance from Earth to the Sun", "The distance from Earth to the Moon", "The distance from Earth to Mars", "The distance from Earth to Alpha Centauri"],
    correctAnswer:0,
}

var game = {
    questions:[question1], 
    numberCorrect: 0,
    numberWrong: 0,
    currentQuestion: 0,
    displayQuestion: function(){
        console.log("in displayQuestion")
        var myQuestion = this.questions[this.currentQuestion]
        console.log("myQuestion is " + myQuestion)
        $("#question").html(myQuestion.question)
        $("#answers").html('')
        for(var i=0; i < myQuestion.possibleAnswers.length; i++ ){
            $("#answers").append('<div class="custom-control custom-radio">\
            <input type="radio" class="custom-control-input" id="answer' + i + '" name="groupOfDefaultRadios"> \
            <label class="custom-control-label" for="answer' + i +'">' + myQuestion.possibleAnswers[i] + '</label>\
            </div>')
        }
        $("#answers").append('<button type="button" class="btn btn-primary" id="submitAnswer">Submit</button>')
    }

    
}

game.displayQuestion()


  
