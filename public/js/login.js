// display errors
function printerError(elemId, hintMsg){
    document.getElementById(elemId).innerHTML = hintMsg;
}

// signup form id
const loginForm = document.getElementById('loginForm');

// login form validation
loginForm.addEventListener('submit', (e)=>{
    let username = document.getElementsByName('username')

    // errors
    let usernameError = true;

    if(username == ''){
        printerError('usernameError', 'Username was not provided')
    }else{
        printerError('usernameError', '')
        usernameError = false
    }

    if((usernameError) ==  true){
        e.preventDefault()
    }else{
        e.currentTarget.submit();
    }
})