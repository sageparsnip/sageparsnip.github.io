window.addEventListener('DOMContentLoaded', init);


const imageExtensions = ["jpg", "jpeg", "png", "webp", "gif"];
let history, showLabel, imageFilenames, images;
let currentPage = 1;
let currentIndex = 0;

function init(){
	//Onload stuff goes in here

	showHomePage();
	populateHistory();
}

function showPage(div){
	if(div.innerHTML == "Home"){
		showHomePage();
	}
	else if (div.innerHTML == "What's On"){
		showWhatsOnPage();
	}
	else if (div.innerHTML == "Who We Are"){
		showWhoWeArePage();
	}
	else if (div.innerHTML == "Submit A Play"){
		showSubmitAPlayPage();
	}
	else if (div.innerHTML == "History"){
		showHistoryPage();
	}
	else if (div.innerHTML == "Committee"){
		showCommiteePage();
	}
	else{
		showHomePage();
	}
}

async function showHomePage() {
	//console.log("Time to show the Home page!");
	const sections = ['HomeGreeting', 'HomeRecent', 'HomeOnNext'];

	const responses = await Promise.all(
		sections.map(id => $.get(`./data/${id}.md`))
	);
	const [HomeGreeting, HomeRecent, HomeOnNext] = responses.map(md => marked.parse(md));

	$('#main-content').html(`
		<div class="row">
			<div class="col-md-4 col-12" id="HomeGreeting">
				${HomeGreeting}
				<hr>
				${HomeRecent}
		<hr>
			</div>
			<div class="col-md-8 col-12" id="HomeOnNext">
				${HomeOnNext}
			</div>
		</div>
	`
	);
}

async function showWhatsOnPage(){
	const sections = ['WhatsOnDetails'];

	const responses = await Promise.all(
		sections.map(id => $.get(`./data/${id}.md`))
	);

	const [WhatsOnDetails] = responses.map(md => marked.parse(md));

	const splits = WhatsOnDetails.split("h2");
	//console.log(splits);

	if(splits.length > 4){
		//Create 2 col-6s for desktop.
		var col1 = splits[0] + "h2" + splits[1] + "h2" + splits[2].substring(0, splits[2].length-1);
		var col2 = "<h2" + splits[3] + "h2" + splits[4];
		//console.log(col1);
		//console.log(col2);
		$('#main-content').html(`
			<div class="row">
				<div class="col-md-6 col-12">
					${col1}
				</div>
				<div class="col-md-6 col-12">
					${col2}
				</div>
			</div>
		`);
	} else{
		//Just use col-12s
		$('#main-content').html(`
			<div class="row">
				<div class="col-12">
					${WhatsOnDetails}
				</div>
			</div>
		`);
	}
}

async function showWhoWeArePage() {
	//console.log("Time to show the Home page!");
	const sections = ['WhoWeArePicture', 'WhoWeAreMain', 'WhoWeAreGetInvolved'];

	const responses = await Promise.all(
		sections.map(id => $.get(`./data/${id}.md`))
	);
	const [WhoWeArePicture, WhoWeAreMain, WhoWeAreGetInvolved] = responses.map(md => marked.parse(md));

	$('#main-content').html(`
		<div class="row">
			<div class="col-md-6 col-12" id="WhoWeArePicture">
				<img src="./assets/WhoWeAre.png"><br>${WhoWeArePicture}
			</div>
			<div class="col-md-6 col-12" id="WhoWeAreText">
				${WhoWeAreMain}
				<hr>
				${WhoWeAreGetInvolved}
			</div>
		</div>
	`
	);
}

async function showSubmitAPlayPage() {
	//console.log("Time to show the Home page!");
	const sections = ['SubmitAPlayMain'];

	const responses = await Promise.all(
		sections.map(id => $.get(`./data/${id}.md`))
	);
	const [SubmitAPlayMain] = responses.map(md => marked.parse(md));
	const FormEmbed = '<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfO7okhTj2PiTfvnrnI7gyAzP4m8_1EV2-HnZQ7ZCXeHiQrow/viewform?embedded=true" width="100%" height="300%" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>';

	$('#main-content').html(`
		<div class="row">
			<div class="col-md-6 col-12" id="SubmitAPlayText">
				${SubmitAPlayMain}
			</div>
			<div class="col-md-6 col-12" id="SubmitAPlayForm">
				${FormEmbed}
			</div>
		</div>
	`
	);
}

function showCommiteePage(){
	$.getJSON('./data/Commitee.json', function(data) {
		var list = "";
		data["members"].forEach(member => {
			list += `
				<div class="col-md-3 col-12">
					<h3>${member.name}</h3>
					<h3>${member.title}</h3>
					<img src="./assets/${member.picture}" class="commitee-picture">
					<p>${member.bio}</p>
				</div>
			`;
		});
		$('#main-content').html(`
			<div class="row">
				<div class="col-12"><p>Meet the committee!</p></div>
			</div>
			<div class="row">${list}</div> 
		`);
	});
}

