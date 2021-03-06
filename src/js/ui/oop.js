!function (UI, $) {
	var _hasOwnProperty = Object.prototype.hasOwnProperty;

	function oop(foo) {
		foo.extend = oop.extend;
	}	

	$.extend(oop, {
		/**
		 * extend
		 * @param {Object} protoProps
		 * @param {Object} staticProps
		 */
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
		/**
		 * merge
		 * @param {Object} that
		 * @param {Object} instance
		 * @param {Object} context
		 */
		merge: function (that, instance, context) {
			if (context) {
				$.each(instance, function (key, value) {
					typeof value === 'function' ?
						 that[key] = $.proxy(value, context) :
						 that[key] = value;
				});
			} else {
				$.extend(that, instance);
			}
		}
	});

	UI.oop = oop;

}(UI, $)