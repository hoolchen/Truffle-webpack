$(document).ready(function() {
	$('#button1').on('click', function() {
		var username = $('#username').val();
		var passage = $('#passage').val();
		if (username == false || typeof username == 'undefined') {
			alert("username can not empty");
		}
		else if (passage == false || typeof passage == 'undefined') {
			alert("passage can not empty");
		}
		else {
			window.parent.App.Register(username, passage, function(err, result) {
				if (err) {
					console.log(err);
				}
				else {
					if (result == 2) {
						alert("this username is registered");
					}
					else if (result == 1) {
						// document.location.href = "../iframes/successful.html?username=" + username;
						window.parent.App.tosuccess(username);

					}
				}
			});
		}
		// window.parent.App.test1(function(result) {
		// 	console.log(result.toNumber());
		// });
	});
});