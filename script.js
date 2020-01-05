var wall = document.getElementById("wall");
wall.addEventListener('click', (e) => tileClickHandler(e.target));
var images = [];
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

{/* <li class="thumb"><img type="image" image="i/1.jpg" src="i/1-small.jpg"></li> */ }
function appendImages() {
	images.forEach(i => {
		var li = document.createElement("li");
		var img = new Image();
		img.src = i.p;
		img.setAttribute("type", "image");
		img.setAttribute("image", i.f);
		li.appendChild(img);
		li.classList.add("thumb");
		wall.appendChild(li);
	});
}

function loadImages() {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", 'https://api.github.com/repos/dpronin/pronind/contents/i', true);
	xhr.onload = function (e) {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				var json = JSON.parse(xhr.responseText);
				console.log(json);
				images = json.map((e) => !e.name.endsWith("s.jpg") ? { p: e.download_url.replace(".jpg", "s.jpg"), f: e.download_url } : {}).filter(value => Object.keys(value).length !== 0)
				appendImages();
			} else {
				console.error(xhr.statusText);
			}
		}
	};
	xhr.send(null);
}