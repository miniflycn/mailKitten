!function (UI, $) {

	UI.Form = UI.Model.extend({
		/**
		 * init
		 */
		init: function () {
			if ($('input[data-validate]', this._.$).length) {
				UI.validate();
			}
			this.scan('click').scan('enter');
			return this;
		},
		/**
		 * validate
		 */
		validate: function () {
			return this._.validate();
		},
		/**
		 * post
		 * @param {String} api
		 * @param {Object} data
		 */
		post: function (api, data) {
			return UI.ajax.post(api, data);
		},

		/**
		 * get
		 * @param {String} api
		 */
		get: function (api) {
			return UI.ajax.get(api);
		}
	});

}(UI, $)