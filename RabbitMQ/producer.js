const amqp = require('amqplib/callback_api');

module.exports = (queue, msg) => {
    amqp.connect('amqp://localhost?port=8000', function(error, connection) {
      if (error) {
        throw error;
      }

      connection.createChannel(function(error, channel) {
          if (error) {
            throw error;
          }

          channel.assertQueue('users', {durable: false});

          // msg should occur when the user list has been updated
          // msg must be a buffer object

          channel.sendToQueue(queue, Buffer.from(msg), {persistent: true});
          console.log(" [x] Sent messgae - %s", msg);


          process.on('exit', (code) => {
             channel.close();
             console.log(`Closing rabbitmq channel`);
          });
      });
  });
}
