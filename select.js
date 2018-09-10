var d = document,
	q = function (sel, target) {
		if (target === undefined) target = d;
		return target.querySelector(sel);
	},
	qA = function (sel, target) {
		if (target === undefined) target = d;
		return target.querySelectorAll(sel);
	},
	toggleIt = function (el, event) {
		if (el.className.indexOf('active_state') === -1) {
			el.className += ' active_state'
		} else {
			el.className = el.className.replace(' active_state', '');
		}
	},
	closestEls = function (selector, el_name, evt) {
		var target_el = evt.target,
			found = false;
		if (selector === '.') selector = 'class';
		else if (selector === '#') selector = 'id';
		while (found === false && target_el !== null) {
			if (target_el.getAttribute(selector) !== null && target_el.getAttribute(selector).indexOf(el_name) !== -1) {
				found = true;
			} else {
				target_el = target_el.parentElement;
			}
		}
		return target_el;
	},
	qM = function (el, n) {
		var f = false;
		n ? el = el : el = q(el);
		o = {
			ne: el,
			c: el.className,
			i: el.id,
			nearest: function (p, b) {
				while (f === false && el !== null) {
					b ? t = el.id : t = el.className;
					if (t.indexOf(p) !== -1) {
						f = true;
					} else {
						el = el.parentElement;
						t = el;
					}
				}
				return el;
			}
		}
		return o;
	};
window.addEventListener('load', function () {
	var isIE = false || !!document.documentMode,
		dropdownMenu = function (selector, select_name) {
			var selects = qA(selector + select_name);
			for (var i = 0; i < selects.length; i++) {
				if (selects[i].getAttribute('data-listening') !== 'true') {
					selects[i].addEventListener('click', function (evt) {
						isIE ? elem_tar = evt.srcElement : elem_tar = evt.target;
						var select_node = closestEls(selector, select_name, evt),
							select_class = select_node.className,
							hidden_input = q('.select_header input', select_node),
							select_head = q('.select_header span', select_node),
							h_text = select_head.innerHTML;
						for (var i = 0; i < selects.length; i++) {
							selects[i].className = selects[i].className.replace(' active_state', '');
						}
						if (select_class.indexOf('active_state') !== -1) {
							select_class = select_class.replace(' active_state', '');
							if (elem_tar.nodeName == 'LI') {
								var innered = elem_tar.innerHTML;
								select_head.innerHTML = innered;
								closestEls('.', 'select_block', evt).setAttribute('data-method', innered.toLowerCase());
								hidden_input.value = innered;
								if (closestEls('.', 'select_block', evt).className.indexOf('action_tab') == -1) elem_tar.innerHTML = h_text;
							}
						} else {
							setTimeout(function () {
								select_node.className += ' active_state';
							}, 10);
						}
					});
					selects[i].setAttribute('data-listening', 'true');
				}
			}
		};
	dropdownMenu('.', 'select_container');

	d.addEventListener('click', function () {
		var selects = qA('.select_container');
		for (var i = 0; i < selects.length; i++) {
			if (selects[i].className.indexOf('active') !== -1) {
				selects[i].className = selects[i].className.replace(' active', '');
			}
		}
	});
});