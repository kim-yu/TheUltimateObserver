function getVideoSrc(url) {
	var src = url.replace('watch?v=', 'embed/');
	return src+'?rel=0';
}

function rosterSearch(division, gender, team) {
	var team = document.getElementById('rosterSearch').value;
	$.ajax({
		type: "POST",
		url: "~/rosterParser.py",
		data: { 'division': division, 'gender': gender, 'team': team }
	}).done(function() {
		console.log(data);
	});
}

function createDivisionSelect() {
	var division = document.createElement('select');
	division.setAttribute('id', 'division');
	var optionDivision = document.createElement('option');
	optionDivision.innerHTML = '-- DIVISION --';
	division.appendChild(optionDivision);
	var optionClub = document.createElement('option');
	optionClub.setAttribute('value', 'club');
	optionClub.innerHTML = 'Club';
	division.appendChild(optionClub);
	var optionCollege = document.createElement('option');
	optionCollege.setAttribute('value', 'college');
	optionCollege.innerHTML = 'College';
	division.appendChild(optionCollege);
	return division;
}

function createGenderSelect() {
	var gender = document.createElement('select');
	gender.setAttribute('id', 'gender');
	var optionGender = document.createElement('option');
	optionGender.innerHTML = '-- GENDER --';
	gender.appendChild(optionGender);
	var optionMen = document.createElement('option');
	optionMen.setAttribute('value', 'men');
	optionMen.innerHTML = 'Men';
	gender.appendChild(optionMen);
	var optionMixed = document.createElement('option');
	optionMixed.setAttribute('value', 'mixed');
	optionMixed.innerHTML = 'Mixed';
	gender.appendChild(optionMixed);
	var optionWomen = document.createElement('option');
	optionWomen.setAttribute('value', 'women');
	optionWomen.innerHTML = 'Women';
	gender.appendChild(optionWomen);
	return gender;
}

function createTeamSearch() {
	var team = document.createElement('input');
	team.setAttribute('type', 'text');
	team.setAttribute('id', 'team');
	team.setAttribute('name', 'team');
	team.placeholder = "Enter team name"
	return team;
}

function createRosterSearchButton() {
	var rosterSearch = document.createElement('button');
	rosterSearch.setAttribute('id', 'rosterSearch');
	rosterSearch.setAttribute('type', 'submit');
	rosterSearch.setAttribute('name', 'rosterSearch');
	rosterSearch.className = 'btn';
	rosterSearch.setAttribute('onclick', 'return rosterSearch()');
	rosterSearch.innerHTML = 'Search';
	return rosterSearch;
}

function getTeamRosters() {
	var team1 = document.getElementById('team1_setup');
	var team2 = document.getElementById('team2_setup');

	team1.appendChild(createDivisionSelect());
	team1.appendChild(createGenderSelect());
	team1.appendChild(createTeamSearch());
	team1.appendChild(createRosterSearchButton());

	team2.appendChild(createDivisionSelect());
	team2.appendChild(createGenderSelect());
	team2.appendChild(createTeamSearch());
	team2.appendChild(createRosterSearchButton());
}

function loadVideo() {
	var videoPlayer = document.getElementById('videoPlayer');
	var url = document.getElementById('videoURL').value; // https://www.youtube.com/watch?v={videoId}
	if (url == "") {
		var errorMessage = document.createElement('div');
		errorMessage.setAttribute('id', 'errorMessage');
		errorMessage.innerHTML = 'You must enter a Youtube URL.';
		errorMessage.setAttribute('style', 'color: red');
		videoPlayer.appendChild(errorMessage);
	} else {
		var errorMessage = document.getElementById("errorMessage");
		if (errorMessage) {
			videoPlayer.removeChild(errorMessage)
		}
		var iframe = document.createElement('iframe');
		iframe.setAttribute('id', 'videoPlayer');
		iframe.setAttribute('width', '575px');
		iframe.setAttribute('height', '390px');
		iframe.setAttribute('frameborder', '0px');
		var src = getVideoSrc(url);
		iframe.setAttribute('src', src); // https://www.youtube.com/embed/{videoId}?rel=0
		videoPlayer.appendChild(iframe);
	}
	getTeamRosters();
}