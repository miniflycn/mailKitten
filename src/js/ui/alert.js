!function (UI, $) {

	$.extend(UI.fn, {
		/**
		 * warning
		 * @param {String} msg
		 */
		warning: function (msg) {
			var alert = $([
				'<div class="alert alert-warning alert-dismissable">',
				'<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>',
				'<strong>Warning!</strong> ',
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