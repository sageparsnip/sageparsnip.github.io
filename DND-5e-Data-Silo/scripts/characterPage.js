function showCharacterPage() {
	const ContentDiv = document.getElementById("primary-content");
	ContentDiv.innerHTML = `
		<!-- Add JS to populate savedCharacters select element here -->
		<p class="fs-5 lh-sm"> Filter characters using the dropdowns below (leave as default to ignore filter); select a character and press "Load" to load sheet, "Delete" to delete character froms storage, or "Create New" to create a new character. </p>
		<!-- Primary characters grid -->
		<p class="fs-6 lh-1">To denote a character is multi-classed, please enter their Class, Subclass, and Level as comma-separated values. </p>
		<div class="container">
			<div class="row">
				<div class="col-3"><select name="campaignFilter" id="campaignFilter"><option>Campaign</option></select></div>
				<div class="col-3"><select name="classFilter" id="classFilter"><option>Class</option></select></div>
				<div class="col-3"><select name="playerFilter" id="playerFilter"><option>Player</option></select></div>
				<div class="col-3"><button class="custom-button" onclick="populateCharactersDropdown()">Filter</div>
			</div>
			<hr>
			<div class="row">
				<div class="col-3"><select name="savedCharacters" id="savedCharacters"></select></div>
				<div class="col-3"><button class="custom-button" onclick="loadCharAuto()">Load</button></div>
				<div class="col-3"><button class="custom-button" onclick="deleteChar()">Delete</button></div>
				<div class="col-3"><button class="custom-button" onclick="createGrid()">Create New</button></div>
			</div>
		</div>
		<hr>
		<div class="container" id="charactersGrid">
		<!-- This will be filled by JS functions -->
		</div>
	`;
	populateFiltersDropdown();
	populateCharactersDropdown();
}

function populateFiltersDropdown(){
	var characterData = JSON.parse(localStorage.getItem("characterData"));
	//Populate Campaign dropdown.
	var Campaigns  = [];
	var Classes    = [];
	var Players    = [];
	for(let i=0;i<characterData["characters"].length;i++){
		Campaigns.push(characterData["characters"][i]["Campaign"]);
		Classes.push(characterData["characters"][i]["Class"]);
		Players.push(characterData["characters"][i]["Player"]);
	}
	Campaigns.sort();
	Classes.sort();
	Players.sort();
	var uniqueCampaigns = Campaigns.reduce(function(a,b){
		if(a.indexOf(b) < 0) a.push(b);
		return a;
	},[]);
	var uniqueClasses = Classes.reduce(function(a,b){
		if(a.indexOf(b) < 0) a.push(b);
		return a;
	},[]);
	var uniquePlayers = Players.reduce(function(a,b){
		if(a.indexOf(b) < 0) a.push(b);
		return a;
	},[]);
	//Okay. We have unique lists now. So populate their respective selects with options:
	for(let i=0;i<uniqueCampaigns.length;i++){
		$("#campaignFilter").append(`<option>${uniqueCampaigns[i]}</option>`);
	}
	for(let i=0;i<uniqueClasses.length;i++){
		$("#classFilter").append(`<option>${uniqueClasses[i]}</option>`);
	}
	for(let i=0;i<uniquePlayers.length;i++){
		$("#playerFilter").append(`<option>${uniquePlayers[i]}</option>`);
	}

}

function populateCharactersDropdown(){
	const CharactersDropdown = document.getElementById("savedCharacters");
	CharactersDropdown.innerHTML = '';
	var charNames = [];
	characterData = JSON.parse(localStorage.getItem("characterData"));
	if(characterData != null){
		for(let i = 0; i < characterData["characters"].length; i++){
			//Need to add checks here! For Campaign, Class, and Player:

			var addThisChar = true; //Default to adding it.

			if($("#campaignFilter :selected").text() != "Campaign"){
				//Need to actually check campaignFilter
				if($('#campaignFilter :selected').text() != characterData["characters"][i]["Campaign"]){
					//console.log($('#campaignFilter:selected').text())
					addThisChar = false;
				}
			}
			if($('#classFilter :selected').text() != "Class"){
				//Need to actually check classFilter
				if($('#classFilter :selected').text() != characterData["characters"][i]["Class"]){
					//console.log("Class does not match; cannot add...")
					addThisChar = false;
				}
			}
			if($('#playerFilter :selected').text() != "Player"){
				//Need to actually check playerFilter
				if($('#playerFilter :selected').text() != characterData["characters"][i]["Player"]){
					//console.log("Player does not match; cannot add...")
					addThisChar = false;
				}
			}

			if(addThisChar){
				charNames.push(characterData["characters"][i]["Name"]);
			}
		}
	}
	charNames.sort();
	var dropDownHTML = '';
	for(let i=0;i<charNames.length;i++){
		dropDownHTML += `<option class="dropdownChar"> ${charNames[i]} </option>`;
	}
	CharactersDropdown.innerHTML = dropDownHTML;
	//console.log(charNames);
}

