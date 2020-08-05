// Defining a function to display error message
function printError(elemId, hintMsg) {
    document.getElementById(elemId).innerHTML = hintMsg;
}

// validating the signup form
function validateForm(){
    let firstname = document.signupForm.firstname.value;
    let lastname = document.signupForm.lastname.value
    let email = document.signupForm.email.value
    let username = document.signupForm.username.value
    let nin = document.signupForm.nin.value
    let country = document.signupForm.country.value
    let password = document.signupForm.password.value
    let password2 = document.signupForm.password2.value
    let gender = document.signupForm.gender.value

    // error holders
    let firstnameError
    let lastnameError
    let emailError
    let usernameError
    let ninError
    let countryError
    let passwordError
    let password2Error
    let genderError

    // validate firstname
    if(firstname == ""){
        printError("firstnameError", "Please enter your First Name")
    }else{
        let regex = /^[a-zA-Z\s]+$/;
        if(reqex.test(firstname) === false){
            printError("firstnameError", "Please enter a valid First Name")
        }else{
            printError("firstname", "");
            firstnameError = false
        }
    }

    // validate lastname
    if(lastname == ""){
        printError("lastnameError", "Please enter your Last Name")
    }else{
        let regex = /^[a-zA-Z\s]+$/;
        if(reqex.test(lastname) === false){
            printError("lastnameError", "Please enter a valid Last Name")
        }else{
            printError("lastname", "");
            lastnameError = false
        }
    }

    // Validate email address
    if(email == "") {
        printError("emailError", "Please enter your email address");
    } else {
        // Regular expression for basic email validation
        var regex = /^\S+@\S+\.\S+$/;
        if(regex.test(email) === false) {
            printError("emailError", "Please enter a valid email address");
        } else{
            printError("emailError", "");
            emailError = false;
        }
    }

    // validate username
    if(username == ""){
        printError("usernameError", "Please enter your Username")
    }else{
        let regex = /^[a-zA-Z\s]+$/;
        if(reqex.test(username) === false){
            printError("usernameError", "Please enter a valid Username")
        }else{
            printError("usernameError", "");
            usernameError = false
        }
    }

    // validate nin
    if(nin == ""){
        printError("ninError", "Please enter your NIN")
    }else{
        let regex = /^[a-zA-Z\s]+$/;
        if(reqex.test(nin) === false){
            printError("ninError", "Please enter a valid NIN")
        }else{
            printError("ninError", "");
            ninError = false
        }
    }

    // validate country
    if(country == ""){
        printError("countryError", "Please enter your Country Name")
    }else{
        let regex = /^[a-zA-Z\s]+$/;
        if(reqex.test(country) === false){
            printError("countryError", "Please enter a valid Country Name")
        }else{
            printError("countryError", "");
            countryError = false
        }
    }


    // validate gender
    if(gender == ""){
        printError("genderError", "Select a gender")
        genderError = false
    }

    // validate password
    if(password == ""){
        printError("passwordError", "Please enter your Password")
    }else{
        if(password.length < 6){
            printError("passwordError", "Password must be morethan 5 characters")
            passwordError = false
        }
    }

    // validate password2
    if(password2 == ""){
        printError("password2Error", "Please provide a password here to comfirm password")
        password2Error = false
    }else{
        if(password2 == password){
        printError("password2Error", "Make sure you have entered matching passwords")
        password2Error = false
        return false
    }
    }

}

function validateLogin(){
    let username = document.loginForm.username.value
    let password = document.loginForm.password.value

    let usernameError
    let passwordError

    if(username == ""){
        printError("usernameError", "You need a username to login")
        usernameError = false

    }
    if(password == ""){
        printError("passwordError", "You need a username to login")
        passwordError = false
        return
    }
    
}