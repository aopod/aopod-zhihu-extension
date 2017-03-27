/*
 * 2017-03-04
 * 启用问题页面复制功能，问题页文字大小调整
 * Copyright (c) 2017 aopod (http://www.aopod.com)
 */
(function() {
	var url = window.location.href;

	var listClass = url.indexOf('/answer/') > -1 ? 'Question-mainColumn' : 'List-item';
	var List_item = (document.getElementsByClassName(listClass) || [null])[0];

	document.body.addEventListener('keyup', function(e) {
		var custom_style_sheet_id = 'aopod_zhihu_extension_style_sheet_id';
		var custom_style_sheet = document.getElementById(custom_style_sheet_id);
		if (!custom_style_sheet) {
			custom_style_sheet = document.createElement('style');
			custom_style_sheet.id = custom_style_sheet_id;
			custom_style_sheet.type = 'text/css';
			document.head.appendChild(custom_style_sheet);
		}
		var base_element = document.getElementsByClassName('RichContent')[0];
		var active_element = document.activeElement;
		if (active_element) {
			var nodeName = active_element.nodeName;
			if (nodeName === 'INPUT' || nodeName === 'TEXTAREA') {
				return;
			}
		}

		var target_font_size = -1;
		var current_font_size = parseInt(window.getComputedStyle(base_element).fontSize);
		switch(e.keyCode) {
			case 48: 	// 0
			break;
			case 189: 	// -
				if (current_font_size > 10) {
					target_font_size = current_font_size - 1;
				} else {
					target_font_size = 10;
				}
			break;
			case 187: 	// =
				if (current_font_size < 30) {
					target_font_size = current_font_size + 1;
				} else {
					target_font_size = 30;
				}
			break;
			default:
				return;
		}
		if (target_font_size >= 10) {
			custom_style_sheet.innerHTML = '.RichContent {font-size: ' + target_font_size + 'px; line-height: 1.8em;}';
		} else {
			custom_style_sheet.innerHTML = '';
		}
	});

	if (List_item == null) {
		return;
	}

	List_item.addEventListener('copy', function(e) {
		var target = e.target;
		if (target.nodeName === 'SPAN' && target.className.indexOf('CopyrightRichText-richText') > -1) {
			return;
		}
		e.stopImmediatePropagation();
		var parent = target;
		while ((parent = parent.parentElement) && parent.nodeName !== 'DIV') {
			if (parent.nodeName === 'SPAN' && parent.className.indexOf('CopyrightRichText-richText') > -1) {
				var t = parent;
				setTimeout(function() {
					t.dispatchEvent(new Event('copy', e));
				}, 0);
			}
		}
	}, false);
})();