function createGrid(){
	const ContentDiv = document.getElementById("charactersGrid");
	var loadGrid = '';
	loadGrid += '<br>';

	////////////////////////////// NAME, RACE, BACKGROUND, CLASS, SUBCLASS, LEVEL  //////////////////////////////
	function topRows(titles){
		//Builds the section for Name, Race...Level
		var output = '';
		output += '<div class="row">';
		for(var i=0; i<3; i++){
			output += `<div class="col-2"><h5>` + titles[i] + `:</h5></div>` + 
					  `<div class="col-2"><input id="` + titles[i] + `" class="grid-input charSave"></input></div>`;
		}
		output += `</div>`;
		return output;
	}
	loadGrid += `
		<div class="row">
			<div class="col-3">
				<div class="row">
					<div class="col-5"><h5>Name:</h5></div>
					<div class="col-7"><input id="Name" class="grid-input charSave"></input></div>
				</div>
			</div>
			<div class="col-3">
				<div class="row">
					<div class="col-5"><h5>Race:</h5></div>
					<div class="col-7"><input id="Race" class="grid-input charSave"></input></div>
				</div>
			</div>
			<div class="col-3">
				<div class="row">
					<div class="col-6"><h5>Background:</h5></div>
					<div class="col-6"><input id="Background" class="grid-input charSave"></input></div>
				</div>
			</div>
			<div class="col-3">
				<div class="row">
					<div class="col-4"><h5>Player:</h5></div>
					<div class="col-8"><input id="Player" class="grid-input charSave"></input></div>
				</div>
			</div>
		</div>
	`;
	loadGrid += `
		<div class="row">
			<div class="col-3">
				<div class="row">
					<div class="col-5"><h5>Class:</h5></div>
					<div class="col-7"><input id="Class" class="grid-input charSave"></input></div>
				</div>
			</div>
			<div class="col-3">
				<div class="row">
					<div class="col-5"><h5>Subclass:</h5></div>
					<div class="col-7"><input id="Subclass" class="grid-input charSave"></input></div>
				</div>
			</div>
			<div class="col-3">
				<div class="row">
					<div class="col-6"><h5>Campaign:</h5></div>
					<div class="col-6"><input id="Campaign" class="grid-input charSave"></input></div>
				</div>
			</div>
			<div class="col-3">
				<div class="row">
					<div class="col-8"><h5>Level:</h5></div>
					<div class="col-4"><input id="Level" class="grid-input charSave"></input></div>
				</div>
			</div>
		</div>
	`;

	////////////////////////////// HP, AC, TEMP HP, HIT DICE //////////////////////////////
	function secondRows(titles){
		//Builds the section for HP, AC...Hit Dice.
		var output = '';
		output += '<div class="row">';
		for(var i=0; i<4; i++){
			output += `<div class="col-2"><h5>` + titles[i] + `:</h5></div>` + 
					  `<div class="col-1"><input id="` + titles[i] + `" class="grid-input charSave"></input></div>`;
		}
		output += `</div>`;
		return output;
	}
	loadGrid += secondRows(['Current HP', 'Max HP', 'AC', 'Special AC']);
	loadGrid += secondRows(['Temp HP', 'Hit Dice Max', 'Hit Dice Left', 'Hite Dice Type']);
	loadGrid += `
		<div class="row">
			<div class="col-1"><h5>Speed:</h5></div>
			<div class="col-1"><input type="text" class="grid-input charSave" id="Speed" /></div>
			<div class="col-2"><h5>Exhaustion:</h5></div>
			<div class="col-1"><input type="text" class="grid-input charSave" id="Exhaustion" /></div>
			<div class="col-7">
				<div class="container">
					<div class="row">
						<div class="col-3"><h5>DS Pass:</h5></div>
						<div class="col-1"><input type="checkbox" class="grid-input charSave DSPass" onclick="DeathSaveCheck(this)" id="DeathSavePass1" /></div>
						<div class="col-1"><input type="checkbox" class="grid-input charSave DSPass" onclick="DeathSaveCheck(this)" id="DeathSavePass2" /></div>
						<div class="col-1"><input type="checkbox" class="grid-input charSave DSPass" onclick="DeathSaveCheck(this)" id="DeathSavePass3" /></div>
						<div class="col-3"><h5>DS Fail:</h5></div>
						<div class="col-1"><input type="checkbox" class="grid-input charSave DSFail" onclick="DeathSaveCheck(this)" id="DeathSaveFail1" /></div>
						<div class="col-1"><input type="checkbox" class="grid-input charSave DSFail" onclick="DeathSaveCheck(this)" id="DeathSaveFail2" /></div>
						<div class="col-1"><input type="checkbox" class="grid-input charSave DSFail" onclick="DeathSaveCheck(this)" id="DeathSaveFail3" /></div>
					</div>
				</div>
			</div>
		</div>
	`;


	loadGrid += `<div class="row"><div class="col-12"><hr></div></div>`;

	////////////////////////////// STATS //////////////////////////////
	function statRows(titles){
		//Builds the section for stats.
		var output = '';
		output += '<div class="row">';
		for(var i=0;i<titles.length;i++){
			output += `<div class="col-1 clickable" onclick="rollDiceStat(this)"><h5>` + titles[i] + `:</h5></div>` + 
					  `<div class="col-1"><input id="` + titles[i] + `" class="grid-input stat-input charSave"></input></div>`;
		}
		output += `</div>`;
		return output;
	}
	loadGrid += statRows(['STR','DEX','CON','INT','WIS','CHA']);
	loadGrid += "<hr>";
	var skillsOptions = `
						<option>Acrobatics</option>
						<option>Animal Handling</option>
						<option>Arcana</option>
						<option>Athletics</option>
						<option>Deception</option>
						<option>History</option>
						<option>Insight</option>
						<option>Intimidation</option>
						<option>Investigation</option>
						<option>Medicine</option>
						<option>Nature</option>
						<option selected="selected">Perception</option>
						<option>Performance</option>
						<option>Persuasion</option>
						<option>Religion</option>
						<option>Sleight Of Hand</option>
						<option>Stealth</option>
						<option>Survival</option>
						`; //Default to Perception as this is the most common "Passive" skill asked for.

	////////////////////////////// PROFICIENCIES HEADER //////////////////////////////
	loadGrid += `<div class="row">
					<div class="col-3"><h5>Proficiencies:</h5></div>
					<div class="col-1"><h6>JoAT:</h6></div>
					<div class="col-1"><input type="checkbox" id="JoaT" name="JoaT" class="grid-input charSave" /></div>
					<div class="col-1"><h6>Passive:</h6></div>
					<div class="col-2"><select id="passiveDropdown" name="passiveDropdown" onchange="getPassive()">
						${skillsOptions}
					</select></div>
					<div class="col-1"><h6 id="passiveDisplay" style="text-align:center"><b>0</b></h6></div>
					<div class="col-2"><h6>Prof. Bonus: </h6></div>
					<div class="col-1"><input id="ProfBonus" class="prof-box charSave"></input></div>
				 </div>`;

	////////////////////////////// SAVING THROWS //////////////////////////////
	function profSaveRows(titles){
		//Builds the section for Saving Throws.
		var output = '';
		output += '<div class="row">';
		for(var i=0;i<titles.length;i++){
			output += `
				<div class="col-2">
					<div class="row">
						<div class="col-8 clickable" onclick="rollDiceSave(this)"><h6>` + titles[i] + ` Save:</h6></div>
						<div class="col-2"><input id="` + titles[i] + ` Save" type="checkbox" class="charSave"></input></div>
						<div class="col-2"><input id="` + titles[i] + ` SaveExp" type="checkbox" class="charSave"></input></div>
					</div>
				</div>
			`;		}
		output += `</div>`;
		return output;
	}
	loadGrid += profSaveRows(['STR','DEX','CON','INT','WIS','CHA']);

	////////////////////////////// SKILL PROFICIENCIES //////////////////////////////
	function profSkillRows(titles){
		//Builds the section for Skills.
		var output = '';
		output += '<div class="row">';
		for(var i=0;i<titles.length;i++){
			output += `
				<div class="col-2">
					<div class="row">
						<div class="col-8 clickable" onclick="rollDiceSkill(this)"><h6>` + titles[i] + `:</h6></div>
						<div class="col-2"><input id="` + titles[i] + `" type="checkbox" class="charSave"></input></div>
						<div class="col-2"><input id="` + titles[i] + `Exp" type="checkbox" class="charSave"></input></div>
					</div>
				</div>
			`;		}
		output += `</div>`;
		return output;
	}
	loadGrid += profSkillRows(['Acrobatics', 'Animal Handling', 'Arcana', 'Athletics', 'Deception', 'History']);
	loadGrid += profSkillRows(['Insight', 'Intimidation', 'Investigation', 'Medicine', 'Nature', 'Perception']);
	loadGrid += profSkillRows(['Performance', 'Persuasion', 'Religion', 'Sleight Of Hand', 'Stealth', 'Survival']);
	loadGrid += "<hr>";

	////////////////////////////// ATTACKS SUBGRID //////////////////////////////
	loadGrid += `
		<div class="row">
			<div class="col-11"><h5>Attacks:</h5></div>
			<div class="col-1"><button onclick="addAttackRow()">+</button></div>
		</div>
		<div class="row">
			<div class="col-3"><h6>Name:</h6></div>
			<div class="col-1"><h6>Stat:</h6></div>
			<div class="col-1"><h6>Proficient:</h6></div>
			<div class="col-1"><h6>Hit +:</h6></div>
			<div class="col-3"><h6>Damage:</h6></div>
			<div class="col-1"><h6>Hit</h6></div>
			<div class="col-1"><h6>Damage</h6></div>
			<div class="col-1"><h6>-</h6></div>
		</div>
		<div class="row"><div class="container" id="attacksContainer" /></div>
		</div>
		<div class="row"><div class="col-12"><hr></div>
		</div>
	`;

	//////////////////////////////INVENTORY SUBGRID //////////////////////////////
	loadGrid += `
		<div class="row">
			<div class="col-11"><h5>Inventory:</h5></div>
			<div class="col-1"><button onclick="addInventoryRow()">+</button></div>
		</div>
		<div class="row">
			<div class="col-5"><div class="container"><div class="row">
				<div class="col-8"><h6>Name:</h6></div><div class="col-2"><h6>Qty:</h6></div><div class="col-2"><h6>Wt:</h6></div>
			</div></div></div>
			<div class="col-5"><div class="container"><div class="row">
				<div class="col-8"><h6>Name:</h6></div><div class="col-2"><h6>Qty:</h6></div><div class="col-2"><h6>Wt:</h6></div>
			</div></div></div>
			<div class="col-2"><div class="container"><div class="row">
				<h6 style="text-align:center;width:50%">-</h6>
			</div></div></div>
		</div>
		<div class="row"><div class="container" id="inventoryContainer" /></div>
		</div>
		<div class="row"><div class="col-12"><hr></div>
		</div>
	`;
	////////////////////////////// SPELLCASTING //////////////////////////////
	loadGrid += `
		<div class="row">
			<div class="col-2"><h5>Spellcasting:</h5></div>
			<div class="col-3">
				<div class="container">
					<div class="row">
						<div class="col-6"><h6 class="spellHide">Spellcasting Ability:</h6></div>
						<div class="col-6"><select id="spellAbility" class="charSave spellHide" onChange="spellAbiChange(this)">
							<option>INT</option>
							<option>WIS</option>
							<option>CHA</option>
						</select></div>
					</div>
				</div>
			</div>
			<div class="col-3">
				<div class="container">
					<div class="row">
						<div class="col-7"><h6 class="spellHide">Spell Attack Modifier:</h6></div>
						<div class="col-5"><input type="text" id="SAM" class="charSave grid-input spellHide" /></div>
					</div>
				</div>
			</div>			
			<div class="col-3">
				<div class="container">
					<div class="row">
						<div class="col-7"><h6 class="spellHide">Spell Save DC:</h6></div>
						<div class="col-5"><input type="text" id="SSDC" class="charSave grid-input spellHide" /></div>
					</div>
				</div>
			</div>			
			<div class="col-1"><input type="checkbox" class="grid-input charSave" id="spellcastingCheck" onclick="checkSpellcasting(this)" /></div>
		</div>
		<div class="row" id="spellcastingRow" style="display:none;">
			<div class="col-2"><h6>Name:</h6></div>
			<div class="col-1"><h6>Level:</h6></div>
			<div class="col-1"><h6>Cast Time:</h6></div>
			<div class="col-1"><h6>Duration:</h6></div>
			<div class="col-1"><h6>Range:</h6></div>
			<div class="col-2"><h6>Components:</h6></div>
			<div class="col-2"><h6>Dice:</h6></div>
			<div class="col-1"><h6>-</h6></div>
			<div class="col-1"><button class="grid-input" onclick="addSpellRow()" style="height:90%;">+</button></div>
		</div>
		<div class="row"><div class="container" id="spellsContainer" /></div>
		<div class="row"  id="spellSlots" style="display:none;">
			<div class="row">
				<!-- Top Row -->
				<div class="col-2 align-items-center"><h6><b>Level:</b></h6></div>
				<div class="col-10">
				<div class="row">
					<div class="col-4">
						<div class="row">
							<div class="col-4"><h6 style="text-align:center;">1st:</h6></div>
							<div class="col-4"><h6 style="text-align:center;">2nd:</h6></div>
							<div class="col-4"><h6 style="text-align:center;">3rd:</h6></div>
						</div>
					</div>
					<div class="col-4">
						<div class="row">
							<div class="col-4"><h6 style="text-align:center;">4th:</h6></div>
							<div class="col-4"><h6 style="text-align:center;">5th:</h6></div>
							<div class="col-4"><h6 style="text-align:center;">6th:</h6></div>
						</div>
					</div>
					<div class="col-4">
						<div class="row">
							<div class="col-4"><h6 style="text-align:center;">7th:</h6></div>
							<div class="col-4"><h6 style="text-align:center;">8th:</h6></div>
							<div class="col-4"><h6 style="text-align:center;">9th:</h6></div>
						</div>
					</div>
				</div>
				</div>
			</div>
			<div class="row">
				<!-- Remaining Row -->
				<div class="col-2 align-items-center"><h6><b>Remaining:</b></h6></div>
				<div class="col-10">
				<div class="row">
					<div class="col-4">
						<div class="row">
							<div class="col-4"><input type="text" style="text-align:center" class="charSave grid-input" id="spellSlotRem1" value="0" /></div>
							<div class="col-4"><input type="text" style="text-align:center" class="charSave grid-input" id="spellSlotRem2" value="0" /></div>
							<div class="col-4"><input type="text" style="text-align:center" class="charSave grid-input" id="spellSlotRem3" value="0" /></div>
						</div>
					</div>
					<div class="col-4">
						<div class="row">
							<div class="col-4"><input type="text" style="text-align:center" class="charSave grid-input" id="spellSlotRem4" value="0" /></div>
							<div class="col-4"><input type="text" style="text-align:center" class="charSave grid-input" id="spellSlotRem5" value="0" /></div>
							<div class="col-4"><input type="text" style="text-align:center" class="charSave grid-input" id="spellSlotRem6" value="0" /></div>
						</div>
					</div>
					<div class="col-4">
						<div class="row">
							<div class="col-4"><input type="text" style="text-align:center" class="charSave grid-input" id="spellSlotRem7" value="0" /></div>
							<div class="col-4"><input type="text" style="text-align:center" class="charSave grid-input" id="spellSlotRem8" value="0" /></div>
							<div class="col-4"><input type="text" style="text-align:center" class="charSave grid-input" id="spellSlotRem9" value="0" /></div>
						</div>
					</div>
				</div>
				</div>
			</div>
			<div class="row">
				<!-- Maximum Row -->
				<div class="col-2 align-items-center"><h6><b>Maximum:</b></h6></div>
				<div class="col-10">
				<div class="row">
					<div class="col-4">
						<div class="row">
							<div class="col-4"><input type="text" style="text-align:center" class="charSave grid-input" id="spellSlotMax1" value="0" /></div>
							<div class="col-4"><input type="text" style="text-align:center" class="charSave grid-input" id="spellSlotMax2" value="0" /></div>
							<div class="col-4"><input type="text" style="text-align:center" class="charSave grid-input" id="spellSlotMax3" value="0" /></div>
						</div>
					</div>
					<div class="col-4">
						<div class="row">
							<div class="col-4"><input type="text" style="text-align:center" class="charSave grid-input" id="spellSlotMax4" value="0" /></div>
							<div class="col-4"><input type="text" style="text-align:center" class="charSave grid-input" id="spellSlotMax5" value="0" /></div>
							<div class="col-4"><input type="text" style="text-align:center" class="charSave grid-input" id="spellSlotMax6" value="0" /></div>
						</div>
					</div>
					<div class="col-4">
						<div class="row">
							<div class="col-4"><input type="text" style="text-align:center" class="charSave grid-input" id="spellSlotMax7" value="0" /></div>
							<div class="col-4"><input type="text" style="text-align:center" class="charSave grid-input" id="spellSlotMax8" value="0" /></div>
							<div class="col-4"><input type="text" style="text-align:center" class="charSave grid-input" id="spellSlotMax9" value="0" /></div>
						</div>
					</div>
				</div>
				</div>
			</div>
		</div>
		</div>
		<div class="row"><div class="col-12"><hr></div>
	`;

	////////////////////////////// CLASS/RACIAL/BACKGROUND FEATURES //////////////////////////////
	loadGrid += `
		<div class="row features" style="padding:0.5rem">
			<div class="col-1" style="padding:0"><h6>Class Features</h6></div>
			<div class="col-11" style="padding:0"><textarea class="charSave featureBox" id="Class Features" rows="3" style="width:100%"></textarea></div>
		</div>
		<br>
		<div class="row features" style="padding:0.5rem">
			<div class="col-1" style="padding:0"><h6>Subclass Features</h6></div>
			<div class="col-11" style="padding:0"><textarea class="charSave featureBox" id="Subclass Features" rows="3" style="width:100%"></textarea></div>
		</div>
		<br>
		<div class="row features" style="padding:0.5rem">
			<div class="col-1" style="padding:0"><h6>Racial & Background Features</h6></div>
			<div class="col-11" style="padding:0"><textarea class="charSave featureBox" id="Racial-Background Features" rows="3" style="width:100%"></textarea></div>
		</div>
		</div></div>
		<div class="row" style="padding:0"><div class="col-12"><hr></div></div>
	`;

	////////////////////////////// SAVE/UPDATE BUTTON //////////////////////////////
	loadGrid += `
		<div class="row">
			<div class="col"><button class="custom-button" onclick="saveCharAuto()">Save or Update Character</button></div>
		</div>
		<br>
		</div>
		<div class="row"><div class="col-12"><hr></div>
		</div>
	`;

	////////////////////////////// LOAD IT //////////////////////////////
	ContentDiv.innerHTML = loadGrid;
	checkSpellcasting();
}

