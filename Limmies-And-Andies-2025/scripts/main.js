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
			"honorables":   "Damasyndra, Hershel",
			"nominees":		"<li>Hershel</li><li>Damasyndra</li><li>Mossback</li><li>MR-08</li><li>Tortellini</li><li>Breg</li><li>Jeanette</li><li>Phyll</li><li>Bartleby</li><li>Blayn</li><li>Rixana</li><li>Quoxby</li><li>Jocawinq</li><li>Chryx'fo</li><li>Equox</li>"
		},
		"Favourite NPC - Bob Campaign": {
			"winner":       "Lucian anyr Ostroplex Rhodostephys",
			"winnerImage":  "assets/Lucian.png",
			"runner-up":    "Penne",
			"honorables":   "Scholar, Augustine, Primakera",
			"nominees":		"<li>Augustine</li><li>Penne</li><li>Isione</li><li>Olu</li><li>Scholar</li><li>The Greased Wheel</li><li>Luke</li><li>Lucian</li><li>Primakera</li><li>Molly Renee</li><li>Erik</li>"
		},
		"Best Moment - Bob Campaign": {
			"winner":       "Yartleby's Big Night Out",
			"winnerImage":  "assets/Bartleby At The Gaslight.png",
			"runner-up":    "Damasyndra Resolves Her Childhood Trauma",
			"honorables":   "The Porridge Miracle, Phyll delivering the manifesto, Damasyndra Burns Down Woof",
			"nominees":		"<li>MR-08 Takes A Dip</li><li>Damasyndra Resolves Her Childhood Trauma</li><li>The Porridge Miracle</li><li>Yartleby's Big Night Out</li><li>Baby's First Nervous Breakdown</li><li>Damasyndra Burns Down Woof</li><li>Tortellini Catches Tagliatelle</li><li>Phyll delivering the manifesto</li><li>Carrot Breakfast</li><li>Quoxby Discovers Spicy Mayo</li><li>Tort severs Mr. Wewf's Silver Thread</li>"
		},
		"Worst Decision - Bob Campaign": {
			"winner":       "MR-08 Takes A Dip",
			"winnerImage":  "assets/MR-08-DIP.png",
			"runner-up":    "Hershel climbing any surface",
			"honorables":   "MR-08 takes a loosely phrased Fae deal, Jeanette Kills a turtle and Faces Consequences, MR-08 getting headstomped by a stag and dying",
			"nominees":		"<li>MR-08 Takes A Dip</li><li>Hershel checks if Rixana's name is the same in Draconic</li><li>Jeanette Kills a turtle and Faces Consequences</li><li>Damasyndra's Boat Murder (Maria)</li><li>MR-08 takes a loosely phrased Fae deal</li><li>Pushing Hershel into a room full of chimerae</li><li>MR-08 getting headstomped by a stag and dying</li><li>Hershel climbing any surface</li><li>Tortellini agreeing to ask permission to do violence</li>"
		},
		"Favourite RP - Bob Campaign": {
			"winner":       "Damasyndra & Paiste 4Eva",
			"winnerImage":  "assets/Dama + Paiste.png",
			"runner-up":    "Damasyndra must be Tortellini for at least 5 minutes",
			"honorables":   "Puzzler's Draconic Naming Ceremony, Breg being a handyman to sneak into Peacekeeper's Office",
			"nominees":		"<li>Damasyndra & Páiste 4Eva</li><li>Damasyndra must be Tortellini for at least 5 minutes</li><li>The Porridge Miracle</li><li>Mr Peacekeeper's Rally</li><li>Breg being a handyman to sneak into Peacekeeper's Office</li><li>Mariachi Panic Attack</li><li>Smashing The Pathetic Boat Wizard's Orb</li><li>Puzzler's Draconic Naming Ceremony</li>"
		},
		"Favourite Encounter - Bob Campaign": {
			"winner":       "Stairway To Heaven",
			"winnerImage":  "assets/Stairway.jpg",
			"runner-up":    "Doppelgangers in the Stairway",
			"honorables":   "TGF Trial, Jocawinq Wewf's Christian Torture Chamber with 100 Rats, Cirque Fight",
			"nominees":		"<li>TGF Trial</li><li>Forest Maze</li><li>Vila Forest</li><li>Stairway To Heaven</li><li>The Woof Dossier</li><li>Cirque Fight</li><li>Uno's Dreamscape</li><li>Stop! That! Boat!</li><li>Doppelgangers in the Stairway</li><li>Jocawinq Wewf's Christian Torture Chamber with 100 Rats</li><li>Chimaera Encounter</li>"
		},
		"Favourite PC - Chance Campaign": {
			"winner":       "Kim Keeper",
			"winnerImage":  "assets/Kim Keeper.png",
			"runner-up":    "Sweel & Strychnine",
			"honorables":   "Leucite, Arvek",
			"nominees":		"<li>Kim</li><li>Nine</li><li>Sweel</li><li>NINA</li><li>Leucite</li><li>Bastien</li><li>Arvek</li><li>Wolf</li><li>Stanley</li>"
		},
		"Favourite NPC - Chance Campaign": {
			"winner":       "Dieudonnee",
			"winnerImage":  "assets/Dieudonnee-Portrait.png",
			"runner-up":    "Medo & Tristram Gornemant III",
			"honorables":   "Estell, Trahan, Iona",
			"nominees":		"<li>Tristram Gornemant IV (The Boy)</li><li>Estell</li><li>Dieudonnée</li><li>Iona</li><li>Trahan</li><li>Rowan</li><li>Medo</li><li>Lady Islay Charteris</li><li>Rainier</li>"
		},
		"Best Moment - Chance Campaign": {
			"winner":       "Reawakening of Magic",
			"winnerImage":  "assets/evolution.jpg",
			"runner-up":    "Kim & Nine have cuddles",
			"honorables":   "NINA speaks with Shou Tucker",
			"nominees":		"<li>Reawakening of Magic</li><li>Visions of Magic</li><li>Visions of the Blight</li><li>Nine takes down their plaque</li><li>Kim & Nine have cuddles</li><li>NINA punches an actual, literal shark</li><li>Leucite confronts her brother</li><li>Orthoclase is craven</li><li>NINA speaks with Shou Tucker</li><li>Bastien dives for the cool rocks</li>"
		},
		"Worst Decision - Chance Campaign": {
			"winner":       "Sendings to Trahan",
			"winnerImage":  "assets/Sendings To Trahan.png",
			"runner-up":    "Kim Is Firing Her Gun Indoors",
			"honorables":   "Sweel trapping a snake in a fuckin' barrel, Nine's Around The Forest Tour",
			"nominees":		"<li>Kim Is Firing Her Gun Indoors</li><li>Nine's Around The Forest Tour</li><li>Sendings to Trahan</li><li>Sweel trapping a snake in a fuckin' barrel</li><li>NINA decides to punch a shark to death</li><li>Not unal*ving Wolf on sight</li><li>Every decision Laura has made for Wolf</li><li>Nine wandering out into the forest alone</li><li>NINA speaks with Shou Tucker</li>"
		},
		"Favourite RP - Chance Campaign": {
			"winner":       "Kim and Nine bully a 17-year old mayor",
			"winnerImage":  "assets/Bullying.png",
			"runner-up":    "Should We Awaken Magic?",
			"honorables":   "Trahan on the Road, Shou Tucker's No Good, Very Bad, Awful Afternoon",
			"nominees":		"<li>Should We Awaken Magic?</li><li>Trahan on the Road</li><li>The Trial of Fassite Aeducan</li><li>Shou Tucker's No Good, Very Bad, Awful Afternoon</li><li>Bastien dives for a cool rock</li><li>Kim and Nine bully a 17-year old mayor</li><li>Every time Kim and Nine bickered</li><li>The Connomor Conversation</li>"
		},
		"Favourite Encounter - Chance Campaign": {
			"winner":       "Big Scary Lady/Puppet/Dragon & The Deep Roads",
			"winnerImage":  "assets/deep roads.png",
			"runner-up":    "The Lyrium Cave",
			"honorables":   "Medo intro encounter, The Mayor's Diary ",
			"nominees":		"<li>The Deep Roads</li><li>Sweel fighting Sir Hawthorne</li><li>Rowan intro encounter</li><li>Medo intro encounter</li><li>Big Scary Lady/Puppet/Dragon</li><li>The Lyrium Cave</li><li>The Mayor's Diary</li>"
		},
		"The Jocawinq Wewf Memorial Award": {
			"winner":       "Jocawinq Hunts The Cyranos",
			"winnerImage":  "assets/Jocawinq Conspiracy Board.png",
			"runner-up":    "Niall's Gift of Good Egg To Tortellini",
			"honorables":   "Tortellini fully shitting himself in the torture chamber, Laura and Chance make a whole spreadsheet of ways to torture their friends",
			"nominees":		"<li>Jocawinq Hunts The Cyranos</li><li>Mossback Being Hershel's Kid</li><li>Niall's Gift of Good Egg To Tortellini</li><li>Laura and Chance make a whole spreadsheet of ways to torture their friends</li><li>Kim's many microaggressions</li><li>Jeanette knowling killing a turtle and not apologising</li><li>Tortellini fully shitting himself in the torture chamber</li>"
		},
		"The Blayn Brightcloak Award for Excellence in Strategy": {
			"winner":       "Damasyndra's Wall Of Force in Wewf's Christian Torture Chamber",
			"winnerImage":  "assets/Wall of Force.png",
			"runner-up":    "MR-08's entire character build",
			"honorables":   "Bartleby beats the hedgehogs by... shutting the door, Tortellini tanks the Peacekeeper fight",
			"nominees":		"<li>Damasyndra's Wall Of Force in Wewf's Christian Torture Chamber</li><li>MR-08's entire character build</li><li>Tortellini entire character build</li><li>Tortellini tanks the Peacekeeper fight</li><li>Damasyndra diverting heat-seeking missiles</li><li>Hershel and Breg sneak through the Uni</li><li>The Bowls Tournament</li><li>Bone Stealing!</li><li>Bartleby beats the hedgehogs by... shutting the door.</li><li>Tort severs Mr. Wewf's Silver Thread</li>"
		},
		"The Halia Thornton Award for Dastardly Devils": {
			"winner":       "The Peacekeeper",
			"winnerImage":  "assets/The Peacekeeper.png",
			"runner-up":    "Commander Trahan",
			"honorables":   "Wolf Surname, Hilfilma Seheppen",
			"nominees":		"<li>The Peacekeeper</li><li>Commander Trahan</li><li>Wolf Surname</li><li>Hilfilma Seheppen</li><li>The Chantry</li><li>The Blight</li><li>Shou Tucker</li><li>La Bomboncita</li>"
		},
		"The Mayor of Beantown Memorial Award": {
			"winner":       "Emil",
			"winnerImage":  "assets/Emil.png",
			"runner-up":    "Hyacinth",
			"honorables":   "Quipcxy Jox, The Badgers, Wilem",
			"nominees":		"<li>Grackle</li><li>Emil</li><li>Wilem</li><li>Matthias</li><li>Hyacinth</li><li>Fam</li><li>Snakey & Little Lady</li><li>The Badgers</li><li>Quipcxy Jox</li><li>Cadfael</li>"
		},
		"The Cyber Crumbles The Time Wizard": {
			"winner":       "Tony (Head of the Rat Mafia) & La Bomboncita",
			"winnerImage":  "assets/Tony & Bomboncita.png",
			"runner-up":    "Lady Islay",
			"honorables":   "Lieutenant Fuk Wot & Tippy,  Shagman 'Shaggy' Tokeman",
			"nominees":		"<li>Lady Islay</li><li>Cormac Seaton Dickens-Yeats</li><li>Tony (Head of the Rat Mafia)</li><li>Lieutenant Fuk Wot & Tippy</li><li>La Bomboncita</li><li>Vunopulo</li><li>Shoresy</li><li>Shagman \"Shaggy\" Tokeman</li><li>El Mimo</li>"
		},
		"The Children's Choice (Cocaine) Award": {
			"winner":       "Good Egg",
			"winnerImage":  "assets/Good Egg.png",
			"runner-up":    "Fabio Wig",
			"honorables":   "The Locket Of Loved Ones, The Stag's Toe",
			"nominees":		"<li>The Stag's Toe</li><li>The Locket Of Loved Ones</li><li>Fabio Wig</li><li>Good Egg</li><li>Tortellini's Slimy Bubbles</li><li>Horse Blinders for Hershel</li><li>The Ode to Iona</li>"
		},
		"Luke's Bread Prize": {
			"winner":       "Quoxby sucking milk out of a carpet",
			"winnerImage":  "assets/Milk Sucking.png",
			"runner-up":    "Bartleby Accidentally Besting Tort in an eating competition",
			"honorables":   "Can Rowan Lay Eggs?, Luke's Horrifying Meat Triumph",
			"nominees":		"<li>Luke's Horrifying Meat Triumph</li><li>Bartleby Accidentally Besting Tort in an eating competition</li><li>Mariachi Breakdown</li><li>Can Rowan Lay Eggs?</li><li>Damasyndra takes Puzzler to the café</li><li>The party tricks Kim into eating dinner</li><li>Quoxby sucking milk out of a carpet</li><li>Tort forcing MR-08 to be healed by eating a Good Egg</li>"
		},
		"Cowabummer": {
			"winner":       "Hershel the 16-year old prostitute",
			"winnerImage":  "assets/Hershel-Prostitute.png",
			"runner-up":    "The Tortles have been feebleminded & Jeanette, in general",
			"honorables":   "Lucian is crying behind the door",
			"nominees":		"<li>Ah! Hershel's leg! It's caught in a bear trap!</li><li>Lucian is crying behind the door</li><li>Roarer at the gallows</li><li>Molly Renee is still alive</li><li>The Tortles have been feebleminded</li><li>Sweel's family tolerates him at best</li><li>Jeanette, in general</li><li>Hershel the 16-year old prostitute</li><li>Lucian / Hershel childhood trauma dump</li>"
		},
		"Paiste's Favourite": {
			"winner":       "Puzzler",
			"winnerImage":  "assets/Hilda.png",
			"runner-up":    "Luke & The Boy",
			"honorables":   "Raf, Matthew & Mark",
			"nominees":		"<li>Luke</li><li>Puzzler</li><li>The Boy</li><li>BB</li><li>Matthew & Mark</li><li>Snapdragon</li><li>*Honorable Mention: Raf</li>"
		},
		"Tasha's Hideous Award": {
			"winner":       "Damasyndra casts Wall of Force",
			"winnerImage":  "assets/Wall of Force.png",
			"runner-up":    "Damasyndra Burns Down Woof",
			"honorables":   "Waterwalk to get up the waterfall, Polymorphing Blayn into Big Ape, Hershel's Blink",
			"nominees":		"<li>Damasyndra Burns Down Woof</li><li>Damasyndra casts Wall of Force</li><li>Tortellini keeps the whole party up in the Stairway fight</li><li>Waterwalk to get up the waterfall</li><li>Hershel's Blink</li><li>Hershel talks to god(s)</li><li>Damasyndra's Rumor of Tortle Suffrage</li><li>Nine punching a hole in a guy's chest</li><li>Zero's air-to-punch combo</li><li>Rixana painting through a wall into the fake mayor's house</li><li>Polymorphing Blayn into Big Ape</li>"
		},
		"The \"Cracker\" Award": {
			"winner":       "The Pannetonne King & Shitting eggs and eating them to intimidate",
			"winnerImage":  "assets/Panettone & Eggs.png",
			"runner-up":    "Waving at background characters",
			"honorables":   "Cum Piss Egg Hershel, Getting Hershel's kids to bully him",
			"nominees":		"<li>It's Only Game</li><li>Cum Piss Egg Hershel</li><li>Goat & A Pig</li><li>Precia Molen</li><li>Are You There, God? It's Me, Hershel.</li><li>Waving at background characters</li><li>Using prestidigitation to make people soil themselves</li><li>Getting Hershel's kids to bully him</li><li>Shitting eggs and eating them to intimidate</li><li>Whisky Chair</li><li>The Pannetonne King</li><li>Kiss Gritty Please!</li><li>Nakeding The Magnum</li>"
		},
		"Sometimes It's Sad Too": {
			"winner":       "Damasyndra Says Goodbye To Paiste",
			"winnerImage":  "assets/Dama + Paiste.png",
			"runner-up":    "Phyll Can't Save You, Jeanette",
			"honorables":   "Who paid the rent, Lucian?, Mossback Says Goodbye",
			"nominees":		"<li>Damasyndra Says Goodbye To Páiste</li><li>Nine reclaims their death slate</li><li>Isione Needs Some Time</li><li>Phyll Can't Save You, Jeanette</li><li>You've Gone Soft, Molly.</li><li>MR-08 Dead</li><li>Triton's revival</li><li>Mossback Says Goodbye</li><li>Ostroplex has left Lucian</li><li>Who paid the rent, Lucian?</li><li>Tortellini dying for his family in Visions</li>"
		},
		"I'm Telling Iona!": {
			"winner":       "Tortellini vs Jeanette/MR-08 (and Damasyndra)",
			"winnerImage":  "assets/Tort vs Jean-08.png",
			"runner-up":    "Hershel vs Bartleby vs Teapot",
			"honorables":   "Kim is shooting at Nine, Leucite will cave Kim's skull clean in",
			"nominees":		"<li>Kim is snooping in bags</li><li>Kim is shooting at Nine</li><li>NINA is shooting at Sweel</li><li>Leucite will cave Kim's skull clean in</li><li>Tortellini vs Jeanette/MR-08</li><li>and Damasyndra</li><li>Phyll vs Aurelie & Hyacinth</li><li>Hershel vs Bartleby vs Teapot</li><li>Estell Wants To Meet His Father Figure</li>"
		},
		"Best Quote (IC)": {
			"winner":       "\"One last thing - watch out for the mind goblins...\" - Squeezy <br>\"Mind goblins?\" Everyone else <br>\"Mind goblin these nuts!!\" - the final words of Eqoux Squueze",
			"winnerImage":  "assets/Mind Goblins.webp",
			"runner-up":    "\"Why don't you cast Shield, Wizard Boy???\" - Jeanette",
			"honorables":   "\"Bartleby, come get in my hole!\" - Phyll",
			"nominees":		"<li>\"Why don't you cast Shield, Wizard Boy???\" - Jeanette</li><li>\"Secrets don't make friends!\" - Tortellini</li><li>\"Family Photo\" - Tortellini</li><li>\"One last thing - watch out for the mind goblins...\" - Squeezy\"Mind goblins?\" Everyone else\"Mind goblin these nuts!!\" - the final words of Eqoux Squueze</li><li>\"We are teammates. We have to be team, or we are just idiots walking together.\" - Arvek</li><li>\"Bartleby, come get in my hole!\" - Phyll</li><li>\"When did you read the schematic?' - Milly\"I am the schematic\" - Mr.08</li><li>\"Yeah... so, does he have a skin condition, or..?\" - Wolf</li><li>\"Absolute, I do not like childer - Sweel, Sweel, come here, listen to me\" - Arvek, talking to a genocidalist</li><li>\"You just hit it, it goes BWAA\" - Sweel, explaining the electric guitar</li><li>\"I'm an aboma-great-ion. Thanks Nine!\" - NINA\"Is that your preferred term?\" - Rowen\"No. Big Doggie.\" - NINA</li><li>\"In a functioning group there should be no need for secrets-\" - Aurelie\"Ohhhh buddy, we're far from functioning\" - MR-08</li>"
		},
		"Best Quote (OoC)": {
			"winner":       "\"Our brains may be blenders but there's a lot of soup in there\" - Bob the Philosopher",
			"winnerImage":  "assets/blender.gif",
			"runner-up":    "\"I'm not saying I would have stopped it [9/11], but it would have gone differently\" - Bob",
			"honorables":   "\"Men shouldn't be in the workforce - and you can quote me on that\" - Laura",
			"nominees":		"<li>\"I'm not saying I would have stopped it [9/11], but it would have gone differently\" - Bob</li><li>\"Why you have to be mad, It's only game!\" - Dave</li><li>\"In the first combat, we need to make sure Hershel gets downed so I can shit in his mouth\" - Dave</li><li>\"you never got gum fucked?\" - Niall</li><li>\"you can raw dog an anus\" - Bob</li><li>\"I'm right. I don't want to be right. But I'm right.\" - Fleece again</li><li>\"no one is incorporating baked beans into a stir fry and I think that's a missed opportunity\" - Bob</li><li>\"Friendship is forever, marriage is just til divorce\" - Alison</li><li>\"Men shouldn't be in the workforce - and you can quote me on that\" - Laura</li><li>\"Phyll enters the Hole\" - Laura, recapping</li><li>\"She Phyll's the hole\" - Chance (a genius)</li><li>\"Purple Circle Hershel is the most emotionally-rounded he's ever been\" - Andrew</li><li>\"Our brains may be blenders but there's a lot of soup in there\" - Bob the Philosopher</li><li>\"The new update is... Kinda gangster, not gonna lie\" Sam re: Stardew Valley</li><li>\"Does anyone die in Camp Rock 2?\" - Bob (they hadn't seen it in a while)</li>"
		},
		"Wildest Choice": {
			"winner":       "Dave handing a decapitated head to an actively breaking down Damasyndra",
			"winnerImage":  "assets/Tort gives head to Dama.png",
			"runner-up":    "Cirque Du Baril",
			"honorables":   "Quoxby's carpet sucking extravaganza, Fae Deals for all",
			"nominees": 	"<li>Dave handing a decapitated head to an actively breaking down Damasyndra</li><li>Kim firing off a quick catapult in the Arlessa's chambers</li><li>MR-08 attempting to incite a race war in New Limnsworth</li><li>Cirque Du Baril</li><li>\"Bob making my brother a horse\" - Dave</li><li>Fae Deals for all</li><li>Quoxby's carpet sucking extravaganza</li><li>Hershel ends 2 promising boulling careers for no reason</li>"
		}
	};
	console.log(awardContents);
	console.log(awardContents[selected]);

	//Need to set up a switch statement depending on the award clicked; from that, get Winner, Runner Up, and 

	modalContent.innerHTML = `<h4>Winner:</h4><p class='awardText' onclick='revealWinner(this)'>${awardContents[selected]["winner"]}</p>
							  <img src='${awardContents[selected]["winnerImage"]}' id='winnerImage' style='display:none; max-width:inherit'>
							  <h4>Runner-Up:</h4><p class='awardText' onclick='revealText(this)'>${awardContents[selected]["runner-up"]}</p>
							  <h4>Honorable Mentions:</h4><p class='awardText' onclick='revealText(this)'>${awardContents[selected]["honorables"]}</p>
							  <h4>Nominees:</h4><ul>${awardContents[selected]["nominees"]}</ul>`;
	modal.style.display = "block";
}

function revealWinner(p){
	p.style.backgroundColor = 'BLACK';
	document.getElementById('winnerImage').style.display = 'block';
}

function revealText(p){
	p.style.backgroundColor = 'BLACK';
}