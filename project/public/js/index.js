

function validate(){
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    $.post('/login',{
        phone : phone,
        password : password
    },(data)=>{
        const sessionId = data;
        sessionStorage.setItem('sid',sessionId); 
        window.location.href = `/dashboard?s=${sessionId}`
        
    })
    .error=(xhr)=>{
        console.log(xhr);
    };

}

