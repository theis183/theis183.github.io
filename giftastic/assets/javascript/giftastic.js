var topics = ["UFC", "NBA", "NFL", "PGA", "NHL", "MLB"]

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
        for(var i=0; i < 10; i++){
            var gif = $("<img>")
            gif.attr("src", res.data[i].images.original.url)
            $("#gif-results").prepend(gif)
        }

    })

} )