!function (UI, $) {

	$.extend(UI.fn, {
		/**
		 * alert
		 * @param {String} type
		 * @param {String} msg
		 */
		alert: function (type, msg) {
			var alert = $([
				'<div class="alert alert-',
				type,
				' alert-dismissable">',
				'<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>',
				msg,
				'</div>'
			].join(''));

			this.$.append(alert);
			setTimeout(function () {
				alert.alert('close');
			}, 5000);

			return this;
		}
	});

}(UI, $);