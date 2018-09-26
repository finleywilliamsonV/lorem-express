const express = require('express');
const router = express.Router();
const loremIpsumGenerator = require('.././loremIpsumGenerator');

// GET /
router.get('/', function(req, res, next) {
	return res.render('index', { title: 'Home' });
});

// POST /
router.post('/', function(req, res, next) {
	console.log(req.body);

	// use default values if none specified
	if (!req.body.quantitiy || req.body.quantity < 0) {
		if (!req.body.quantity || req.body.quantity <= 0) {
			if (req.body.typeSelected === 'Paragraphs') {
				req.body.quantity = 3;
			} else if (req.body.typeSelected === 'Words') {
				req.body.quantity = 100;
			} else {
				req.body.quantity = 10;
			}
		}
	}

	let tempText = loremIpsumGenerator.generateText(
		req.body.quantity,
		req.body.typeSelected,
		req.body.variety,
		function(result) {
			let values = {
				quantity_selected: req.body.quantity,
				type_selected: req.body.typeSelected,
				variety_selected: req.body.variety,
				generated_text: result,
			};

			return res.render('index', { values: values });
		}
	);
});

module.exports = router;
