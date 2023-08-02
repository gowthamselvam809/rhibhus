const mysql = require("mysql");

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "trainingdb",
  });


  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

});


const selectData = (data,callBack)=>{

    const select_data = data.select_data;
    const table_name = data.select_table_name;
    const condition = data.select_condition;

    const select_query = `SELECT ${select_data} FROM ${table_name} WHERE ${condition}`


    con.query(select_query,(err,result)=>{
        if(err) {
            throw err;
        }else{
            console.log(result);
            callBack(result);
        }
    })
}

const insertData = (data,callBack) =>{
    const table_name = data.table_name;
    const column_name = data.column_name;
    const values = data.values;

    const insert_query = `INSERT INTO ${table_name} (${column_name}) VALUES (${values})`

    con.query(insert_query,(insert_err,insert_result)=>{
        if(insert_err){
            throw insert_err;
        }else{
            console.log("Data Inserted..")
            callBack(1)
        }
    })
}

const getUserId = (data,callBack)=>{
    const user_select = data.user_select;
    const user_table_name = data.user_table_name;
    const condition_user = data.condition_user;
    const session_select = data.session_select;
    const session_table_name = data.session_table_name;
    const condition_session = data.condition_session;

    const getQuery = `SELECT ${user_select} FROM ${user_table_name} WHERE ${condition_user} IN (SELECT ${session_select} FROM ${session_table_name} WHERE ${condition_session})`

    con.query(getQuery,(getErr, getResult)=>{
        if(getErr){
            throw getErr;
        }else{
            callBack(getResult);
        }
    })
    
}


const fetchUsers =(data, callBack)=>{
    const user_select = data.user_select;
    const user_table = data.user_table;

    const select_query = `SELECT ${user_select} FROM ${user_table}`
    console.log(select_query)
    con.query(select_query,(err,result)=>{
        callBack(result);

    })
}

const fetchProducts = (data, callBack)=>{
    const product_table = data.product_table;
    const product_select = data.product_select;

    const productQuery = `SELECT ${product_select} FROM ${product_table}`

    con.query(productQuery,(err, result)=>{
        callBack(result);
    })
}

const fetchProductDetails = (data, callBack) =>{
    
    const product_select = data.product_select;
    const product_table = data.product_table;
    const product_condition = data.product_condition;

    const query = `SELECT ${product_select} FROM ${product_table} WHERE ${product_condition}`

    con.query(query,(err, result)=>{
        if(err){
            throw err;
        }else{
            callBack(result);

        }
    })
}



module.exports = {selectData,insertData,getUserId,fetchUsers,fetchProducts,fetchProductDetails};
