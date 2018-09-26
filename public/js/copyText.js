// select copy button
const copyButton = $('#copy-button');

// select generated text node
const generatedTextNode = document.getElementById('lorem-ipsum-text');

// create popover
copyButton.popover({
	container: 'body',
	placement: 'top',
	content: function() {
		if (generatedTextNode.innerHTML === '') {
			return 'No Text to Copy!';
		} else {
			return 'Copied to Clipboard!';
		}
	},
});

// copy generated text on click
copyButton.click(function(e) {
	e.preventDefault();
	const range = document.createRange();
	range.selectNode(generatedTextNode);
	window.getSelection().addRange(range);

	try {
		const successful = document.execCommand('copy');
	} catch (e) {
		console.log('Unable to copy');
	}

	setTimeout(function() {
		copyButton.popover('hide');
	}, 1000);
});
