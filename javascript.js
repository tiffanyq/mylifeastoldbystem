var titles = [];
var texts = [];
var imagepaths = [];
var authors = [];
var currentConcept1 = 0;
var likeValues = [57,26,14,20];

window.addEventListener("load", function(event) {
	getData();
  });

function getData() {
	 var xmlhttp;

	 if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	  } else {
		// code for older browsers
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	  }
	  xmlhttp.onreadystatechange = function() 
	  { if (this.readyState == 4 &&  this.status == 200) 
	  {
		  loadPage(this);
		}
		
	  };
	  xmlhttp.open("GET", "submissions.xml" , true);
	  xmlhttp.send();
}

function loadPage(xml) {
	 data = xml.responseXML;
	  x = data.getElementsByTagName("submission");
	  for (i = 0; i < x.length; i++) { 
		titles.push(x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue);
		texts.push(x[i].getElementsByTagName("text")[0].childNodes[0].nodeValue);
		imagepaths.push(x[i].getElementsByTagName("image")[0].childNodes[0].nodeValue);
		authors.push(x[i].getElementsByTagName("author")[0].childNodes[0].nodeValue);
		
	  }

	  document.getElementById("highlight").innerText = titles[0];
	  document.getElementById("stem-description").innerText = texts[0];
	  document.getElementById("stem-image").src = imagepaths[0];
	  document.getElementById("contributor").innerText = authors[0];
	  document.getElementById("likes").innerText = likeValues[0];
	  
}

function switchConcept(currentConcept, direction) {

	var title = document.getElementById("highlight");
	var text = document.getElementById("stem-description");
	var image = document.getElementById("stem-image");
	var author = document.getElementById("contributor");
	var likes = document.getElementById("likes");

	if (direction == "forward") {
		var newIndex = ++currentConcept % titles.length;
	} else {
		if (currentConcept == 0) {
			var newIndex = 3;	
		} else {
			var newIndex = --currentConcept % titles.length;
		}	
	}

	title.innerText = titles[newIndex];
	text.innerText = texts[newIndex];
	image.src = imagepaths[newIndex];
	contributor.innerText = authors[newIndex];
	likes.innerText = likeValues[newIndex];

	currentConcept1 = newIndex;
	animateTransition();

}

function animateTransition() {
	var content = document.getElementById("content");
	
      	content.className = "transition";
      
	setTimeout(function() {
      	content.className = "transition-out";
      }, 50);

}

function validateSubmission(submission) {
	let emailAddress = document.getElementById("email-input").value;
	let emailConfirm = document.getElementById("email-confirm").value;
	let formMessage = 	document.getElementById("validation-message");

	if (!emailValid(emailAddress)) {
		displayFormMessage("Please submit a valid email address");
		formMessage.style.color = "red";
		return false;
	}
	else if (!emailMatches(emailAddress,emailConfirm)) {
		displayFormMessage("Emails don't match");
		formMessage.style.color = "red";
		return false;
	}
	displayFormMessage("Thanks for your submission!");
	formMessage.style.color = "green";

	return true; /* do something here since it's a valid form */
}

function emailValid(emailAddress) {
	 // regex from w3resource.com explanation of email validation
	 let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  
	 return(emailAddress.match(mailFormat));	
}

function emailMatches(emailAddress, emailConfirm) {
	if (emailAddress.length != emailConfirm.length) return false;
	for (let i = 0; i < emailAddress.length; i++) {
		if (emailAddress.charAt(i) != emailConfirm.charAt(i)) return false;
	}
	return true;
}

function displayFormMessage(message) {
	document.getElementById("validation-message").innerText = message;
}

function increaseLikes() {
	likeValues[currentConcept1] += 1;
	document.getElementById("likes").innerText = likeValues[currentConcept1];
}

