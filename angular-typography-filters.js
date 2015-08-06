(function() {
	'use strict';

	angular.module('angular-typography-filters',[])

	.filter('enDash', function() {
		return function(input) {
			if (input !== undefined && input !== null) {
				return input.replace(/-/, '–');
			}
		};
	})
	.filter('smartQuotes', function() {
		return function(input) {
			if (input !== undefined && input !== null) {
				return input
				.replace(/\s"/, ' “')
				.replace(/"\s/, '” ')
				.replace(/\s'/, ' ‘')
				.replace(/'\s/, '’ ')
				.replace(/^'/, '‘')
				.replace(/'$/, '’')
				.replace(/'/, '’');
			}
		};
	})
	.filter('widowFix', function() {
		return function(input) {
			if (input !== undefined && input !== null) {

				var wrapper= document.createElement('div');
				wrapper.innerHTML = input;

				var elems = wrapper.querySelectorAll('div, p, h1, h2, h3, h4');
				var minWords = 5;

				angular.forEach(elems, function(value, key){
					var htmlString = elems[key].innerHTML;
					htmlString = htmlString.replace(/>\s+</g,'');
					var wordArray = htmlString.trim().split(' ');
					if (wordArray.length > minWords) {
						wordArray[wordArray.length-2] += '\u00A0' + wordArray[wordArray.length-1];
						wordArray.pop();
						htmlString = wordArray.join(' ');
					}
					elems[key].innerHTML = htmlString;
				});

				return wrapper.innerHTML;
			}
		};
	})
	.filter('htmlToPlaintext', function() {
		return function(input) {
			if (input !== undefined && input !== null) {
				// Untested
				return input
				.replace(/(<([^>]+)>)/ig,"");
			}
		};
	})
	.filter('stripPTags', function() {
		return function(input) {
			if (input !== undefined && input !== null) {
				return input
				.replace("<p>", "")
				.replace("</p>", "");
			}
		};
	})
	.filter('noneBreaking', function() {
		return function(input) {
			if (input !== undefined && input !== null) {
				return input.replace(/ /g, "&nbsp;");
			}
		};
	});

})();