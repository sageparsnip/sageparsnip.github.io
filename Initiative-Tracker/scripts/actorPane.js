function createActorPane(){
	const ContentDiv = document.getElementById("actor-pane-container");
	var content = '';
	content += `
		<div class="d-flex justify-content-around">
			<button id="newActorButton" class="btn btn-outline-secondary ml-auto" onclick="createNewActor()" title="Open dialog to create a new actor">
				Create New Actor
			</button>
			<button id="loadActorListButton" class="btn btn-outline-secondary ml-auto" onclick="" title="Load list of actors from JSON">
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
			<thead>
		</table>
	`;
	ContentDiv.innerHTML =  content;
	console.log("createActorPane() ran successfully!");
}

function createNewActor(){
	var modalDiv = document.getElementById("actorModal");
	var content = '';
	var content = `

	`;
	showActorModal();
}

function deleteCharacter(){
	console.log("This function will delete the character from local memory... eventually...")
}

function saveCharacter(){
	console.log("This function will save the character to local memory... eventually...")
}

function showActorModal() {
	var modal = document.getElementById("actorModal");
	modal.style.display = "inline";
}

function hideActorModal() {
	var modal = document.getElementById("actorModal");
	modal.style.display = "none";
}