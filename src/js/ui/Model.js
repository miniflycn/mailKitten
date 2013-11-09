!function (UI, $) {

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