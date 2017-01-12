# 从远程服务器加载数据

* 从远程加载数据
* 转发并处理header,避免header非法异常(例如多余空格等)
* 取消gzip压缩,避免解析问题(待改进)
* 加载文本内容(html,css,js)
* 加载二进制内容(图片)


## 安装
```
npm install koa@next --save
npm install koa2-remote --save
```

## 使用
```
var koa = require('koa');
var app = new koa();

var remote = require('koa2-remote');

app.use(function (ctx, next) {
  var req = ctx.request;
  console.log('url:', req.protocol + '://' + req.host + req.url);
  // 修改host,后面转发地址将使用新的host地址(header内容也将被修改)
  req.header.host = 'laomu1988.github.io';
  return next();
});

// 判断是否存在数据,假如不存在数据则从远程加载
app.use(remote());

app.listen(3000, function (err) {
  err && console.log(err) || console.log('start server at http://localhost:3000/index.html');
});

```
假如想把请求转发到某台机器上,但是不修改其中的header,可以这样配置
```
app.use(function(ctx) {
    ctx.remote = ctx.remote || {};
    ctx.remote.host = 'otherhost'; // 只修改host
    // 或者ctx.remote = ctx.protocol + '://otherhost' + ctx.url  // 直接计算新的请求地址
    // ctx.remote.url = 'otherurl';  // 只修改请求url
    // ctx.remote.protocol = 'https';  // 只修改请求protocol
});
```
ctx.remote可以是一个false、字符串或者plain object
    - 假如是false将不会进行转发
    - 是字符串时,将直接请求这个地址
    - 是plain object时,假如其中定义有protocol,host,url,则将使用配合ctx.request重新计算新的请求地址


## todo: 
* [x] url中是否包含端口: header的host包含端口,hostname不包含端口
* [x] response是否包含status: statusCode
* [x] 向某一个地址转发请求但是host保持原样(不修改header中的host): 增加ctx.remote表示远程请求地址
* [ ] gzip压缩与解压