function addAttackRow(){
	//Get count of how many attack rolls already exist, for data numbering.
	var addTo = document.getElementById("attacksContainer");
	addTo.insertAdjacentHTML("beforeend", `
		<div class="row attackRow">` +  `
			<div class="col-3">
				<input type="text" class="grid-input AttName AttSave" />
			</div>
			<div class="col-1">
				<select name="AttStat" class="AttStat AttSave">
					<option>STR</option>
					<option>DEX</option>
					<option>CON</option>
					<option>INT</option>
					<option>WIS</option>
					<option>CHA</option>
				</select>
			</div>
			<div class="col-1">
				<input type="checkbox" class="grid-input AttProficient AttSave" />
			</div>
			<div class="col-1">
				<input type="text" class="grid-input AttRollAdd AttSave" value="0" />
			</div>
			<div class="col-3">
				<input type="text" class="grid-input AttDamage AttSave" />
			</div>
			<div class="col-1">
				<button class="grid-input AttRoll" onclick="rollDiceAttack(this)">Roll</button>
			</div>
			<div class="col-1">
				<button class="grid-input AttDamage" onclick="rollDiceDamage(this)">Roll</button>
			</div>
			<div class="col-1">
				<button class="grid-input AttRemove" onclick="removeAttackRow(this)">-</button>
			</div>
		</div>
	`);
}

