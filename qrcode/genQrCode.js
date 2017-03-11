/*
 * 2017-03-09
 * 生成二维码
 * Copyright (c) 2017 aopod (http://www.aopod.com)
 */

(function() {
	var container_id = 'aopod_extension_qr_code',
		content_id = container_id + '_content',
		content_sel_id = content_id + '_sel',
		content_sel_url_id = content_sel_id + '_url',
		content_sel_scheme_id = content_sel_id + '_scheme',
		content_sel_text_id = content_sel_id + '_text',
		content_img_id = content_id + '_img';
	
	var url = window.location.href;
	
	var container = null,
		content_img = null,
		content_sel = null,
		content_sel_url = null,
		content_sel_scheme = null,
		content_sel_text = null;

	var content = document.getElementById(content_id);

	var divElement = function(idstr) {
		var ele = document.createElement('div');
		if (idstr) {
			ele.id = idstr;
		}
		return ele;
	};

	var appInfosFromMeta = function(target_meta) {

		var content = target_meta.content;
		var infos = content.split(',');
		var dicts = {};
		for (var i = 0; i < infos.length; i++) {
			var tmp = infos[i].split('=');
			dicts[tmp[0].trim()] = tmp[1].trim();
		}
		return dicts;
	};

	var genQrCode = function(content) {
		var qrcode = new AOPOD_EXT_QRCode(content_img_id, {
			text: content,
			width: 256,
			height: 256,
			colorDark : "#000000",
			colorLight : "#ffffff",
			correctLevel : AOPOD_EXT_QRCode.CorrectLevel.H
		});
	};

	var metas = document.getElementsByTagName('meta');
	var target_meta = null;
	for (var i = 0; i < metas.length; i++) {
		var tmp_meta = metas[i];
		if (tmp_meta.name === 'apple-itunes-app') {
			target_meta = tmp_meta;
			break;
		}
	}
	
	if (!content) {

		content_img = divElement(content_img_id);

		content_sel_text = document.createElement('input');
		content_sel_text.value = url;
		content_sel_text.readOnly = true;

		content_sel_url = divElement(content_sel_url_id);
		content_sel_url.innerHTML = 'URL';
		content_sel_url.onclick = function(e) {
			content_sel_text.value = url;
			content_img.innerHTML = '';
			content_sel_url.className = 'ae_selected';
			content_sel_scheme.className = '';
			genQrCode(url);
		};

		content_sel_scheme = divElement(content_sel_scheme_id);
		content_sel_scheme.innerHTML = 'iOS URL';
		content_sel_scheme.onclick = function(e) {
			var app_info = appInfosFromMeta(target_meta);
			var appp_url = app_info['app-argument'];
			content_sel_text.value = appp_url;
			content_img.innerHTML = '';
			content_sel_url.className = '';
			content_sel_scheme.className = 'ae_selected';
			genQrCode(appp_url);
		};

		content_sel = divElement(content_sel_id);
		content_sel.appendChild(content_sel_url);
		content_sel.appendChild(content_sel_scheme);
		content_sel.appendChild(content_sel_text);

		content = divElement(content_id);
		content.onclick = function(e) {
			e.stopImmediatePropagation();
		};
		content.appendChild(content_sel);
		content.appendChild(content_img);
		
		container = divElement(container_id);
		container.onclick = function(e) {
			this.className = '';
			content_img.innerHTML = '';
		};

		container.appendChild(content);
		document.body.appendChild(container);
	}

	container = container || document.getElementById(container_id);
	content = content || document.getElementById(content_id);
	content_img = content_img || document.getElementById(content_img_id);
	content_sel = content_sel || document.getElementById(content_sel_id);
	content_sel_url = content_sel_url || document.getElementById(content_sel_url_id);
	content_sel_scheme = content_sel_scheme || document.getElementById(content_sel_scheme_id);
	content_sel_text = content_sel_text || document.getElementById(content_sel_text_id);

	container.className = 'ae_show';
	content_img.innerHTML = '';
	
	if (target_meta) {
		content_sel.className = '';
	} else {
		content_sel.className = 'ae_hide';
	}

	content_sel_url.className = 'ae_selected';
	content_sel_scheme.className = '';

	genQrCode(url);
})();

