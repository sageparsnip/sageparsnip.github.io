function showInsightPage(){
	console.log("Showing Insight Page...");
	document.getElementById("main-container").innerHTML = `
		<div class="row" id="header-row">
			<div class="col-12" style="text-align: center;">
				<h3 onclick="showMainPage()"><u>Insight Theatre Presents:</u></h3>
				<h2 onclick="showMainPage()">Three One-Act Plays</h2>
			</div>
		</div>
		<div class="row" id="plays-row" style="justify-content:center;padding:1rem;text-align:center">
		</div>
	`;
	//Now that plays-row exists, we gather the info from the JSON file in assets.
	let divContent = '';
	divContent += `
		<h4>We are extremely proud to be celebrating our 45th year of performance here in Celbridge, Co. Kildare.</h4>
		<p>Over the years, we have gotten the opportunity to stage a great variety of shows, which you can find detailed in the list below.
		We are always on the lookout for new members! Whether you wish to act, direct, light, construct, design, host workshops, there is a place for all in Insight Theatre Celbridge.
		Please feel free to reach out to us via email at insightcelbridge@gmail.com, via our website at insighttheatrecelbridge.com, or find us on Facebook!
		</p>
		<h4>Our Past Productions:</h4>
		<div class="row">
	`;
	let i=0
	pastShows.forEach(show =>{
		if(i%2==0){
			divContent += '<hr>';
		}
		divContent += `<div class="col-6">${show}</div>`;
		i++
	})
	divContent += '<hr></div>';
	divContent += '<h4 style="text-align:center" onclick="showMainPage()">Click here to return to the cover page</h4>';
	document.getElementById("plays-row").innerHTML = divContent;
	window.scrollTo(0,0);
}


let pastShows = [
	'The Well of the Saints (1980)',
	'The Year of the Hiker (1981)',
	'Juno and the Paycock (1982)',
	'The Hostage (1983)',
	'Canaries (1983)',
	'Rain (1984)',
	'Hall of Healing (1984)',
	'Blythe Spirit (1984)',
	'Absurd Person Singular (1985)',
	'Abigail\'s Party (1986)',
	'The Plough and the Stars (1986)',
	'Bedroom Farce (1987)',
	'Brush with a Body (1988)',
	'The Loves of Cass Maguire (1988)',
	'The Factory Girls (1989)',
	'Semi Private (1989)',
	'Separate Tables (1990)',
	'Winners and The Nightingale and not the Lark (1990)',
	'The Odd Couple (1991)',
	'Losers & The Last of the Last of the Mohicans (1991)',
	'Murder at Checkmate Manor (1992)',
	'Two One-Act Plays (1992)',
	'Big Maggie (1993)',
	'Losers (1993)',
	'Leaving Home & There\'s Always Spring (1994)',
	'Sive (1994)',
	'Say Cheese (1995)',
	'Play On (1995)',
	'Dancing at Lughnasa (1996)',
	'The Last Apache Reunion (1996)',
	'Shirley Valentine (1997)',
	'The Importance of Being Earnest (1997)',
	'All in Favour Said No (1998)',
	'Same Old Moon (1998)',
	'Thy will be done (1998)',
	'An Inspector Calls (1999)',
	'Black Comedy & Portrait Of A Madonna (1999)',
	'Lady Windermere\'s Fan (2000)',
	'Pure of Heart (2000)',
	'The Cripple of Inishmaan (2000)',
	'Juno and the Paycock (2001)',
	'4 Short Plays (2001)',
	'Sharon\'s Grave (2002)',
	'St Patrick\'s Day (2002)',
	'This Property is Condemned (2002)',
	'Someone Who\'ll Watch Over Me (2003)',
	'Under Milk Wood (2003)',
	'A Bite of the Big Apple (2004)',
	'The Plough and the Stars (2004)',
	'Da (2005)',
	'Dangerous Corner (2005)',
	'A Midsummer Nights Dream (2006)',
	'By the Bog of Cats (2006)',
	'On Such as We (2007)',
	'Two One-Act Plays (2007) (2007)',
	'The Memory of Water (2007)',
	'Two One-Act Plays (2008)',
	'Eclipsed (2008)',
	'Trad (2008)',
	'From These Green Heights (2008)',
	'One Acts 2009 (2009)',
	'Unforgiven (2009)',
	'Playboy of the Western World (2010)',
	'Shadow of a Gunman (2010)',
	'Two One-Act Plays (2010) (2010)',
	'Three One-Act Productions (2011)',
	'The Weir (2011)',
	'Three One-Act Productions 2012 (2012)',
	'The Field (2012)',
	'One Acts (2013)',
	'Translations (2013)',
	'Blood Relations (2014)',
	'Burridans Ass (2014)',
	'No Romance (2014)',
	'Players and Pints (2014)',
	'Spinning (2015)',
	'The Hunt for Red Willie (2015)',
	'Endgame (2016)',
	'Love in a Glass Jar (2016)',
	'Standing on Ceremony (The Gay Marriage Plays) (2016)',
	'The Risen People (2016)',
	'Bronte (2017)',
	'The Crucible (2017)',
	'Alone it Stands (2018)',
	'An Evening Of One Act Plays (2018)',
	'Tuesdays with Morrie (2018)',
	'All My Sons (2019)',
	'Three One-Act Plays (2019)',
	'Plays, Poems, Songs and Pints! (2021)',
	'An Evening of Theatre (2022)',
	'Philadelphia, Here I Come! (2022)',
	'Our Town (2023)',
	'Tarry Flynn (2023)',
	'An Evening of Theatre (2024)',
	'Don\'t Dress For Dinner (2024)',
	'Dublin By Lamplight (2025)'
]