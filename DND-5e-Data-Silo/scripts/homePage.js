function showHomePage() {
	const ContentDiv = document.getElementById("primary-content");
	ContentDiv.innerHTML = `
		<h2 style="text-align:center;"> DND Data Silo </h2>
		<br>
		<p style="text-align:justify"> 
			This page should allow the user to store information required to run their campaigns! <br>
			Click on one of the links in the navbar above to switch to the required tabs.<br>
			Please note that all data is stored in the browser - data can be exported on this page to files for transport.<br>
			Click on one of the below buttons to import from files, or export to files.<br>
			Make sure to back up your files regularly.<br>
		</p>
		<hr>
		<div class="container">
			<div class="row">
				<div class="col"><h3 style="text-align:center;">Characters:</h3></div>
				<div class="col"><input type="file" id="characterInput" class="fileInput" onchange="onLoadJSON()" /></div>
				<div class="col"><button class="ImpExpBtn" onclick="exportJSON('characterData')"> Export </button> </div>
			</div><br>
			<div class="row">
				<div class="col"><h3 style="text-align:center;">Monsters:</h3></div>
				<div class="col"><input type="file" id="monsterInput" class="fileInput" onchange="onLoadJSON()" /></div>
				<div class="col"><button class="ImpExpBtn" onclick="exportJSON('monsterData')"> Export </button> </div>
			</div><br>
			<div class="row">
				<div class="col"><h3 style="text-align:center;">Encounters:</h3></div>
				<div class="col"><input type="file" id="encounterInput" class="fileInput" onchange="onLoadJSON()" /></div>
				<div class="col"><button class="ImpExpBtn"> Export </button> </div>
			</div><br>
			<div class="row">
				<div class="col"><h3 style="text-align:center;">Items:</h3></div>
				<div class="col"><input type="file" id="itemInput" class="fileInput" onchange="onLoadJSON()" /></div>
				<div class="col"><button class="ImpExpBtn"> Export </button> </div>
			</div><br>
			<div class="row">
				<div class="col"><h3 style="text-align:center;">Spells:</h3></div>
				<div class="col"><input type="file" id="spellInput" class="fileInput" onchange="onLoadJSON()" /></div>
				<div class="col"><button class="ImpExpBtn"> Export </button> </div>
			</div><br>
		</div>
	`;
	onLoadJSON();
}