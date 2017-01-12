/**
 * 测试修改uri但是不修改header中的host
 * */

var request = require('request');
request({
  uri: 'http://localhost:8888/index.html',
  method: 'GET',
  headers: {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Encoding": "deflate",
    "Accept-Language": "zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Cookie": "Hm_lvt_69a2b0bd5dff867fbf5566c7bea5b95d=1482140223; Hm_lvt_e6d1f421bbc9962127a50488f9ed37d1=1483082802,1484024456,1484040357,1484102481; Hm_lpvt_e6d1f421bbc9962127a50488f9ed37d1=1484120107; Hm_lvt_171566b3d4f03c9c68c8f2c7a42d4b0e=1483582912,1484024309,1484040357,1484102482; Hm_lpvt_171566b3d4f03c9c68c8f2c7a42d4b0e=1484124319",
    "Host": "laomu1988.github.io",
    "Pragma": "no-cache",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36"
  }
}, function (err, response, body) {
  if (err) console.log(err);
  if (body) console.log(body);
});