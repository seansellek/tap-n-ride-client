var app = {
    domain: "https://quiet-earth-4041.herokuapp.com",
    currentTrip: false,
/*
   Application constructor
*/
   initialize: function() {
      this.bindEvents();
      console.log("Starting NFC Reader app");
   },

/*
   bind any events that are required on startup to listeners:
*/
   bindEvents: function() {
      
   },
/*
   this runs when the device is ready for user interaction:
*/
   beginListening: function() {
      nfc.addTagDiscoveredListener(
         app.onNfc,             // tag successfully scanned
         function (status) {    // listener successfully initialized
            app.display("listening");
         },
         function (error) {     // listener fails to initialize
            app.display("NFC reader failed to initialize " +
               JSON.stringify(error));
         }
      );
   },
   login: function(user) {
        app.currentUser = user;
        $.mobile.navigate('#landing-logged-in');
        $('.main-message').prepend('<h2>Welcome, ' + app.currentUser.email + '!</h2>');
        app.beginListening();
   },

   register: function() {
        myJSObject = {user:{ email: $('#register-email').val(), password: $('#register-password').val()}};
        alert(JSON.stringify(myJSObject));
        $.ajax({
            url: app.domain + "/users",
            type: 'POST',
            data : JSON.stringify(myJSObject),
            contentType : 'application/json',
            success: function(data) {
                app.login(data);
                alert("posted: " + JSON.stringify(data));
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert("status: " + textStatus);
                alert("error: " + errorThrown);
            }
        });
   },

   
   /*
   displays tag ID from @nfcEvent in message div:
*/
   onNfc: function(nfcEvent) {
      var tagID = nfc.bytesToHexString(nfcEvent.tag.id);
      alert(tagID);
      if (app.currentTrip) {
        app.updateTrip(tagID);
      } else {
        app.createTrip(tagID);
      }
   },

   updateTrip: function(stationId) {
            alert("Updating Trip");
            $.ajax({
            url: app.domain + "/trips&auth=" + app.currentUser.auth_token,
            type: 'PATCH',
            data: JSON.stringify({"station_id": stationID}),
            success: function(data) {
                alert("Hope you had a good trip! " + JSON.stringify(data));
                app.currentTrip = false;
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert("status: " + textStatus);
                alert("error: " + errorThrown);
            }
        });
   },

   createTrip: function(stationId) {
        alert("Creating Trip");
        $.ajax({
            url: app.domain + "/trips&auth=" + app.currentUser.auth_token,
            type: 'POST',
            data: JSON.stringify({"station_id": stationID}),
            success: function(data) {
                alert("Hava a nice trip! " + JSON.stringify(data));
                app.currentTrip = true;
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert("status: " + textStatus);
                alert("error: " + errorThrown);
            }
        });
   },

/*
   appends @message to the message div:
*/
   display: function(message) {
      alert(message);        // add the text
   },
/*
   clears the message div:
*/
   clear: function() {
       messageDiv.innerHTML = "";
   },

   tryLogin: function() {
        myJSObject = {session:{ email: $('#login-email').val(), password: $('#login-password').val()}};
        alert(JSON.stringify(myJSObject));
        $.ajax({
            url: app.domain + "/sessions",
            type: 'POST',
        data : JSON.stringify(myJSObject),
        contentType : 'application/json',
        success: function(data) {
            app.login(data);
                alert("posted: " + JSON.stringify(data));
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert("status: " + textStatus);
                alert("error: " + errorThrown);
            }
        });

   }
};  

$("#trigger-scan").click(app.createTrip("370700003d44fa"));
$("#register-button").click(app.register); 
$("#login-button").click(app.tryLogin);  // end of app
