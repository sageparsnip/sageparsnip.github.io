function showMainPage(){
	console.log("Showing Main Page...");
	document.documentElement.scrollTop= 0;
	document.body.scrollTop= 0;
	document.getElementById("main-container").innerHTML = `
		<div class="row" id="header-row">
			<div class="col-12" style="text-align: center;">
				<h3 style="font-size: 2rem;" onclick="showMainPage()"><u>Insight Theatre Presents:</u></h3>
				<h2 style="font-size: 3rem;" onclick="showMainPage()">Three One-Act Plays</h2>
			</div>
		</div>
		<div class="row main-links">
			<div class="main-link-bubble" style="background-color:darkcyan;" onclick='showPlayPage()'>
				<h3>The Plays</h3>
			</div>
		</div>
		<div class="row main-links">
			<div class="main-link-bubble" style="background-color:darkgoldenrod;" onclick='showCastPage()'>
				<h3>Cast & Crew</h3>
			</div>
		</div>
		<div class="row main-links">
			<div class="main-link-bubble" style="background-color:darkgreen;" onclick='showThanksPage()'>
				<h3>Our Thanks</h3>
			</div>
		</div>
		<div class="row main-links">
			<div class="main-link-bubble" style="background-color:darkmagenta;" onclick='showInsightPage()'>
				<h3>More about Insight</h3>
			</div>
		</div>
	`;
}

$(document).ready(function() {
	showMainPage();
})