function removeAttackRow(button){
	var removeFrom = document.getElementById('attacksContainer');
	removeFrom.removeChild(button.parentNode.parentNode);
}

function addInventoryRow(){
	var addTo = document.getElementById("inventoryContainer");
	addTo.insertAdjacentHTML("beforeend",`
			<div class="row inventoryRow">
				<div class="col-5 InvSingle">
					<div class="container">
					<div class="row">
						<div class="col-8">
							<input type="text" class="grid-input InvName InvSave" />
						</div>
						<div class="col-2">
							<input type="text" class="grid-input InvQty InvSave" />
						</div>
						<div class="col-2">
							<input type="text" class="grid-input InvWt InvSave" />
						</div>
					</div>
					</div>
				</div>
				<div class="col-5 InvSingle">
					<div class="container">
					<div class="row">
						<div class="col-8">
							<input type="text" class="grid-input InvName InvSave" />
						</div>
						<div class="col-2">
							<input type="text" class="grid-input InvQty InvSave" />
						</div>
						<div class="col-2">
							<input type="text" class="grid-input InvWt InvSave" />
						</div>
					</div>
					</div>
				</div>
				<div class="col-2"><div class="container" onclick="removeInventoryRow(this)"><div class="row">
					<button style="width:50%;">-</button>
				</div></div></div>
			</div>
		`);
}

