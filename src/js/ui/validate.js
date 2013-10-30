!function (UI, $) {
	function validate() {
		$(document).on('focusout', 'input[data-validate]', function (event) {
			return one(event.target);
		});
	}

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
		},
		one: one,
		all: all
	});

	UI.validate = validate;
}(UI, $);
