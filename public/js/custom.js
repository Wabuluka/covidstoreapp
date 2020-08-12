// display errors
function printerError(elemId, hintMsg){
    document.getElementById(elemId).innerHTML = hintMsg;
}

const loginForm = document.getElementById('loginForm')

loginForm.addEventListener('submit', (e)=>{
    let username = document.getElementById('username').value
    let password = document.getElementById('password').value

    // errors
    let passwordError =  usernameError = true

    // username validation
    if(username == ''){
        printerError('usernameError', 'Username must be provided')
    }else{
        printerError('usernameError', '')
        usernameError = false
    }

    if(password == ''){
        printerError('passwordError', 'Password was not provided')
    }else{
        printerError('passwordError', '')
        passwordError = false
        
    }


    // proceed command center
    if((usernameError || passwordError) == true){
        e.preventDefault()
        return
    }else{
        e.currentTarget.submit();
    }
})



