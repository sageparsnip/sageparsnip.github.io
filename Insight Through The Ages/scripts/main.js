
		$('.panel-collapse').on('show.bs.collapse', function () {
		    $(this).siblings('.panel-heading').addClass('active');
		});

		$('.panel-collapse').on('hide.bs.collapse', function () {
		    $(this).siblings('.panel-heading').removeClass('active');
		});

		$(document).ready(function() {
			onLoadNew();
		});

		function addMember(Members, name, year){
			var memberStr = {"name":name,"directorCount":0,"directorShows":[],"castCount":0,"castShows":[],"crewCount":0,"crewShows":[],"firstYear":parseInt(year),"lastYear":1900};
			//var memberJSON = JSON.parse(memberStr);
			Members.push(memberStr);
		}

		async function getStats() {
			// Set up an array of people
			let Members = { "Members": [] };
			console.log("Firing GetStats()!")
			try {
				// Use fetch to get JSON data and wait until it finishes
				const response = await fetch("./data/productions.json?timestamp=" + new Date().getTime());
				const data = await response.json();

				// For each production in data, check director, then all cast, then all crew
				data["productions"].forEach(show => {
					// Look at Crew first, then at each performance for Director and Cast
					show["Crew"].forEach(crew => {
						addCrewStats(show, crew, Members);
					});

					if (show["Length"] != 'Collection') {
						// Not a collection of shows; grab the director and cast
						addDirectorStats(show, Members, show["Year"]);
						console.log(show);
						show["Cast"].forEach(cast => {
							addCastStats(show, cast, Members, show["Year"]);
						});
					} else {
						// Handle collection of shows if needed
						show["Performances"].forEach(oneAct => {
							addDirectorStats(oneAct, Members, show["Year"]);
							console.log(oneAct);
							oneAct["Cast"].forEach(cast => {
								addCastStats(oneAct, cast, Members, show["Year"]);
							});
						});
					}
				});

				//Sort by directorCount
				let directorSorted = [...Members["Members"]].sort((a,b) => b["directorCount"] - a["directorCount"]);
				console.log("Sorted by directorCount:", directorSorted);

				let castSorted = [...Members["Members"]].sort((a,b) => b["castCount"] - a["castCount"]);
				console.log("Sorted by castCount:", castSorted);

				let crewSorted = [...Members["Members"]].sort((a,b) => b["crewCount"] - a["crewCount"]);
				console.log("Sorted by crewCount:", crewSorted);

				let activitySorted = [...Members["Members"]].sort((a,b) => (b["lastYear"] - b["firstYear"]) - (a["lastYear"] - a["firstYear"]));
				console.log("Sorted by activityCount:", activitySorted);

				//With these arrays, fill out the leaderboards
				var boardDiv = $("#leaderboards");
				var leaderStr = '';

				leaderStr += `
				<div class="row">
					<h3 style="text-align:center;">Director's Leaderboard:</h3>
				</div>
				<div class="row" id="directorLeaderboard"></div>
				<div class="row">
					<h3 style="text-align:center;">Actor's Leaderboard:</h3>
				</div>
				<div class="row" id="actorLeaderboard"></div>
				<div class="row">
					<h3 style="text-align:center;">Crew's Leaderboard:</h3>
				</div>
				<div class="row" id="crewLeaderboard"></div>
				<div class="row">
					<h3 style="text-align:center;">Activity Leaderboard:</h3>
				</div>
				<div class="row" id="activityLeaderboard"></div>
				`;
				//console.log(leaderStr);
				//console.log(boardDiv);
				boardDiv.html(leaderStr);
				let directLeaders = '<ol>';
				let castLeaders = '<ol>';
				let crewLeaders = '<ol>';
				let activityLeaders = '<ol>';
				for(let i=0;i<=4;i++){
					directLeaders += `<li style="list-style-position:inside"><strong>${directorSorted[i+1]["name"]}:</strong> ${directorSorted[i+1]["directorCount"]} Productions: <div class="row">`;
					directorSorted[i+1]["directorShows"].forEach(showSpecific => {
						directLeaders += `<div class="col-6 col-md-4 col-lg-3 mb-1">${showSpecific}</div>`;
					});
					directLeaders += `</div></li><hr>`;

					castLeaders += `<li style="list-style-position:inside"><strong>${castSorted[i]["name"]}:</strong> ${castSorted[i]["castCount"]} Productions: <div class="row">`;
					castSorted[i]["castShows"].forEach(showSpecific => {
						castLeaders += `<div class="col-6 col-md-4 col-lg-3 mb-1">${showSpecific}</div>`;
					});
					castLeaders += `</div></li><hr>`;

					crewLeaders += `<li style="list-style-position:inside"><strong>${crewSorted[i]["name"]}:</strong> ${crewSorted[i]["crewCount"]} Productions: <div class="row">`;
					crewSorted[i]["crewShows"].forEach(showSpecific => {
						crewLeaders += `<div class="col-6 col-md-4 col-lg-3 mb-1">${showSpecific}</div>`;
					});
					crewLeaders += `</div></li><hr>`;

					activityLeaders += `<li style="list-style-position:inside"><strong>${activitySorted[i]["name"]}:</strong> ${activitySorted[i]["lastYear"] - activitySorted[i]["firstYear"]} Years (${activitySorted[i]["firstYear"]} to ${activitySorted[i]["lastYear"]})`;
					activityLeaders += `</li><hr>`;
				}

				directLeaders   += `</ol><hr style="border-top:dotted 0.75rem;">`;
				castLeaders     += `</ol><hr style="border-top:dotted 0.75rem;">`;
				crewLeaders     += `</ol><hr style="border-top:dotted 0.75rem;">`;
				activityLeaders += `</ol>`;
				$("#directorLeaderboard").html(directLeaders);
				$("#actorLeaderboard").html(castLeaders);
				$("#crewLeaderboard").html(crewLeaders);
				$("#activityLeaderboard").html(activityLeaders);

			} catch (error) {
				console.error("Error fetching JSON data:", error);
			}
		}


		function addCastStats(show,cast,Members,Year){
			if(!Members["Members"].some(m => m.name === cast["name"])){
				//Member hasn't been seen yet! Add them
				addMember(Members["Members"],cast["name"],Year);
			}
			let memberInJSON = Members["Members"].find(m => m.name === cast["name"]);
			memberInJSON["castCount"]++;
			let role = cast["role"];
			if (cast["role"].length == 0){ role = "Performer";}
			memberInJSON["castShows"].push(`${role} - ${show["Play"]} (${Year})`);
			if(parseInt(Year) > memberInJSON["lastYear"]){
				//This is a more recent year for this member! Update it
				memberInJSON["lastYear"] = parseInt(Year);
			}
		}

		function addDirectorStats(show,Members,Year){
			if(!Members["Members"].some(m => m["name"] === show["Director"])){
				addMember(Members["Members"],show["Director"],Year);
			};
			let memberInJSON = Members["Members"].find(m => m.name === show["Director"]);
			memberInJSON["directorCount"]++;
			memberInJSON["directorShows"].push(`${show["Play"]} (${Year})`);
			if(parseInt(Year) > memberInJSON["lastYear"]){
				//This is a more recent year for this member! Update it
				memberInJSON["lastYear"] = parseInt(Year);
			}
		}

		function addCrewStats(show,crew,Members){
			//For each Crew member:
			//1) Check if they're already in members; if not, add them in
			//2) Increase their crew count by 1
			//3) Record the details in crewShows.
			if(!Members["Members"].some(m => m.name === crew["name"])){
				//Member hasn't been seen yet! Add them
				addMember(Members["Members"],crew["name"],show["Year"]);
			}
			let memberInJSON = Members["Members"].find(m => m.name === crew["name"]);
			memberInJSON["crewCount"]++;
			memberInJSON["crewShows"].push(`${crew["role"]} - ${show["Play"]} (${show["Year"]})`);
			if(parseInt(show["Year"]) > memberInJSON["lastYear"]){
				//This is a more recent year for this member! Update it
				memberInJSON["lastYear"] = parseInt(show["Year"]);
			}
		}

		function onLoadNew(){
			var myDivs = '<img src="assets/ages.png" style="max-width:100%">';
			var year = 1979;
			$.getJSON("./data/productions.json?timestamp=" + new Date().getTime(), function(data) {
				var productions = data["productions"];
				productions.forEach(show => {
					if(show["Year"] > year){
						//New year! Add in the div.
						year = show["Year"];
						myDivs += `
							<div class="row">
								<div class="col">
									<h4 onclick="toggleVis(this)" id="div${year}">${year}</h4><hr>
									<div class="row production-holder d-none" id="${year}Holder">
									</div>
								</div>
							</div>
						`;
					}
				});
				$("#list-wrapper").html(myDivs);
				/**We now have all the years on the page, each in a div labelled yearHolder (e.g. 1981Holder).
				 * We then need to, for each year, add it's productions to the dropdown container.
				 * To achieve this, we need to loop through the productions object again, and just add to whichever holder is appropriate.
				 * Every production should get a nicely formatted bubble that takes up col-6, and has all the relevant info
				 */
				for(let i=0;i<productions.length;i++){
					//Populate the year!
					var holderID = productions[i]["Year"] + 'Holder';
					var productionBubble = '';
					productionBubble += `
					<div>
						<h5>${productions[i]["Play"]}</h5>
					`;
					if(productions[i]["Length"] != "Collection"){
						//Production was a full slot! List out the director and the cast.
						productionBubble += `
						Directed By: <strong>${productions[i]["Director"]}</strong><br>
						Written By: <strong>${productions[i]["Playwright"]}</strong><br>
						<strong>Cast:</strong><br>
						<div class="container"><div class="row">
						`;
						productions[i]["Cast"].forEach(actor =>{
							//For each cast member, insert into the appropriate div.
							productionBubble += addActor(actor);
						});
						if(productions[i]["Crew"].length > 0){
							//We have crew details! Give them a list like Cast
							productionBubble += `
							</div></div><br><strong>Crew:</strong><br>
							<div class="container"><div class="row">
							`;
							productions[i]["Crew"].forEach(actor =>{
							//For each cast member, insert into the appropriate div.
							productionBubble += addActor(actor);
							});
						}
					}
					else if(productions[i]["Length"] == "Collection"){
						//We have a festival to list off! Need to iterate through each performance, putting in the necessary info.
						var performances = productions[i]["Performances"];
						performances.forEach(show => {
							productionBubble += `
								<hr>Performance: <strong>${show["Play"]}</strong><br>
								Directed By: <strong>${show["Director"]}</strong><br>
								Written By: <strong>${show["Playwright"]}</strong><br>
								<strong>Cast:</strong><br>
								<div class="container"><div class="row">
							`;
							show["Cast"].forEach(actor => {
								productionBubble += addActor(actor);
							});
							productionBubble += `</div></div>`; //clear the row div
						});
						//Still need to list the crew! This is an overall
						if(productions[i]["Crew"].length > 0) {
							productionBubble += `
							<br><strong>Crew:</strong><br>
							<div class="container"><div class="row">
							`;
							productions[i]["Crew"].forEach(actor =>{
							//For each cast member, insert into the appropriate div.
							productionBubble += addActor(actor);
							});
						}
					}
					productionBubble += `
						</div></div><br>
						Staged In: <strong>${productions[i]["Location"]}</strong><br>
						`;
					if(productions[i].hasOwnProperty('Comments')){
						productionBubble += `
							Notes: <strong>${productions[i]["Comments"]}</strong><br>
						`;
					}
					productionBubble += `
					</div><br><hr style="border-top:dotted 0.75rem;" />
					`;
					$(`#${holderID}`).append(productionBubble);
					//console.log(productions[i]["Play"]);
				};
			});

			$.getJSON("./data/productions.json?timestamp=" + new Date().getTime(), function(data) {
				// Add a table at the bottom that shows which shows are missing data.
				var productions = data["productions"];
				var divHolder = $("#missing-table");
				var table = `<h2>Plays Missing Details:</h2>
					<ol>
				`;
				productions.forEach(show =>{
					//console.log(show);
					if(show["DetailsComplete"] != 'Yes'){
						table += `<li>${show["Year"]} - ${show["Play"]}: `;
						// More logic can be placed here if I want to list *what* details are missing.
						if(show["Length"] == "Full Slot" && show["Cast"].length < 1) {
							table += `Cast Missing; `
						}
						if(show["Length"] == "Full Slot" && show["Location"] == "") {
							table += `Location Missing; `
						}
						if(show["Length"] == "Full Slot" && show["Director"] == "") {
							table += `Director Missing; `
						}
						table += `</li>`;
					}
				});
				table += '</ol>';
				divHolder.html(table);
			});
			getStats();
		};

		function getMemberStatsFromButton(buttonClick){
			getMemberStats(document.getElementById("memberFinder").value)
		}

		function findPlayFromButton(buttonClick){
			//console.log(buttonClick.parentNode.parentNode.childNodes[3].childNodes[1].value);
			//This function should loop through the productions until it finds one that 
			//matches the input value. On finding it, it should snap the browser view up to 
			//that year and (ideally) open that year's div.
			let searchTerm = document.getElementById("playFinder").value.toUpperCase();
			let yearFound = '0';
			$.getJSON("./data/productions.json?timestamp=" + new Date().getTime(), function(data) {
				data["productions"].forEach(show => {
					if(show["Length"] == 'Full Slot'){
						if(show["Play"].toUpperCase() == searchTerm){
							yearFound = show["Year"];
						}
					}
					else if(show["Length"] == 'Collection'){
						show["Performances"].forEach(subshow => {
							if(subshow["Play"].toUpperCase() == searchTerm){
								yearFound = show["Year"];
							}
						});
					};
				});
				if(yearFound != '0'){
					//alert(yearFound);
					let yearDiv = 'div' + yearFound;
					let isVisible = document.getElementById(yearFound + 'Holder').classList.contains("d-inline");
					if(isVisible == false){
						toggleVis(document.getElementById(yearDiv));
					}
					document.getElementById(yearDiv).scrollIntoView();
				}
				else{
					alert('Play ' + searchTerm + ' not found')
				}
			});

		}

		function getMemberStats(name){
			//Name argument passed is the name of the member to get stats for.
			$.getJSON("./data/productions.json?timestamp=" + new Date().getTime(), function(data) {
				//Need to loop through all productions, marking down whenever this member was an actor, director, or crew.
				var crew = [];
				var director = [];
				var actor = [];
				data["productions"].forEach(show => {
					//First check Crew
					show["Crew"].forEach(crewMember => {
						if(crewMember["name"] == name){
							let crewAdd = {
								"show":show["Play"],
								"role":crewMember["role"]
							};
							crew.push(crewAdd);
						}
					});
					if(show["Length"] != 'Collection'){
						//Full slot play - no need to check for Performances
						if(show["Director"] == name){
							director.push(show["Play"]);
						}
						show["Cast"].forEach(castMember => {
							if(castMember["name"] == name){
								let castAdd = {
									"show":show["Play"],
									"role":castMember["role"]
								};
								actor.push(castAdd);
							}
						})
					}
					else{
						//Collection of One-Acts; delve deeper.
						show["Performances"].forEach(oneAct => {
							if(oneAct["Director"] == name){
								director.push(oneAct["Play"]);
							}
							oneAct["Cast"].forEach(castMember => {
								if(castMember["name"] == name){
									let castAdd = {
										"show":oneAct["Play"],
										"role":castMember["role"]
									};
									actor.push(castAdd);
								}
							})
						})
					}
				});
				//Got all the stats; final var here is whether to route to console or to modal (1 = console, else modal)
				showMemberModal(name, crew, director, actor, 0);
			});
		}

		function showMemberModal(name, crew, director, actor, showConsole){
			if(showConsole == 1){
				console.log('---------------------------------------------------------------');
				console.log('***Stats for ' + name + ' are as follows:');
				if(crew.length > 0){
					console.log('Worked as crew in ' + crew.length + ' shows:');
					crew.forEach(crewShow =>{
						console.log('Worked as ' + (crewShow["role"] || 'Crew') + ' in ' + crewShow["show"]);
					})
				}
				if(director.length > 0){
					console.log('***Directed ' + director.length + ' shows:');
					director.forEach(directShow =>{
						console.log('Directed ' + directShow);
					})
				}
				if(actor.length > 0){
					console.log('***Acted in ' + actor.length + ' shows:');
					actor.forEach(actorShow =>{
						console.log('Acted as ' + (actorShow["role"] || 'Unnamed') + ' in ' + actorShow["show"]);
					})
				}
			}
			else{
				//Showing details in the Modal!
				//Start by putting all the details into the modal, then run showModal()
				var headerDiv  = document.getElementById('modalHeader');
				headerDiv.innerHTML = '';
				var contentDiv = document.getElementById('modalBody');
				contentDiv.innerHTML = '';
				console.log(crew.length)
				if(crew.length == 0 & director.length == 0 & actor.length == 0){
					console.log("Inputted name is not in our database!");
					headerDiv.innerHTML = '<h3>No info found for ' + name + '</h3>';
					showModal();
				} else{
					headerDiv.innerHTML = '<h3>Stats for ' + name + '</h3>';
					var content = '';
					if(director.length > 0) {
						content += `<h4> Plays Directed: </h4><ul>`
						director.forEach(show => {
							console.log(show);
							content += `<li>${show}</li>`;
						})
						content += `</ul>`;
					}
					if(actor.length > 0){
						content += `<h4> Acting Roles: </h4><ul>`
						actor.forEach(role => {
							//console.log(role);
							content += `<li>${(role["role"] || 'Cast')} in ${role["show"]}</li>`;
						})
						content += `</ul>`;
					}
					if(crew.length > 0){
						content += `<h4> Crew Roles: </h4><ul>`
						crew.forEach(role => {
							//console.log(role);
							content += `<li>${(role["role"] || 'Crew')} for ${role["show"]}</li>`;
						})
						content += `</ul>`;
					}
					contentDiv.innerHTML = content;
					showModal();
				}

			}
		}

		function showModal(){
			var modal = document.getElementById('infoModal');
			modal.style.display = 'inline';
		}

		function hideModal(){
			var modal = document.getElementById('infoModal');
			modal.style.display = 'none';
		}

		function getPlayList(){
			$.getJSON("./data/productions.json?timestamp=" + new Date().getTime(), function(data) {
				data["productions"].forEach(show => {
					console.log(`[${show["Year"]}] ${show["Play"]}`)
				});
			});
		}

		function addActor(actor){
			var addString = '';
			if(actor["role"] == ""){
				addString = `
				<div class="col-6 col-md-4 col-lg-3 mb-1">
					<strong>${actor["name"]}</strong>
				</div>
				`;
			}
			else{
				addString = `
				<div class="col-6 col-md-4 col-lg-3 mb-1">
					<strong>${actor["name"]}</strong> as ${actor["role"]}
				</div>
				`
			}
			return addString;

		}

		function toggleVis(block){
			//console.log("toggleVis!");
			//console.log(block);
			var content = block.parentElement.querySelector('.production-holder');
			//console.log(content);
			if(content.classList.contains('d-inline')){
				//It's visible - hide it.
				content.classList.remove('d-inline');
				content.classList.add('d-none');
			}
			else{
				//It's not visible - show it.
				content.classList.remove('d-none');
				content.classList.add('d-inline');
			}
		}
