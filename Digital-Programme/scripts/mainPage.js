function showMainPage(){
	console.log("Showing Main Page...");
	document.documentElement.scrollTop= 0;
	document.body.scrollTop= 0;
	document.getElementById("main-container").innerHTML = `
		<div class="row" id="header-row">
			<div class="col-12" style="text-align: center;">
				<h3 onclick="showMainPage()"><u>Insight Theatre Presents:</u></h3>
				<h2 onclick="showMainPage()">Three One-Act Plays</h2>
			</div>
		</div>
		<div class="row main-links">
			<div class="main-link-bubble" style="background-color:darkcyan;display:grid;place-items:center" onclick='showPlayPage()'>
				<h3>The Plays</h3>
			</div>
		</div>
		<div class="row main-links">
			<div class="main-link-bubble" style="background-color:darkgoldenrod;display:grid;place-items:center" onclick='showCastPage()'>
				<h3>Cast & Crew</h3>
			</div>
		</div>
		<div class="row main-links">
			<div class="main-link-bubble" style="background-color:darkgreen;display:grid;place-items:center" onclick='showThanksPage()'>
				<h3>Our Thanks</h3>
			</div>
		</div>
		<div class="row main-links">
			<div class="main-link-bubble" style="background-color:darkmagenta;display:grid;place-items:center" onclick='showInsightPage()'>
				<h3>More about Insight</h3>
			</div>
		</div>
	`;
	window.scrollTo(0,0);
}

$(document).ready(function() {
	showMainPage();
})