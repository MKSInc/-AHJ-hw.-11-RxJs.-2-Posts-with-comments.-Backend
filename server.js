const path = require('path');
const Koa = require('koa');
const koaStatic = require('koa-static');
const Router = require('koa-router');
const PostsGenerator = require('./js/PostsGenerator');

const postGenerator = new PostsGenerator();
postGenerator.generate();

const app = new Koa();

app.use(async (ctx, next) => {
	// Так как frontend на ходится на сервере, то CORS не нужен.
	// ctx.response.set('Access-Control-Allow-Origin', 'http://localhost:8080');

	// ajax (rxjs) отправляет запрос с заголовком 'X-Requested-With'.
	// Нужно разрешать, если фронтенд на другом домене.
	// ctx.response.set('Access-Control-Allow-Headers', 'X-Requested-With');
	await next();
});

const dirPublic = path.join(__dirname, 'public');
app.use(koaStatic(dirPublic));

const router = new Router();
app.use(router.routes());
app.use(router.allowedMethods());

router.get('/posts/latest', async (ctx) => {
	const response = {
		status: 'ok',
		data: postGenerator.posts,
	};

	ctx.response.body = JSON.stringify(response);
});

router.get('/posts/:id/comments/latest', async (ctx) => {
	const { id } = ctx.params;

	const response = {
		status: 'ok',
		data: postGenerator.comments.get(id),
	};

	ctx.response.body = JSON.stringify(response);
});

router.get('/posts/refresh', async (ctx) => {
	postGenerator.generate();

	const response = {
		status: 'ok',
		data: 'New posts generated.',
	};

	ctx.response.body = JSON.stringify(response);
});

const PORT = process.env.PORT || 3000;
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Koa server has been started on port ${PORT} ...`));
