function showPlayPage(){
	console.log("Showing Play(s) Page...");
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
		let divContent = '';
		data["plays"].forEach(play =>{
			//console.log(play);
			if(play.title!="Crew"){
				divContent += `
					<div class="row" style="background-color: darkcyan; border-radius: 12px; max-width: 90%;padding:1rem">
						<div class="col-7">
							<img src="assets\\${play.icon}" style="max-width:100%">
						</div>
						<div class="col-5" style="display:grid; place-items:center;text-align:center">
							<div class="row">
								<b style="font-size:120%">${play.title}</b>
							</div>
						</div>
						<p style="text-align:justify">${play.synopsis}</p>
					</div>
					<div style="height:20px"></div>
					
				`;
			};
		})
		divContent += '<h4 style="text-align:center" onclick="showCastPage()">Click here to view the casts and crew!</h4>';
		divContent += '<h4 style="text-align:center" onclick="showMainPage()">Click here to return to the cover page</h4>';
		document.getElementById("plays-row").innerHTML = divContent;
		window.scrollTo(0,0);
	});
	

}