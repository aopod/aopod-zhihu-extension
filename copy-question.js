/*
 * 2017-03-04
 * 启用问题页面复制功能
 * Copyright (c) 2017 aopod (http://www.aopod.com)
 */
(function() {
	var url = window.location.href;
	var listClass = url.indexOf('/answer/') > -1 ? 'Question-mainColumn' : 'List-item';
	var List_item = (document.getElementsByClassName(listClass) || [null])[0];
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
