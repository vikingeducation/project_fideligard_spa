var express = require('express');
var router = express.Router();
const { quandlManager } = require('../utils');

router.get('/', function(req, res, next) {
	res.json({ response: 'success' });
});

router.get('/stocks', async (req, res) => {
	const params = {
		limit: 10
	};

	const response = await quandlManager.get();

	res.json({
		response: response
	});
});

module.exports = router;
