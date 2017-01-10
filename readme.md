# 从远程服务器加载数据

* 从远程加载数据
* 转发并处理header,避免header非法异常(例如多余空格等)
* 取消gzip压缩,避免解析问题(待改进)
* 加载文本内容(html,css,js)
* 加载二进制内容(图片)

## todo: 
* [x] url中是否包含端口: header的host包含端口,hostname不包含端口
* [ ] 向某一个地址转发请求但是host保持原样(不修改header中的host)
* [ ] gzip压缩与解压
