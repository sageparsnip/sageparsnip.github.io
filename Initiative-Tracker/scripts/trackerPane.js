
function createTrackerPane(){
	const ContentDiv = document.getElementById("tracker-pane-container");
	var content = '';
	content += `
		<div class="d-flex justify-content-around">
			<button id="loadInitiative" onclick="" class="btn btn-outline-secondary ml-auto" title="Load previously saved initiative order from JSON">
				Load Initiative
			</button>
			<button id="initiativeTypeButton" class="btn btn-outline-secondary ml-auto" onclick="" title="Switch current iniative to Popcorn iniatiative style">
				Popcorn Initiative
			</button>
		</div>
		<table class="table" id="initiative-tracker-table" style="color:white">
			<thead>
			<tr>
				<th scope="col">#</th>
				<th scope="col">Name</th>
				<th scope="col">Conditions</th>
				<th scope="col">HP</th>
				<th scope="col">AC</th>
			</tr>
			<thead>
		</table>
		<div class="d-flex justify-content-around">
			<button id="addUndeclaredInitiative" onclick="" class="btn btn-outline-secondary ml-auto" title="Add a non-actor to the initiative order">
				Add Undeclared
			</button>
			<button id="sortInitiativeOrder" class="btn btn-outline-secondary ml-auto" onclick="" title="Sort the current initiative list, highest first">
				Sort List
			</button>
		</div>
	`;
	ContentDiv.innerHTML =  content;
}