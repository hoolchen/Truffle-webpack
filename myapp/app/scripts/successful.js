// var imgUrl = require('./app/images/picture1.jpg')

var restaurants = [];
var pos;

function showInfo(datas) {
	var url = location.search;
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		var strs = str.split("&");
		for (var i = 0; i < strs.length; ++i) {
			var _strs = strs[i].split("=");
			console.log(_strs[1]);
			if (i == 0) {
				document.getElementById('username').innerHTML = _strs[1];
			}
		}
	}

	for (var i in datas) {
		restaurants.push(datas[i]);
	}
	console.log(restaurants);
	var oneUl = document.getElementById("restaurants");
     for (var i in restaurants) {
        console.log(restaurants[i].name);
        var oneLi = document.createElement("li");
        oneLi.classList.add("bb");
        oneLi.innerHTML = "<img src=\"" + restaurants[i].picture + "\" class=\"content1\"/><p class=\"font3\">name:" + restaurants[i].name + "</p><p class=\"font3\">mark:" + restaurants[i].mark + "</p>";
        oneUl.append(oneLi); 
     }
}

function enableInfo() {
	var oli = document.getElementsByTagName("li");
	// console.log(oli.length);
	for (var i in oli) {
		oli[i].onclick = function() {
			// var pos;
			// console.log(oli.length);
			for (var i = 0; i < oli.length; ++i) {
				// oli[i].classList.remove("content2");
				// oli[i].className = "bb";
				if (oli[i] != this) {
					// console.log(i);
					// oli[i].className = "bb";
					oli[i].classList.remove("content2");
					oli[i].innerHTML = "<img src=\"" + restaurants[i].picture + "\" class=\"content1\"/><p class=\"font3\">name:" + restaurants[i].name + "</p><p class=\"font3\">mark:" + restaurants[i].mark + "</p>";
				}
				else {
					pos = i;
				}
			}
			if (this.classList.contains("content2")) {
				// this.classList.remove("content2");
				// this.classList.add("bb");
				// console.log("change");
				// this.innerHTML = "<img src=\"" + restaurants[pos].picture + "\" class=\"content1\"/><p class=\"font3\">name:" + restaurants[pos].name + "</p><p class=\"font3\">mark:" + restaurants[pos].mark + "</p>";
			}
			else {
				this.classList.add("content2");
				this.classList.remove("bb");
				var content_change;
				if (IfInRestaurant(restaurants[pos])) {
					var pos1 = position(pos);
					content_change = "<p class=\"font4_change_2\">Your Evaluate</p>"
								   + "<p class=\"font5_change\">Your Mark:" + restaurants[pos].visited[pos1].mark + "</p>"
								   + "<p class=\"font5_change\">Your Evaluate:" + judgemark(restaurants[pos].visited[pos1].typeofmark) + "</p>";
				}
				else {
					content_change = "<p class=\"font4_change_2\">Your Evaluate</p>"
								   + "<p class=\"font5_change\"><label class=\"lable1_change\">Your Mark(0~10):</label>" + "<input id=\"mark\" type=\"text\" class=\"input_change\" /></p>" 
								   + "<p class=\"font5_change\"><label class=\"lable1_change\">Your Evaluate:</label>" 
								   + "<label class=\"lable2_change\"><input name=\"typeofmark\" type=\"radio\">good</lable>"
								   + "<label class=\"lable2_change\"><input name=\"typeofmark\" type=\"radio\">middle</lable>"
								   + "<label class=\"lable2_change\"><input name=\"typeofmark\" type=\"radio\">bad</lable></p>"
								   + "<button id=\"button1_change\" onclick=\"changeInfo()\">submit</button>";
				}
				this.innerHTML  = "<div class=\"change_left\">"  
								+ "<img src=\"" + restaurants[pos].picture + "\" class=\"content1_change\"/>"
								+ "<p class=\"font3_change\">" + restaurants[pos].name + "</p>"
								+ "</div>"
								+ "<div class=\"change_right\">"
								+ "<div class=\"top_change\">"
								+ "<div id=\"back\" onclick=\"toback(event)\"><img src=\"../images/back.png\"/></div>"
								+ "<p class=\"font4_change_1\">Info</p>"
								+ "<p class=\"font5_change\">Mark:" + restaurants[pos].mark + "</p>"
								+ "<p class=\"font5_change\">Number of goodmark:" + restaurants[pos].goodmark + "</p>"
								+ "<p class=\"font5_change\">Number of middlemark:" + restaurants[pos].middlemark + "</p>"
								+ "<p class=\"font5_change\">Number of badmark:" + restaurants[pos].badmark + "</p>"
								+ "<p class=\"font5_change\">Number of visited:" + restaurants[pos].visited.length + "</p>"
								+ "</div>"
								+ "<div class=\"bottom_change\">"
								+ content_change
								+ "<div/>"
								+ "</div>";
			}
		}
	}
}

