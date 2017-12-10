// initialize variables
// initialize firebase database
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

        var database = firebase.database();
        var newTrain = {
            name: trainName,
            destination: trainDestination,
            time: firstTrainTime,
            frequency: trainFrequency
        }

        // Uploads train data to the database
        database.ref().push(newTrain);

        console.log(trainName);
        console.log(destination);
        console.log(firstTrainTime);
        console.log(frequency);

        ("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
            frequency + "</td><td>" + nextArrival + "</td><td>" + minAway + "</td><td>");
    });

});