function removeInventoryRow(button){
	var removeFrom = document.getElementById('inventoryContainer');
	removeFrom.removeChild(button.parentNode.parentNode);
}

function addSpellRow(){
	var addTo = document.getElementById("spellsContainer");
	addTo.insertAdjacentHTML("beforeend",`
			<div class="row spellRow">
				<div class="col-2"><input type="text" class="grid-input spellSave spellName" /></div>
				<div class="col-1"><input type="text" class="grid-input spellSave" /></div>
				<div class="col-1"><input type="text" class="grid-input spellSave" /></div>
				<div class="col-1"><input type="text" class="grid-input spellSave" /></div>
				<div class="col-1"><input type="text" class="grid-input spellSave" /></div>
				<div class="col-2"><input type="text" class="grid-input spellSave" /></div>
				<div class="col-2"><textarea class="grid-input spellSave spellRoll" style="width:100%; height: 30px"></textarea></div>
				<div class="col-1"><button class="grid-input" onclick="removeSpellRow(this)">-</button></div>
				<div class="col-1"><button class="grid-input" onclick="rollDiceSpell(this)">Roll!</button></div>
			</div>
	`);
}

function removeSpellRow(button){
	var removeFrom = document.getElementById('spellsContainer');
	removeFrom.removeChild(button.parentNode.parentNode);
}

