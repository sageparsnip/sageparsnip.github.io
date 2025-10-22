var ActorList = [];
var initiativeList = [];
var ActorListProxy = new Proxy(ActorList, {
  set: function (target, key, value) {
      console.log(`${key} set to ${value}`);
      target[key] = value;
      return true;
  }
});

onload = (event) => { 
	ActorList = JSON.parse(localStorage.getItem("ActorList"));
	reloadActorList();
};

function createActorPane(){
	const ContentDiv = document.getElementById("actor-pane-container");
	var content = '';
	content += `
		<div class="d-flex justify-content-around">
			<button id="newActorButton" class="btn btn-outline-secondary ml-auto" onclick="createNewActor()" title="Open dialog to create a new actor">
				Create New Actor
			</button>
			<button id="loadActorListButton" class="btn btn-outline-secondary ml-auto" onclick="loadActorsFromFile()" title="Load list of actors from JSON">
				Load Actor List
			</button>
		</div>
		<table class="table" id="actor-tracker-table" style="color:white">
			<thead>
			<tr>
				<th scope="col">Name</th>
				<th scope="col">CR</th>
				<th scope="col"></th> <!--Empty col for edit button -->
				<th scope="col"></th> <!--Empty col for delete button -->
				<th scope="col"></th> <!--Empty col for add to initiative button -->
			</tr>
			</thead>
			<tbody id="actor-tracker-table-body">
			</tbody>
		</table>
		<input if="actorFilter"></input><button onclick="filterActors()">Filter</button>
		<br><button onclick="exportActors()">Export List To JSON</button>
	`;
	ContentDiv.innerHTML =  content;
	console.log("createActorPane() ran successfully!");
}

function moveUpInit(row){
	console.log(row.id);
	if(row.id != 0 && initiativeList.length > 1){
		//Allowed to move up a row as not top of list and list longer than 1
		let tempActor = initiativeList[row.id];
		initiativeList[row.id] = initiativeList[row.id - 1];
		initiativeList[row.id - 1] = tempActor;
		renderInitiative;
	}else{
		console.log("Can't move up - too high in list or list too short");
	}
}

function renderInitiative(){
	let initBody = document.getElementById("initiativeBody");
	initBody.innerHTML = '';
	let idx = 0;
	initiativeList.forEach(actor => {
		initBody.insertAdjacentHTML('beforeend', `
			<tr id="${idx}">
			<td><input style="max-width:2rem"/></td>
			<td><input style="max-width:6rem" value="${actor.Name}"></input></td>
			<td><input style="max-width:10rem" value="${actor.Conditions}"></input></td>
			<td><input style="max-width:3rem" value="${actor.HP}"></input></td>
			<td><input style="max-width:2rem" value="${actor.AC}"></input></td>
			<td><img onclick="moveUpInit(this.parentNode.parentNode)" src="assets/upArrow.png"></td>
			<td><img onclick="moveDnInit(this)" src="assets/dnArrow.png"></td>
			</tr>
		`);
		idx++;
	});
}


function showActorDetails(td){
	let actorName = td.innerHTML;
	//Find the actor in the ActorList array
	let i = 0, found = 0;
	while(i < ActorList.length && found == 0){
		if(ActorList[i].Name == actorName){
			//Populate the modal and show it
			found = 1;
			populateDetails(ActorList[i]);
		}
		else{
			i++;
		}
	}
}

function refreshInitiativeList(){
	//Need to occasionally scan the full list of initiatives and mark the order.
	initiativeList = []; //Hard overwrite! Be careful!
	let i=0;
	document.getElementById("initiativeBody").childNodes.forEach(row =>{
		console.log(row.childNodes);
		if(row.childNodes.length > 1){
			//This is a row with content. Need to add it to initiative order.
			console.log(row.childNodes);
			initiativeList[i] = `{"Initiative":${row.childNodes[1].childNodes[0].value},"Name":${row.childNodes[3].childNodes[0].value},"Conditions":${row.childNodes[5].childNodes[0].value},"HP":${row.childNodes[7].childNodes[0].value},"AC":${row.childNodes[9].childNodes[0].value}}`;
			i++;
		}
	})
	console.log(initiativeList);
}

function sendToInitiative(button){
	refreshInitiativeList();
	let actorName = button.parentNode.parentNode.childNodes[1].innerHTML;
	let i = 0, found = 0;
	while(i < ActorList.length && found == 0){
		if(ActorList[i].Name == actorName){
			//Populate the modal and show it
			found = 1;
			//addToInitiative(ActorList[i]);
			initiativeList.push(ActorList[i]);
			renderInitiative();
		}
		else{
			i++;
		}
	}
}

