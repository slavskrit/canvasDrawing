var wall = document.getElementById("wall");
wall.addEventListener('click', (e) => tileClickHandler(e.target));
loadImages();

function tileClickHandler(tile) {
	console.log(0);
	var type = tile.getAttribute('type');
	switch (type) {
		case "image":
			openImage(tile.getAttribute('image'));
			break;
		case "link":
			openLink(tile.getAttribute('url'));
			break;
		default:
			console.log('not implemented');
	}
}

function openImage(image) {
	var overlay = document.createElement('div');
	overlay.classList.add("overlay");
	var img = new Image(); 
	img.src = image; 
	overlay.appendChild(img);
	img.classList.add("preview");
	overlay.addEventListener('click', () => overlay.parentNode.removeChild(overlay));
	document.body.appendChild(overlay);
}

function openLink(link) {
	window.open(link);
}

function loadImages() {
	fetch('https://api.github.com/repos/dpronin/pronind/contents/i')
	.then((response) => {
		console.log(response);
	})
}