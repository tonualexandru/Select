var closestEl = function (selector, el_name, ev) {
    var target_el = ev.target,
        found = false;
        if (selector === '.') selector = 'class'
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
	dropdownMenu = function (selector, select_name) {
		var li_def = document.querySelector('.select_body li').className,
			li_dis = document.querySelector('.select_body li.disabled'),
			selects = document.querySelectorAll(selector + select_name),
			firstLower = function(text_string) {
				return text_string.split(' ')[0].toLowerCase();
			};
			if (li_dis !== null) {
				li_dis.addEventListener('click', function(event) {
					event.preventDefault();
				})
			}
		for (var i = 0; i < selects.length; i++) {
			selects[i].addEventListener('click', function(evt){
				var select_node = closestEl(selector, select_name, event),
					select_class = select_node.className,
					hidden_input = select_node.querySelector('.select_header input'),
					select_head = select_node.querySelector('.select_header span');
				for (var i = 0; i < selects.length; i++) {
					selects[i].className = selects[i].className.replace(' active', '');
				}
				if (select_class.indexOf('active') !== -1) {
					select_node.className = select_class.replace(' active', '')
					if (evt.target.nodeName == 'LI' && evt.target.className.indexOf('disabled') === -1) {
						select_head.innerHTML = evt.target.innerText;
						hidden_input.value = firstLower(evt.target.innerText);
						var li_items = select_node.querySelectorAll('ul li');
						for (var i = 0; i < li_items.length; i++) {
							li_items[i].className = li_def;
						}
						evt.target.className = li_def+' disabled';
					} else if (evt.srcElement == 'LI' && evt.srcElement.className.indexOf('disabled') === -1) {
						select_head.innerHTML = evt.srcElement.innerText;
						hidden_input.value = firstLower(evt.srcElement.innerText);
						var li_items = select_node.querySelectorAll('ul li');
						for (var i = 0; i < li_items.length; i++) {
							li_items[i].className = li_def;
						}
						evt.srcElement.className = li_def+' disabled';
					}
				} else {
					setTimeout(function() {select_node.className += ' active';},10);
				}
			});
		}
	};

window.onload = function () {
	dropdownMenu('.','select_container');

	document.addEventListener('click', function(){
		var selects = document.querySelectorAll('.select_container');
		for (var i = 0; i < selects.length; i++) {
			if (selects[i].className.indexOf('active') !== -1) {
				selects[i].className = selects[i].className.replace(' active', '');
			}
		}
	});
};


