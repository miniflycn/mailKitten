!function (UI, $) {

	function _getUrl(api) {
		return '/controller/' + api;
	}

	function ajax(opt) {
		var url = _getUrl(opt.url),
			type = opt.type || (opt.data ? 'GET' : 'POST'),
			data = opt.data,
			dataType = 'json';
		return $.ajax({
			url: url,
			type: type,
			data: data,
			dataType: dataType
		});
	}

	$.extend(ajax, {
		/**
		 * get
		 * @param {String} api
		 * @return jQuery.Promise
		 */
		get: function (api) {
			return ajax({
				url: api,
				type: 'GET'
			});
		},
		/**
		 * post
		 * @param {String} api
		 * @return jQuery.Promise
		 */
		post: function (api, data) {
			return ajax({
				url: api,
				data: data,
				type: 'POST'
			});
		},
		/**
		 * put
		 * @param {String} api
		 * @return jQuery.Promise
		 */
		put: function (api, data) {
			return ajax({
				url: api,
				data: data,
				type: 'PUT'
			});
		},
		/**
		 * del
		 * @param {String} api
		 * @return jQuery.Promise
		 */
		del: function (api, data) {
			return ajax({
				url: api,
				data: data,
				type: 'DELETE'
			});
		}
	});

	UI.ajax = ajax;

}(UI, $)