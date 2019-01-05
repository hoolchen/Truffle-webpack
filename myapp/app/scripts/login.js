$(document).ready(function() {
	$('#button2').on('click', function() {
		var username = $('#username').val();
		var passage = $('#passage').val();
		if (username == false || typeof username == 'undefined') {
			alert("username can not empty");
		}
		else if (passage == false || typeof passage == 'undefined') {
			alert("passage can not empty");
		}
		else {
			window.parent.App.Login(username, passage, function(err, result) {
				if (err) {
					console.log(err);
				}
				else {
					if (result == 2) {
						alert("this username does not exist");
					}
					else if (result == 1) {
						// document.location.href = "../iframes/successful.html?username=" + username;
						window.parent.App.tosuccess(username);

					}
					else if (result == 3) {
						alert("your passage is wrong");
					}
				}
			});
			// window.parent.App.test(username, function(result) {
			// 	console.log(result.toNumber());
			// })
			// window.parent.App.test(username);
		}
	});
});