function deleteChar(){
	selectedChar = document.getElementById('savedCharacters').value;
	characterData = JSON.parse(localStorage.getItem("characterData"));
	for(let i=0;i<characterData["characters"].length;i++){
		if(selectedChar == characterData["characters"][i]["Name"]){
			if(confirm(`Are you sure you want to delete ${selectedChar}?`)){
				console.log("Deleting...");
				characterData["characters"].splice(i, 1);
			}			
		}
	}
	localStorage.setItem('characterData', JSON.stringify(characterData, null, "\t"));
}

function saveCharAuto(){
	var inputs = document.getElementsByClassName('charSave');
	var characterData = JSON.parse(localStorage.getItem("characterData"));
	if(characterData == null){
		//Nothing in storage - create and recall.
		var temp = {"characters":[]};
		localStorage.setItem('characterData', JSON.stringify(temp, null, "\t"));
		characterData = JSON.parse(localStorage.getItem("characterData"));
	}
	var formData = {};
	var charExists = false;
	var posInStorage = -1;

	//First, check if the record already exists in the "characterData" storage.
	for(var i=0; i<characterData["characters"].length;i++){
		if (characterData["characters"][i]["Name"] == document.getElementById("Name").value){
			charExists = true;
			posInStorage = i;
			break;
		}
	}


	for (var i = 0; i < inputs.length; i++){
		if(inputs[i].type != "button" && !inputs[i].classList.contains("modal-input")){
			if(inputs[i].type == "checkbox"){
				formData[inputs[i].id] = inputs[i].checked;
			}
			else{
				formData[inputs[i].id] = inputs[i].value;
			}
		}
	}

	//Attacks saving to JSON
	var attacksSave = getAttacksData();
	formData["attacks"] = attacksSave;

	//Inventory saving to JSON
	var inventorySave = getInventoryData();
	formData["inventory"] = inventorySave;

	var spellsSave = getSpellsData();
	formData["spells"] = spellsSave;

	var ClassBoxStyle = document.getElementById("Class Features").style.height;
	var SubclassBoxStyle = document.getElementById("Subclass Features").style.height;
	var RaceBoxStyle = document.getElementById("Racial-Background Features").style.height;

	formData["ClassBoxStyle"] = ClassBoxStyle;
	formData["SubclassBoxStyle"] = SubclassBoxStyle; 
	formData["RaceBoxStyle"] = RaceBoxStyle;

	if(charExists == false){
		//New characters - prep to insert into storage.
		characterData["characters"].push(formData);
		console.log(formData["Name"] + " insert into DB!");
	}
	else{
		//Character exists in storage at position posInStorage - update.
		characterData["characters"][posInStorage] = formData;
		console.log(formData["Name"] + " updated in DB!");

	}

	localStorage.setItem("characterData", JSON.stringify(characterData, null, "\t"));
}

