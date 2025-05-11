$(document).ready(loadJSON());




function consoleTest () {
	console.log("This file was loaded correctly!");
}

function fillSection(divName, data){
	var divContent = '';
	console.log(data.length);
	for(let i=0;i<data.length;i++){
		let play = data[i];
		console.log("Adding content for " + data[i]["name"]);
		divContent += `<hr>
		<div class="row d-flex">
			<div class="col"><a href="${play["link"]}"><b>${play["name"]}</b></a></div>
			<div class="col" style="text-align:right">${data[i]["playwright"]}</div>
		</div>
		<div class="row" style="text-align:center">
			<div class="col"><b>Runtime: </b>${play["length"]}</div>
			<div class="col"><b>M: </b>${play["actorsM"]}</div>
			<div class="col"><b>F: </b>${play["actorsF"]}</div>
			<div class="col"><b>U: </b>${play["actorsU"]}</div>
		</div>
		<div class="row">
			<div style="max-width: 60%; margin:auto">${play["notes"]}</div>
		</div>
		`;
	}
	console.log("Putting following divContent into #" + divName);
	console.log(divContent);
	$("#" + divName).html(divContent);
}

function loadJSON(){
	var oneActComedies = [];
	var oneActDramas = [];
	var fullSlotComedies = [];
	var fullSlotDramas = [];
	var others = [];
	$.getJSON("./data/plays.json?foo=" + new Date().getSeconds, function (data){
		//JSON file loaded to var "data"
		//First, iterate through and fill the arrays with their respective plays
		data["plays"].forEach(play => {
			switch(play["category"]) {
				case "One Act Comedy"   : oneActComedies.push(play)   ; break;
				case "One Act Drama"    : oneActDramas.push(play)     ; break;
				case "Full Slot Comedy" : fullSlotComedies.push(play) ; break;
				case "Full Slot Drama"  : fullSlotDramas.push(play)   ; break;
				default                 : others.push(play)           ; break;
			}
			console.log(oneActComedies);
		});	
		//Now each array has been filled with its respective plays. Display them in their containers.
		fillSection("One-Act-Comedies-Container", oneActComedies);
		fillSection("One-Act-Dramas-Container", oneActDramas);
		fillSection("Full-Slot-Comedies-Container", fullSlotComedies);
		fillSection("Full-Slot-Dramas-Container", fullSlotDramas);
		fillSection("Others-Container", others);
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
			var parentDiv = this.parentNode.getAttribute("id");
			console.log("You clicked the collapser for " + parentDiv);
			//Get the name of the section we're in.
			console.log(parentDiv);
			var showHide = "#" + parentDiv + "-Container";

			if($(showHide).css("display") == "block") {
				$(showHide).css("display", "none");
			}
			else if($(showHide).css("display") == "none") {
				$(showHide).css("display", "block");
			};

		});
	});
}