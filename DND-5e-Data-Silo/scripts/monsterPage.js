var CRsFrom = `
	<option selected="selected">0</option>
	<option>1/8</option>
	<option>1/4</option>
	<option>1/2</option>
	<option>1</option>
	<option>2</option>
	<option>3</option>
	<option>4</option>
	<option>5</option>
	<option>6</option>
	<option>7</option>
	<option>8</option>
	<option>9</option>
	<option>10</option>
	<option>11</option>
	<option>12</option>
	<option>13</option>
	<option>14</option>
	<option>15</option>
	<option>16</option>
	<option>17</option>
	<option>18</option>
	<option>19</option>
	<option>20</option>
	<option>21</option>
	<option>22</option>
	<option>23</option>
	<option>24</option>
	<option>25</option>
	<option>26</option>
	<option>27</option>
	<option>28</option>
	<option>29</option>
	<option>30</option>
`;
var CRsTo = `
	<option>0</option>
	<option>1/8</option>
	<option>1/4</option>
	<option>1/2</option>
	<option>1</option>
	<option>2</option>
	<option>3</option>
	<option>4</option>
	<option>5</option>
	<option>6</option>
	<option>7</option>
	<option>8</option>
	<option>9</option>
	<option>10</option>
	<option>11</option>
	<option>12</option>
	<option>13</option>
	<option>14</option>
	<option>15</option>
	<option>16</option>
	<option>17</option>
	<option>18</option>
	<option>19</option>
	<option>20</option>
	<option>21</option>
	<option>22</option>
	<option>23</option>
	<option>24</option>
	<option>25</option>
	<option>26</option>
	<option>27</option>
	<option>28</option>
	<option>29</option>
	<option selected="selected">30</option>
`;

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

function showMonsterPage() {
	const ContentDiv = document.getElementById("primary-content");
	var content = '';
	content += `
		<!-- General flow of page should be as follows:
		     1. Various dropdowns at top to act as filters for search function, with a "filter" button.
		     2. A dropdown list of filtered monsters, with a "Load" button, in a left-hand panel.
		     3. A details panel, on the right, with the monster's stats.
		 -->
		<p class="fs-5">Use the filters below and press "Refresh" to refresh the dropdown list, then press "Load" to get Monster details, or press "Create New" to create a new monster.</p>
		
	`;

	var filters = `
		<div class="container no-gutters">
			<div class="row">
				<div class="col-3"><h5 style="text-align:center">CR:</h5></div>
				<div class="col-3"><h5 style="text-align:center">Creature Type:</h5></div>
				<div class="col-3"><h5 style="text-align:center">Setting:</h5></div>
				<div class="col-2"><h5 style="text-align:center">Source:</h5></div>
			</div>
			<div class="row">
				<div class="col-1">
					<select id="CRFrom" name="CRFrom" style="height:inherit">${CRsFrom}</select>
				</div>
				<div class="col-1">
					<p style="text-align:center;">to:</p>
				</div>
				<div class="col-1">
					<select id="CRTo" name="CRTo" style="height:inherit">${CRsTo}</select>
				</div>
				<div class="col-3">
					<select id="TypeFilter" name="TypeFilter" style="height:inherit"><option selected="selected">Any</option></select>
				</div>
				<div class="col-3">
					<select id="SettingFilter" name="SettingFilter" style="height:inherit"><option selected="selected">Any</option></select>
				</div>
				<div class="col-2">
					<select id="SourceFilter" name="SourceFilter" style="height:inherit"><option selected="selected">Any</option></select>
				</div>
				<div class="col-1" style="align-items:center">
					<button style="align-items:center" onclick="FilterMonsters()">Filter</button>
				</div>
			</div>
			<hr>
			<div class="row">
				<!--Primary content row beneath the filters! Left-hand panel for filtered monsters, right-hand for details -->
				<div class="col-3" style="background: rgb(75,75,75)" id="MonsterListPanel">
					<p> Filtered monsters will appear here! </p>
				</div>
				<div class="col-9" id="MonsterDetailPanel">
					<p> Monster details will appear here! </p>
				</div>
			</div>
		</div>
	`;
	content += filters;

	//Write the content to the webpage.
	ContentDiv.innerHTML = content;
	SetFilters();
	FilterMonsters();
}

