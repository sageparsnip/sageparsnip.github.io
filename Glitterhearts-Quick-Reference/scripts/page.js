var allMoves = [];

$( document ).ready(function() {
    onLoad();
});

function onLoad(){
	//Everything that should fire after page load goes here.
	populateAllMoves();
	getBasicMoves();
	getEverydayIdentities();
	getMagicalArchetypes();
	getMysticalConnections();
}



function getFullDetails(moveName){
	//console.log(referrer.innerText);
	var i = 0;
	var found = false;
	while(i<allMoves.length && found==false){
		if(allMoves[i]["name"] == moveName){
			found=true;
			i--;
		}
		i++;
	}
	//console.log("Found: " + json["basic-moves"][i]["name"]);
	var myMove = allMoves[i];
	document.getElementById("detailsModalTitle").innerHTML = `${myMove.name}`;
	document.getElementById("detailsModalBody").innerHTML = `${myMove.fullDetails}`;
	var myModal = new bootstrap.Modal(document.getElementById("detailsModal"), {});
	myModal.show();
}

function getBasicMoves(){
	var basicMovesRow = document.getElementById("basic-moves-content");
	var sl = "";			
	$.getJSON("./data/basic-moves.json?" + Date.now(), function(json) {
		json["basic-moves"].forEach(move => {
			if(move["name"] == "We can do this together!" || move["name"] == "Touch their heart" || move["name"] == "CLASH!" || move["name"] == "Glimpse the truth!"){
			sl += `
				<div class="col-6 col-sm-6 col-md-6 col-lg-3" style="padding-top:1rem; padding-left:2rem;padding-right:2rem;padding-bottom:1rem;border: 1px solid" onclick="getFullDetails('${move.name}')">
			`;
			}
			else{
				sl += `
					<div class="col-6  col-sm-6 col-md-6 col-lg-3" style="padding-top:1rem; padding-left:2rem;padding-right:2rem;padding-bottom:1rem;border: 1px solid" onclick="getFullDetails('${move.name}')">
				`;
			}
			sl += `
				<h4>${move.name}</h4><p>${move.content}</p><sub>p. ${move.page}</sub></div>
			`;
		});
		basicMovesRow.innerHTML = sl;
	});
}

function getMagicalArchetypes(){
	var archetypesRow = document.getElementById("magical-archetypes-content");
	var sl = "";
	sl += `
		
	`;
	var bgcolor = "";
	var textcolor = "";
	$.getJSON("./data/magical-archetypes.json?" + Date.now(), function(json) {
		json["magical-archetypes"].forEach(archetype => {
			switch(archetype["name"]){
			case("The Idol"):
				bgcolor = "#2C7952";
				textcolor = "white";
				break;
			case("The Witch"):
				bgcolor = "#5F4887";
				textcolor = "white";
				break;
			case("The Warrior"):
				bgcolor = "#831F11";
				textcolor = "white";
				break;
			case("The Defender"):
				bgcolor = "#09477E";
				textcolor = "white";
				break;
			case("The Tactician"):
				bgcolor = "#8D367A";
				textcolor = "white";
				break;
			default:
				bgcolor = "charcoal";
			}
			sl += `
				<div class="col-12" style="background-color:${bgcolor};color:${textcolor}">
					<h4 style="text-align:center"><b>${archetype.name}</b></h4>
					<p>${archetype.description}</p>
					<div class="row d-flex" >
			`;
			archetype["moves"].forEach(move => {
				sl += `
					<div class="col col-md-6 col-lg" style="border:1px solid"><h5>${move.name}</h5><p>${move.content}</p><p style="text-align:right">p. ${move.page}</p></div>
				`;
			});
			sl += `
				</div></div>
			`;
		});
		archetypesRow.innerHTML = sl;
	});
}

function getMysticalConnections(){
	var mysticalConnectionsDiv = document.getElementById("mystical-connections-content");
	var sl = "";
	$.getJSON("./data/mystical-connections.json?" + Date.now(), function(json) {
		json["connections"].forEach(connection => {
			console.log(connection["name"]);
			sl += `<div class="col-4 col-lg-4 col-md-6" style="border:1px solid">`;
			sl += `
					<h4 style="text-align:center"><b>${connection["name"]}</b> (${connection["type"]})<h4>
					<h4 style="text-align:center">Moves:</h4>
			`;
			connection["moves"].forEach(move => {
				sl += `
					<b>${move.name}</b>
					<p>${move.content}</p><p style="text-align:right">p. ${move.page}</p>
				`
			});
			sl += `</div>`;
		});
		mysticalConnectionsDiv.innerHTML = sl;
	});
	
}

