const app = require("express")();
const http = require("http").Server(app);
const basicAuth = require("basic-auth-connect");
const eval = require("eval")
const Stocker = require("./stocker.js");

//Task1
app.get("/", function(req, res){
  res.send("AMAZON");
});

//Task2
app.all("/secret", basicAuth(function(user, password) {
    return user === "amazon" && password === "candidate";
}));

app.get("/secret", function(req, res){
  res.send("SUCCESS");
});

//Task3
app.get("/calc", function(req, res){
  try {
    let recivedValue = req.url.split("?");
    let caliculateFormula = recivedValue[1];
    
    //文字、数式以外のものが含まれていたらエラー
    let excludePattern = /[^(\+\-\*\/0-9)]/g;
    if (caliculateFormula.match(excludePattern) ) {
      throw e;
    }

    let caliculateResult = eval("let result = " + caliculateFormula + "; exports.result = result")
    res.send(String(caliculateResult.result));
  } catch (e) {
    res.send("ERROR");
  }
});

//Task4
app.get("/stocker", function(req, res){
  console.log(req.query);
  console.log(req.query.function);
  console.log(req.query.name);
  console.log(req.query.amount);
  switch (req.query.function) {
    case "addstock":
      Stocker.addstock(req.query.name, req.query.amount);
      break;
    case "checkstock":
    case "sell":
    case "checksales":
    case "deleteall":
  }
  res.send("SUCCESS");
});

var server = app.listen(80, function(){
    console.log("Node.js is listening to PORT:" + server.address().port);
});