function createDetailsPanel(){
	var detailsPanel = ''; //RIGHT-HAND PANEL

	//////////////////////////////////////////////// TOP ROW ////////////////////////////////////////////////

	var TopRow = `
		<div class="row g-3">
			<div class="col-3"><div class="row g-0">
				<div class="col-5"><h5>Name:</h5></div>
				<div class="col-7"><input type="text" id="Name" class="saveDetail grid-input"></input></div>
			</div></div>
			<div class="col-3"><div class="row g-0">
				<div class="col-4"><h5>Type:</h5></div>
				<div class="col-8"><input type="text" id="Type" class="saveDetail grid-input"></input></div>
			</div></div>
			<div class="col-4"><div class="row g-0">
				<div class="col-5"><h5>Source:</h5></div>
				<div class="col-7"><input type="text" id="Source" class="saveDetail grid-input"></input></div>
			</div></div>
			<div class="col-2"><div class="row g-0">
				<div class="col-5"><h5>CR:</h5></div>
				<div class="col-7"><select id="CR" name="CR" class="saveDetail" style="height:inherit">${CRsFrom}</select></div>
			</div></div>
		</div>
	`;

	detailsPanel += TopRow;

	//////////////////////////////////////////////// 2ND ROW ////////////////////////////////////////////////

	var secondRow = `
		<div class="row g-3">
			<div class="col-3"><div class="row g-0">
				<div class="col-9"><h5>Current HP:</h5></div>
				<div class="col-3"><input type="text" id="Current HP" class="saveDetail grid-input"></input></div>
			</div></div>
			<div class="col-3"><div class="row g-0">
				<div class="col-9"><h5>Max HP:</h5></div>
				<div class="col-3"><input type="text" id="Max HP" class="saveDetail grid-input"></input></div>
			</div></div>
			<div class="col-3"><div class="row g-0">
				<div class="col-9"><h5>AC:</h5></div>
				<div class="col-3"><input type="text" id="AC" class="saveDetail grid-input"></input></div>
			</div></div>
			<div class="col-3"><div class="row g-0">
				<div class="col-6"><h5>Speed:</h5></div>
				<div class="col-6"><input type="text" id="Speed" class="saveDetail grid-input"></input></div>
			</div></div>
		</div>
	`;

	detailsPanel += secondRow



	//////////////////////////////////////////////// STATS ////////////////////////////////////////////////

	function statRows(titles){
		//Builds the section for stats.
		var output = '';
		output += '<div class="row g-3">';
		for(var i=0;i<titles.length;i++){
			output += `<div class="col-1 clickable" onclick="rollDiceStat(this)"><h5>` + titles[i] + `:</h5></div>` + 
					  `<div class="col-1"><input id="` + titles[i] + `" class="grid-input stat-input saveDetail"></input></div>`;
		}
		output += `</div>`;
		return output;
	}

	detailsPanel += statRows(['STR','DEX','CON','INT','WIS','CHA']);


	detailsPanel += '<hr>';

	////////////////////////////// PROFICIENCIES HEADER //////////////////////////////
	detailsPanel += `<div class="row">
					<div class="col-4"><h5>Proficiencies:</h5></div>
					<div class="col-1"><h6>Passive:</h6></div>
					<div class="col-3"><select id="passiveDropdown" name="passiveDropdown" onchange="getPassive()">
						${skillsOptions}
					</select></div>
					<div class="col-1"><h6 id="passiveDisplay" style="text-align:center"><b>0</b></h6></div>
					<div class="col-2"><h6>Prof. Bonus: </h6></div>
					<div class="col-1"><input id="ProfBonus" class="prof-box saveDetail"></input></div>
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
						<div class="col-2"><input id="` + titles[i] + ` Save" type="checkbox" class="saveDetail"></input></div>
					</div>
				</div>
			`;		}
		output += `</div>`;
		return output;
	}

	detailsPanel += profSaveRows(['STR','DEX','CON','INT','WIS','CHA']);


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
						<div class="col-2"><input id="` + titles[i] + `" type="checkbox" class="saveDetail"></input></div>
					</div>
				</div>
			`;		}
		output += `</div>`;
		return output;
	}
	detailsPanel += profSkillRows(['Acrobatics', 'Animal Handling', 'Arcana', 'Athletics', 'Deception', 'History']);
	detailsPanel += profSkillRows(['Insight', 'Intimidation', 'Investigation', 'Medicine', 'Nature', 'Perception']);
	detailsPanel += profSkillRows(['Performance', 'Persuasion', 'Religion', 'Sleight Of Hand', 'Stealth', 'Survival']);
	detailsPanel += "<hr>";

	////////////////////////////// ATTACK PANEL //////////////////////////////
	var AttacksPanel = `
		<div class="row">
			<div class="col-4"><h5>Attacks:</h5></div>
		</div>
	`;

	detailsPanel += AttacksPanel;

	////////////////////////////// MONSTER FEATURES //////////////////////////////
	var FeaturesPanel = `
		<hr>
		<div class="row">
			<div class="col-4"><h5>Features:</h5></div>
		</div>
	`;

	detailsPanel += FeaturesPanel;

	//////////////////////////////////////////////// SAVE BUTTON ////////////////////////////////////////////////

	var saveButtonRow = `
		<hr>
		<div class="row g-3">
			<button id="SaveButton" style="height:100%;width:100%" onclick="SaveMonster()">Save or Update Monster</button>
		</div>
	`;

	detailsPanel += saveButtonRow;
	//////////////////////////////////////////////// WRITE PANEL ////////////////////////////////////////////////
	$("#MonsterDetailPanel")[0].innerHTML = detailsPanel;
}

function SetFilters(){
	//Need to populate the Type, Setting, and Source filters a/c to what's in storage.
	var TypeFilters = [];
	var SettingFilters  = [];
	var SourceFilters   = [];
	var MonsterData = JSON.parse(localStorage.getItem("monsterData"));
	for(let i=0;i<MonsterData["monsters"].length;i++){
		TypeFilters.push(MonsterData["monsters"][i]["Type"]);
		SettingFilters.push(MonsterData["monsters"][i]["Setting"]);
		SourceFilters.push(MonsterData["monsters"][i]["Source"]);
	}
	TypeFilters.sort();
	SettingFilters.sort();
	SourceFilters.sort();
	var uniqueTypes = TypeFilters.reduce(function(a,b){
		if(a.indexOf(b) < 0) a.push(b);
		return a;
	},[]);
	var uniqueSettings = SettingFilters.reduce(function(a,b){
		if(a.indexOf(b) < 0) a.push(b);
		return a;
	},[]);
	var uniqueSources = SourceFilters.reduce(function(a,b){
		if(a.indexOf(b) < 0) a.push(b);
		return a;
	},[]);

	var TypeFilterBox    = $("#TypeFilter")[0];
	var SettingFilterBox = $("#SettingFilter")[0];
	var SourceFilterBox  = $("#SourceFilter")[0];

	//Blank them before setting.
	TypeFilterBox.innerHTML = '<option>Any</option>';
	SettingFilterBox.innerHTML = '<option>Any</option>';
	SourceFilterBox.innerHTML = '<option>Any</option>';

	for(let i=0;i<uniqueTypes.length;i++){
		TypeFilterBox.insertAdjacentHTML("beforeend", `<option>${uniqueTypes[i]}</option>`);
	}
	for(let i=0;i<uniqueSettings.length;i++){
		SettingFilterBox.insertAdjacentHTML("beforeend", `<option>${uniqueSettings[i]}</option>`);
	}
	for(let i=0;i<uniqueSources.length;i++){
		SourceFilterBox.insertAdjacentHTML("beforeend", `<option>${uniqueSources[i]}</option>`);
	}
}

function FilterMonsters(){
	var MonsterListPanel = $("#MonsterListPanel")[0];
	var MonsterData = JSON.parse(localStorage.getItem("monsterData"));
	MonsterListPanel.innerHTML = `
		<table class="table">
			<thead>
				<tr>
					<th scope="col" class="clickable text-light" onclick="createDetailsPanel()">New</th>
				</tr>
			</thead>
			<tbody id="monListBody">
			</tbody>
		</table>`;
	var tbody = document.getElementById("monListBody");
	var optionList = [];
	var TypeFilter = $("#TypeFilter")[0].value;
	var SettingFilter = $("#SettingFilter")[0].value;
	var SourceFilter = $("#SourceFilter")[0].value;
	var CRFromFilter = $("#CRFrom")[0].value;
		if(["1/8","1/4","1/2"].includes(CRFromFilter)){
			//CRFromFilter is a fraction; convert it.
			var CRFromNumber = Number(CRFromFilter.split("/")[0]) / Number(CRFromFilter.split("/")[1]);
		}
		else{
			var CRFromNumber = Number(CRFromFilter);
		}
	var CRToFilter = $("#CRTo")[0].value;
		if(["1/8","1/4","1/2"].includes(CRToFilter)){
			//CRToFilter is a fraction; convert it.
			var CRToNumber = Number(CRToFilter.split("/")[0]) / Number(CRToFilter.split("/")[1]);
		}
		else{
			var CRToNumber = Number(CRToFilter);
		}
	if(MonsterData == null){
		//Nothing in MonsterData! Need to make something.
		var temp = {"monsters":[]};
		localStorage.setItem('monsterData', JSON.stringify(temp, null, "\t"));
		MonsterData = JSON.parse(localStorage.getItem("monsterData"));
	}
	for(let i=0;i<MonsterData["monsters"].length;i++){
		var ListMonster = true;
		if(TypeFilter != "Any"){
			//Filter by Type
			if(MonsterData["monsters"][i]["Type"] != TypeFilter){
				ListMonster = false;
			}
		}
		if(SettingFilter != "Any"){
			//Filter by Setting
			if(MonsterData["monsters"][i]["Setting"] != SettingFilter){
				ListMonster = false;
			}
		}
		if(SourceFilter != "Any"){
			//Filter by Source
			if(MonsterData["monsters"][i]["Source"] != SourceFilter){
				ListMonster = false;
			}
		}
		if(CRFromFilter != "0"){ //No point checking below this point; everything is this or above.
			var CRMonster = MonsterData["monsters"][i]["CR"];
			if(["1/8","1/4","1/2"].includes(CRMonster)){
				var CRMonsterNumber = Number(CRMonster.split("/")[0]) / Number(CRMonster.split("/")[1]);
			}
			else{
				var CRMonsterNumber = Number(CRMonster);
			}
			if(CRFromNumber > CRMonsterNumber){
				ListMonster = false;
			}
		}
		if(CRToFilter != "30"){ //No point checking below this point; everything is this or above.
			var CRMonster = MonsterData["monsters"][i]["CR"];
			if(["1/8","1/4","1/2"].includes(CRMonster)){
				var CRMonsterNumber = Number(CRMonster.split("/")[0]) / Number(CRMonster.split("/")[1]);
			}
			else{
				var CRMonsterNumber = Number(CRMonster);
			}
			if(CRToNumber < CRMonsterNumber){
				ListMonster = false;
			}
		}
		if(ListMonster){
			//Checks passed! Add it to the list.
			optionList.push(MonsterData["monsters"][i]["Name"] + " [" + MonsterData["monsters"][i]["CR"] + "]");
		}
	}
	optionList.sort();
	//console.log(TypeFilter);
	console.log(optionList);
	for(let i=0;i<optionList.length;i++){
		tbody.insertAdjacentHTML("beforeend", `
			<tr>
				<td scope="row" class="clickable text-light" onclick="LoadMonster(this)">${optionList[i]}</td>
				<td scope="row" class="clickable text-light" onclick="DeleteMonster(this)">X</td>
			</tr>
		`);
	}	
	
}

function SaveMonster(){
	var inputs = document.getElementsByClassName('saveDetail');
	var MonsterData = JSON.parse(localStorage.getItem("monsterData"));

	var formData = {};
	var monExists = false;
	var posInStorage = -1;

	//First, check if the record already exists in the "characterData" storage.
	for(var i=0; i<MonsterData["monsters"].length;i++){
		if (MonsterData["monsters"][i]["Name"] == document.getElementById("Name").value){
			monExists = true;
			posInStorage = i;
			break;
		}
	}
	//Now we can determine if we're saqving a new monster, or updating an existing one!

	//Get all the saving Details and put them in the JSON temp storage.
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

	if(monExists == false){
		//New characters - prep to insert into storage.
		MonsterData["monsters"].push(formData);
		console.log(formData["Name"] + " insert into DB!");
	}
	else{
		//Character exists in storage at position posInStorage - update.
		MonsterData["monsters"][posInStorage] = formData;
		console.log(formData["Name"] + " updated in DB!");

	}

	localStorage.setItem("monsterData", JSON.stringify(MonsterData, null, "\t"));
}

function DeleteMonster(input){
	var parent = input.parentNode;
	var Name = parent.childNodes[1].innerHTML.split(" [")[0];
	if(confirm(`Are you sure you want to delete ${Name}?`)){
		console.log("Deleting...");
		var MonsterData = JSON.parse(localStorage.getItem("monsterData"));
		for(let i=0;i<MonsterData["monsters"].length;i++){
			if(MonsterData["monsters"][i]["Name"] == Name){
				MonsterData["monsters"].splice(i,1);
			}
		}
		localStorage.setItem('monsterData', JSON.stringify(MonsterData, null, "\t"));
	}
	FilterMonsters();
	SetFilters();
}

function LoadMonster(input){
	createDetailsPanel();
	var Name = input.innerHTML.split(" [")[0];
	var inputs = document.getElementsByClassName('saveDetail');
	var posInStorage = -1;
	var MonsterData = JSON.parse(localStorage.getItem("monsterData"));
	for (let i=0;i<MonsterData["monsters"].length;i++){
		//Find the monster in question
		if(MonsterData["monsters"][i]["Name"] == Name){
			//Found it!
			posInStorage = i;
			break;
		}
	}
	for(let i=0; i<inputs.length;i++){
		if(inputs[i].type != "checkbox"){
			inputs[i].value = MonsterData["monsters"][posInStorage][inputs[i].id];
		}
		else {
			inputs[i].checked = MonsterData["monsters"][posInStorage][inputs[i].id];
		}
	}
}
