function createDetailsPane(){
	const ContentDiv = document.getElementById("details-pane-container");
	var content = '';
	content += `
		<div class="container-fluid g-4" id="actor-details-container">
			<div class="row">
				<div class="col-md-4"><b>Name</b></div>
				<div class="col-md-8"><p id="detailName">Damasyndra thya Ostroplex Rhodostephys</p></div>
			</div>
			<div class="row">
				<div class="col-md-4"><b>CR</b></div>
				<div class="col-md-8"><p id="detailCR">70</p></div>
			</div>
			<div class="row">
				<div class="col-md-4"><b>HP</b></div>
				<div class="col-md-8"><p id="detailHP">70</p></div>
			</div>
			<div class="row">
				<div class="col-md-4"><b>AC</b></div>
				<div class="col-md-8"><p id="detailAC">70</p></div>
			</div>
			<div class="row">
				<div class="col-md-4"><b>Conditions</b></div>
				<div class="col-md-8"><p id="detailConditions">70</p></div>
			</div>
		</div>
	`;
	ContentDiv.innerHTML =  content;
}