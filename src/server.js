// server.js
const express = require('express');
const http = require('http');

class Server {
  constructor(port) {
    this.port = port;
    this.app = express();
    this.server = http.createServer(this.app);
  }

  start() {
    this.server.listen(this.port, () => {
      console.log(`Server listening on http://localhost:${this.port}`);
    });
  }

  useMiddleware(middleware) {
    this.app.use(middleware);
  }

  useRoutes(routes) {
    this.app.use(routes);
  }
}

module.exports = Server;
