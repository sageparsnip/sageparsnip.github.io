window.addEventListener('DOMContentLoaded', init);

function init(){
	//Onload stuff goes in here
	showHomePage();
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
	`
	);
}