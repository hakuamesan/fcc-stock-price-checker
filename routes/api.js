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
var got = require("got");
const superagent = require('superagent');
const axios = require('axios');

const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

module.exports = function(app) {
  app.route("/api/stock-prices")
    .get(function(req, res) {
    //console.log(req);
    var stock = req.query.stock1;

    console.log("Stock = " + stock);
/*
    got("https://repeated-alpaca.glitch.me/v1/stock/${stock}/quote", {
      json: true
    })
      .then(response => {
        console.log("ans="+response.body.url);
        console.log("exp="+response.body.explanation);
      })
      .catch(error => {
        console.log("err="+  error.body);
      });
  */
    
/*
superagent.get('https://repeated-alpaca.glitch.me/v1/stock/${stock}/quote')
.end((err, res) => {
  if (err) { return console.log("error:"+err); }
  console.log("res="+res);
  
  for (let val in res) {
    console.log(res[val]);
  }
  
});
  */
  
  
let url =  "https://repeated-alpaca.glitch.me/v1/stock/"+ stock +"/quote";
console.log("url="+url);

let {data} =  axios.get(url)
  .then(res => {
    console.log("res="+res);
  
    //res.json(data);
    console.log("data=" + data);
    
    /*
  for (let val in res) {
    console.log(res[val]);
  }*/
  
  
  })
  .catch(error => {
    console.log("err="+error);
  });
    
    
  
  });
  
  
  
};
