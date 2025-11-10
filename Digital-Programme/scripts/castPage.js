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

		});

		divContent += '<b style="text-align:center" onclick="showCastPage()">Click here to see our sincere thanks!</b>';
		divContent += '<b style="text-align:center" onclick="showMainPage()">Click here to return to the cover page</b>';
		document.getElementById("plays-row").innerHTML = divContent;
	});
}