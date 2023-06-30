function showDraftPage() {
	const ContentDiv = document.getElementById("primary-content");
	ContentDiv.innerHTML = `
		<!-- Add JS to populate savedCharacters select element here -->
		<div class="container">
			<h6 style="text-align:center"> 
				Welcome to the DND Draft!
				This page will function as a means of creating a draft that can then be played via 5eTools.<br>
				The options presented for the teams are provided via the Characters JSON file in local storage; this can be loaded on the homepage.<br>
				Let's start by defining the size of the teams!
			</h6>
			<hr>
		</div>
		<div class="container">
			<div class="row">
				<div class="col-3">
					<h5>Number Of Teams: </h3>
				</div>
				<div class="col-1">
					<select id="numberOfTeams">
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
						<option value="6">6</option>
					</select>
				</div>
				<div class="col-3">
					<h5>Players Per Team: </h3>
				</div>
				<div class="col-1">
					<select id="numberOfPlayers">
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
						<option value="6">6</option>
					</select>
				</div>
				<div class="col-4">
					<button onclick="generateTeams()" style="width:100%">Generate Teams</button>
				</div>
			</div>
			<br>
			<div class="row" id="teamRosters">
			</div>
			<hr>
			<div class="row" id="teamButtons">
			</div>
			<hr>
		</div>
		<div class="container" id="draftContainer">
		</div>
	`;
}

function generateTeams(){
	var characterData = JSON.parse(localStorage.getItem("characterData"));
	var Players    = [];
	for(let i=0;i<characterData["characters"].length;i++){
		Players.push(characterData["characters"][i]["Player"]);
	}
	Players.sort();
	var uniquePlayers = Players.reduce(function(a,b){
		if(a.indexOf(b) < 0) a.push(b);
		return a;
	},[]);
	var playerSelect = '';
	for(let k=0;k<uniquePlayers.length;k++){
		playerSelect += `<option>${uniquePlayers[k]}</option>`;
	}

	var noOfTeams = Number($("#numberOfTeams option:selected").val());
	var noOfPlayers = Number($("#numberOfPlayers option:selected").val());
	var addToDiv  = document.getElementById("teamRosters");
	addToDiv.innerHTML = '';
	var colWidth  = 12 / noOfTeams;

	//Need to iterate through, adding a column for each team (12 / noOfTeams) and adding a number of selects equal to noOfPlayers
	for(let i=0;i<noOfTeams;i++){
		//Set up a new column in the space for this team.
		var TeamNum = i+1;
		addToDiv.insertAdjacentHTML("beforeend", `
			<div class="col-${colWidth}" id="team${TeamNum}Col">
				<h5 style="text-align:center; text-decoration-line:underline overline;text-underline-position:under;">Team ${TeamNum}:</h5>

			</div>
		`);
		for(let j=0;j<noOfPlayers;j++){
			//Set up a number of player selects 
			var PlayerNum = j+1;
			var teamCol = document.getElementById(`team${TeamNum}Col`);
			teamCol.insertAdjacentHTML("beforeend", `
				<h6 style="text-align:center">Player ${j + 1}:</h6>
				<select class="playerSelect" id="team${TeamNum}Player${PlayerNum}">${playerSelect}</select>
				<br>
			`);
		}

	}

	//Okay, player select screen now instantiated. Now we provide further buttons:
	//1. Option to randomise team composition (stack pop method?)
	//2. Select number of characters per player.
	//3. "Go!" button to create actual draft below (ugh)

	addToDiv = document.getElementById("teamButtons");
	addToDiv.innerHTML = '';

	addToDiv.insertAdjacentHTML("beforeend", `
		<div class="col-4">
			<button style="width:100%" onclick="randomiseTeams()">Shuffle Teams!</button>
		</div>
		<div class="col-3">
					<h5>Characters Per Player: </h3>
				</div>
				<div class="col-1">
					<select id="numberOfPlayers">
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
					</select>
				</div>
		<div class="col-4">
			<button style="width:100%" onclick="createDraft()">Create Draft!</button>
		</div>
	`);
}

