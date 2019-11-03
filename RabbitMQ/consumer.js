const amqp = require('amqplib/callback_api');

module.exports = () => {
    amqp.connect('amqp://localhost?port=8000', function(error, connection) {
        if (error) {
            throw error;
        }
        connection.createChannel(function(error, channel) {
            if (error) {
                throw error;
            }

            channel.assertQueue('users', {durable: false});

            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", 'users');

            channel.consume('users', function(msg) {
                setTimeout(() => {console.log(" [x] Received - %s", msg.content);}, 3000);
                // channel.ack(msg); - this throws an error when ACK messages on a different channel than that they arrive on
            }, {
                noAck: true
            });
        });
    });
}



// ----------- REFERENCES ---------------
// https://medium.com/better-programming/implementing-rabbitmq-with-node-js-93e15a44a9cc
//https://blog.logrocket.com/getting-started-with-react-select/

//https://itnext.io/how-to-handle-the-post-request-body-in-node-js-without-using-a-framework-cd2038b93190

//hombrew fix
// https://github.com/Homebrew/brew/issues/5734
//https://github.com/Homebrew/brew/issues/5735#issuecomment-463682016

//install rabbitmq
// https://www.rabbitmq.com/install-homebrew.html

// related to error - amqplib connect ECONNREFUSED 127.0.0.1:5672 at TCPConnectWrap.afterConnect [as oncomplete]
// https://github.com/squaremo/amqp.node/issues/382

// http://www.squaremobius.net/amqp.node/channel_api.html#connect
//https://www.grzegorowski.com/rabbitmq-406-channel-closed-precondition-failed
