function showCastPage(){
	console.log("Showing Cast Page...");
	$.getJSON("assets/plays.json", function(data) {
		document.getElementById("main-container").innerHTML = `
			<div class="row" id="header-row">
				<div class="col-12" style="text-align: center;">
					<h3 onclick="showMainPage()"><u>Insight Theatre Presents:</u></h3>
					<h2 onclick="showMainPage()">Three One-Act Plays</h2>
				</div>
			</div>
			<div class="row" id="plays-row" style="justify-content:center;padding:1rem">
				
			</div>
		`;
		//Now that plays-row exists, we gather the info from the JSON file in assets.
		let divContent = '<p style="text-align:center">Click on an actor to learn more about them</p>';
		data["plays"].forEach(play =>{
			divContent += `
				<div class="row" style="background-color: ${play["background"]}; border-radius: 12px; max-width: 90%;padding:1vh;">
					<h4 style="text-align:center">${play.title}</h4>
					<br><br>
			`;
			play["cast"].forEach(actor => {
				if(play.title!="Crew"){
					let actorImage = actor["name"].replace(" ", "-") + '.jpg';
					divContent += `
						<div class="col-6" onclick="getActorModal(this)" style="display:grid;place-items:center;text-align:center;">
							<img src="assets\\${actorImage}" style="max-width:100%; max-height: 20vh">
							<b>${actor["name"]}</b>
							<p>as ${actor["role"]}</p>
						</div>
					`;
				}
				else{
					divContent += `
						<div class="col-6" style="display:grid;place-items:center;text-align:center;">
							<b>${actor["name"]}</b>
							<p>as ${actor["role"]}</p>
						</div>
					`;
				}
			});
			if(play.title!="Crew"){
				let directorImage = play["director"].replace(" ", "-") + '.jpg';
				divContent += `
						<div class="col-6" onclick="getActorModal(this)" style="display:grid;place-items:center;text-align:center;">
							<img src="assets\\${directorImage}" style="max-width:100%; max-height: 20vh">
							<b>${play["director"]}</b>
							<p>Director</p>
						</div>
					</div><div class="row" style="height:5vh";"></div>
				`;
			}
			else{
				divContent += `
					</div><div class="row" style="height:5vh";"></div>
				`;
			}
		});

		divContent += '<h4 style="text-align:center" onclick="showThanksPage()">Click here to see our sincere thanks!</h4><br>';
		divContent += '<h4 style="text-align:center" onclick="showMainPage()">Click here to return to the cover page</h4>';
		document.getElementById("plays-row").innerHTML = divContent;
		window.scrollTo(0,0);
	});
}

function getActorModal(clicker){
	$.getJSON("assets/plays.json", function(data) {
		let actorName = clicker.childNodes[3].innerHTML;
		let modalHeader = document.getElementById("infoModalPopupHeader");
		let modalBody  = document.getElementById("infoModalPopupBody");
		//find the actor/director who matches name
		let found = false;
		let play = 0;
		let bio = '';
		while(!found && play<data.plays.length){
			if(data.plays[play].director == actorName){
				//Found the name! It's a director.
				bio = data.plays[play].directorBio;
				found = true;
			}
			else{
				//Not the director - check all the actors
				data.plays[play].cast.forEach(actor => {
					if(actor.name == actorName){
						bio = actor.bio;
						found = true;
					}
				})
			}
			if(!found){
				play++;
			}
		}
		modalHeader.innerHTML = `
			<h5>${actorName}</h5>
		`;
		modalBody.innerHTML = `
			<img src="assets\\${actorName.replace(' ','-')}.jpg" style="max-width:100%">
			<p>${bio}</p>
		`;
		showModal();
	});
	
	//Need to show a modal with the cast member's picture (large) and their bio.
}