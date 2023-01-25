function setStandardSkills() {
	var skills = "";
	//const data = await fetch('/scripts/skills.json');
	var data = "scripts/skills.json";
	//const names = await data.json();
	console.log(names);
	try {
		var skills = JSON.parse(data);
	}
	catch (error) {
		console.log('Error parsing JSON: ', error, skills);
	}
	var StandardSkills = "";
	for (let i = 0; i < skills.length; i++){
		//Found a skill!
		if(skills[i].subtype == "Common") {
			StandardSkills += skills[i].name;
		}
	}

	//Eventually
	document.getElementById("StandardCommon").innerHTML = StandardSkills;
	//alert(StandardSkills);
}

function consoleTest() {
	console.log("Did this import?");
}

