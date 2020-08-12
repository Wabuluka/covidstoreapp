// display errors
function printerError(elemId, hintMsg){
    document.getElementById(elemId).innerHTML = hintMsg;
}

const purchaseOrder = document.getElementById('purchaseOrder')

purchaseOrder.addEventListener('submit', (e)=>{
    let customername = document.getElementById('customername').value
    let email = document.getElementById('email').value
    let paidamount = document.getElementById('paidamount').value

    // errors
    let customernameError = customerEmailError = paidamountError = true

    // validating customer name field
    if(customername == ''){
        printerError('customernameError', 'Provide your name')
    }else{
        printerError('customernameError', '')
        customernameError = false
    }

    // email validation
    if(email == ''){
        printerError('customerEmailError', 'Provide your email address')
    }else{
        printerError('customerEmailError', '')
        customerEmailError = false
    }

    // amount paid validation
    if(paidamount == ''){
        printerError('paidamountError', 'Amount can not be empty')
    }else{
        if(paidamount < paidamount){
            printerError('paidamountError','Initial payment should be equal to or greater than the 60%')
        }else{
            printerError('paidamountError', '')
            paidamountError = false
        }
    }
    // proceed command center
    if((customernameError || customerEmailError || paidamountError) == true){
        e.preventDefault()
        return
    }else{
        e.currentTarget.submit();
    }
})