function judgemark(mark) {
	if (mark == 1) return "good";
	else if (mark == 0) return "middle";
	else return "bad";
}

function IfInRestaurant(restaurant) {
	var username = document.getElementById('username').innerHTML;
	// console.log(username);
	for (var i in restaurant.visited) {
		if (username == restaurant.visited[i].name)
			return true;
	}
	return false;
}

function position(pos) {
	var username = document.getElementById('username').innerHTML;
	// console.log(username);
	for (var i in restaurants[pos].visited) {
		console.log(username + " " + restaurants[pos].visited[i].name);
		if (username == restaurants[pos].visited[i].name)
			return i;
	}
	return -1;
}

function toback(event) {
	console.log("in");
	var oli = document.getElementsByTagName("li");
	for (var i = 0; i < oli.length; ++i) {
		oli[i].classList.remove("content2");
		oli[i].classList.add("bb");
		oli[i].innerHTML = "<img src=\"" + restaurants[i].picture + "\" class=\"content1\"/><p class=\"font3\">name:" + restaurants[i].name + "</p><p class=\"font3\">mark:" + restaurants[i].mark + "</p>";
	}
	// return false;
	event.stopPropagation();
}

function changeInfo() {
	var text1 = document.getElementById("mark").value;
	var text2 = document.getElementsByName("typeofmark");
	var a;
	if (text2[0].checked) {
		restaurants[pos].goodmark++;
		a = 1;
	}
	else if (text2[1].checked) {
		restaurants[pos].middlemark++;
		a = 0;
	}
	else {
		restaurants[pos].badmark++;
		a = -1;
	}
	var b = {
		"name":document.getElementById('username').innerHTML,
		"mark":parseFloat(text1),
		"typeofmark":a
	};
	console.log(b);
	restaurants[pos].mark = (restaurants[pos].mark * restaurants[pos].visited.length + parseFloat(text1)) / (restaurants[pos].visited.length + 1);
	restaurants[pos].visited.push(b);
	window.parent.App.change(restaurants[pos], b);

	var oli = document.getElementsByTagName("li");
	var pos1 = position(pos);
	console.log(pos1);
	oli[pos].innerHTML   = "<div class=\"change_left\">"  
						+ "<img src=\"" + restaurants[pos].picture + "\" class=\"content1_change\"/>"
						+ "<p class=\"font3_change\">" + restaurants[pos].name + "</p>"
						+ "</div>"
						+ "<div class=\"change_right\">"
						+ "<div class=\"top_change\">"
						+ "<div id=\"back\" onclick=\"toback(event)\"><img src=\"../images/back.png\"/></div>"
						+ "<p class=\"font4_change_1\">Info</p>"
						+ "<p class=\"font5_change\">Mark:" + restaurants[pos].mark + "</p>"
						+ "<p class=\"font5_change\">Number of goodmark:" + restaurants[pos].goodmark + "</p>"
						+ "<p class=\"font5_change\">Number of middlemark:" + restaurants[pos].middlemark + "</p>"
						+ "<p class=\"font5_change\">Number of badmark:" + restaurants[pos].badmark + "</p>"
						+ "<p class=\"font5_change\">Number of visited:" + restaurants[pos].visited.length + "</p>"
						+ "</div>"
						+ "<div class=\"bottom_change\">"
						+  "<p class=\"font4_change_2\">Your Evaluate</p>"
						+ "<p class=\"font5_change\">Your Mark:" + restaurants[pos].visited[pos1].mark + "</p>"
						+ "<p class=\"font5_change\">Your Evaluate:" + judgemark(restaurants[pos].visited[pos1].typeofmark) + "</p>"
						+ "<div/>"
						+ "</div>";
}


