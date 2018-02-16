const app = require("express")();
const http = require('http').Server(app);
const basicAuth = require('basic-auth-connect');

//Task1
app.get('/', function(req, res){
  res.send('AMAZON');
});

//Task2
app.all('/secret', basicAuth(function(user, password) {
    return user === 'amazon' && password === 'candidate';
}));

app.get('/secret', function(req, res){
  res.send('SUCCESS');
});

var server = app.listen(80, function(){
    console.log("Node.js is listening to PORT:" + server.address().port);
});

