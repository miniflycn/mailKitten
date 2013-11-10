!function (UI, $) {

	/**
	 * Model
	 * @class
	 * @param {String} container
	 * @param {Object} events
	 */
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
		/**
		 * scan
		 * @param {String} type
		 */
		scan: function (type) {
			this._.scan(type);
			return this;
		},
		/**
		 * on
		 * @param {String} type
		 * @param {Function} callback
		 */
		on: function (type, callback) {
			this._.on(type, $.proxy(callback, this));
			return this;
		}
	}
	
	UI.oop(Model);
	UI.Model = Model;

}(UI, $)