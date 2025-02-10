const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  // 获取文件路径
  const filePath = path.join(__dirname, req.url === "/" ? "index.html" : req.url);
  
  // 读取文件
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("File not found!");
      return;
    }

    // 根据文件类型设置 Content-Type
    const extname = path.extname(filePath);
    let contentType = "text/html";
    switch (extname) {
      case ".js":
        contentType = "text/javascript";
        break;
      case ".css":
        contentType = "text/css";
        break;
      // 可添加更多 MIME 类型
    }

    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
});

const port = 3100;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});