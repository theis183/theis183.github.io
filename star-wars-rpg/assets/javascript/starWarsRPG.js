var game = {
    characterImages: ['<div class="card character" style="width: 80%;" id="maul">\
    <img src="assets/images/star-wars-characters-darth_maul.jpg" class="card-img-top" alt="..." style="height: 160px;">\
    <div class="card-body">\
      <h5 class="card-title">Maul</h5>\
      <p class="card-text" id="maulStats"></p>\
    </div>\
  </div>',
        '<div class="card character" style="width: 80%;" id="vader">\
    <img src="assets/images/star-wars-characters-darth_vader.jpg" class="card-img-top" alt="..." style="height: 160px;">\
    <div class="card-body">\
      <h5 class="card-title">Vader</h5>\
      <p class="card-text" id="vaderStats"></p>\
    </div>\
  </div>',
        '<div class="card character" style="width: 80%;" id="yoda">\
    <img src="assets/images/star-wars-characters-yoda.jpg" class="card-img-top" alt="..." style="height: 160px;">\
    <div class="card-body">\
      <h5 class="card-title">Yoda</h5>\
      <p class="card-text" id="yodaStats"></p>\
    </div>\
  </div>',
        '<div class="card character" style="width: 80%;" id="luke">\
    <img src="assets/images/star-wars-characters-luke.jpg" class="card-img-top" alt="..." style="height: 160px;">\
    <div class="card-body">\
      <h5 class="card-title">Luke</h5>\
      <p class="card-text" id="lukeStats"></p>\
    </div>\
  </div>'],
    state: "characterSelect",
    myCharacter: "",
    attackingCharacter: "",
    originalAtkPwr: 0,
    enemiesDefeated: 0,
    enemiesDefeatedNames: [],
    characters: {
        names: ["maul", "vader", "yoda", "luke"],
        luke: {
            hp: 100,
            atkPwr: 7,
            cntrAtkPwr: 20,
        },
        yoda: {
            hp: 90,
            atkPwr: 5,
            cntrAtkPwr: 30,
        },
        vader: {
            hp: 120,
            atkPwr: 10,
            cntrAtkPwr: 10,
        },
        maul: {
            hp: 100,
            atkPwr: 12,
            cntrAtkPwr: 8,
        }
    },
    gameOver: function () {
        this.state = "defeated"
        alert(this.myCharacter + " has been defeated!")
    },
    initSelectingImages: function () {
        for (var i = 0; i < this.characterImages.length; i++) {
            $("#select" + i).html(this.characterImages[i])
        }
    },
    moveEnimies: function () {
        var found = 0
        for (var i = 0; i < this.characterImages.length; i++) {
            $("#" + this.characters.names[i]).remove()
            if (this.characters.names[i] === this.myCharacter) {
                $("#select0").append(this.characterImages[i])

            }
            else if (this.characters.names[i] === this.attackingCharacter) {
                $("#battleGround").append(this.characterImages[i])
            }
            else if (!(this.enemiesDefeatedNames.includes(this.characters.names[i]))) {
                $("#enemy" + found).append(this.characterImages[i])
                found++
            }
        }
        this.displayStats()
    },
    displayStats: function () {
        var currChar = ''
        var currCharStats = ''
        console.log("start of display stats")
        for (var i = 0; i < this.characterImages.length; i++) {
            currChar = game.characters.names[i]
            currCharStats = game.characters[game.characters.names[i]]
            $("#" + currChar + "Stats").html("HP: " + currCharStats.hp + "<br>" +
                "Attack Power: " + currCharStats.atkPwr + "<br>" +
                "Counter Power: " + currCharStats.cntrAtkPwr)
        }
    },
    displayVictory: function () {
        game.state = "victory"
        alert(game.myCharacter + " is victorious!")
    },
    displayInstructions: function () {
        if (game.state === "characterSelect") {
            $("#gameStateInstruction").html("Choose your character by clicking on any portrait")
        }
        else if (game.state === "attackSelect") {
            $("#gameStateInstruction").html("Choose an enemy to attack by clicking on their portrait")
        }
        else if (game.state === "fighting") {
            $("#gameStateInstruction").html("Click the attack button to attack your target")
        }
    },
    clearLog: function () {
        $("#battleLog").html("")
    },
    clearCharacters: function () {
        for (var i = 0; i < this.characterImages.length; i++) {
            if (!(this.enemiesDefeatedNames.includes(this.characters.names[i]))) {
                $("#" + this.characters.names[i]).remove()
            }
        }
    },
    newGame: function () {
        this.clearCharacters()
        this.characters.maul.atkPwr = 12
        this.characters.maul.hp = 100
        this.characters.vader.atkPwr = 10
        this.characters.vader.hp = 120
        this.characters.yoda.atkPwr = 5
        this.characters.yoda.hp = 90
        this.characters.luke.atkPwr = 7
        this.characters.luke.hp = 100
        this.state = "characterSelect"
        this.enemiesDefeated = 0
        this.enemiesDefeatedNames = []
        this.myCharacter = ""
        this.attackingCharacter = ""
        this.originalAtkPwr = 0
        this.clearLog()
        this.initSelectingImages()
        this.displayStats()
        this.displayInstructions()
    }

}

game.initSelectingImages()
game.displayStats()
game.displayInstructions()

$(document).ready(function () {

    $(document).on("click", ".character", function () {
        if (game.state === "characterSelect") {
            game.myCharacter = this.id
            console.log(game.myCharacter)
            game.state = "attackSelect"
            game.originalAtkPwr = game.characters[game.myCharacter].atkPwr
            game.moveEnimies()
            game.displayInstructions()
            document.getElementById(this.id + "Sound").play()
        }
    })

    $(document).on("click", ".character", function () {
        console.log("This is " + this.id)
        if (game.state === "attackSelect" && this.id != game.myCharacter) {
            game.attackingCharacter = this.id
            game.state = "fighting"
            game.moveEnimies()
            game.displayInstructions()
            console.log("Now attacking : " + game.attackingCharacter)
        }
    })

    $("#attack").on("click", function () {
        if (game.state === "fighting") {
            document.getElementById("battleSound").play()
            game.characters[game.attackingCharacter].hp -= game.characters[game.myCharacter].atkPwr
            $("#battleLog").append("You attacked " + game.attackingCharacter + " for " + game.characters[game.myCharacter].atkPwr + " damage! <br> ")
            game.characters[game.myCharacter].atkPwr += game.originalAtkPwr
            if (game.characters[game.attackingCharacter].hp > 0) {
                game.characters[game.myCharacter].hp -= game.characters[game.attackingCharacter].cntrAtkPwr
                $("#battleLog").append(game.attackingCharacter + " attacked you for " + game.characters[game.attackingCharacter].cntrAtkPwr + " damage! <br>")
            }
            else {
                $("#" + game.attackingCharacter).remove()
                game.enemiesDefeated++
                game.enemiesDefeatedNames.push(game.attackingCharacter)
                $("#battleLog").append("You have defeated " + game.attackingCharacter + "! <br>")
                if (game.enemiesDefeated < 3) {
                    game.state = "attackSelect"
                    game.displayInstructions()
                }
                else {
                    game.displayVictory()
                }
            }
            if (game.characters[game.myCharacter].hp <= 0) {
                game.gameOver()
            }
            game.displayStats()
        }
    })

    $("#newGame").on("click", function(){
        var startNew = confirm("Start a new game?")
        if (startNew){game.newGame()}
    })

})




