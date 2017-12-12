// Initialize Firebase
var config = {
    apiKey: "AIzaSyAz2bANvVq3E9BlmgvIlJgWrvBbs2oImCU",
    authDomain: "coding-bootcamp-a5d34.firebaseapp.com",
    databaseURL: "https://coding-bootcamp-a5d34.firebaseio.com",
    projectId: "coding-bootcamp-a5d34",
    storageBucket: "coding-bootcamp-a5d34.appspot.com",
    messagingSenderId: "469751850636"
};
firebase.initializeApp(config);
// initialize firebase database
var database = firebase.database();
// store user input in firebase
// as user enters new data get the data from firebase
// caliculate next arrival and minutes away values
// display data to html page.

$(document).ready(function () {
    // on click of submit button
    $("#add-train-btn").on("click", function (event) {
        //prevent submission of form
        event.preventDefault();
        // get user input form data 
        var trainName = $("#train-name-input").val().trim();
        var trainDestination = $("#destination-input").val().trim();
        var firstTrainTime = $("#time-input").val().trim();
        var trainFrequency = $("#frequency-input").val().trim();

        // empty input validation
        if (trainName && trainDestination && firstTrainTime && trainFrequency) {
            // validation for first Train Time
            var valid = moment(firstTrainTime, "HH:mm", true).isValid();
            if (valid) {
                firstTrainTime = $("#time-input").val().trim();
                var newTrain = {
                    name: trainName,
                    destination: trainDestination,
                    time: firstTrainTime,
                    frequency: trainFrequency
                }

                //console log train data from object
                // console.log(newTrain.name);
                // console.log(newTrain.destination);
                // console.log(newTrain.time);
                // console.log(newTrain.frequency);

                // Uploads train data to the database
                database.ref().push(newTrain);
                // Clears all of the text-boxes
                $("#train-name-input").val("");
                $("#destination-input").val("");
                $("#time-input").val("");
                $("#frequency-input").val("");

            }
            else {
                alert("Please enter valid military time for First Train Time!");
            }
        }
        else {
            alert("All fields are mandatory");
        }

    });

    // Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
    database.ref().on("child_added", function (childSnapshot, prevChildKey) {

        console.log(childSnapshot.val());

        // Store everything into a variable.
        var trainName = childSnapshot.val().name;
        var destination = childSnapshot.val().destination;
        var firstTime = childSnapshot.val().time;
        var frequency = childSnapshot.val().frequency;

        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // Difference between the times
        var diffTime = currentTime.diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % frequency;
        console.log(tRemainder);

        // Minute Until Train
        var minAway = frequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + minAway);

        // Next Train
        var nextTrain = moment().add(minAway, "minutes").format("hh:mm A");
        console.log("ARRIVAL TIME: " + nextTrain);
        $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
            frequency + "</td><td>" + nextTrain + "</td><td>" + minAway + "</td><td>");
    });

});