
//topic that will be added as buttons to add gis
var topics = ["UFC", "NBA", "NFL", "PGA", "NHL", "MLB", "FIFA"]
//array to contain the id of the favorited gifs
var favorites=[]

//creates the topics and favorite buttons
function createButtons() {
    for(var i=0; i < topics.length; i++){
        var button = $('<button type="button" class="btn btn-primary create-gif-btn">Primary</button>')
        button.attr("id", topics[i] + "-button" ).text(topics[i]).attr("topic", topics[i])
        $("#buttonBar").append(button)
    }
    $("#buttonBar").append('<button type="button" class="btn btn-primary" id="favorite-btn">Favorites</button>')
    

}

//adds a gif as a card element needs a response and an index
function addGif(i, res) {
    var div= $('<div class="card" style="width: 18rem;">')
            var cardBody= $('<div class="card-body"> </div>')
            var cardTitle = $('<h5 class="card-title">'+res.data[i].title +'</h5>')
            var favBtn = $('<button type="button" class="btn btn-primary favorite-gif-btn">☆</button>')
            favBtn.attr("gif-id", res.data[i].id)
            var gif = $('<img class="card-img-top gif">')
            var p = $('<p class="card-text" > </p>')
            p.text("Rating: " + res.data[i].rating.toUpperCase())
            gif.attr("src", res.data[i].images.fixed_height_still.url).attr("state", "still").attr("still-image", res.data[i].images.fixed_height_still.url)
            gif.attr("animated-image", res.data[i].images.fixed_height.url).attr("gif-id", res.data[i].id)
            cardBody.append(cardTitle).append(p).append(favBtn)
            div.append(gif).append(cardBody).attr("class", "gif-container")
            $("#gif-results").prepend(div)

}
//init the button bar
createButtons()

//runs whenever one of the topic buttons is clicked
$(document).on("click" , ".create-gif-btn", function(){

    var gifTopic = $(this).attr("topic")
//get call to get the 10 gifs for the topic clicked
    $.ajax({
        url:"https://api.giphy.com/v1/gifs/search?apikey=4Bh49w1RjN3aa88cRyxeNpd7ppM0htYQ&q=" + gifTopic + "&limit=10",
        method: "GET"
    }).then(function(res) {
        console.log(res)
        for(var i=0; i < 10; i++){
            addGif(i, res)
        }

    })

} )
//handles the playing and pausing of gifs
$(document).on("click", ".gif", function(){
    var myGif = $(this)
    var state = myGif.attr("state")
    if (state == "still") {
        myGif.attr("src" ,myGif.attr("animated-image")).attr("state", "animated")
    }
    else{
        myGif.attr("src" ,myGif.attr("still-image")).attr("state", "still")
    }
})
//adds the giff to id to favorite array when add to favorites button is clicked
$(document).on("click", ".favorite-gif-btn", function(){
    var gifId= $(this).attr("gif-id")
    favorites.push(gifId)
    console.log(gifId)
})

//adds the giffs that have been favorited
$(document).on("click", "#favorite-btn", function(){
    var numberOfGifs = favorites.length
    var gifToReturn = favorites.toString()
    if (numberOfGifs > 0){
    $.ajax({
        url:"https://api.giphy.com/v1/gifs?apikey=4Bh49w1RjN3aa88cRyxeNpd7ppM0htYQ&ids=" + gifToReturn,
        method: "GET"
    }).then(function(res) {
        console.log(res)
        for(var i=0; i < numberOfGifs; i++){
            addGif(i, res)
        }

    })}
})