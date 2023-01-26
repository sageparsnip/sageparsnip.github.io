$(document).ready(loadJSON());




function consoleTest () {
	console.log("This file was loaded correctly!");
}


function loadJSON(){
	$.getJSON("/data/skills.json", function (data){
		//JSON file loaded to var "data"
		console.log("There are " + Object.keys(data.standardCommon).length + " standard, common skills loaded");
		//Will loop through every element of the "standardCommon" array in the JSON file.
		for(var i = 0; i< Object.keys(data.standardCommon).length; i++){
			$("#StandardCommon").html(function(k, oldHTML){
				//Modify the "StandardCommon" div to reflect the existing data, plus whatever is below.
				return oldHTML + 
				"<div class='item'>" +
					"<div class='item-icon'><img src='icons/" + data.standardCommon[i].action + ".png'><br>" + data.standardCommon[i].subaction + "<br></div>" +
					"<div class='item-header'>" + data.standardCommon[i].name + " <d>" + data.standardCommon[i].subname + "</d></div>" +
					"<div class='item-text'>" + data.standardCommon[i].text + "</div>" +
					"<div class='item-hidden'>" + data.standardCommon[i].type + data.standardCommon[i].subtype + "</div>" + 
				"</div>"
			});
		};

		//"standardUncommon" div creation.
		console.log("There are " + Object.keys(data.standardUncommon).length + " standard, uncommon skills loaded");
		for(var i = 0; i< Object.keys(data.standardUncommon).length; i++){
			$("#standardUncommon").html(function(k, oldHTML){
				//Modify the "standardUncommon" div to reflect the existing data, plus whatever is below.
				return oldHTML + 
				"<div class='item'>" +
					"<div class='item-icon'><img src='icons/" + data.standardUncommon[i].action + ".png'><br>" + data.standardUncommon[i].subaction + "<br></div>" +
					"<div class='item-header'>" + data.standardUncommon[i].name + " <d>" + data.standardUncommon[i].subname + "</d></div>" +
					"<div class='item-text'>" + data.standardUncommon[i].text + "</div>" +
					"<div class='item-hidden'>" + data.standardUncommon[i].type + data.standardUncommon[i].subtype + "</div>" + 
				"</div>"
			});
		};

		//"standardSituational" div creation.
		console.log("There are " + Object.keys(data.StandardSituational).length + " standard, situational skills loaded");
		for(var i = 0; i< Object.keys(data.StandardSituational).length; i++){
			$("#StandardSituational").html(function(k, oldHTML){
				//Modify the "StandardSituational" div to reflect the existing data, plus whatever is below.
				return oldHTML + 
				"<div class='item'>" +
					"<div class='item-icon'><img src='icons/" + data.StandardSituational[i].action + ".png'><br>" + data.StandardSituational[i].subaction + "<br></div>" +
					"<div class='item-header'>" + data.StandardSituational[i].name + " <d>" + data.StandardSituational[i].subname + "</d></div>" +
					"<div class='item-text'>" + data.StandardSituational[i].text + "</div>" +
					"<div class='item-hidden'>" + data.StandardSituational[i].type + data.StandardSituational[i].subtype + "</div>" + 
				"</div>"
			});
		};

		//"SkillActions" div creation.
		console.log("There are " + Object.keys(data.SkillActions).length + " skill actions loaded");
		for(var i = 0; i< Object.keys(data.SkillActions).length; i++){
			$("#SkillActions").html(function(k, oldHTML){
				//Modify the "SkillActions" div to reflect the existing data, plus whatever is below.
				return oldHTML + 
				"<div class='item'>" +
					"<div class='skill-item-icon'><img src='icons/" + data.SkillActions[i].action + ".png'><br><skill>" + data.SkillActions[i].skill + "</skill><br>" + data.SkillActions[i].subaction + "<br></div>" +
					"<div class='item-header'>" + data.SkillActions[i].name + " <d>" + data.SkillActions[i].subname + "</d></div>" +
					"<div class='item-text'>" + data.SkillActions[i].text + "</div>" +
					"<div class='item-hidden'>" + data.SkillActions[i].type + data.SkillActions[i].subtype + "</div>" + 
				"</div>"
			});
		};

		//"ExplorationGeneral" div creation.
		console.log("There are " + Object.keys(data.ExplorationGeneral).length + " general Exploration skills loaded");
		for(var i = 0; i< Object.keys(data.ExplorationGeneral).length; i++){
			$("#ExplorationGeneral").html(function(k, oldHTML){
				//Modify the "ExplorationGeneral" div to reflect the existing data, plus whatever is below.
				return oldHTML + 
				"<div class='item'>" +
					"<div class='item-icon'><img src='icons/" + data.ExplorationGeneral[i].action + ".png'><br>" + data.ExplorationGeneral[i].subaction + "<br></div>" +
					"<div class='item-header'>" + data.ExplorationGeneral[i].name + " <d>" + data.ExplorationGeneral[i].subname + "</d></div>" +
					"<div class='item-text'>" + data.ExplorationGeneral[i].text + "</div>" +
					"<div class='item-hidden'>" + data.ExplorationGeneral[i].type + data.ExplorationGeneral[i].subtype + "</div>" + 
				"</div>"
			});
		};

		//"ExplorationSkill" div creation.
		console.log("There are " + Object.keys(data.ExplorationSkill).length + " general Exploration skills loaded");
		for(var i = 0; i< Object.keys(data.ExplorationSkill).length; i++){
			$("#ExplorationSkill").html(function(k, oldHTML){
				//Modify the "ExplorationSkill" div to reflect the existing data, plus whatever is below.
				return oldHTML + 
				"<div class='item'>" +
					"<div class='skill-item-icon'><img src='icons/" + data.ExplorationSkill[i].action + ".png'><br><skill>" + data.ExplorationSkill[i].skill + "</skill><br>" + data.SkillActions[i].subaction + "<br></div>" +
					"<div class='item-header'>" + data.ExplorationSkill[i].name + " <d>" + data.ExplorationSkill[i].subname + "</d></div>" +
					"<div class='item-text'>" + data.ExplorationSkill[i].text + "</div>" +
					"<div class='item-hidden'>" + data.ExplorationSkill[i].type + data.ExplorationSkill[i].subtype + "</div>" + 
				"</div>"
			});
		};

		//"DowntimeActivities" div creation.
		console.log("There are " + Object.keys(data.DowntimeActivities).length + " general Exploration skills loaded");
		for(var i = 0; i< Object.keys(data.DowntimeActivities).length; i++){
			$("#DowntimeActivities").html(function(k, oldHTML){
				//Modify the "DowntimeActivities" div to reflect the existing data, plus whatever is below.
				return oldHTML + 
				"<div class='item'>" +
					"<div class='skill-item-icon'><img src='icons/" + data.DowntimeActivities[i].action + ".png'><br><skill>" + data.DowntimeActivities[i].skill + "</skill><br>" + data.SkillActions[i].subaction + "<br></div>" +
					"<div class='item-header'>" + data.DowntimeActivities[i].name + " <d>" + data.DowntimeActivities[i].subname + "</d></div>" +
					"<div class='item-text'>" + data.DowntimeActivities[i].text + "</div>" +
					"<div class='item-hidden'>" + data.DowntimeActivities[i].type + data.DowntimeActivities[i].subtype + "</div>" + 
				"</div>"
			});
		};
	});
	hideSections();
}

function openOverlays(){
	$(document).ready(function(){
		$(".item-header").click(function()
		{
			$("#overlay").html("<h1>" + $(this).text() + "</h1>");
			if($("#overlay").css("display") == "none") {
				console.log("showing overlay");
				$("#overlay").css("display", "block");
				$("#overlayback").css("display", "flex");
			};
		});
		$("#overlayback").click(function(){
			console.log("hiding overlay");
			$("#overlay").css("display", "none");
			$("#overlayback").css("display", "none");

		});
	});
}

function hideSections(){
	$(document).ready(function(){
		$('.section-collapse').click(function(){
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