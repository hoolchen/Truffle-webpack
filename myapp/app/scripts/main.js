$(document).ready(function() {
	$(".check_register").on("click", function() {
		document.getElementById("iframes").src="./iframes/register.html";
	});

	$(".check_login").on("click", function() {
		document.getElementById("iframes").src="./iframes/login.html";
	});
});