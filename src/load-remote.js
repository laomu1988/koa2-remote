/**
 * 加载网路数据
 * 判断是否是本地文件
 **/
var request = require('request');
var fs = require('fs');

function handleHeader(header) {
  if (!header) {
    return;
  }
  for (var attr in header) {
    var trim = attr.trim();
    if (trim.toLowerCase() == 'content-length') {
      delete header[attr];
    }
    else if (trim != attr) {
      header[trim] = header[attr];
      delete header[attr];
    }
  }
  return header;
}

module.exports = function (config) {
  return function (ctx, next) {
    var req = ctx.request, res = ctx.response;
    if (res.body || (res.status && res.status != 404) || ctx.remote === false) return next();
    var uri = req.url.indexOf('http') === 0 ? req.url : req.protocol + '://' + req.host + req.url;
    req.header['accept-encoding'] = 'deflate'; // 避免gzip压缩
    // ctx.request.header['connection'] = 'close'; // 取消keep-alive
    // ctx.request.header['proxy-connection'] = 'close'; // 代理

    // 添加from标签,避免从本地重复请求
    if (req.header['__koa2_remote'] == 'koa2-remote') {
      return next();
    }
    req.header['__koa2_remote'] = 'koa2-remote';
    var reqdata = {
      uri: uri,
      method: ctx.method,
      headers: handleHeader(ctx.request.header),
      encoding: null
    };
    if (ctx.request.body) {
      reqdata.form = ctx.request.body;
    }
    return new Promise(function (resolve, reject) {
      request(reqdata, function (err, response, body) {
        try {
          delete req.header.__koa2_remote; // 删除增加的header标记
          if (err) {
            res.status = 500;
            res.body = '**** got error when load from remote url: ' + url + ' ****<br>' + JSON.stringify(err);
          } else {
            res.status = response.statusCode;
            var header = handleHeader(response.headers);
            delete header['content-length']; // 避免长度和设置body长度不一致问题
            delete header['transfer-encoding']; // 删除该字段，因为现在是下载完毕处理后才发送
            res.set(header);
            res.body = body;
          }
        } catch (err) {
          res.status = 504;
          res.body = '**** got error when set data to response(url: ' + url + ') ****<br>' + JSON.stringify(err);
        }
        resolve(next());
      });
    });
  };
};