var topics = ["UFC", "NBA", "NFL", "PGA", "NHL", "MLB", "FIFA"]

function createButtons() {
    for(var i=0; i < topics.length; i++){
        var button = $('<button type="button" class="btn btn-primary create-gif-btn">Primary</button>')
        button.attr("id", topics[i] + "-button" ).text(topics[i]).attr("topic", topics[i])
        $("#buttonBar").append(button)
    }
}



createButtons()

$(document).on("click" , ".create-gif-btn", function(){

    var gifTopic = $(this).attr("topic")

    $.ajax({
        url:"https://api.giphy.com/v1/gifs/search?apikey=4Bh49w1RjN3aa88cRyxeNpd7ppM0htYQ&q=" + gifTopic + "&limit=10",
        method: "GET"
    }).then(function(res) {
        console.log(res)
        for(var i=0; i < 10; i++){
            var div = $("<div>")
            var gif = $("<img>")
            var p = $("<p>")
            p.text("Rating: " + res.data[i].rating)
            gif.attr("src", res.data[i].images.fixed_height_still.url).attr("state", "still").attr("still-image", res.data[i].images.fixed_height_still.url)
            gif.attr("animated-image", res.data[i].images.fixed_height.url).attr("class", "gif")
            div.append(p).append(gif).attr("class", "gif-container")
            $("#gif-results").prepend(div)
        }

    })

} )

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