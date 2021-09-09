const path = require('path');
const Koa = require('koa');
const koaStatic = require('koa-static');
const Router = require('koa-router');

const app = new Koa();

app.use(async (ctx, next) => {
  // Так как frontend на ходится на сервере, то CORS не нужен.
  // ctx.response.set('Access-Control-Allow-Origin', '*');
  await next();
});

const dirPublic = path.join(__dirname, 'public');
app.use(koaStatic(dirPublic));

const router = new Router();
app.use(router.routes());
app.use(router.allowedMethods());

router.get('/', async (ctx) => {
  ctx.response.body = JSON.stringify({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Koa server has been started on port ${PORT} ...`));
