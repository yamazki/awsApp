const fs = require("fs");
const csv = require("csv");

module.exports = class Stocker {

  static addStock(name, amount){
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

  static checkStock(name){
    let goodsList = Stocker.getGoodsList();
    for (let num in goodsList) {
      if (goodsList[num][0] == name) {
        console.log(goodsList[num][1]);
        return goodsList[num][1];
      }
    }
  }

  static sell(name, amount, price){
  }

  static checkSales(){
  }

  static deleteAll(){
    fs.writeFileSync("./stock.csv" ,csvText );
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

