
function getUserDetails(){
    const session = sessionStorage.getItem('sid')
    const user_id = sessionStorage.getItem('user');

    $.post('/detailsInfo',
    {
        sessionId : session,
        user_id : user_id
    },
    (data) => {
        const details = '<tr><th>Username</th><td>'+data[0].user_name+'</td></tr><tr><th>User ID</th><td>'+data[0].user_id+'</td></tr><tr><th>Phone</th><td>'+data[0].user_phone+'</td></tr><tr><th>Address</th><td>'+data[0].user_address+'</td></tr>'
        document.getElementById('userDetails').innerHTML = details
    })
}


