/*
 * 2017-03-09
 * popup
 * Copyright (c) 2017 aopod (http://www.aopod.com)
 */

(function() {
  var idElement = function(idstr) {
    return document.getElementById(idstr);
  }
  idElement('about').onclick = function(e) {
    window.open('http://www.aopod.com/2017/03/05/zhihu-extension/');
  };
  idElement('qrcode').onclick = function(e) {
    chrome.tabs.executeScript({file: 'qrcode/qrcode.min.js'}, function() {
      chrome.tabs.insertCSS({file: 'qrcode/genQrCode.css'}, function() {
        chrome.tabs.executeScript({file: 'qrcode/genQrCode.js'}, null);
      });
    });
  };
})();

