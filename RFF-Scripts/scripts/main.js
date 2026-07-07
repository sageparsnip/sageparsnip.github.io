window.addEventListener('DOMContentLoaded', init);


const imageExtensions = ["jpg", "jpeg", "png", "webp", "gif"];
const scripts = [
		["A Villa On Venus", "https://drive.google.com/file/d/1Il0wa_TziCvteASreIOS77axzhYHsNv0/view?usp=sharing"],
		["Unhand Me, Squire", "https://drive.google.com/file/d/19c1XcUEUaxvppbpDqz5ModIg1w75ccsY/view?usp=sharing"],
		["Reluctant Resurrection of Sherlock Holmes", "https://drive.google.com/file/d/1Ghu9yoJ4dCR7FrKG2j0x6BVf5DmevK8D/view?usp=sharing"],
		["Tarzan and Jane", "https://drive.google.com/file/d/1SO0sbMTlsfAFdwAAIBIf-uEFc0pbUoxA/view?usp=sharing"],
		["A Good Knight's Work", "https://drive.google.com/file/d/140ozWVuXyA0-lxD69RCYQWExM12lyfXn/view?usp=sharing"]
	];

function init(){
	//Onload stuff goes in here
	let sl = '<div class="row">';
	scripts.forEach(script => {
		sl += `
			<a href=${script[1]}><div class="col-12" align="center">
				<img src="./assets/${script[0]}.png" style="max-width:100%"><h3 style="text-align:center">${script[0]}</h3>
			</div>
		`;
	})
	$("#main-content").html(sl);
}
