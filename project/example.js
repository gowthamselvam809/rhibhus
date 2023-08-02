const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
// const fs = require("fs");
const mysql = require("mysql");
const fs = require("fs");
const { get } = require("http");

const app = express();
// const endPoints = require('./helper/helper.js')
// app.use(express.static(path.join(__dirname, "views")));
// app.use(express.static(path.join(__dirname, "public")));

const usersFilePath = path.join(__dirname, "data.json");
const productsFilePath = path.join(__dirname, "product.json");

const getUsers = () => {
  try {
    const data = fs.readFileSync(usersFilePath);
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

const data = fs.readFileSync(productsFilePath);
const productData = JSON.parse(data);

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(bodyParser.urlencoded({ extended: true }));

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "trainingdb",
});




const userData = getUsers();

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  
  // const updateQuery = `update product_info set product_currency=? where product_id = ?;`
  // const updateValue = ["rupees", 20];
  // con.query(updateQuery,updateValue,()=>function (err, result) {
  //   if (err) throw err;
  //   console.log("updated...")
  // })

});



function insertingUserData(){
  for(let user of userData){
    const insertQuery = `insert into user_info values(?,?,?,?,?,?,now(),now());`
    
    const insertValue = [
      user.user_id,
      user.user_name,
      user.user_phone,
      user.user_password,
      user.user_address,
      user.user_type,
    ];
    
    con.query(insertQuery,insertValue,function (err, result) {
      if (err) throw err;
    });
  }
  console.log("Data inserted successfully!");
}


function insertProductData(){

  for(let product of productData){
    const insertQuery = `insert into product_info values(?,?,?,?,?,?,now(),now())`

    const insertValue = [
      product.product_id,
      product.product_name,
      product.description,
      product.product_image,
      product.price,
      product.currency,
    ]
    con.query(insertQuery,insertValue,function (err, result) {
      if (err) throw err;
    });
  }
  console.log("Data inserted successfully!");
}

  


