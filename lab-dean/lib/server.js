'use strict';

//Application dependencies
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./error-handler.js');

//Application setup
const app = express();
const PORT = process.env.PORT;
const router = express.Router();
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use('/api/v1', router);
require('../route/route-toy.js')(router);
app.use('/{0,}', (req, res) => errorHandler(new Error('Path error. Route not found.'), res));

//Server controls
const server = module.exports = {};
server.start = () => {
  return new Promise((resolve, reject) => {
    if(server.isOn) return reject(new Error('Server already running.'));
    
    server.http = app.listen(PORT, () => {
      console.log(`Listening on ${PORT}`);
      server.isOn = true;
      server.db = mongoose.connect(MONGODB_URI);
      return resolve(server);
    });
  });
};

server.stop = () => {
  return new Promise((resolve, reject) => {
    if(!server.isOn) return reject(new Error('Server not running, cannot shut down.'));

    server.http.close(() => {
      console.log('Shutting down server');
      server.db.disconnect();
      server.isOn = false;
      return resolve(server);
    });
  });
}; 