function getAttacksData(){
	var attacksGrid = document.getElementById("attacksContainer");
	var attacksRows = attacksGrid.getElementsByClassName('attackRow');
	var attacksSave = [];
	for(var i=0; i<attacksRows.length; i++){
		var rowDetails = attacksRows[i].getElementsByClassName('AttSave');
		var saveDetails = [];
		for(var j=0; j<rowDetails.length; j++){
			if(rowDetails[j].type != "checkbox"){
				saveDetails[j] = rowDetails[j].value;
			}
			else{
				saveDetails[j] = rowDetails[j].checked;
			}
		}
		attacksSave[i] = saveDetails;
	}
	return attacksSave;
}

function getInventoryData(){
	var inventoryGrid = document.getElementById("inventoryContainer");
	var inventoryRows = inventoryGrid.getElementsByClassName("InvSingle"); //each individual item.
	var inventorySave = [];
	for(var item=0;item<inventoryRows.length;item++){
		//For each item.
		var rowDetails = inventoryRows[item].getElementsByClassName("InvSave");
		var saveDetails = [];
		for(var detail=0;detail<rowDetails.length;detail++){
			saveDetails[detail] = rowDetails[detail].value;
		}
		inventorySave[item] = saveDetails;
	}
	return inventorySave;
}

function getSpellsData(){
	var spellsGrid = document.getElementById("spellsContainer");
	var spellsRow = spellsGrid.getElementsByClassName("spellRow");
	var spellsSave = [];
	for(var item=0; item<spellsRow.length;item++){
		//For each spell
		var rowDetails = spellsRow[item].getElementsByClassName("spellSave");
		var saveDetails = [];
		for(var detail=0;detail<rowDetails.length;detail++){
			saveDetails[detail] = rowDetails[detail].value;
		}
		spellsSave[item] = saveDetails;
	}
	return spellsSave;
}

function loadCharAuto(){
	createGrid();
	var characterData = JSON.parse(localStorage.getItem("characterData"));
	if(characterData != null){
		var inputs = document.getElementsByClassName('charSave');
		for(var i = 0; i < characterData["characters"].length; i++){
			if(characterData["characters"][i]["Name"] == document.getElementById("savedCharacters").value){
			//if(characterData["characters"][i]["charName"] == "Kim Keeper-Auto"){ //Test value.
				//Found the correct character.
				for(var j = 0; j<inputs.length;j++){
					if(characterData["characters"][i].hasOwnProperty(inputs[j].id)){
						//Populate the form based on saved properties.
						if(inputs[j].type != "radio" && inputs[j].type != "checkbox"){
							inputs[j].value = characterData["characters"][i][inputs[j].id];
						}else{
							inputs[j].checked = characterData["characters"][i][inputs[j].id];
						}
					}
				}
				//Adding attack data.
				if(characterData["characters"][i]["attacks"].length > 0){
					loadAttData(i);
				}
				//Adding inventory data
				if(characterData["characters"][i]["inventory"].length > 0){
					loadInvData(i);
				}

				//Adding spell data.
				checkSpellcasting();
				if(characterData["characters"][i]["spells"].length > 0){
					loadSpellsData(i);
				}
				//Now we should load the height values of the features textareas.
				var ClassBox = document.getElementById("Class Features");
				var SubclassBox = document.getElementById("Subclass Features");
				var RaceBox  = document.getElementById("Racial-Background Features");
				ClassBox.style.height = characterData["characters"][i]["ClassBoxStyle"];
				SubclassBox.style.height = characterData["characters"][i]["SubclassBoxStyle"];
				RaceBox.style.height = characterData["characters"][i]["RaceBoxStyle"];
			}
		}
		getPassive();
		
	}
	else{
		alert("No characters saved in memory - import characters in the Home tab, or click Create New!");
	}
}

