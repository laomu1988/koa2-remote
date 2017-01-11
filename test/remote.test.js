var koa = require('koa');
var app = new koa();

var remote = require('../lib/load-remote');

app.use(function (ctx, next) {
  var req = ctx.request;
  console.log('url:', req.protocol + '://' + req.host + req.url);
  // 修改host,后面转发地址将使用新的host地址
  req.header.host = 'laomu1988.github.io';
  return next();
});

app.use(remote());


app.listen(3010, function (err) {
  err && console.log(err) || console.log('start server at http://localhost:3010/index.html');
});