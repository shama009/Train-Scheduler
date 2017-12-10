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

        var newTrain = {
            name: trainName,
            destination: trainDestination,
            time: firstTrainTime,
            frequency: trainFrequency
        }

        // Uploads train data to the database
        database.ref().push(newTrain);

        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.time);
        console.log(newTrain.frequency);

        // Clears all of the text-boxes
        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#time-input").val("");
        $("#frequency-input").val("");

    });

    // Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
    database.ref().on("child_added", function (childSnapshot, prevChildKey) {

        console.log(childSnapshot.val());

        // Store everything into a variable.
        var trainName = childSnapshot.val().name;
        var destination = childSnapshot.val().destination;
        var time = childSnapshot.val().time;
        var frequency = childSnapshot.val().frequency;

        console.log(trainName);
        var currentTime = moment().format("HH:mm");
        console.log(currentTime);
        var nextArrival = "0";
        var minAway = "0";
        // if(firstTrainTime==currentTime){
        //     nextArrival = currentTime+trainFrequency;
        //             }
        // for(var startTime = "10:00"; startTime <= currentTime; ){
        //     break;

        // }

        // var minAway = nextArrival - currentTime
        $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
            frequency + "</td><td>" + nextArrival + "</td><td>" + minAway + "</td><td>");
    });

});