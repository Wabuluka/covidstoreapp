// display errors
function printerError(elemId, hintMsg){
    document.getElementById(elemId).innerHTML = hintMsg;
}

const editForm = document.getElementById('editForm')

editForm.addEventListener('submit', (e)=>{
    let serial = document.getElementById('serial').value

    // errors
    let serialError = true

    // validating serial
    if(serial == ''){
        printerError('serialError', 'Serial Field can not be left blank')
    }else{
        printerError('serialError', '')
        serialError = false
    }


    // proceed command center
    if((serialError) == true){
        e.preventDefault()
        return
    }else{
        e.currentTarget.submit();
    }
})