/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

var expect = require("chai").expect;
var MongoClient = require("mongodb");

const axios = require("axios");

const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

module.exports = function(app) {
  app.route("/api/stock-prices").get(function(req, res) {
    //console.log(req);
    var stock = req.query.stock;
    var likes = req.query.like;
    let url1, url2;
    let stockData = null;
    var multiple = false;
    var a = 1;
    
    
     if (Array.isArray(stock)) {
      multiple = true;
      stockData = [];
     }
    
    function getPrice(stock, callback) {
      let url = "https://repeated-alpaca.glitch.me/v1/stock/" + stock + "/quote";
      console.log("getPrice url=" + url);
      let data = axios
        .get(url)
        .then(result => {
          

//          console.log("symbol:" + result.data["symbol"]);
//          console.log("price:" + result.data["latestPrice"]);

          var r = [
            {
              stock: result.data["symbol"],
              price: result.data["latestPrice"]
            }
          ];
          console.log("result=" + JSON.stringify(r));
          //console.table(r);
        
          callback("stockData", {
            stock: result.data['symbol'],
            price: result.data['latestPrice']
          });
        })
        .catch(error => {
          console.log("err=" + error);
          callback('stockData', { error: 'external source error' });

        });
    }

    
    function sync(type, data) {
      console.log("In sync");
      console.log("type=" + type + " data=" + JSON.stringify(data));
      a++;
//      console.log("a="+a + " len=" + stockData.length);
      
      if (type === "stockData") {
        (multiple) ? stockData.push(data) : (stockData = data);
      }

      if (multiple && stockData.length == 2) {
        stockData[0].likes = likes ? 1 : 0;
        stockData[1].likes = likes ? 1 : 0;
        res.json({ stockData });
      } else if ( !multiple && stockData) {
        stockData.likes = likes ? 1 : 0;
        res.json({stockData});
      }
  
    }

   

    
    
    
    
    
    if (multiple){
      console.log("Stock1 = " + stock[0]);
      console.log("Stock2 = " + stock[1]);

      getPrice(stock[0], sync);
      getPrice(stock[1], sync);
    } else {
      console.log("Stock = " + stock);

      getPrice(stock, sync);
    }

    
  });
};
