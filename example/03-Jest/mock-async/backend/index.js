/*
 * @Description: 
 * @Author: linjy
 * @Date: 2019-08-08 15:34:07
 * @LastEditTime: 2019-08-09 14:28:21
 * @LastEditors: linjy
 */
const http = require("http");
const PORT = 8089;

// 创建一个 http 服务
const server = http.createServer((request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "PUT"); // 预请求时，增加除了GET，POST返回允许实际请求的方法
  response.end(`{"name": "Jecyu", "age": 25}`);
});

// 启动服务，监听端口
server.listen(PORT, () => {
  console.log("服务启动成功，正在监听: ", PORT);
});
