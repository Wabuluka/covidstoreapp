// display errors
function printerError(elemId, hintMsg){
    document.getElementById(elemId).innerHTML = hintMsg;
}

const productForm = document.getElementById('productForm')

productForm.addEventListener('submit', (e)=>{
    let serialNo = document.getElementById('serialNo').value
    let productname = document.getElementById('productname').value
    let productimage = document.getElementById('productimage').value
    let description = document.getElementById('description').value
    let instock = document.getElementById('instock').value
    let productcost = document.getElementById('productcost').value

    let serialError = productnameError = productimageError = descriptionError = instockError = productcostError = true

    // validating serial number
    if(serialNo == ''){
        printerError('serialError', 'Serial number must be provided')
    }else{
        printerError('serialError', '')
        serialError = false
    }

    // validating product name
    if(productname == ''){
        printerError('productnameError', 'Product name must be provided')
    }else{
        printerError('productnameError','')
        productnameError = false
    }


    // validating product image
    if(productimage == ''){
        printerError('productimageError', 'Upload an image of the product')
    }else{
        printerError('productimageError', '')
        productimageError = false
    }

    // validating the description
    if(description == ''){
        printerError('descriptionError', 'Provide product description')
    }else{
        printerError('descriptionError', '')
        descriptionError = false
    }


    // validating the instock field
    if(instock == ''){
        printerError('instockError', 'Provide number being added')
    }else{
        printerError('instockError', '')
        instockError = false
    }

    // product cost validation
    if(productcost == ''){
        printerError('productcostError', 'Provide the cost of each item')
    }else{
        printerError('productcostError', '')
        productcostError = false
    }



    // proceed command center
    if((serialError || serialError || productimageError || descriptionError || instockError || productcostError) == true){
        e.preventDefault()
        return
    }else{
        e.currentTarget.submit();
    }
})