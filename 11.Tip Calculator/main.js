// GENERAL ELEMENTS 
let wrapper = document.querySelector('#wrapper');
let btn = document.querySelector('button');

// FORM ELEMENTS
let formCard = document.querySelector('#form-card');
let cardBody = document.querySelector('#card-body');
let bill = document.querySelector('#bill');
let people = document.querySelector('#people');
let service = document.querySelector('#service');

// OUTCOME ELEMENTS
let inputTip = document.querySelector('#outcome-card > div:nth-child(2) > span:last-child');
let inputPeople = document.querySelector('#outcome-card > div:nth-child(3) > span:last-child');
let inputService = document.querySelector('#outcome-card > div:nth-child(4) > span:last-child');
let outcomeCard = document.querySelector('#outcome-card');
let tip = document.querySelector('#tip > span:last-child');
let total = document.querySelector('#total > span:last-child');
let forEachPerson = document.querySelector('#for-eachPerson > span:last-child');


// CALCULATİON VARİABLES
let tipAmount;
let totalAmount;
let serviceBill;
let perPerson;
let pattern;



// FUNCTION TO CHANGE CARDS
const formOutcome = () => {
    if (formCard.classList.contains('d-block')) {
        formCard.classList.remove('d-block');
        formCard.classList.add('d-none');
        outcomeCard.classList.remove('d-none');
        outcomeCard.classList.add('d-block');
        wrapper.style.flexDirection = 'column-reverse';
        btn.textContent = 'Go form';
    } else {
        formCard.classList.add('d-block');
        formCard.classList.remove('d-none');
        outcomeCard.classList.add('d-none');
        outcomeCard.classList.remove('d-block');
        wrapper.style.flexDirection = 'column';
        btn.textContent = 'Calculate';
        bill.value = '';
        people.value = '';
    }
    btn.style.marginTop = '51.8rem'
}



// FUNCTION FOR FOCUS EVENT
const focusEvent = e => {
    e.target.style.borderColor = '#585858'
}



// FUNCTION FOR BLUR EVENT
const blurEvent = e => {
    if (e.target.value.trim() === '') {
        e.target.style.borderColor = '#f00'
    } else {
        e.target.style.borderColor = '#ced4da';
    }
}



// Assigning focus event
bill.addEventListener('focus', focusEvent);
people.addEventListener('focus', focusEvent);



// Assigning blur event
bill.addEventListener('blur', blurEvent);
people.addEventListener('blur', blurEvent);



// FUNCTION TO VALIDATE INPUTS
const validateInput = () => {
    let emptyBill = `<p id="empty-bill"> Bill Amount Cannot Be Blank. </p>`;
    let emptyUsers = `<p id="empty-users"> Number Of Users Must Be Greater Than Zero. </p>`;

    // Removing blank input alerts
    if (document.getElementById('empty-bill')) {
        document.getElementById('empty-bill').remove()
    } 
    if (document.getElementById('empty-users')) {
        document.getElementById('empty-users').remove()
    }

    // Validation
    bill.value === '' 
        ? (cardBody.insertAdjacentHTML('afterbegin', emptyBill), bill.style.borderColor = '#f00',bill.addEventListener('focus', focusEvent), btn.style.marginTop = '55rem')
        : null;
    
    people.value === '' 
        ? (cardBody.insertAdjacentHTML('afterbegin', emptyUsers), people.style.borderColor = '#f00', people.addEventListener('focus', focusEvent),btn.style.marginTop = '55rem') 
        : null;

    (bill.value !== ''  &&  people.value !== '') 
        ? (calculate(),formOutcome())  
        : btn.style.marginTop = '60rem';
}




// FUNCTION TO DEFINE SERVICE TYPE
const defineService = () => {
    pattern = /\d+/g;
    serviceBill = service.value.match(pattern)[0];
}



// FUNCTION TO MAKE CALCULATION AND RENDER RESULTS ON WEBPAGE
const calculate = () => {
    // Calculation
    defineService();
    tipAmount = (Number(bill.value) * serviceBill) / 100;
    totalAmount = Number(bill.value) + tipAmount;
    perPerson = totalAmount / Number(people.value);

    // Assignment results to appropriate elements.
    inputTip.textContent = `$ ${bill.value}`;
    inputPeople.textContent = `${people.value}`;
    inputService.textContent = `${service.value}`;
    // console.log(inputService);
    tip.textContent = `$ ${tipAmount.toFixed(2)}`;
    total.textContent = `$ ${totalAmount.toFixed(2)}`;
    forEachPerson.textContent = `$ ${perPerson.toFixed(2)}`;

    // Removing blank input alerts
    if (document.getElementById('empty-bill')) {
        document.getElementById('empty-bill').remove()
    } 
    if (document.getElementById('empty-users')) {
        document.getElementById('empty-users').remove()
    }
}



// OVERALL FUNCTİON
const app = () => {
    btn.addEventListener('click', () => {
        validateInput();
    })
}



// CALLİNG APP FUNCTİON
app();