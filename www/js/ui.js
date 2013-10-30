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

	$.extend(UI.fn, {
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
		}
	});

	UI.lang = {};

	UI.validate = function () {
		$(document).on('focusout', 'input[data-validate]', function (event) {
			var ele = $(event.target),
				valids = $(ele).attr('data-validate').split(/\s+/),
				value = ele.val(),
				group = ele.closest('.form-group'),
				helper = $('.help-error', group),
				len = valids.length,
				valid;

			for (var i = 0; i < len; i++) {
				valid = valids[i];
				if (!UI.validate[valid](value)) {
					group.addClass('has-error');
					helper.html(UI.lang.validate[valid]);
					return;
				}
			}
			group.removeClass('has-error');
			helper.empty();
		});
	};
	$.extend(UI.validate, {
		isEmail: (/^[\w\.]+@([a-zA-Z0-9\-]{1,63}\.)+[a-zA-Z0-9\-]{1,63}$/),
		email: function (value) {
			if (!$.trim(value)) {
				return true;
			}
			value = $.trim(value.toLowerCase());
			return this.isEmail.test(value);
		},
		mandatory: function (value) {
			return !!value;
		}
	});
	UI.lang.validate = {
		email: 'Invalid email address.',
		mandatory: 'Input required.'
	};

	// Init	
	$(document).ready(function () {
		if ($('input[data-validate]').length) {
			UI.validate();
		}
	});

	window.UI = UI;
}($);