$( document ).ready(function() {
    onLoad();
});

function onLoad(){
	//Everything that should fire after page load goes here.
	getIOs();
}

function getIOs(){
	var biRow = document.getElementById("BI410-Mapping-Row");
	biRow.innerHTML += `<h4 style="text-align:center">BI410 Mapping</h4>`;
	var dotRow = document.getElementById("DOT-Mapping-Row");
	dotRow.innerHTML += `<h4 style="text-align:center">DOT Mapping</h4>`;
	var colour = "";
	$.getJSON("./data/mapping.json?" + Date.now(), function(json) {
		json["BI400"]["IOs"].forEach(IO => {
			if(IO.type == "Input"){
				colour = "Green";
			}
			else{
				colour = "Blue";
			}
			biRow.innerHTML += `
				<div class="col-3" style="border: 1px solid; background-color:${colour}">
					<b>${IO.type} #${IO.number}:</b><br> ${IO.description}<br>${IO.hardware}<br>Software Input: ${IO.software}
				</div>
			`;
		});
		json["DOT"]["IOs"].forEach(IO => {
			if(IO.type == "Input"){
				colour = "Green";
			}
			else{
				colour = "Blue";
			}
			dotRow.innerHTML += `
				<div class="col-3" style="border: 1px solid; background-color:${colour}">
					<b>${IO.type} #${IO.number}:</b>
					<br> ${IO.description}
					<br>${IO.hardware}
					<br>Location: ${IO.location}
					<br>Software Input: ${IO.software}
				</div>
			`;
		});
	});
}