
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

  
  // "Temp" object for holding train data
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


database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trnName = childSnapshot.val().name;
  var trnDestination = childSnapshot.val().destination;
  var trnFirstTime = childSnapshot.val().firstTime;
  var trnFrequency = childSnapshot.val().frequency;



  // Train Information
  console.log(trnName);
  console.log(trnDestination);
  console.log(trnFirstTime);
  console.log(trnFrequency);

  var trnFirstTimeConverted = moment(trnFirstTime, "hh:mm").subtract(1, "years");
  console.log(trnFirstTimeConverted);
  var currentTime = moment();
  console.log("current Time: " + moment(currentTime).format("hh:mm"));
  var diffTime = currentTime.diff(moment(trnFirstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);
  var tRemainder = diffTime % trnFrequency;
  console.log(tRemainder);
  var tMinutesTillTrain = trnFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train arrival time
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  var nextTraintime = moment(nextTrain).format("hh:mm");


 //appends the variables to the table rows
  $("#train-table > tbody").append("<tr><td>" + trnName + "</td><td>" + trnDestination + "</td><td>" + trnFrequency + "</td><td>" + nextTraintime + "</td><td>" + tMinutesTillTrain + "</td><tr>");
})