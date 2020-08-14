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

    
    // validating customer name
    if(customername == ""){
        printerError('customernameError', 'Provide your name')
    }else{
        printerError('customernameError', '')
        customernameError = false
    }


    // validating the customer email
    if(email == ''){
        printerError('customerEmailError', 'You must provide your email')
    }else{
        printerError('customerEmailError', '')
        customerEmailError = false
    }


    // paid amount validation
    if(paidamount == ''){
        printerError('paidamountError','You can leave this field empty' )
    }else{
        printerError('paidamountError','')
        paidamountError = false
    }


    // proceed command center
    if((customernameError || customerEmailError || paidamountError) == true){
        e.preventDefault()
        return
    }else{
        e.currentTarget.submit();
    }
})