
function displayUser(user_id){
    const session = sessionStorage.getItem('sid');
    sessionStorage.setItem('user',user_id); 
    // $.post('/fetchSingleUser',
    // {
    //     user_id : user_id,
    //     session_id : session
    // },
    // (data)=>{
    //     console.log(data)
    //         const user = '<div class="card"><div class="card-body"><h5 class="card-title">User Name : '+data[0].user_name +'</h5><p class="card-text"><strong>User ID:</strong>'+data[0].user_id +'</p><p class="card-text"><strong>Address:</strong>'+ data[0].user_address +'</p><p class="card-text"><strong>Phone:</strong> '+ data[0].user_phone+'</p></div> </div>;'
    //         document.getElementById('userDetails').innerHTML = user

    //         // window.location.href = `userDetails.html?data=${data[0]}`
    // })
    
    window.location = `/details?s=${session}`



}

function fetchUsers(){
    const sessionId = sessionStorage.getItem('sid');

    $.post(`/fetchUsers`,
    {
        session_id : sessionId
    },
    (data)=>{
        let consumerData = ""
        let adminData =""
        for(let i = 0; i < data.length ; i++){
            if(data[i].user_type === 'admin'){
                adminData += '<tr><td>'+data[i].user_name + '</td><td>'+data[i].user_phone + '</td><td><input type="button" name="" id="button" value="View" onclick="displayUser('+ data[i].user_id +')"/></td></tr>'

            }else{
                consumerData += '<tr><td>'+data[i].user_name + '</td><td>'+data[i].user_phone + '</td><td><input type="button" name="" id="button" value="View" onclick="displayUser('+ data[i].user_id +')"/></td></tr>'

            }
        }
        document.getElementById('consumerData').innerHTML = consumerData;
        document.getElementById('adminData').innerHTML = adminData;
    })
    
}


