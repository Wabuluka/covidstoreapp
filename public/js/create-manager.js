// display errors
function printerError(elemId, hintMsg){
    document.getElementById(elemId).innerHTML = hintMsg;
}

const createAgent = document.getElementById('createAgent')


// validating the createAgent form
createAgent.addEventListener('submit', (e)=>{
    let firstname = document.getElementById.firstname.value;
    let lastname = document.getElementById.lastname.value;
    let email = document.getElementById.email.value;
    let username =  document.getElementById.username.value;
    let nin = document.getElementById.nin.value;
    let gender = document.getElementById.gender.value;
    let country = document.getElementById.country.value;
    let password = document.getElementById.password.value;
    let password2 = document.getElementById.password2.value;


    let firstnameError = lastnameError = emailError = usernameError = genderError = ninError = countryError = passwordError = password2Error = true

    // first name validation
    if(firstname == ''){
        printerError('firstnameError', 'First Name must be provided')
    }
    else {
        printerError("firstnameError", "")
        firstnameError = false;
    }

    // last name validation
    if(lastname == ''){
        printerError('lastnameError', 'Last Name must be provided')
    }else{
        printerError('lastnameError', '')
        lastnameError = false
    }

    // email validation
    if(email == ''){
        printerError('emailError', 'Email must be provided')
    }else{
        printerError('emailError', '')
        emailError = false
    }

    // username validation
    if(username == ''){
        printerError('usernameError', 'Username must be provided')
    }else{
        printerError('usernameError', '')
        usernameError = false
    }

    // nin validation
    if(nin == ''){
        printerError('ninError', 'NIN must be provided')
    }else{
        printerError('ninError', '')
        ninError =  false
    }

    // gender validation
    if(gender == ''){
        printerError('genderError', 'You must select one')
    }else{
        printerError('genderError', '')
        genderError = false
    }
    // country validation
    if(country == ''){
        printerError('countryError', 'Country must be provided')
    }else{
        printerError('countryError', '')
        countryError = false
    }

    // password validation
    if(password == ''){
        printerError('passwordError', 'Password must be provided')
    }else{
        printerError('passwordError', '')
        passwordError = false
    }

    // password2 validation
    if(password2 == ''){
        printerError('password2Error', 'Passwords must match')
    }else{
        printerError('password2Error', '')
        password2Error = false
    }


    // proceed command center
    if((firstnameError || lastnameError || emailError || usernameError || genderError || ninError || countryError || passwordError || password2Error) == true){
        e.preventDefault()
    }else{
        e.currentTarget.submit();
    }
})