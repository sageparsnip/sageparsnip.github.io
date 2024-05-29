function createActorPane(){
	const ContentDiv = document.getElementById("actor-pane-container");
	var content = '';
	content += `
		<div class="d-flex justify-content-around">
			<button id="newActorButton" class="btn btn-outline-secondary ml-auto" onclick="" title="Open dialog to create a new actor">
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