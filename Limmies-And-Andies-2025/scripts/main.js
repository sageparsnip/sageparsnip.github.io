document.addEventListener("DOMContentLoaded", () => { //JS On-Ready! Fire start-up commands here.
	//Put in what I need to do on loading page here!
	ShowPasswordInput();
});

function ShowPasswordInput(){
	var modal = document.getElementById("diceRollPopup");
	var modalHeader = document.getElementById("diceRollPopupHeader");
	var modalContent = document.getElementById("diceRollPopupContent");
	var mainPageContent = document.getElementById("mainPageContent");
	mainPageContent.style.display = 'none';
	modalHeader.innerHTML = 'Input password to show page';
	modalContent.innerHTML = `
		<input type="text"></input><button onclick="CheckPass(this)">Confirm</button>
	`;
	modal.style.display = "block";
}

function CheckPass(div){
	var pass = div.parentNode.childNodes[1].value;
	if(pass === 'ItsOnlyGame'){
		var mainPageContent = document.getElementById("mainPageContent");
		mainPageContent.style.display = 'block';
		hideModal();
	}
	else{
		div.parentNode.childNodes[1].value = 'Incorrect!';
	}
}

function hideModal() {
	var modal = document.getElementById("diceRollPopup");
	modal.style.display = "none";
}

