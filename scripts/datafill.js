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
	});
	openOverlays();
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