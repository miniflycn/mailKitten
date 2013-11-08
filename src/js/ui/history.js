!function (UI, $) {
	var _prefixReg = /^#!/,
		_currentMark;

	function _checkMark() {

	}

	function history(opt) {
		$.each(['popstate', 'hashchange'], function (i, value) {
			if (('on' + value) in window) {
				$(window).on(value, _checkMark);
				return false;
			} 
		
		});
		history = UI.noop;
	}

	function getMark() {
		var hash = location.hash;
		if (_prefixReg.test(hash)) {
			return hash.replace(prefixReg, '');
		} else {
			return '';
		}
	}


}(UI, $)