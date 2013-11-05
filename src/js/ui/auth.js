!function (UI, $) {
	var _user = {};

	function _set(data) {
		_user['user'] = data.user;
	}

	function _get(key) {
		if (key) {
			return _user[key];
		} else {
			return _user;
		}
	}

	function auth(arg) {
		if (typeof arg === 'function') {
			UI.ajax.get('auth').done(function (data) {
				if (data.code === 0) {
					_set(data);
					return arg(_get());
				} else {
					return location.replace('/login.html');
				}
			});
			return this;
		} else {
			return _get(arg);
		}
	}

	UI.auth = auth;

}(UI, $);