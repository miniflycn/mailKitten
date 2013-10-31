!fucntion (UI, $) {
	/**
	 * load
	 * @param {String} mod
	 * @param {Function} callback
	 */
	function load(mod, callback) {
		var url = './js/ui/' + mod + '.js';
		return $.ajax({
			dataType: 'script',
			cache: true,
			url: url
		}).done(function () {
			return callback(UI[mod]);
		});
	}

	UI.script = {
		load: load
	};

}(UI, $);