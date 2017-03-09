(function() {
	var containerId = 'aopod_extension_qr_code';
	var contentId = containerId + '_content';
	var contentImgId = contentId + '_img';
	var url = window.location.href;
	
	var container = null;
	var content_img = null;
	var content = document.getElementById(contentId);
	
	if (!content) {

		content_img = document.createElement('div');
		content_img.id = contentImgId;

		content = document.createElement('div');
		content.id = contentId;
		content.onclick = function(e) {
			e.stopImmediatePropagation();
		};
		content.appendChild(content_img);
		
		container = document.createElement('div');
		container.id = containerId;
		container.onclick = function(e) {
			this.className = '';
			content_img.innerHTML = '';
		};

		container.appendChild(content);
		document.body.appendChild(container);
	}
	container = container || document.getElementById(containerId);
	content = content || document.getElementById(contentId);
	content_img = content_img || document.getElementById(contentImgId);

	container.className = 'show';
	content_img.innerHTML = '';

	var qrcode = new QRCode(contentImgId, {
		text: url,
		width: 256,
		height: 256,
		colorDark : "#000000",
		colorLight : "#ffffff",
		correctLevel : QRCode.CorrectLevel.H
	});
})();

