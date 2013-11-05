!function (UI, $) {
	var supported = !!function () {
		var style = document.createElement('div').style,
			prefixs = 'webkit moz o ms'.split(' '),
			len = prefixs.length;

		if (typeof style.animation === 'string') return true;
		for (var i = 0; i < len; i++) {
			if (typeof style[prefixs[i] + 'Animation'] === 'string') return true;
		}
		return false;
	}();

	var slideIn, slideOut;
	if (supported) {
		slideIn = function () {
			var that = this;
			this.$.addClass('animated slideInRight');
			setTimeout(function () {
				that.$.removeClass('slideInRight');
			}, 1000);
			return this;
		}

		slideOut = function (url) {
			this.$.addClass('animated slideOutLeft');
			url && setTimeout(function () {
				return location.replace(url);
			}, 1000);
			return this;
		}
	} else {
		slideIn = function () {
			// use jQuery
		}

		slideOut = function (url) {
			// use jQuery
			location.replace(url);
			return this;
		}
	}

	$.extend(UI.fn, {
		slideIn: slideIn,
		slideOut: slideOut
	});
	
}(UI, $)