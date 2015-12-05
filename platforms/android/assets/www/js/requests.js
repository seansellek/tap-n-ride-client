$(function() {
	current_user = undefined;
	$("#register-button").click(register);



	function register() {
		myJSObject = {user:{ email: $('#register-email').val(), password: $('#register-password').val()}};
		alert(JSON.stringify(myJSObject));
		$.ajax({
			url: "https://quiet-earth-4041.herokuapp.com/users",
			type: 'POST',
	    data : JSON.stringify(myJSObject),
	    contentType : 'application/json',
	    success: function(data) {
	    	login(data);
				alert("posted: " + JSON.stringify(data));
			},
			error: function(jqXHR, textStatus, errorThrown){
				alert("status: " + textStatus);
				alert("error: " + errorThrown);
			}
		});
	}

	function login(user) {
		current_user = user;
		$.mobile.navigate('#landing-logged-in');
		$('.main-message').prepend('<h2>Welcome, ' + current_user.email + '!</h2>');
	}
});
