$(document).ready(loadJSON());




function consoleTest () {
	console.log("This file was loaded correctly!");
}


function loadJSON(){
	const rooms = ["bedroom","bathroom","livingroom","diningroom","kitchen"];
	$.getJSON("./data/furnishings.json", function (data){
		//JSON file loaded to var "data"
		
		//For each room, we should loop through it's section of data and fill it's div.

		for(let x of rooms){
			var roomData = data[x]; //Data only relating to the room in question
			var limit    = roomData.length;
			var roomDiv  = document.getElementById(x);    //Div to be added to for each room
			console.log(roomDiv);
			var roomStr  = '';
			for(let i = 0; i < limit; i++){
				console.log(roomData[i]);
				roomStr += `
					<div class="item">
						<h2>${roomData[i]["item"]}</h2>
						<h2><a href="${roomData[i]["link"]}">${roomData[i]["source"]}</a></h2>
						<h2>${roomData[i]["price"]}</h2>
					</div>
				`;
			};
			roomDiv.innerHTML = roomStr;
		};		
	});
	hideSections();
}

function openItemOverlay(itemHeader){
	var containerName = itemHeader.parentNode.parentNode.parentNode.getAttribute("id");
	console.log(itemHeader);
	var actionName = itemHeader.textContent.trim();
	console.log(actionName);
	$("#overlay").html("<h1>" + actionName + "</h1>");
	if($("#overlay").css("display") == "none") {
		console.log("showing overlay");
		$("#overlay").css("display", "block");
		$("#overlayback").css("display", "flex");
		//Fill overlay with content
		
		if(containerName != "ConditionsContainer") {
			$.getJSON("./data/skillDetails.json", function (data){
				var index = 0;
				var keyFound = false; 
				var upperBound = Object.keys(data.Action).length;
				while(keyFound == false && index < upperBound){
					if(data.Action[index].name.trim() == actionName){
						keyFound = true;
					}
					index++;
				};
				if(keyFound == true) {
					index--;
					//get paragraphs
					var bodyText = "";
					for(var j = 0; j < data.Action[index].text.length;j++){
						bodyText += data.Action[index].text[j] + "<br>";
					}
					//get possible pieces
						if(data.Action[index].trigger != "" && data.Action[index].trigger != undefined) { 
							var triggerFound = "<b>Trigger: </b>" + data.Action[index].trigger + "<br>"; 
						} else { var triggerFound = ""; };
						if(data.Action[index].requirements != "" && data.Action[index].requirements != undefined) { 
							var requirementFound = "<b>Requirements: </b>" + data.Action[index].requirements + "<br>"; 
						} else { var requirementFound = ""; };
						if(data.Action[index].critSuccess != "" && data.Action[index].critSuccess != undefined) { 
							var critSuccessFound = "<b>Critical Success: </b>" + data.Action[index].critSuccess + "<br>"; 
						} else { var critSuccessFound = ""; };
						if(data.Action[index].success != "" && data.Action[index].success != undefined) { 
							var successFound = "<b>Success: </b>" + data.Action[index].success + "<br>"; 
						} else { var successFound = ""; };
						if(data.Action[index].failure != "" && data.Action[index].failure != undefined) { 
							var failureFound = "<b>Failure: </b>" + data.Action[index].failure + "<br>"; 
						} else { var failureFound = ""; };
						if(data.Action[index].critFailure != "" && data.Action[index].critFailure != undefined) { 
							var critFailureFound = "<b>Critical Failure: </b>" + data.Action[index].critFailure + "<br>"; 
						} else { var critFailureFound = ""; };

					//actually set the overlay
					$("#overlay").html(function(k, oldHTML){
						return "" + 
						"<div class='overlay-header'><a href='" + data.Action[index].aonlink + "'>" + data.Action[index].name + "</a></div>" +
						"<div class='overlay-page'>p. " + data.Action[index].page + "</div>" +
						"<div class='overlay-body'>" +
							triggerFound +  requirementFound +
							"<br>" + bodyText + "<br>" + 
							critSuccessFound + successFound + failureFound + critFailureFound +
						"</div>"
					});
				}
				else {
					//Entry not found in skillDetails, fill overlay with false detail.
					$("#overlay").html("<h1> Entry not found. </h1>");
				};
			});
		}
		else if (containerName == "ConditionsContainer") {
			//console.log("I haven't actually defined this yet, sorry");
			$.getJSON("./data/conditions.json", function (data){
				var FLindex = 0;
				var keyFound = false;
				var upperBound = Object.keys(data.FullList).length;
				while(keyFound == false && FLindex < upperBound){
					if(data.FullList[FLindex].name.trim() == actionName){
						keyFound = true;
					}
					FLindex++;
				};
				if(keyFound == true) {
					FLindex--;
					//We now have the Condition's position in the FullList array (FLindex).
					var CType = data.FullList[FLindex].type;
					//We now need to find the Condition's entry in the sub-array.
					var index = 0;
					var subkeyFound = false;
					var subUpperBound = Object.keys(data[CType]).length;
					while(subkeyFound == false && index < subUpperBound){
						if(data[CType][index].name.trim() == actionName){
							subkeyFound = true;
						}
						index++;
					};
					if(subkeyFound == true){
						index--;
						//We have the full reference! Populate the overlay.
						var bodyText = "";
						for(var i = 0; i < Object.keys(data[CType][index].text).length; i++){
							bodyText += data[CType][index].text[i] + "<br>";
						}
						//actually set the overlay
						$("#overlay").html(function(k, oldHTML){
							return "" + 
							"<div class='overlay-header'><a href='" + data[CType][index].aonlink + "'>" + data[CType][index].name + "</a></div>" +
							"<div class='overlay-page'>p. " + data[CType][index].page + "</div>" +
							"<div class='overlay-body'>" +
								"<br>" + bodyText + "<br>" + 
							"</div>"
						});
					}
				}						
				else {
					//Entry not found in skillDetails, fill overlay with false detail.
					$("#overlay").html("<h1> Entry not found. </h1>");
				};
			});
		};
	};
}

function hideModalOverlay(){
	console.log("hiding overlay");
	$("#overlay").css("display", "none");
	$("#overlayback").css("display", "none");
}

function hideSections(){
	$(document).ready(function(){
		$('.section-header-container').click(function(){
			console.log("You clicked the collapser for " + this.parentNode.getAttribute("id"));
			//Get the name of the section we're in.
			var parentDiv = this.parentNode.getAttribute("id");
			var showHide = "";
			//Decide which of the grid containers to hide/show based on above
			switch(parentDiv) {
				case "Standard-Actions": showHide = "StandardContainer"; break;
				case "Skill-Actions": showHide = "SkillContainer"; break;
				case "Exploration-Activities": showHide = "ExplorationContainer"; break;
				case "Downtime-Activities": showHide = "DowntimeContainer"; break;
				case "Conditions": showHide = "ConditionsContainer"; break;
			}

			if($("#" + showHide).css("display") == "block") {
				$("#" + showHide).css("display", "none");
			}
			else if($("#" + showHide).css("display") == "none") {
				$("#" + showHide).css("display", "block");
			};

		});
	});
}