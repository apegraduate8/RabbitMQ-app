const http = require('http');
const Producer = require('./producer');
const Consumer = require('./consumer');

http.createServer((req, res) => {
  // start rabbitMQ consumer
    Consumer();
}).listen('4000', () => console.log('server running'));


//command to list queues
// sudo rabbitmqctl list_queues
