var config = {
    apiKey: "AIzaSyACi9_t9ZHcweR8DvmgmXL4cGoXBwOuEI8",
    authDomain: "clickcounter-ee0d6.firebaseapp.com",
    databaseURL: "https://clickcounter-ee0d6.firebaseio.com",
    projectId: "clickcounter-ee0d6",
    storageBucket: "clickcounter-ee0d6.appspot.com",
    messagingSenderId: "127141928495"
  };

    firebase.initializeApp(config);
    var database = firebase.database();

    $(document).on("click", "#add-train-submit-btn" , function(event){
        event.preventDefault()
        var name = $("#train-name-add-form").val()
        var destination = $("#train-destination-add-form").val()
        var first = $("#train-time-add-form").val()
        var frequency = $("#train-frequency-add-form").val()
        database.ref().push({
            name: name,
            destination: destination,
            first: first,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        })
    })

    database.ref().orderByChild("dateAdded").on("child_added", function(childSnapshot) {
        var $row = $("<tr>")
        var $name = $("<td>").text(childSnapshot.val().name)
        var $desination = $("<td>").text(childSnapshot.val().destination)
        var frequency = childSnapshot.val().frequency
        var $frequency =  $("<td>").text(frequency)
        var time = moment("03-01-2019 " + childSnapshot.val().first, "MM-DD-YYYY HH:mm").unix()
        var now = moment().unix()
        var minutesUntil = (parseInt(now) - parseInt(time)) / 60
        var trainsPassed = Math.ceil(minutesUntil / parseInt(childSnapshot.val().frequency))
        var nextTrain = moment(parseInt(time) + (trainsPassed * frequency * 60), "X")
        var $nextTrain =$("<td>").text(nextTrain.format("dddd, MMMM Do YYYY, h:mm"))
        var minutesUntilNextTrain = Math.floor((nextTrain.unix() - now ) / 60 )
        var $minutesUntilNextTrain = $("<td>").text(minutesUntilNextTrain)


        $row.append($name).append($desination).append($frequency).append($nextTrain).append($minutesUntilNextTrain)
        $("#train-schedule-info").append($row)
    
    })