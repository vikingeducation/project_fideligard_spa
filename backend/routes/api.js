const router = require('koa-router')();

router.prefix('api');

router.get('/', async (ctx, next) => {
	ctx.body = 'API INDEX';
});

router.get('/string', async (ctx, next) => {
	ctx.body = 'koa2 string';
});

router.get('/json', async (ctx, next) => {
	ctx.body = {
		title: 'koa2 json'
	};
});

module.exports = router;
