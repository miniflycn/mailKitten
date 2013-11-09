!function (UI, $) {

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