function randomiseTeams(){
	var uniquePlayers    = [];
	//Obtain list of players from the dropdowns
	var noOfTeams = Number($("#numberOfTeams").val());
	var noOfPlayers = Number($("#numberOfPlayers").val());
	for(let i=0;i<noOfTeams;i++){
		for(let j=0;j<noOfPlayers;j++){
			uniquePlayers.push($(`#team${i+1}Player${j+1}`).val());
		}
	}
	//console.log(uniquePlayers);

	var playersShuffled = shuffle(uniquePlayers);
	//console.log(playersShuffled);
	var k=0;

	for(let i=0;i<noOfTeams;i++){
		for(let j=0;j<noOfPlayers;j++){
			$(`#team${i+1}Player${j+1}`).val(playersShuffled[k]);
			k++;
		}
	}
}

function createDraft(){
	var characterData = JSON.parse(localStorage.getItem("characterData"));
	//Create the actual draft space!
	var noOfTeams = Number($("#numberOfTeams").val());
	var noOfPlayers = Number($("#numberOfPlayers").val());
	var addToDiv = document.getElementById("draftContainer");
	addToDiv.innerHTML = '';
	var HTMLToAdd = '<div class="row">';
	var colWidth = 12 / noOfTeams;

	//Start with a column for each team.
	for(let teamNum=1;teamNum <= noOfTeams;teamNum++){
		//Team at index teamNum.
		HTMLToAdd += `
			<div class="col-${colWidth}" id="team${teamNum}Column">
				<div class="row">
					<div class="col-12"><h5 style="text-align:center">Team ${teamNum}</h5></div>
					<div class="col-8"><h6><b>Name:</b></h6></div>
					<div class="col-2"><h6><b>Veto:</b></h6></div>
					<div class="col-2"><h6><b>Lock:</b></h6></div>
				</div>
		`;
		for(let playerNum=1;playerNum <= noOfPlayers;playerNum++){
			//Player at index playerNum.
			var playerName = $(`#team${teamNum}Player${playerNum}`).val();
			HTMLToAdd += `
				<h5 style="text-align:center;text-decoration-line:underline;text-underline-position:under">${playerName}</h5>
			`;
			//Add all of the player's characters to the column.
			for(let charNum=0;charNum < characterData["characters"].length;charNum++){
				if(characterData["characters"][charNum]["Player"] == $(`#team${teamNum}Player${playerNum}`).val()){
					var charName = characterData["characters"][charNum]["Name"];
					console.log(charName + " is a character for " + playerName);
					HTMLToAdd += `
						<div class="row">
						<div class="col-8"><h6>${charName}</h6></div>
						<div class="col-2"><input type="checkbox" onclick="vetoClick(this)" /></div>
						<div class="col-2"><input type="checkbox" onclick="lockClick(this)" /></div>
						</div>
					`;
				}
			}
		}
		HTMLToAdd += '</div>'; //Close the subrow and column.
	}

	HTMLToAdd += '</div>'; //Close off the row container.
	addToDiv.innerHTML = HTMLToAdd;
}

function vetoClick(buttonRef){
	if(buttonRef.checked){
		//Clicked to veto!
		var thisDiv = buttonRef.parentNode.parentNode;
		var thisText = thisDiv.childNodes[1].childNodes[0];
		thisText.style = "text-decoration:line-through";
	}
	else{
		//Clicked to unveto!
		var thisDiv = buttonRef.parentNode.parentNode;
		var thisText = thisDiv.childNodes[1].childNodes[0];
		thisText.style = "text-decoration:none";
	}
}

function lockClick(buttonRef){
	if(buttonRef.checked){
		//Clicked to lock!
		var thisDiv = buttonRef.parentNode.parentNode;
		var thisText = thisDiv.childNodes[1].childNodes[0];
		thisText.style = "font-weight:bold;background:darkgrey";
	}
	else{
		//Clicked to unlock!
		var thisDiv = buttonRef.parentNode.parentNode;
		var thisText = thisDiv.childNodes[1].childNodes[0];
		thisText.style = "";
	}
}



function shuffle(array) {
  //FUNCTION OBTAINED FROM https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  //Thanks to user coolaj86 for this!
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}