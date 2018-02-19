const fs = require("fs");

module.exports = class Stocker {

  static addStock(name, amount = 1){
    let exsitedGoods = false;
    let goodsList = Stocker.getGoodsList();

    for (let num in goodsList) {
      if (goodsList[num][0] == name) {
        goodsList[num][1] = String(Number(goodsList[num][1]) + Number(amount));
        exsitedGoods = true;
        break;
      }
    }

    if (exsitedGoods == false) {
      goodsList.push([name,amount]);
    }
    
    let csvText = "";
    for (let num in goodsList) {
      csvText += goodsList[num].toString() + "\n";
    }

    fs.writeFileSync("./stock.csv" ,csvText );
  }

  static checkStock(name = ""){
    let goodsList = Stocker.getGoodsList();

    if (name == "") {
      goodsList.sort();
      let list = [];
      for (let num in goodsList) {
         list += goodsList[num].toString().replace(/,/g , ": ") + "\n";
      }
      return list;
    }

    for (let num in goodsList) {
      if (goodsList[num][0] == name) {
        return goodsList[num][0] + " :" + goodsList[num][1] + "\n";
      }
    }
  }

  static sell(name, amount = 1, price = 0){
    let goodsList = Stocker.getGoodsList();
    for (let num in goodsList) {
      if (goodsList[num][0] == name) {
        goodsList[num][1] = String(Number(goodsList[num][1]) - Number(amount));
      }
    }

    let csvText = "";
    for (let num in goodsList) {
      csvText += goodsList[num].toString() + "\n";
    }
    fs.writeFileSync("./stock.csv" ,csvText );

    return amount * price;
  }

  static deleteAll(){
    fs.writeFileSync("./stock.csv" ,"");
  }
  
  static getGoodsList(){
    let text = fs.readFileSync('./stock.csv', 'utf-8');
    let list = text.split("\n");
    list.pop();
    let goodsList = [];
    for (let num in list) {
      let separatedValue = list[num].split(",");
      goodsList.push([separatedValue[0],separatedValue[1]]);
    }
    return goodsList;
  }
}

