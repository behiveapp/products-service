const mongoose = require('mongoose');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const app = require('./src/app');

const connectMongo = () => {
  const {MONGO_URL = 'localhost:3001/sellers'} = process.env;
  return mongoose.connect(MONGO_URL);
}

const startNodeCluster = () => {
  const {HOST = '0.0.0.0', PORT = 3000} = process.env;
  if (cluster.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
  
    cluster.on('exit', (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}. Starting a new worker`);
      cluster.fork();
    });
  
    console.log(`Application listening at http://${HOST}:${PORT}`);
  } else {
    app.listen(PORT, HOST);
    console.log(`Application was forked at process ${cluster.worker.process.pid}`);
  }
}

connectMongo()
  .then(startNodeCluster)
  .catch(console.log);