const zlib = require("zlib");

function processImage(socket, data) {
  const response = data.toString().replace(/data-src/g, "src");
  return response;
}

module.exports = { processImage };
