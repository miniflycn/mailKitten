/*!
 * mailKitten-UI
 * Bootstrap like UI libaray, just create for mailKitten
 * Copyright (c) 2013 Daniel Yang <miniflycn@justany.net>
 * MIT Licensed
 */
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
	UI.noop = function () {};

	window.UI = UI;
}($);

;!function (UI, $) {

	$.extend(UI.fn, {
		/**
		 * alert
		 * @param {String} type
		 * @param {String} msg
		 */
		alert: function (type, msg) {
			var alert = $([
				'<div class="alert alert-',
				type,
				' alert-dismissable">',
				'<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>',
				msg,
				'</div>'
			].join(''));

			this.$.append(alert);
			setTimeout(function () {
				alert.alert('close');
			}, 5000);

			return this;
		}
	});

}(UI, $);

;!function (UI, $) {
	function validate() {
		$(document).on('focusout', 'input[data-validate]', function (event) {
			return one(event.target);
		});
	}

	/**
	 * one
	 * @param {Element} ele
	 */
	function one(ele) {
		ele = $(ele);
		var valids = ele.attr('data-validate').split(/\s+/),
			value = ele.val(),
			group = ele.closest('.form-group'),
			helper = $('.help-error', group),
			len = valids.length,
			i = 0,
			valid;

		for (; i < len; i++) {
			valid = valids[i];
			if (!UI.validate[valid](value)) {
				group.addClass('has-error');
				helper.html(UI.lang.validate[valid]).addClass('animated shake');
				setTimeout(function () {
					return helper.removeClass('animated shake');
				}, 500);
				return false;
			}
		}
		group.removeClass('has-error');
		helper.empty();
		return true;
	}

	/**
	 * all
	 * @param {Selector} container
	 */
	function all(container) {
		var _$ = $('input[data-validate]', container),
			len = _$.length,
			i = 0,
			passed = true;
		for (; i < len; i++) {
			if (!one(_$[i])) {
				passed && _$[i].focus();
				passed = false;
			}
		}
		return passed;
	}

	$.extend(validate, {
		email: function (value) {
			if (!$.trim(value)) {
				return true;
			}
			value = $.trim(value.toLowerCase());
			return this.is.email.test(value);
		},
		mandatory: function (value) {
			return !!value;
		},
		one: one,
		all: all
	});
	$.extend(validate.is = {}, {
		email: (/^[\w\.]+@([a-zA-Z0-9\-]{1,63}\.)+[a-zA-Z0-9\-]{1,63}$/)
	});

	UI.fn.validate = function () {
		return all(this.$);
	}
	UI.validate = validate;
}(UI, $);


;!function (UI, $) {

	$.extend(UI.fn, {
		/**
		 * on
		 * @param {String} type
		 * @param {Function} callback
		 */
		on: function (type, callback) {
			this.$.on('ui-' + type, callback);
			return this;
		},
		/**
		 * on
		 * @param {String} type
		 */
		trigger: function (type) {
			this.$.trigger('ui-' + type);
			return this;
		},
		/**
		 * scan
		 * @param {String} type
		 */
		scan: function (type) {
			var attr = 'data-' + type,
				self = this;
			if (type !== 'enter') {
				this.$.on(type, function (event) {
					var target = $(event.target).closest('[' + attr + ']'),
						uiType;
					if (target.length) {
						uiType = $.trim(target.attr(attr));
						return uiType && self.trigger(uiType);
					}
				});
			} else {
				this.$.on('keyup', '[data-enter]', function (event) {
					if (event.which === 13) {
						var uiType = $.trim($(event.target).attr(attr));
						return uiType && self.trigger(uiType);
					}
				});
			}
			return this;
		}
	});

}(UI, $);

;!function (UI, $) {

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

;!function (UI, $) {
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

;!function (UI, $) {
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

;!function (UI, $) {
	var _hasOwnProperty = Object.prototype.hasOwnProperty;

	function oop(foo) {
		foo.extend = oop.extend;
	}	

	$.extend(oop, {
		// 继承
		extend: function (protoProps, staticProps) {
			var parent = this,
				child;
			if (protoProps && _hasOwnProperty.call(protoProps, 'constructor')) {
				child = protoProps.constructor;
			} else {
				child = function () {
					return parent.apply(this, arguments);
				}
			}
			$.extend(child, parent, staticProps);
			function ctor() { 
				this.constructor = child; 
			}
			ctor.prototype = parent.prototype;
			child.prototype = new ctor();
			if (protoProps) $.extend(child.prototype, protoProps);

			child.__super__ = parent.prototype;
			return child;
		},
		// 组合
		merge: function (_this, instance, context) {
			if (context) {
				$.each(instance, function (key, value) {
					typeof value === 'function' ?
						 _this[key] = $.proxy(value, context) :
						 _this[key] = value;
				});
			} else {
				$.extend(_this, instance);
			}
		}
	});

	UI.oop = oop;

}(UI, $)

;!function (UI, $) {

	function Model(container, events) {
		var that = this;
		this._ = UI(container);
		if (events) {
			this.events = events;
			$.each(events, function (key, value) {
				that.on(key, value);
			});
		}
		this.init && this.init(arguments);
	}
	Model.prototype = {
		constructor: Model,
		scan: function (type) {
			this._.scan(type);
			return this;
		},
		on: function (type, callback) {
			this._.on(type, $.proxy(callback, this));
			return this;
		}
	}
	
	UI.oop(Model);
	UI.Model = Model;

}(UI, $)

;!function (UI, $) {

	UI.Form = UI.Model.extend({
		init: function () {
			if ($('input[data-validate]', this._.$).length) {
				UI.validate();
			}
			this.scan('click').scan('enter');
			return this;
		},
		validate: function () {
			return this._.validate();
		},
		post: function (api, data) {
			return UI.ajax.post(api, data);
		}
	});

}(UI, $)

;!function (UI) {
	UI.lang.validate = {
		email: 'Invalid email address.',
		mandatory: 'Input required.'
	};
}(UI);