function getEverydayIdentities(){
	var everydayIdentitiesRow = document.getElementById("everyday-identities-content");
	var sl = "";
	$.getJSON("./data/everyday-identities.json?"  + Date.now(), function(json) {
		json["everyday-identities"].forEach(identity => {
			var bgcolor = "";
			var textcolor = "";
			switch(identity["primary-stat"]) {
			case "Physical":
				bgcolor = "#D13B1B";
				textcolor = "white";
				break;
			case "Mental":
				bgcolor = "#09255C";
				textcolor = "white";
				break;
			case "Emotional":
				bgcolor = "#D1971B";
				textcolor = "white";
				break;
			case "Persona":
				bgcolor = "#66366F";
				textcolor = "white";
				break;
			case "Mystical":
				bgcolor = "#3698AB";
				textcolor = "white";
				break;
			default:
				bgcolor = "charcoal";
				textcolor = "white";
			}
			//console.log(identity);
			sl += `
				<div class="col-6 col-lg-3 col-md-6" style="padding-top:1rem; padding-left:2rem;padding-right:2rem;padding-bottom:1rem;border: 1px solid; background-color:${bgcolor}; color:${textcolor}">
					<h4 style="text-align:center"><b>${identity.name}</b></h4>
					<h5 style="text-align:center">Primary Stat: ${identity["primary-stat"]}</h5>
					<h5 style="text-align:center">Stat Changes: ${identity["stat-changes"]}</h5>
					<p>${identity.description}</p>
					<h5 style="text-align:center">Moves:</h5>
			`;
			identity["moves"].forEach(move => {
				sl += `
					<h5>${move.name} <sub style="text-align:right">p. ${move.page}</sub></h5>
					<p>${move.content}</p>
					
				`;
			});
			sl += `</div>`;
		});
		everydayIdentitiesRow.innerHTML = sl;
	});
}

function showHideBasicMoves(){
	if($("#basic-moves-content").is(':visible')){
		$("#basic-moves-content").hide();
	}
	else{
		$("#basic-moves-content").show();
	}
}

function showHideEverydayIdentities(){
	if($("#everyday-identities-content").is(':visible')){
		$("#everyday-identities-content").hide();
	}
	else{
		$("#everyday-identities-content").show();
	}
}

function showHideMagicalArchetypes(){
	if($("#magical-archetypes-content").is(':visible')){
		$("#magical-archetypes-content").hide();
	}
	else{
		$("#magical-archetypes-content").show();
	}
}

function showHideMysticalConnections(){
	if($("#mystical-connections-content").is(':visible')){
		$("#mystical-connections-content").hide();
	}
	else{
		$("#mystical-connections-content").show();
	}
}

function searchChange(input){
	var searchString = input.value;
	//Need to loop over allMoves, pushing to new var where searchString in name
	var filteredMoves = [];
	allMoves.forEach(move => {
		if(move["name"].toUpperCase().includes(searchString.toUpperCase())){
			filteredMoves.push(move);
		}
	})
	console.log(filteredMoves);
	//Update the div to only show filtered moves
	var col = document.getElementById("quickSearchCol");
	col.innerHTML = '';
	filteredMoves.forEach(move => {
		col.innerHTML += `
			<div class="card">
				<h4 style="border:1px white; text-align:center" onclick="getFullDetails('${move.name}')">${move.name} [${move.source}]</h4>
			</div>
		`;
	})
}

function populateAllMoves(){
	//Get the full details of all moves from all sources.
	$.getJSON("./data/basic-moves.json?" + Date.now(), function(json) {
		//Add basic moves
		json["basic-moves"].forEach(move => {
			allMoves.push({
				"name":`${move.name}`,
				"source":"Basic Moves",
				"fullDetails":`${move.details}`
			});
		});
		//Get other JSONS as nests
		$.getJSON("./data/magical-archetypes.json?" + Date.now(), function(json2) {
			json2["magical-archetypes"].forEach(archetype => {
				archetype["moves"].forEach(move => {
							allMoves.push({
						"name":`${move.name}`,
						"source":"Magical Archetypes",
						"fullDetails":`${move.content}`
					});
				})
			});
			$.getJSON('./data/everyday-identities.json?' + Date.now(), function(json3) {
				json3["everyday-identities"].forEach(identity => {
					identity["moves"].forEach(move => {
								allMoves.push({
							"name":`${move.name}`,
							"source":"Everyday Identities",
							"fullDetails":`${move.content}`
						});
					})
				});
				$.getJSON('./data/mystical-connections.json?' + Date.now(), function(json4) {
					json4["connections"].forEach(connection => {
						connection["moves"].forEach(move => {
									allMoves.push({
								"name":`${move.name}`,
								"source":"Mystical Connections",
								"fullDetails":`${move.content}`
							});
						})
					});
					searchChange({"value":""});
				})
			})
		});
	});
	//console.log("allMoves:");
	//console.log(allMoves);

}