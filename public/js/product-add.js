// display errors
function printerError(elemId, hintMsg){
    document.getElementById(elemId).innerHTML = hintMsg;
}

// add product form id
const productForm = document.getElementById('productForm');

// product form validation
productForm.addEventListener('submit', (e)=>{
    
    let serialNo = document.productForm.serialNo.value;

    // errors
    let serialError = true

    // validate serial number
    if(serialNo == ''){
        printerError('serialError', 'Provide Product Serial')
    }else{
        printerError('serialError', '')
        serialError =  false
    }

    if((serialError) ==  true){
        e.preventDefault()
    }else{
        e.currentTarget.submit();
    }
})