async function showHistoryPage(){
	//console.log("Time to show the Home page!");
	const sections = ['HistoryText'];

	const responses = await Promise.all(
		sections.map(id => $.get(`./data/${id}.md`))
	);
	const [HistoryText] = responses.map(md => marked.parse(md));
	
	$('#main-content').html(`
		<div class="row">
			<div class="col-12" id="HistoryText">
				${HistoryText}
			</div>
		</div>
		<div class="row">
			<div class="col-12">
				<div class="container" id="HistorySearch">
				</div>
			</div>
		</div>
	`
	);
	if(history.length == 0){
		populateHistory();
		showHistorySearch();
	}
	else{
		showHistorySearch();
	}
}

function populateHistory(){
	history = [];
	$.getJSON('./data/productions.json', function(data){
		data["productions"].forEach(show => {
			history.push(show);
		})
		history.reverse();
		publishHistory();
	});
}
function publishHistory(){
	console.log(history);
}

function showHistorySearch(){
	//Idea is to break history down into pages of 10 entries per page.
	//Each page should then display in a line with alternating colours.
	//The header line can probably stay.
	//Overall, design will be:
	//[page number bubbles] [up-down arrow indicating earliest/latest]
	//[headers]
	//[content]
	console.log("Current Page:" + currentPage)
	let pagedHistory = []; //Array of pages.
	let i = 0; //Which page we are on
	let j = 1; //Where in the current page we are
	history.forEach(show => {
		if(j == 1){
			//Set up the new page.
			pagedHistory.push(JSON.parse(`
				{
					"number":${i+1},
					"shows":[]
				}
			`));
		}

		if(j < 10){
			//Add the show to the shows array within the json.
			pagedHistory[i]["shows"].push(show);
			j++;
		}
		else{
			//Add the show to the shows array within the json.
			pagedHistory[i]["shows"].push(show);
			//Go to next page and reset j to 1.
			i++;
			j = 1;
		}
	});
	//History now broken down into 10-entry pages!
	//Time to set up the spreadsheet.
	let bubbles = `
		<div class="row">
	`;
	pagedHistory.forEach(page => {
		bubbles += `
			<div class="col" onclick="bubbleClick(this)" id="${page.number}"><p class="bubble">${page.number}</p></div>
		`;
	});
	bubbles += `</div>`;

	let historyPanel = ``;
	//Add headers
	historyPanel += `
		<div class="row" id="headerRow">
			<div class="col headerCol"><b>Year</b></div>
			<div class="col headerCol"><b>Play</b></div>
			<div class="col headerCol"><b>Playwright</b></div>
			<div class="col headerCol"><b>Director</b></div>
		</div>
	`;

	pagedHistory.forEach(page => {
		let thisRowClass = 'historyRowA';
		if(page.number == currentPage){
			page.shows.forEach(show => {
				historyPanel += `
					<div class="row ${thisRowClass}" id="[${show.Year}] ${show.Play}" onclick="getShowDetails(this)">
						<div class="col detailCol">${show.Year}</div>
						<div class="col detailCol">${show.Play}</div>
						<div class="col detailCol">${show.Playwright}</div>
						<div class="col detailCol">${show.Director}</div>
					</div>
				`;
				if(thisRowClass == "historyRowA"){
					thisRowClass = 'historyRowB';
				}
				else{
					thisRowClass = 'historyRowA';
				}
			});
		}
	});


	$('#HistorySearch').html(`
		${bubbles}
		${historyPanel}
	`);
}

function bubbleClick(bubble){
	currentPage = bubble.id;
	console.log("Re-firing showHistorySearch");
	showHistorySearch();
}

