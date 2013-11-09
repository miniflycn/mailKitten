!function (UI, $) {
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
