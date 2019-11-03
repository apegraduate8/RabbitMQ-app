## **Must have `RabbitMQ` installed
## **Must have `Node` installed

## REFERENCES
- [RabbitMQ intall](https://www.rabbitmq.com/download.html)
- [Node install](https://nodejs.org/en/download/)

Open up 4 terminals and in each, cd to the repo folder, or wherever you cloned the repo

One terminal will be for `React` in which you run the following command
## `npm start`
this should open up http://localhost:3000/ in a new chrome browser window
_**You might be required to run nom install first_

Second terminal will be where you start the `RabbitMQ` server 
First cd into `Documents/shutterstock-app/messages/RabbitMQ`
Then run the following command
 ## `rabbitmq-server`

Third terminal will be where you run the `rabbitmq consumer process`
while in the same directory `Documents/shutterstock-app/messages/RabbitMQ`
Run ## `node consumer.js`
Then open a new browser window and navigate to http://localhost:4000/
Once you navigate there you should see a message in your terminal that says
`[*] Waiting for messages in users. To exit press CTRL+C`


Fourth terminal will be where you run the `main Node server` for the web app on http://localhost:3000/
In the same directory `Documents/shutterstock-app/messages/RabbitMQ`
Run ## `node server.js`
You will see `server running` in the terminal

### MAIN ACTIONS

In the web app you can filter by select options:
1. Users with 2 accounts
2. Users with primary accounts

You can also add new users. Whenever you add a new user, a new messaged is published to rabbitmq
check your main node server terminal and you consumer terminal to see when a new message is published and then received.

**When adding a new user by name, be sure not to use any special characters or digits!

# Try adding a new user:
In the main node terminal you will see
 `[x] Sent messgae - new user added!`
And in the rabbitmq terminal you will see
`[x] Received - new user added!`

