const helper = require('../helper/helper.js');
const {uuid} = require('uuidv4');



const login = (req,res)=>{
    const phone = req.body.phone;
    const password = req.body.password;
    const data = {
        select_data:'*',
        select_table_name : 'user_info',
        select_condition : `user_phone = ${phone} && user_password = ${password}`
    };

    helper.selectData(data,(result)=>{
        console.log(result.length);

        if(result.length==1){
            const userid = result[0].user_id;
            const session_data = {
                select_data:'*',
                select_table_name : 'session_info',
                select_condition : `user_id = ${userid}`
            };

            helper.selectData(session_data,(session)=>{
                if(session.length==1){
                    const session_id = session[0].session_id;
                    res.send(session_id);
                }else{
                    if(session.length==0){
                        console.log(uuid());
                        const sessionId = uuid();
                        const new_session_data = {
                            table_name : "session_info",
                            column_name : "session_id , user_id",
                            values : `"${sessionId}" , "${result[0].user_id}"`
                            
                        }
                        helper.insertData(new_session_data,(success)=>{
                            if(success){
                                res.send(sessionId)
                            }else{
                                res.sendStatus(500);
                            }
                        });
                    }
                }
            })
        }else{
            console.log("invalid credentials")
        }
    })

}



const dashboard = (req,res)=>{
    const sessionId = req.query.s;
    const data= {
        user_select : '*',
        user_table_name : 'user_info',
        condition_user : `user_id `,
        session_select : 'user_id',
        session_table_name : 'session_info',
        condition_session : `session_id = "${sessionId}"` 

    }
    helper.getUserId(data,(result)=>{
        
        if(result.length == 1){
            const userType = result[0].user_type;
            if(userType=='admin'){
                res.render('admin.html');
            }else{
                res.render('productsList.html');
            }
        }else{
            res.render('index.html');
            res.sendStatus(500);
        }
        
        
    })
}



const fetchUsers = (req,res)=>{
    const sessionId = req.body.sessionId;

    // const validateData= {
    //     user_select : '*',
    //     user_table_name : 'user_info',
    //     condition_user : `user_id `,
    //     session_select : 'user_id',
    //     session_table_name : 'session_info',
    //     condition_session : `session_id = "${sessionId}"` 

    // }
    // helper.getUserId(validateData,(result)=>{
    //     if(result.length == 1){
            const data= {
                user_select : '*',
                user_table : 'user_info', 
            }

            helper.fetchUsers(data,(results)=>{
                console.log("fetchUsers...")
                // console.log(result)
                res.send(results);
        
            })
        // }else{
        //     res.render('index.html');
        // }
    // })    
}

const fetchProducts = (req,res) =>{
    const session = req.body.session_id;

    const products = {
        product_select : '*',
        product_table : 'product_info',
    }

    helper.fetchProducts(products, (result)=>{
        res.send(result);

    })
}

const fetchProductDetails = (req,res)=>{
    const session = req.body.session_id;
    const product_id = req.body.product_id;

    const productDetails = {
        product_select : '*',
        product_table : 'product_info',
        product_condition : `product_id = ${product_id}`
    }
    helper.fetchProductDetails(productDetails,(results)=>{
        res.send(results);
    })
}

const fetchSingleUser = (req,res)=>{
    // const session = req.body.session_id;
    // const user_id = req.body.user_id;
    // const singleUser = {
    //     select_data : '*',
    //     select_table_name : 'user_info',
    //     select_condition : `user_id = ${user_id}`
    // }
    // helper.selectData(singleUser,(result) => {
    //     res.send(result);
    // })
}

const details = (req,res)=>{
    const sessionId = req.query.s;
    const data= {
        user_select : '*',
        user_table_name : 'user_info',
        condition_user : `user_id `,
        session_select : 'user_id',
        session_table_name : 'session_info',
        condition_session : `session_id = "${sessionId}"` 

    }
    helper.getUserId(data,(result)=>{
        if(result.length == 1 ){
            if(result[0].user_type == 'normal'){
                res.render('productsDetails.html')
            }else{
                if(result[0].user_type == 'admin'){
                    res.render('userDetails.html')
                }else{
                    res.render('index.html')
                }
            }
        }
    })


}

const detailsInfo = (req,res)=>{
    const session_id = req.body.sessionId;
    
    const data= {
        user_select : '*',
        user_table_name : 'user_info',
        condition_user : `user_id `,
        session_select : 'user_id',
        session_table_name : 'session_info',
        condition_session : `session_id = "${session_id}"` 
    }

    helper.getUserId(data,(result)=>{
        if(result.length == 1 ){
            if(result[0].user_type=='normal'){
                const product_id = req.body.product_id;

                const fetchProduct ={
                    select_data : '*',
                    select_table_name : 'product_info',
                    select_condition : `product_id = ${product_id}`
                }
                helper.selectData(fetchProduct,(productResult)=>{
                    res.send(productResult)
                })

            }else{
                if(result[0].user_type == 'admin'){
                    const user_id = req.body.user_id;
                    const fetchDetail = {
                        select_data : '*',
                        select_table_name : 'user_info',
                        select_condition : `user_id = ${user_id}`
                        
                    }
                    helper.selectData(fetchDetail,(userResult)=>{
                        res.send(userResult)
                    })
                }else{
                    res.sendStatus(500);
                }
                
            }
        }
    })

}

module.exports = {login,dashboard,fetchUsers,fetchProducts,fetchProductDetails,fetchSingleUser,details,detailsInfo};