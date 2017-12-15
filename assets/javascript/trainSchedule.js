
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDx5FV9rivnNtKuC_mNBVndqw10Jb282LI",
    authDomain: "train-time-6988f.firebaseapp.com",
    databaseURL: "https://train-time-6988f.firebaseio.com",
    projectId: "train-time-6988f",
    storageBucket: "train-time-6988f.appspot.com",
    messagingSenderId: "276002555880"
  };

  firebase.initializeApp(config);

//on click event for submit button
 var database = firebase.database();
 $("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Gets user input
  var trnName = $("#train-name-input").val();
  var trnDestination = $("#destination-input").val();
  var trnFirstTime = moment($("#first-time-input").val(), "hh:mm").format("HH:mm");
  var trnFrequency = $("#frequency-input").val();

  
  // Temporary object for holding train data
  var newTrn = {
    name: trnName,
    destination: trnDestination,
    firstTime: trnFirstTime,
    frequency: trnFrequency,
  };

    // Pushes Train data to the database
  database.ref().push(newTrn);


    // Alert
  alert("Train successfully added");

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-time-input").val("");
  $("#frequency-input").val("");
});


 //declaring function to get newly added data to the database
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trnName = childSnapshot.val().name;
  var trnDestination = childSnapshot.val().destination;
  var trnFirstTime = childSnapshot.val().firstTime;
  var trnFrequency = childSnapshot.val().frequency;

  //converting the first train's time to make sure it falls before todays time
  var trnFirstTimeConverted = moment(trnFirstTime, "hh:mm").subtract(1, "years");
  // getting current time
  var currentTime = moment();
  // getting the difference in time from the current time and the first train as minutes
  var diffTime = currentTime.diff(moment(trnFirstTimeConverted), "minutes");
  // dividing the train's datetime by the frequency
  var remainder = diffTime % trnFrequency;
  //getting the minutes until the train
  var minsUntilTrain = trnFrequency - remainder;

    // Next Train arrival time
  var nextTrain = moment().add(minsUntilTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  var nextTraintime = moment(nextTrain).format("hh:mm");


 //appends the variables to the table rows
  $("#train-table > tbody").append("<tr><td>" + trnName + "</td><td>" + trnDestination + "</td><td>" + trnFrequency + "</td><td>" + nextTraintime + "</td><td>" + minsUntilTrain + "</td><tr>");
})