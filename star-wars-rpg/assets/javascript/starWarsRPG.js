var game =  {
    characterImages:['<div class="card character" style="width: 80%;" id="maul">\
    <img src="assets/images/star-wars-characters-darth_maul.jpg" class="card-img-top" alt="...">\
    <div class="card-body">\
      <h5 class="card-title">Maul</h5>\
      <p class="card-text" id="maulStats">Lorem ipsum blah hfjsgjksfnhfv</p>\
    </div>\
  </div>',
  '<div class="card character" style="width: 80%;" id="vader">\
    <img src="assets/images/star-wars-characters-darth_vader.jpg" class="card-img-top" alt="...">\
    <div class="card-body">\
      <h5 class="card-title">Vader</h5>\
      <p class="card-text" id="vaderStats">Lorem ipsum blah hfjsgjksfnhfv</p>\
    </div>\
  </div>',
  '<div class="card character" style="width: 80%;" id="yoda">\
    <img src="assets/images/star-wars-characters-yoda.jpg" class="card-img-top" alt="...">\
    <div class="card-body">\
      <h5 class="card-title">Yoda</h5>\
      <p class="card-text" id="yodaStats">Lorem ipsum blah hfjsgjksfnhfv</p>\
    </div>\
  </div>',
  '<div class="card character" style="width: 80%;" id="luke">\
    <img src="assets/images/star-wars-characters-luke.jpg" class="card-img-top" alt="...">\
    <div class="card-body">\
      <h5 class="card-title">Luke</h5>\
      <p class="card-text" id="lukeStats">Lorem ipsum blah hfjsgjksfnhfv</p>\
    </div>\
  </div>'],
    state: "characterSelect",
    myCharacter:"",
    attackingCharacter:"",
    originalAtkPwr: 0,
    enemiesDefeated: 0,
    characters: {
        names: ["maul", "vader", "yoda", "luke"],
        luke: {
            hp: 100,
            atkPwr: 8,
            cntrAtkPwr: 15,
        },
        yoda: {
            hp: 80,
            atkPwr: 5,
            cntrAtkPwr: 25,
        },
        vader: {
            hp: 120,
            atkPwr: 10,
            cntrAtkPwr: 8,
        },
        maul: {
            hp: 100,
            atkPwr: 15,
            cntrAtkPwr: 5,
        }
    },
    gameOver: function (){
        this.state = "defeated"
    },
    initSelectingImages: function(){
        for (var i=0; i < this.characterImages.length; i++){
            $("#select" + i).html(this.characterImages[i])  
        }
    },
    moveEnimies: function(){
        var found=0
        for (var i=0; i< this.characterImages.length; i++){
            $("#" + this.characters.names[i]).remove()
            if ( this.characters.names[i] != this.myCharacter){
                $("#enemy" + found).append(this.characterImages[i])
                found++
            }
            else {
                $("#select0").append(this.characterImages[i])
            }
        }
        this.displayStats()
    },
    displayStats: function(){
        var currChar=''
        var currCharStats = ''
        console.log("start of display stats")
        for (var i=0; i < this.characterImages.length; i++){
            console.log("inside stats loop")
            currChar = game.characters.names[i]
            currCharStats = game.characters[game.characters.names[i]]
            $("#" + currChar + "Stats").html("HP: " + currCharStats.hp + "<br>" +
                "Attack Power: " + currCharStats.atkPwr + "<br>" +
                "Counter Power: " +currCharStats.cntrAtkPwr)
        }
    },

    }

    game.initSelectingImages()
    game.displayStats()

    $(document).ready(function() {

    $(".character").on("click", function(){
        if(game.state==="characterSelect"){
        game.myCharacter=this.id
        console.log(game.myCharacter)
        game.state="attackSelect"
        game.originalAtkPwr = game.characters[game.myCharacter].atkPwr
        game.moveEnimies()}
    })

    $(document).on("click",".character", function(){
        console.log("This is " + this.id)
        if(game.state==="attackSelect" && this.id !=game.myCharacter){
            game.attackingCharacter=this.id
            game.state="fighting"
            console.log("Now attacking : "+ game.attackingCharacter)
        }

    $("#attack").on("click", function(){
        if(game.state==="fighting"){
            game.characters[game.attackingCharacter].hp -= game.characters[game.myCharacter].atkPwr
            game.characters[game.myCharacter].atkPwr += game.originalAtkPwr
            console.log("The targets hp is " + game.characters[game.attackingCharacter].hp)
            if (game.characters[game.attackingCharacter].hp > 0){
                game.characters[game.myCharacter].hp -= game.characters[game.attackingCharacter].cntrAtkPwr
                console.log("Your hp is " + game.characters[game.myCharacter].hp)
            }
            else {
                $("#" + game.attackingCharacter).remove()
                game.state = "attackSelect"
            }
            if (game.characters[game.myCharacter].hp <= 0){
                game.gameOver()
            }
            game.displayStats()
        }
    })

    })
})



