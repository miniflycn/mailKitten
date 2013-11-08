!function (UI, $) {

	function Model(container) {
		this.container = UI(container);
	}
	Model.prototype = {
		constructor: Model,
		scan: function (type) {
			this.container.scan(type);
			return this;
		},
		on: function (type) {
			this.container.on(type);
			return this;
		}
	}

	$.extend(Model, {
		// 继承
		extend: function (protoProps, staticProps) {
			var parent = this,
				child;
			if (protoProps && 'constructor' in protoProps) {
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

	UI.Model = Model;

}(UI, $)