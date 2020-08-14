// display errors
function printerError(elemId, hintMsg){
    document.getElementById(elemId).innerHTML = hintMsg;
}

// signupform id
const signupForm = document.getElementById('signupForm');

// validation
signupForm.addEventListener('submit', (e)=>{
    let firstname = document.signupForm.firstname.value;
    let lastname = document.signupForm.lastname.value;
    let email = document.signupForm.email.value;
    let username =  document.signupForm.username.value;
    let nin = document.signupForm.nin.value;
    let gender = document.signupForm.gender.value;
    let country = document.signupForm.country.value;
    let password = document.signupForm.password.value;
    let password2 = document.signupForm.password2.value;

    // errors
    let firstnameError = lastnameError = emailError = usernameError = genderError = ninError = countryError = passwordError = password2Error = true

    // consts
    let regex = /^[a-zA-Z\s]+$/;
    // first name validation
    if(firstname == ''){
        printerError('firstnameError', 'First Name must be provided')
    }else if(regex.test(firstname) === false){
        printerError("firstnameError", "Please enter a valid First Name")
    }
    else {
        printerError("firstnameError", "")
        firstnameError = false;
    }

    // last name validation
    if(lastname == ''){
        printerError('lastnameError', 'Last Name must be provided')
    }else if(regex.test(lastname) === false){
        printerError("lastnameError", "Please enter a valid Last Name")
    }
    else{
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
    }else if(regex.test(username) === false){
        printerError("usernameError", "Please enter a valid Username")
    }
    else{
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
    }else if(password.length <=5){
        printerError('passwordError', 'Password must have 6 characters or more')
    }
    else{
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


// 