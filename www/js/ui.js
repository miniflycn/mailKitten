/*!
 * mailKitten-UI
 * Bootstrap like UI libaray
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

	window.UI = UI;
}($);

;!function (UI, $) {

	$.extend(UI.fn, {
		/**
		 * warning
		 * @param {String} msg
		 */
		warning: function (msg) {
			var alert = $([
				'<div class="alert alert-warning alert-dismissable">',
				'<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>',
				'<strong>Warning!</strong> ',
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
				helper.html(UI.lang.validate[valid]);
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

	// Init	
	$(document).ready(function () {
		if ($('input[data-validate]').length) {
			validate();
		}
	});

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
				this.$.on(type, '[' + attr + ']', function (event) {
					var uiType = $.trim($(event.target).attr(attr));
					return uiType && self.trigger(uiType);
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

;!function (UI) {
	UI.lang.validate = {
		email: 'Invalid email address.',
		mandatory: 'Input required.'
	};
}(UI);