function getShowDetails(row){
	let playYear = row.id.split('] ')[0].substring(1,row.id.split('] ')[0].length);
	let playName = row.id.split('] ')[1];
	console.log("Need to get details for: " + playName + " from " + playYear);
	let thisPlay;
	history.forEach(play => {
		if(play.Year == playYear && play.Play == playName){
			thisPlay = play;
		}
	});
	let playDetails = '';
	//modalTitle
	//modalBody
	if(thisPlay.Length != 'Collection'){
		playDetails += `
			<table>
				<tr><th>Director</th><td>${thisPlay.Director}</td></tr>
				<tr><th>Playwright</th><td>${thisPlay.Playwright}</td></tr>
				<tr><th>Location</th><td>${thisPlay.Location}</td></tr>
				<tr><th>Month</th><td>${thisPlay.Month}</td></tr>
				<tr><th>Year</th><td>${thisPlay.Year}</td></tr>
			</table>
			<h5 style="text-align:center">Cast:</h5>
			<table>
				<tr><th>Role:</th><th>Played By:</td></tr>
		`;
		thisPlay.Cast.forEach(actor => {
			playDetails += `
				<tr><td>${actor.role}</td><td>${actor.name}</td></tr>
			`;
		});
		playDetails += `
			</table>
			<h5 style="text-align:center">Crew:</h5>
			<table>
				<tr><th>Role:</th><th>Crewmate:</td></tr>
		`;
		thisPlay.Crew.forEach(actor => {
			playDetails += `
				<tr><td>${actor.role}</td><td>${actor.name}</td></tr>
			`;
		});
		playDetails += `
			</table>
		`;
	}
	else{
		console.log(thisPlay);
		playDetails += `
			<table>
				<tr><th>Location</th><td>${thisPlay.Location}</td></tr>
				<tr><th>Month</th><td>${thisPlay.Month}</td></tr>
				<tr><th>Year</th><td>${thisPlay.Year}</td></tr>
			</table><hr>
		`;
		thisPlay["Performances"].forEach(show => {
			playDetails += `
				<h5 style="text-align:center">${show.Play}</h5>
				<table>
					<tr><th>Director</th><td>${show.Director}</td></tr>
					<tr><th>Playwright</th><td>${show.Playwright}</td></tr>
				</table>
				<h5 style="text-align:center">Cast:</h5>
				<table>
					<tr><th>Role:</th><th>Played By:</td></tr>
			`;
			show["Cast"].forEach(actor => {
				playDetails += `
					<tr><td>${actor.role}</td><td>${actor.name}</td></tr>
				`;
			});
			playDetails += `
				</table><hr>
			`;
		});
		//Add Crew details! Keep this section pls
		playDetails += `
			<h5 style="text-align:center">Crew:</h5>
			<table>
				<tr><th>Role:</th><th>Crewmate:</td></tr>
		`;
		thisPlay.Crew.forEach(actor => {
			playDetails += `
				<tr><td>${actor.role}</td><td>${actor.name}</td></tr>
			`;
		});
		playDetails += `
			</table>
		`;
	};

	//Theoretically, we'll add in a carousel of pictures for the show here! Good luck...
	//Add in the carousel!
	playDetails += `
		<!-- Carousel inside modal-body -->
		<div class="carousel-container" style="width: 100%; position: relative;">
		  
		  <!-- Main image display -->
		  <div style="text-align: center; position: relative; height: 50vh;">
			  <img id="carouselImage" src="" alt="Show photo" style="width: 100%; height: 100%; object-fit: contain; cursor: zoom-in; border-radius: 4px;" onclick="openFullscreen(this)" />
		</div>

		  <!-- Prev / Next buttons -->
		  <div class="d-flex justify-content-between align-items-center mt-2">
		    <button class="btn btn-outline-secondary btn-sm" onclick="changeSlide(-1)">&#8592; Prev</button>
		    <span id="carouselCounter" style="font-size: 0.9rem; color: #888;"></span>
		    <button class="btn btn-outline-secondary btn-sm" onclick="changeSlide(1)">Next &#8594;</button>
		  </div>

		</div>

		<!-- Fullscreen overlay -->
		<div id="fullscreenOverlay" onclick="closeFullscreen()"
		  style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.92);
		         z-index:9999; cursor:zoom-out; align-items:center; justify-content:center;">
		  <img id="fullscreenImage" src="" alt=""
		    style="max-width: 95vw; max-height: 95vh; object-fit: contain;" />
		</div>
	`;
	$('#modalTitle').html(`${playName}`);
	$('#modalBody').html(`${playDetails}`);
	//At this stage the modal exists fully, but the carousel is not populated.
	//Populate it.
	showLabel = row.id;
	imageFilenames = thisPlay["Images"];//Need to get the list of images - in the JSON maybe?
	images = imageFilenames.map(f => `./assets/${showLabel}/${f}`);
	currentIndex = 0;
	showSlide(0);
	showModal();
}

function showModal(){
	var modal = document.getElementById('infoModal');
	modal.style.display = 'inline';
}

function hideModal(){
	var modal = document.getElementById('infoModal');
	modal.style.display = 'none';
}

function showSlide(index) {
	currentIndex = (index + images.length) % images.length; // wrap around
	document.getElementById("carouselImage").src = images[currentIndex];
	document.getElementById("carouselCounter").textContent =
	  `${currentIndex + 1} / ${images.length}`;
}

function changeSlide(direction) {
  showSlide(currentIndex + direction);
  const modalBody = document.querySelector(".modal-body");
  modalBody.scrollTop = modalBody.scrollHeight;
}

function openFullscreen(img) {
	const overlay = document.getElementById("fullscreenOverlay");
	document.getElementById("fullscreenImage").src = img.src;
	overlay.style.display = "flex";
}

function closeFullscreen() {
	document.getElementById("fullscreenOverlay").style.display = "none";
}

// Close fullscreen on Escape key
document.addEventListener("keydown", e => {
	if (e.key === "Escape") closeFullscreen();
});