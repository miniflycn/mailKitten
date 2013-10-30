!function (UI, $) {

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