function loadAttData(i){
	//Set up attacks rows
	for(var attRow = 0; attRow < characterData["characters"][i]["attacks"].length; attRow++){
		addAttackRow();
		var attContainer = document.getElementById('attacksContainer');
		var attSlots = attContainer.getElementsByClassName('attackRow');
		//Populate individual attack rows.
		var attackDetails = attSlots[attRow].getElementsByClassName('AttSave');
		for (var attItem=0;attItem<attackDetails.length;attItem++){
			if(attackDetails[attItem].type == "checkbox") attackDetails[attItem].checked = characterData["characters"][i]["attacks"][attRow][attItem];
			else attackDetails[attItem].value = characterData["characters"][i]["attacks"][attRow][attItem];
		}
	}
}

function loadInvData(i){
	//Set up inventory rows
	for(var invRow=0;invRow < characterData["characters"][i]["inventory"].length;invRow++){
		if(invRow%2==0) addInventoryRow(); //Only do for every *other* item in inventory due 2 items per row.
		var invContainer = document.getElementById('inventoryContainer');
		var invSlots = invContainer.getElementsByClassName('InvSingle');
		//Populate individual inventory slots.
		var invDetails = invSlots[invRow].getElementsByClassName('InvSave');
		for(var invItem=0;invItem<invDetails.length;invItem++){
			invDetails[invItem].value = characterData["characters"][i]["inventory"][invRow][invItem];
		}

	}
}

function loadSpellsData(i){
	//Set up spell rows
	for(var spellRow=0;spellRow < characterData["characters"][i]["spells"].length;spellRow++){
		addSpellRow();
		var spellsGrid = document.getElementById("spellsContainer");
		var spellsRow = spellsGrid.getElementsByClassName("spellRow");
		//Populate individual spell slots.
		var spellDetails = spellsRow[spellRow].getElementsByClassName("spellSave");
		for(var dataDetail=0;dataDetail<spellDetails.length;dataDetail++){
			spellDetails[dataDetail].value = characterData["characters"][i]["spells"][spellRow][dataDetail];
		}
	}
}

function checkSpellcasting(){
	var checkbox = document.getElementById('spellcastingCheck');
	if (checkbox.checked){
		//Spellcasting enabled for this character = add in the section
		var row = document.getElementById('spellcastingRow');
		row.style.display="flex";
		var slots = document.getElementById('spellSlots');
		slots.style.display="flex";
		var spellBlock = document.getElementsByClassName("spellRow");
		for(var i=0;i<spellBlock.length;i++){
			spellBlock[i].style.display="flex";
		}
		var spellHide = document.getElementsByClassName("spellHide");
		for(var i=0;i<spellHide.length;i++){
			spellHide[i].style.display="flex";
		}
	}
	else{
		//Spellcasting disabled for this character - hide section.
		var row = document.getElementById('spellcastingRow');
		row.style.display="none";
		var slots = document.getElementById('spellSlots');
		slots.style.display="none";
		var spellBlock = document.getElementsByClassName("spellRow");
		for(var i=0;i<spellBlock.length;i++){
			spellBlock[i].style.display="none";
		}
		var spellHide = document.getElementsByClassName("spellHide");
		for(var i=0;i<spellHide.length;i++){
			spellHide[i].style.display="none";
		}
	};
}

function spellAbiChange(ability){

	var abilityMod = getStatMod(document.getElementById(ability.value).value);
	document.getElementById('SAM').value = abilityMod + Number(document.getElementById('ProfBonus').value);
	document.getElementById('SSDC').value = Number(document.getElementById('SAM').value) + 8;
}

function DeathSaveCheck(checkbox){
	if(checkbox.checked){
		if(checkbox.classList.contains("DSPass")){
			var allBoxes = document.getElementsByClassName("DSPass");
			for(var i=0;i<allBoxes.length;i++){
				allBoxes[i].checked = false;
			}
			checkbox.checked = true;
		}
		else if(checkbox.classList.contains("DSFail")){
			var allBoxes = document.getElementsByClassName("DSFail");
			for(var i=0;i<allBoxes.length;i++){
				allBoxes[i].checked = false;
			}
			checkbox.checked = true;
		}
	}
}

function getPassive(){
	var passiveSkill = document.getElementById("passiveDropdown").value;
	var passiveWriteTo = document.getElementById("passiveDisplay");
	var modifier = 10;
	//Step one - get the value of the stat associated with that skill.
	modifier += getStatMod(document.getElementById(getStatFromSkill(passiveSkill)).value);
    //Step two - get proficiency and expertise.
    var proficient = false;
    var expert = false;
    var proficient = document.getElementById(passiveSkill).checked;
    try{
    	var expert     = document.getElementById(passiveSkill + "Exp").checked;
    }catch(error){}
    if(proficient){
    	modifier += Number(document.getElementById("ProfBonus").value);
    }
    if(expert){
    	modifier += Number(document.getElementById("ProfBonus").value);
    }
    passiveWriteTo.innerHTML = `<b>${modifier}</b>`;
}