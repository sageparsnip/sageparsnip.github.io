function showThanksPage(){
	console.log("Showing Thanks Page...");
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
		let divContent = '<div class="row" style="background-color: darkgreen; border-radius: 12px; max-width: 90%;padding:0.5vh;display:grid;place-items:center"><h3 style="text-align:center">We would like to offer our sincere thank to the following:</h3><ul style="max-width:90%;padding-left:2vw;list-style-type:none">';
		data["thanks"].forEach(thank =>{
			//console.log(play);
			divContent += `
				<li style="font-size:2vh;">${thank.to} for ${thank.for}</li>
			`;
		})
		divContent += '</ul></div><div class="row" style="height:2vh"></div>';
		divContent += '<h4 style="text-align:center" onclick="showInsightPage()"">Click here to learn more about Insight!</h4>';
		divContent += '<h4 style="text-align:center" onclick="showMainPage()">Click here to return to the cover page</h4>';
		document.getElementById("plays-row").innerHTML = divContent;
	window.scrollTo(0,0);
	})
	

}