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
    
    //$BJ8;z!"?t<00J30$N$b$N$,4^$^$l$F$$$?$i%(%i!<(B
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
let sales = 0;
app.get("/stocker", function(req, res){
  try {
    switch (req.query.function) {
      case "addstock":
        if (!Number.isInteger(Number(req.query.amount))) {
          throw e;
           }
        Stocker.addStock(req.query.name, req.query.amount);
        res.send();
        break;
      case "checkstock":
        res.send(Stocker.checkStock(req.query.name));
        break;
      case "sell":
        sales += Stocker.sell(req.query.name, req.query.amount, req.query.price);
        console.log(sales);
        res.send();
        break;
      case "checksales":
        res.send("sales: "+sales);
      case "deleteall":
        sales = 0;
        Stocker.deleteAll();
        res.send();
        break;
    }
    console.log("test");
  } catch (e) {
    res.send("ERROR");
  }
});

var server = app.listen(80, function(){
    console.log("Node.js is listening to PORT:" + server.address().port);
});

