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
	console.log("Time to show the Home page!");
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
			</div>
			<div class="col-md-8 col-12" id="HomeGreeting">
				${HomeOnNext}
			</div>
		</div>
	`
	);
}