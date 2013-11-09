!function (UI, $) {
	var _hasOwnProperty = Object.prototype.hasOwnProperty;

	function oop(foo) {
		foo.extend = oop.extend;
	}	

	$.extend(oop, {
		// 继承
		extend: function (protoProps, staticProps) {
			var parent = this,
				child;
			if (protoProps && _hasOwnProperty.call(protoProps, 'constructor')) {
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

	UI.oop = oop;

}(UI, $)