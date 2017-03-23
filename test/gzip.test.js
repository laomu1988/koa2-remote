/**
 * 测试修改uri但是不修改header中的host
 * */
var zlib = require('zlib');
var fs = require('fs');
var request = require('request-promise');

var str = fs.readFileSync(__dirname + '/totop.js', 'utf8');
var com = zlib.gzipSync(str);
console.log('压缩前:', str);
console.log('压缩后：', com);
console.log('解压后:', zlib.gunzipSync(com) + '');

request({
    uri: 'http://laomu1988.github.io/img/author.png',
    method: 'GET',
    encoding: null,
    headers: {
        "Accept": "*/*",
        "Accept-Encoding": "deflate, sdch",
        "Accept-Language": "zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Cookie": "Hm_lvt_69a2b0bd5dff867fbf5566c7bea5b95d=1482140223; Hm_lvt_e6d1f421bbc9962127a50488f9ed37d1=1483082802,1484024456,1484040357,1484102481; Hm_lpvt_e6d1f421bbc9962127a50488f9ed37d1=1484120107; Hm_lvt_171566b3d4f03c9c68c8f2c7a42d4b0e=1483582912,1484024309,1484040357,1484102482; Hm_lpvt_171566b3d4f03c9c68c8f2c7a42d4b0e=1484124319",
        "Host": "laomu1988.github.io",
        "Pragma": "no-cache",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36"
    },
    resolveWithFullResponse: true
}).then(function (res) {
    console.log(typeof res);
    console.log(typeof res.body);
    console.log(res.headers);
    console.log(res.statusCode);

    fs.writeFileSync(__dirname + '/test.png', res.body);
    // console.log(zlib.gunzipSync(res.body) + '');


    // console.log(res.body.charCodeAt(0));
    // console.log(res.body.charCodeAt(1));
    // console.log(res.body.charCodeAt(2));
    // console.log(res.body.charCodeAt(3));
    // console.log(res.body.charCodeAt(4));
    // console.log(res.body.charCodeAt(5));
    // console.log(res.body.charCodeAt(6));
    // console.log(res.body.charCodeAt(7));
    // console.log(res.body.charCodeAt(8));
    // console.log(res.body.charCodeAt(9));
    // console.log(res.body.charCodeAt(10));
    // console.log(res.body.charCodeAt(11));
    // console.log(res.body.charCodeAt(12));
    // console.log(res.body.charCodeAt(13));
    // fs.writeFileSync(__dirname + '/test.js', res.body);

}).catch(function (err) {
    console.log(err);
});
