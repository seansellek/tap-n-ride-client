var app = {
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
        app.current_user = user;
        $.mobile.navigate('#landing-logged-in');
        $('.main-message').prepend('<h2>Welcome, ' + app.current_user.email + '!</h2>');
        app.beginListening();
   },

   register: function() {
        myJSObject = {user:{ email: $('#register-email').val(), password: $('#register-password').val()}};
        alert(JSON.stringify(myJSObject));
        $.ajax({
            url: "https://quiet-earth-4041.herokuapp.com/users",
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
      app.display(tagID);
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
   }
};  

$("#register-button").click(app.register);   // end of app
