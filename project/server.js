const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const fs = require("fs");


const { get } = require("http");
const controller = require('./controller/controller.js');

const app = express();

app.use(express.static(path.join(__dirname,"public")));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get('/',(req,res)=>{
    res.render('index.html');
})

app.post('/login', (req,res)=>{
    controller.login(req,res);
})

app.get('/dashboard',(req,res)=>{
    controller.dashboard(req,res);
})

app.post('/fetchUsers',(req,res)=>{
    controller.fetchUsers(req,res);
})

app.post('/fetchProducts',(req,res)=>{
    controller.fetchProducts(req,res);
})

app.post('/fetchProductDetails',(req,res)=>{
    controller.fetchProductDetails(req,res);
})

app.post('/fetchSingleUser',(req,res)=>{
    controller.fetchSingleUser(req,res);
})

app.get('/details',(req,res)=>{
    controller.details(req,res);
})

app.post('/detailsInfo',(req,res)=>{
    controller.detailsInfo(req,res)
})

app.listen(3000,()=>{
    console.log('server running on 3000');
})