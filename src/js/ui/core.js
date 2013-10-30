!function ($) {

	function UI(selector) {
		return new UI.fn.init(selector);
	}
	UI.fn = UI.prototype = {
		constructor: UI,
		init: function (selector) {
			this.$ = $(selector);
		}
	};
	UI.fn.init.prototype = UI.fn;

	UI.lang = {};

	// Init	
	$(document).ready(function () {
		if ($('input[data-validate]').length) {
			UI.validate();
		}
	});

	window.UI = UI;
}($);