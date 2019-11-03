let http = require('http');
let port = '4000';
let Producer = require('./producer');
const Consumer = require('./consumer');

http.createServer((req, res) => {
  // start rabbitMQ consumer
    Consumer();
}).listen(port, () => console.log('server running'));


//list queues
// sudo rabbitmqctl list_queues