function retrieveWinner(div){
	//console.log(div.childNodes[0].textContent);
	var selected = div.childNodes[0].textContent;
	div.childNodes[0].style.textDecoration = "line-through";
	div.childNodes[0].style.textDecorationThickness = "35%";
	var modal = document.getElementById("diceRollPopup");
	var modalHeader = document.getElementById("diceRollPopupHeader");
	var modalContent = document.getElementById("diceRollPopupContent");
	modalHeader.innerHTML = selected;
	var awardContents = {
		"Favourite PC - Bob Campaign": {
			"winner":       "Tortellini Il Macellio",
			"winnerImage":  "assets/Tortellini.png",
			"runner-up":    "MR-08",
			"honorables":   "Damasyndra, Hershel"
		},
		"Favourite NPC - Bob Campaign": {
			"winner":       "Lucian anyr Ostroplex Rhodostephys",
			"winnerImage":  "assets/Lucian.png",
			"runner-up":    "Penne",
			"honorables":   "Scholar, Augustine, Primakera"
		},
		"Best Moment - Bob Campaign": {
			"winner":       "Yartleby's Big Night Out",
			"winnerImage":  "assets/Bartleby At The Gaslight.png",
			"runner-up":    "Damasyndra Resolves Her Childhood Trauma",
			"honorables":   "The Porridge Miracle, Phyll delivering the manifesto, Damasyndra Burns Down Woof"
		},
		"Worst Decision - Bob Campaign": {
			"winner":       "MR-08 Takes A Dip",
			"winnerImage":  "assets/MR-08-DIP.png",
			"runner-up":    "Hershel climbing any surface",
			"honorables":   "MR-08 takes a loosely phrased Fae deal, Jeanette Kills a turtle and Faces Consequences, MR-08 getting headstomped by a stag and dying"
		},
		"Favourite RP - Bob Campaign": {
			"winner":       "Damasyndra & Paiste 4Eva",
			"winnerImage":  "assets/Dama + Paiste.png",
			"runner-up":    "Damasyndra must be Tortellini for at least 5 minutes",
			"honorables":   "Puzzler's Draconic Naming Ceremony, Breg being a handyman to sneak into Peacekeeper's Office"
		},
		"Favourite Encounter - Bob Campaign": {
			"winner":       "Stairway To Heaven",
			"winnerImage":  "assets/Stairway.jpg",
			"runner-up":    "Doppelgangers in the Stairway",
			"honorables":   "TGF Trial, Jocawinq Wewf's Christian Torture Chamber with 100 Rats, Cirque Fight"
		},
		"Favourite PC - Chance Campaign": {
			"winner":       "Kim Keeper",
			"winnerImage":  "assets/Kim Keeper.png",
			"runner-up":    "Sweel & Strychnine",
			"honorables":   "Leucite, Arvek"
		},
		"Favourite NPC - Chance Campaign": {
			"winner":       "Dieudonnée",
			"winnerImage":  "assets/Dieudonnee-Portrait.png",
			"runner-up":    "Medo & Tristram Gornemant III",
			"honorables":   "Estell, Trahan, Iona"
		},
		"Best Moment - Chance Campaign": {
			"winner":       "Reawakening of Magic",
			"winnerImage":  "assets/evolution.jpg",
			"runner-up":    "Kim & Nine have cuddles",
			"honorables":   "NINA speaks with Shou Tucker"
		},
		"Worst Decision - Chance Campaign": {
			"winner":       "Sendings to Trahan",
			"winnerImage":  "assets/Sendings To Trahan.png",
			"runner-up":    "Kim Is Firing Her Gun Indoors",
			"honorables":   "Sweel trapping a snake in a fuckin' barrel, Nine's Around The Forest Tour"
		},
		"Favourite RP - Chance Campaign": {
			"winner":       "Kim and Nine bully a 17-year old mayor",
			"winnerImage":  "assets/Bullying.png",
			"runner-up":    "Should We Awaken Magic?",
			"honorables":   "Trahan on the Road, Shou Tucker's No Good, Very Bad, Awful Afternoon"
		},
		"Favourite Encounter - Chance Campaign": {
			"winner":       "Big Scary Lady/Puppet/Dragon & The Deep Roads",
			"winnerImage":  "assets/deep roads.png",
			"runner-up":    "The Lyrium Cave",
			"honorables":   "Medo intro encounter, The Mayor's Diary "
		},
		"The Jocawinq Wewf Memorial Award": {
			"winner":       "Jocawinq Hunts The Cyranos",
			"winnerImage":  "assets/Jocawinq Conspiracy Board.png",
			"runner-up":    "Niall's Gift of Good Egg To Tortellini",
			"honorables":   "Tortellini fully shitting himself in the torture chamber, Laura and Chance make a whole spreadsheet of ways to torture their friends"
		},
		"The Blayn Brightcloak Award for Excellence in Strategy": {
			"winner":       "Damasyndra's Wall Of Force in Wewf's Christian Torture Chamber",
			"winnerImage":  "assets/Wall of Force.png",
			"runner-up":    "MR-08's entire character build",
			"honorables":   "Bartleby beats the hedgehogs by... shutting the door, Tortellini tanks the Peacekeeper fight"
		},
		"The Halia Thornton Award for Dastardly Devils": {
			"winner":       "The Peacekeeper",
			"winnerImage":  "assets/The Peacekeeper.png",
			"runner-up":    "Commander Trahan",
			"honorables":   "Wolf Surname, Hilfilma Seheppen"
		},
		"The Mayor of Beantown Memorial Award": {
			"winner":       "Emil",
			"winnerImage":  "assets/Emil.png",
			"runner-up":    "Hyacinth",
			"honorables":   "Quipcxy Jox, The Badgers, Wilem"
		},
		"The Cyber Crumbles The Time Wizard": {
			"winner":       "Tony (Head of the Rat Mafia) & La Bomboncita",
			"winnerImage":  "assets/Tony & Bomboncita.png",
			"runner-up":    "Lady Islay",
			"honorables":   "Lieutenant Fuk Wot & Tippy,  Shagman 'Shaggy' Tokeman"
		},
		"The Children's Choice (Cocaine) Award": {
			"winner":       "Good Egg",
			"winnerImage":  "assets/Good Egg.png",
			"runner-up":    "Fabio Wig",
			"honorables":   "The Locket Of Loved Ones, The Stag's Toe"
		},
		"Luke's Bread Prize": {
			"winner":       "Quoxby sucking milk out of a carpet",
			"winnerImage":  "assets/Milk Sucking.png",
			"runner-up":    "Bartleby Accidentally Besting Tort in an eating competition",
			"honorables":   "Can Rowan Lay Eggs?, Luke's Horrifying Meat Triumph"
		},
		"Cowabummer": {
			"winner":       "Hershel the 16-year old prostitute",
			"winnerImage":  "assets/Hershel-Prostitute.png",
			"runner-up":    "The Tortles have been feebleminded & Jeanette, in general",
			"honorables":   "Lucian is crying behind the door"
		},
		"Paiste's Favourite": {
			"winner":       "Puzzler",
			"winnerImage":  "assets/Hilda.png",
			"runner-up":    "Luke & The Boy",
			"honorables":   "Raf, Matthew & Mark"
		},
		"Tasha's Hideous Award": {
			"winner":       "Damasyndra casts Wall of Force",
			"winnerImage":  "assets/Wall of Force.png",
			"runner-up":    "Damasyndra Burns Down Woof",
			"honorables":   "Waterwalk to get up the waterfall, Polymorphing Blayn into Big Ape, Hershel's Blink"
		},
		"The \"Cracker\" Award": {
			"winner":       "The Pannetonne King & Shitting eggs and eating them to intimidate",
			"winnerImage":  "assets/Panettone & Eggs.png",
			"runner-up":    "Waving at background characters",
			"honorables":   "Cum Piss Egg Hershel, Getting Hershel's kids to bully him"
		},
		"Sometimes It's Sad Too": {
			"winner":       "Damasyndra Says Goodbye To Paiste",
			"winnerImage":  "assets/Dama + Paiste.png",
			"runner-up":    "Phyll Can't Save You, Jeanette",
			"honorables":   "Who paid the rent, Lucian?, Mossback Says Goodbye"
		},
		"I'm Telling Iona!": {
			"winner":       "Tortellini vs Jeanette/MR-08 (and Damasyndra)",
			"winnerImage":  "assets/Tort vs Jean-08.png",
			"runner-up":    "Hershel vs Bartleby vs Teapot",
			"honorables":   "Kim is shooting at Nine, Leucite will cave Kim's skull clean in"
		},
		"Best Quote (IC)": {
			"winner":       "\"One last thing - watch out for the mind goblins...\" - Squeezy <br>\"Mind goblins?\" Everyone else <br>\"Mind goblin these nuts!!\" - the final words of Eqoux Squueze",
			"winnerImage":  "assets/Mind Goblins.webp",
			"runner-up":    "\"Why don't you cast Shield, Wizard Boy???\" - Jeanette",
			"honorables":   "\"Bartleby, come get in my hole!\" - Phyll"
		},
		"Best Quote (OoC)": {
			"winner":       "\"Our brains may be blenders but there's a lot of soup in there\" - Bob the Philosopher",
			"winnerImage":  "assets/blender.gif",
			"runner-up":    "\"I'm not saying I would have stopped it [9/11], but it would have gone differently\" - Bob",
			"honorables":   "\"Men shouldn't be in the workforce - and you can quote me on that\" - Laura"
		},
		"Wildest Choice": {
			"winner":       "Dave handing a decapitated head to an actively breaking down Damasyndra",
			"winnerImage":  "assets/Tort gives head to Dama.png",
			"runner-up":    "Cirque Du Baril",
			"honorables":   "Quoxby's carpet sucking extravaganza, Fae Deals for all"
		}
	};
	console.log(awardContents);
	console.log(awardContents[selected]);

	//Need to set up a switch statement depending on the award clicked; from that, get Winner, Runner Up, and 

	modalContent.innerHTML = `<h4>Winner:</h4><p class='awardText' onclick='revealWinner(this)'>${awardContents[selected]["winner"]}</p>
							  <img src='${awardContents[selected]["winnerImage"]}' id='winnerImage' style='display:none; max-width:inherit'>
							  <h4>Runner-Up:</h4><p class='awardText' onclick='revealText(this)'>${awardContents[selected]["runner-up"]}</p>
							  <h4>Honorable Mentions:</h4><p class='awardText' onclick='revealText(this)'>${awardContents[selected]["honorables"]}</p>`;
	modal.style.display = "block";
}

function revealWinner(p){
	p.style.backgroundColor = 'BLACK';
	document.getElementById('winnerImage').style.display = 'block';
}

function revealText(p){
	p.style.backgroundColor = 'BLACK';
}