// function requests() {

// 	function get() {
		
// 	}

// 	function post() {
// 		
// 	}
// 	post();

// 	function patch() {

// 	}

// 	function delete() {

// 	}

// }
$(function() {
	$("#register-button").click(function(){
		var url = "https://quiet-earth-4041.herokuapp.com/users";
		myJSObject = {user:{ email: "user@example.com", password:"password",password_conformation:"password",first_name:"User1_first", last_name:"User1_last",phone:"1234567890"}}
		alert(JSON.stringify(myJSObject));
		$.post(url, 
		{
		    data : JSON.stringify(myJSObject),
		    contentType : 'application/json',
		    type : 'POST'
		}, function() {
			alert("posted");
		});
	});
});
