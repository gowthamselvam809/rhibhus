
function showProductDetails(data){
    const session = sessionStorage.getItem('sid');

    $.post('/fetchProductDetails',
    {
        session_id : session,
        product_id : data
    },
    (data)=>{
        data = data[0]
    const products = '<img class="card-img-top" src="'+ data.product_image +'" alt="Product Image"/><div class="card-body"><h5 class="card-title"> Product Name : '+ data.product_name +'</h5><p class="card-text">Product ID : '+ data.product_id +'</p><p class="card-text">Description : '+data.product_description +'</p><p class="card-text">Price : '+ data.product_price+'</p></div>'
    document.getElementById('productDetails').innerHTML = products;
    // document.getElementById("productList").style.display = "none";
    document.getElementById("productDetails").style.display = "block";
    })

}

function fetchProducts(){
    const session = sessionStorage.getItem('sid');

    $.post('/fetchProducts',
    {
        session_id : session
    },
    (data)=>{
        let productName = "";

        for(let i = 0; i<data.length;i++){
            productName += '<li class="list-group-item d-flex justify-content-between align-items-center"> '+data[i].product_name +'<button class="btn btn-primary btn-sm" onclick="showProductDetails('+ data[i].product_id +')">Details</button></li>'
        }
        document.getElementById('productList').innerHTML = productName;

    })
}
