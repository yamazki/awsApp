const app = require("express")();
const http = require("http").Server(app);
const basicAuth = require("basic-auth-connect");
const eval = require("eval")

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


var server = app.listen(80, function(){
    console.log("Node.js is listening to PORT:" + server.address().port);
});

