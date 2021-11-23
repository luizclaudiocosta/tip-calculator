let personTip = 0
let personTotal = 0
let billValue = 0
let tipValue = 0.15 // default by html
let peopleNumberValue = 0







const bill = document.getElementById('bill')
bill.addEventListener('input', setBillValue)

function setBillValue(){

    let integer = getInteger(bill.value)

    if(isNaN(integer) || integer === 0) {

        billValue = 0
        bill.value = ''
        personTotal = 0
        personTotal = 0
        document.getElementById('tipPerPerson').textContent = '$0.00'
        document.getElementById('totalPerPerson').textContent = '$0.00'
        return

    }

    billValue = parseFloat(integer / 100)
    bill.value = (format(integer)).toString()

    calculate()
}







const tipButtons = document.querySelectorAll('.tip-buttons a')
tipButtons.forEach( tipButton => tipButton.addEventListener('click', handleClick) )

function handleClick(e){
    tipButtons.forEach( 
        tipButton => {
            tipButton.classList.remove('tip-active')
            if(e.target.innerHTML == tipButton.innerHTML) {
                tipValue = parseFloat(tipButton.innerHTML)/100
                tipButton.classList.add('tip-active')
                document.getElementById('custom-tip').value = ''
            }
        }
    )
    calculate()
}




const tipCustom = document.getElementById('custom-tip')
tipCustom.addEventListener('input', setTipCustomValue)

function setTipCustomValue() {
    let integer = getInteger(tipCustom.value)
    if(isNaN(integer)) {

        tipValue = 0
        tipCustom.value = ''
        return

    }

    tipButtons.forEach(
        tipButton => tipButton.classList.remove('tip-active')
    )

    tipValue = parseFloat(integer)/100
    tipCustom.value = (tipValue*100).toString()

    calculate()
}









const peopleNumber = document.getElementById('people')
peopleNumber.addEventListener('input', setPeopleNumber)

function setPeopleNumber() {
    let integer = getInteger(peopleNumber.value)

    if(isNaN(integer) || integer === 0) {

        peopleNumberValue = 0
        peopleNumber.value = ''
        personTotal = 0
        personTotal = 0
        document.getElementById('tipPerPerson').textContent = '$0.00'
        document.getElementById('totalPerPerson').textContent = '$0.00'
        return

    }

    peopleNumberValue = parseFloat(integer)
    peopleNumber.value = (peopleNumberValue).toString()

    calculate()
}





const reset = document.getElementById('reset')
reset.addEventListener('click', handleReset)

function handleReset() {
    let personTip = 0
    let personTotal = 0
    let billValue = 0
    let tipValue = 0.15 // default by html
    let peopleNumberValue = 0

    document.getElementById('tipPerPerson').textContent = '$0.00'
    document.getElementById('totalPerPerson').textContent = '$0.00'
    peopleNumber.value = ''
    bill.value = ''
    tipCustom.value = ''
    tipButtons.forEach(
        tipButton => tipButton.classList.remove('tip-active')
    )
    document.getElementById('default-tip').classList.add('tip-active')
    //defaultTip.classList.add('tip-active')
}









function calculate(){
    if(billValue > 0 && peopleNumberValue > 0) {
        personTip = ((billValue*tipValue)/peopleNumberValue).toFixed(2)
        document.getElementById('tipPerPerson').textContent = '$'+personTip

        personTotal = (billValue*(tipValue+1)/peopleNumberValue).toFixed(2)
        document.getElementById('totalPerPerson').textContent = '$'+personTotal
    }
}








// MASK AND VALIDATE FUNCTIONS

function getInteger(str){
    return parseInt( str.replace(/[\D]+/g,'') )
}

function format(int){

    let temp = int + ''
    temp = temp.replace(/([0-9]{2})$/g, ",$1")
        
    if( temp.length > 6 ){
        temp = temp.replace(/([0-9]{3}),([0-9]{2}$)/g, ",$1.$2")
    }

    return temp
}