// 애플리케이션 진입점
require("dotenv").config();
const { startServer } = require("./server");

const port = process.env.LOCAL_PORT;

startServer(port);
