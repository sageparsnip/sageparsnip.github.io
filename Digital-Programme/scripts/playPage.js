function showPlayPage(){
	console.log("Showing Play(s) Page...");
	$.getJSON("assets/plays.json", function(data) {
		document.getElementById("main-container").innerHTML = `
			<div class="row" id="header-row">
				<div class="col-12" style="text-align: center;">
					<h3 style="font-size: 2rem;" onclick="showMainPage()"><u>Insight Theatre Presents:</u></h3>
					<h2 style="font-size: 3rem;" onclick="showMainPage()">Three One-Act Plays</h2>
				</div>
			</div>
			<div class="row" id="plays-row" style="justify-content:center;padding:1rem">
			</div>
		`;
		//Now that plays-row exists, we gather the info from the JSON file in assets.
		let divContent = '';
		data["plays"].forEach(play =>{
			//console.log(play);
			divContent += `
				<div class="row" style="background-color: darkcyan; border-radius: 12px; max-width: 90%;padding:1rem">
					<div class="col-4">
						<img src="assets\\${play.icon}" style="max-width:100%">
					</div>
					<div class="col-8">
						<div class="row">
							<b>${play.title}</b>
							<p>${play.synopsis}</p>
						</div>
					</div>
				</div>
				<div style="height:20px"></div>
				
			`;
		})
		divContent += '<b style="text-align:center" onclick="showCastPage()">Click here to view the casts and crew!</b>';
		divContent += '<b style="text-align:center" onclick="showMainPage()">Click here to return to the cover page</b>';
		document.getElementById("plays-row").innerHTML = divContent;
	})
	

}