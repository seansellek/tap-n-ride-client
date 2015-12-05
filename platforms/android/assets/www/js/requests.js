function requests() {

	function get() {
		
	}

	function post() {
		var url = "https://obscure-wildwood-1281.herokuapp.com/users";
		myJSObject = {user:{ email: "user@example.com", password:"password",first_name:"User1_first", last_name:"User1_last",phone:"1234567890"}}
		$.post(url, 
		{
		    data : JSON.stringify(myJSObject),
		    contentType : 'application/json',
		    type : 'POST'
		}, function() {
			alert("posted");
		});
	}
	post();

	function patch() {

	}

	function delete() {

	}

}