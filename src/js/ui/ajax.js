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
		get: function (api) {
			return ajax({
				url: api,
				type: 'GET'
			});
		},
		post: function (api, data) {
			return ajax({
				url: api,
				data: data,
				type: 'POST'
			});
		},
		put: function (api, data) {
			return ajax({
				url: api,
				data: data,
				type: 'PUT'
			});
		},
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