function deleteActor(td){
	let actorName = td.parentNode.parentNode.childNodes[1].innerHTML;
	//Find the actor in the ActorList array
	let i = 0, found = 0;
	while(i < ActorList.length && found == 0){
		if(ActorList[i].Name == actorName){
			//Populate the modal and show it
			found = 1;
			ActorList.splice(i, 1);
			reloadActorList();
		}
		else{
			i++;
		}
	}
}

function populateDetails(actor){
	for(const [key, value] of Object.entries(actor)){
		document.getElementById("detail" + key).innerHTML = value;
	}
}

function reloadActorList(){
	//Iterate through the list of actors and add them to the far-left pane.
	var table = document.getElementById("actor-tracker-table-body");
	table.innerHTML = '';
	ActorList.forEach(actor =>{
		table.innerHTML += `
			<tr>
			<td onclick="showActorDetails(this)">${actor.Name}</td>
			<td>${actor.CR}</td>
			<td><button onclick="editActor(this)">Edit</button></td>
			<td><button onclick="deleteActor(this)">Del</button></td>
			<td><button onclick="sendToInitiative(this)">Init</button></td>
			</tr>
		`;
	});
	localStorage.setItem("ActorList", JSON.stringify(ActorList));
}

function editActor(button){
	let actorName = button.parentNode.parentNode.childNodes[1].innerHTML;
	//Find the actor in the ActorList array
	let i = 0, found = 0;
	while(i < ActorList.length && found == 0){
		if(ActorList[i].Name == actorName){
			//Populate the modal and show it
			found = 1;
			createNewActor();
			document.getElementById("newActorName").value = ActorList[i].Name;
			document.getElementById("newActorCR").value = ActorList[i].CR;
			document.getElementById("newActorHP").value = ActorList[i].HP;
			document.getElementById("newActorAC").value = ActorList[i].AC;
			document.getElementById("newActorConditions").value = ActorList[i].Conditions;
		}
		else{
			i++;
		}
	}
}

function createNewActor(){
	var modalHeaderDiv = document.getElementById("actorModalHeader");
	var modalBodyDiv   = document.getElementById("actorModalBody");
	var headerContent = '<h2>Create New Actor</h2>';
	modalHeaderDiv.innerHTML = headerContent;
	var bodyContent = `
		<div class="container">
			<div class="row">
				<div class="col-6">Character Name:</div>
				<div class="col-6"><input id="newActorName"></div>
			</div>
			<div class="row">
				<div class="col-6">Challenge Rating:</div>
				<div class="col-6"><input id="newActorCR"></div>
			</div>
			<div class="row">
				<div class="col-6">Hit Points:</div>
				<div class="col-6"><input id="newActorHP"></div>
			</div>
			<div class="row">
				<div class="col-6">Armor Class:</div>
				<div class="col-6"><input id="newActorAC"></div>
			</div>
			<div class="row">
				<div class="col-6">Conditions:</div>
				<div class="col-6"><input id="newActorConditions"></div>
			</div>
		</div>
	`;
	modalBodyDiv.innerHTML = bodyContent;
	showActorModal();
}

function deleteCharacter(){
	console.log("This function will delete the character from local memory... eventually...")
}

function saveCharacter(){
	var newActor = {
		"Name": 		document.getElementById("newActorName").value,
		"HP": 			document.getElementById("newActorHP").value,
		"AC": 			document.getElementById("newActorAC").value,
		"CR": 			document.getElementById("newActorCR").value,
		"Conditions": 	document.getElementById("newActorConditions").value
	}
	//Need to check if Actor already exists; if so, update rather than pushing
	if(ActorList.length > 0){
		let i = 0;
		let found = 0;
		while(i < ActorList.length && found == 0){
			if(newActor.Name == ActorList[i].Name){
				found = 1;
			}
			else{
				i++;
			}
		};
		if(found == 1){
			ActorList[i] = newActor;
			alert(document.getElementById("newActorName").value + " updated in Actor List!");
		}
		else{
			ActorList.push(newActor);
			alert(document.getElementById("newActorName").value + " added to Actor List!");
		}
	}
	else{
		ActorList.push(newActor);
		alert(document.getElementById("newActorName").value + " added to Actor List!");
	}
	document.getElementById("newActorName").value  			= '';
	document.getElementById("newActorHP").value  			= '';
	document.getElementById("newActorAC").value  			= '';
	document.getElementById("newActorCR").value  			= '';
	document.getElementById("newActorConditions").value 	= '';
	reloadActorList();
}

function seeActorList(){
	console.log(ActorList);
}

function showActorModal() {
	var modal = document.getElementById("actorModal");
	modal.style.display = "inline";
}

function hideActorModal() {
	var modal = document.getElementById("actorModal");
	modal.style.display = "none";
}