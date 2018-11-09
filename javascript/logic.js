// Initialize Firebase
var config = {
    apiKey: "AIzaSyDgJEdGNmmMpzULpHCXHkuq9KHa1lmADoE",
    authDomain: "trainscheduler-8775c.firebaseapp.com",
    databaseURL: "https://trainscheduler-8775c.firebaseio.com",
    projectId: "trainscheduler-8775c",
    storageBucket: "trainscheduler-8775c.appspot.com",
    messagingSenderId: "132629265999"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // Buttons for adding Trains
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    // Grabs user input
    var trnName = $("#train-name-input").val().trim();
    var trnDest = $("#destination-input").val().trim();
    var trnTime = $("#train-time-input").val().trim();
    var trnFreq = $("#frequency-input").val().trim();

    // Creates local "temporary object for holding train data"
    database.ref().push({
      name: trnName,
      dest: trnDest,
      time: trnTime,
      freq: trnFreq
    });

    // Upload train data to the database
    // database.ref().push(newTrn);

    // Logs everything to console
    console.log(trnName);
    console.log(trnDest);
    console.log(trnTime);
    console.log(trnFreq);

    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#train-time-input").val("");
    $("#frequency-input").val("");
  });

  // Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    // Stores everything into a variable
    var trnName = childSnapshot.val().name;
    var trnDest = childSnapshot.val().dest;
    var trnTime = childSnapshot.val().time;
    var trnFreq = childSnapshot.val().freq;

    // Train info
    console.log(trnName);
    console.log(trnDest);
    console.log(trnTime);
    console.log(trnFreq);

    //Frequency
    var firstTime = trnTime;
    var frequency = trnFreq;

    // Prettify the train time
    var trnTimePretty = moment.unix(trnTime).format("HH:mm");

    // Calculate next arrival



    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trnName),
        $("<td>").text(trnDest),
        $("<td>").text(trnTime),
        $("<td>").text(trnFreq)
    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
