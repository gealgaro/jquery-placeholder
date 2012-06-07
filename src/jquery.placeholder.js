/*
Placeholder v0.1
Release Date: Jun 7, 2012

Copyright (c) 2012 German Garcia

Requires jQuery v1.7.x

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

(function($) {
	$.fn.placeholder = function() {
		return this.each(function() {
			var _self = $(this);
			var selector = [
				'input[type=text][data-placeholder]',
				'input[type=password][data-placeholder]',
				'input[type=email][data-placeholder]',
				// 'select[data-placeholder]', // Use chosen.js it's a great alternative => http://harvesthq.github.com/chosen/
				'textarea[data-placeholder]'
			];
			var _elements = _self.find(selector.join(','));

			_elements.each(function(index, currentElement) {
				$(currentElement).on('focus', function(){
					hidePlaceholder($(currentElement));
				}).on('blur', function(){
					showPlaceholder($(currentElement));
				}).blur();
			});

			function hidePlaceholder(element) {
				if (isPasswordField(element)) {
					// Shouldn't do anything
				} else if (isSelectField(element)) {
					// Use chosen.js it's a great alternative => http://harvesthq.github.com/chosen/
				} else if (getValue(element).length > 0 && getValue(element)===element.attr('data-placeholder')) setValue(element, '');
			};

			function showPlaceholder(element) {
				if (isPasswordField(element)) {
					if (getValue(element).length == 0) {
						getPasswordPlaceholderFieldFor(element).show();
						element.hide();
					}
				} else if (isSelectField(element)) {
					// Use chosen.js it's a great alternative => http://harvesthq.github.com/chosen/
				} else if (getValue(element).length == 0) setValue(element, element.attr('data-placeholder'));
			};

			function getValue(element) {
				switch ($(element).get(0).tagName) {
					case 'INPUT':						
					case 'TEXTAREA':
						return element.attr('value');
						break;
					default:
				  	// In the future if debug is enabled, show error message describing element
				}
			}

			function setValue(element, value) {
				switch ($(element).get(0).tagName) {
					case 'INPUT':
					case 'TEXTAREA':
						element.attr('value', value);
						break;
					default:
				  	// In the future if debug is enabled, show error message describing element
				}
			};

			function isPasswordField(element) {
				return ($(element).get(0).tagName == 'INPUT' && element.attr('type').toLowerCase() == "password");
			};

			function isSelectField(element) {
				return ($(element).get(0).tagName == 'SELECT');
			};

			function getPasswordPlaceholderFieldFor(element) {
				var passfield = null;
				if ($(element).attr('data-placeholder-aux')) {
					passfield = $(element).siblings('#'+$(element).attr('data-placeholder-aux'));
				} else {
					var random_id = Math.random().toString().replace(/[0|\\.]*/,'');
					passfield = element.clone();
					$(element).attr('data-placeholder-aux', 'pwd-'+random_id);
					passfield.attr('type', 'text').attr('id', $(element).attr('data-placeholder-aux'));
					passfield.val($(element).attr('data-placeholder')).hide();
					// Add events
					$(passfield).on('focus', function() {
						passfield.hide();
						element.show();
						element.focus();
					});
					element.after(passfield);
				}
				return passfield;
			};
		}); // end return
	}; // end placeholder
})(jQuery);
