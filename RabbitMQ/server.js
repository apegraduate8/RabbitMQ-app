let http = require('http');
let Producer = require('./producer');
const Consumer = require('./consumer');

//fake DB data
const users = [
  { id: 1, name: 'User 1' },
  { id: 2, name: 'User 2' },
  { id: 3, name: 'User 3' },
  { id: 4, name: 'User 4' }
]

const accountsByUserId = [
  { id: 1, name: 'My Account', userId: 1 },
  { id: 2, name: 'Backup Acccount', userId: 1 },
  { id: 3, name: 'Account 1', userId: 2 },
  { id: 4, name: 'Primary', userId: 3 },
  { id: 5, name: 'Secondary', userId: 3 },
  { id: 6, name: 'VIP', userId: 3 },
  { id: 7, name: 'VIP', userId: 4 }
]

function getAcctUsers(users, acctInfo) {
    let obj = {};
    let multipleAcctUsers = [];

    users.map((user) => {
        acctInfo.map((act) => {
             if (user.id === act.userId) {
                  if (obj[user.id]) {
                      obj[user.id]+=1;
                      if (obj[user.id] >= 2) {
                        multipleAcctUsers.push(user);
                      };
                  } else {
                       obj[user.id] = 1;
                  }
             }
         });
    })

   return [... new Set(multipleAcctUsers)];
}

function getVipAcctUsers(users, acctInfo) {
    let vipUsers = [];
    let vips = acctInfo.filter((acct) => acct.name === 'VIP');

    vips.map((acct) => {
        users.map(user => {
            if (user.id == acct.userId) return vipUsers.push(user);
        })
    });

    return vipUsers;
}

http.createServer((req, res) => {
    const url = req.url;
    // handles cors issue
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });

    if (url === '/setUser') {
        let body = '';

        if (req.method == 'POST') {
            req.on('data', function(data) {
                body+=data;
            }).on('end', () => {
                const json = JSON.parse(body);
                const newbody = {id: users.length+1, ...json.text};

                users.push(newbody);
                Producer('users', 'new user added!');
                res.end();
            });
        }
    }

    if (url === '/getUsers') {
        res.end(JSON.stringify(users));
    }
    if (url === '/getAcctUsers') {
        const userAccts = getAcctUsers(users, accountsByUserId);

        res.write(JSON.stringify(userAccts));
        res.end();
    }
    if (url === '/getVipAcctUsers') {
        const userAccts = getVipAcctUsers(users, accountsByUserId);

        res.write(JSON.stringify(userAccts));
        res.end();
    }
}).listen('8080', () => console.log('server running'));
