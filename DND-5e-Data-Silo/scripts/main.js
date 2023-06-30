function onLoadJSON(){
	const characterInput = document.getElementById("characterInput");
	const monsterInput = document.getElementById("monsterInput");
	const encounterInput = document.getElementById("encounterInput");
	const itemInput = document.getElementById("itemInput");
	const spellInput = document.getElementById("spellInput");

	characterInput.addEventListener("change", function () {
		const file = characterInput.files[0];
  		const reader = new FileReader();
  		reader.addEventListener("load", function () {
   			const data = JSON.parse(reader.result);
    		localStorage.setItem("characterData", JSON.stringify(data));
  		});
  		reader.readAsText(file);
	});
	monsterInput.addEventListener("change", function () {
		const file = monsterInput.files[0];
  		const reader = new FileReader();
  		reader.addEventListener("load", function () {
   			const data = JSON.parse(reader.result);
    		localStorage.setItem("monsterData", JSON.stringify(data));
  		});
  		reader.readAsText(file);
	});
	encounterInput.addEventListener("change", function () {
		const file = encounterInput.files[0];
  		const reader = new FileReader();
  		reader.addEventListener("load", function () {
   			const data = JSON.parse(reader.result);
    		localStorage.setItem("encounterData", JSON.stringify(data));
  		});
  		reader.readAsText(file);
	});
	itemInput.addEventListener("change", function () {
		const file = itemInput.files[0];
  		const reader = new FileReader();
  		reader.addEventListener("load", function () {
   			const data = JSON.parse(reader.result);
    		localStorage.setItem("itemData", JSON.stringify(data));
  		});
  		reader.readAsText(file);
	});
	spellInput.addEventListener("change", function () {
		const file = spellInput.files[0];
  		const reader = new FileReader();
  		reader.addEventListener("load", function () {
   			const data = JSON.parse(reader.result);
    		localStorage.setItem("spellData", JSON.stringify(data));
  		});
  		reader.readAsText(file);
	});
}

function interrogateJSON() {
	characterData = JSON.parse(localStorage.getItem("characterData"));
	console.log(characterData["characters"]);
	for(let i = 0; i < characterData["characters"].length; i++){
		console.log("Character name at position " + i + ": " + characterData["characters"][i]["Name"]);
	}
}

document.addEventListener("DOMContentLoaded", () => { //JS On-Ready! Fire start-up commands here.
	showHomePage();
	onLoadJSON();
});

function exportJSON(dataType) {
	const jsonString = localStorage.getItem(dataType);
	const outputObject = new Blob([jsonString], { type: 'application/json'});
	const download = document.createElement('a');
	download.href = URL.createObjectURL(outputObject);
	download.download = `DND5eDataSilo - ${dataType}.json`;
	document.body.appendChild(download);
	download.click();
	console.log(dataType + ".JSON download initiated");
}

function hideModal() {
	var modal = document.getElementById("diceRollPopup");
	modal.style.display = "none";
}

function getStatMod(modScore){
    if(modScore >= 10){
        return Math.floor((modScore - 10) / 2);          //Anything 10 or above has a neutral/positive modifier.
    } else{
        return (Math.ceil((10 - modScore) / 2) * -1);    //Anything 9 or below has a negative modifier.
    }
}

function getStatFromSkill(Skill){
	switch(Skill){
        case "Acrobatics": 
            return("DEX");
        case "Animal Handling": 
            return("WIS");
        case "Arcana": 
            return("INT");
        case "Athletics": 
            return("STR");
        case "Deception": 
            return("CHA"); 
        case "History": 
            return("INT"); 
        case "Insight": 
            return("WIS"); 
        case "Intimidation": 
            return("CHA"); 
        case "Investigation": 
            return("INT"); 
        case "Medicine": 
            return("WIS"); 
        case "Nature": 
            return("INT"); 
        case "Perception": 
            return("WIS"); 
        case "Performance": 
            return("CHA"); 
        case "Persuasion": 
            return("CHA"); 
        case "Religion": 
            return("INT"); 
        case "Sleight Of Hand": 
            return("DEX"); 
        case "Stealth": 
            return("DEX"); 
        case "Survival": 
            return("WIS"); 
    }
}