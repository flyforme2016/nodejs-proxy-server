const net = require("net");
const { processImage } = require("./image-processor");

const WEB_SERVER_ADDRESS = process.env.WEB_SERVER_ADDRESS;
const WEB_SERVER_PORT = process.env.WEB_SERVER_PORT;

// 프록시 서버 생성
function startServer(localPort) {
  const server = net.createServer((clientSocket) => {
    console.log("Client connected");
    // 웹 서버로 연결
    const serverSocket = net.createConnection(
      {
        host: WEB_SERVER_ADDRESS,
        port: WEB_SERVER_PORT,
      },
      () => {
        console.log("Connected to web server.\n");
      }
    );

    // 클라이언트로부터 데이터를 받으면 웹 서버로 전달
    clientSocket.on("data", (data) => {
      console.log(`Data from client: ${data.toString()}\n`);
      serverSocket.write(data);
    });

    // 웹 서버로부터 데이터를 받으면 클라이언트로 전달
    serverSocket.on("data", (data) => {
      const response = processImage(clientSocket, data);
      clientSocket.write(response);
    });
  });
  // 프록시 서버 리스닝 시작
  server.listen(localPort, () => {
    console.log(`Proxy server listening on port ${localPort}\n`);
  });
}

module.exports = { startServer };
