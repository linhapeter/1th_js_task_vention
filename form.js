const form = document.createElement('form');

const emailInput = document.createElement('input');
emailInput.setAttribute('type', 'email');
emailInput.setAttribute('name', 'email');
emailInput.setAttribute('placeholder', 'Email');

const passwordInput = document.createElement('input');
passwordInput.setAttribute('type', 'password');
passwordInput.setAttribute('name', 'password');
passwordInput.setAttribute('placeholder', 'Password');

const submitButton = document.createElement('button');
submitButton.setAttribute('type', 'submit');
submitButton.setE
submitButton.textContent = 'Submit';

form.appendChild(emailInput);
form.appendChild(passwordInput);
form.appendChild(submitButton);

const rootDiv = document.getElementById('root');
rootDiv.appendChild(form);


const existingForm = document.querySelector('form');


existingForm.addEventListener('submit', e => {
    e.preventDefault();


    const emailInput = existingForm.querySelector('input[name="email"]');
    const passwordInput = existingForm.querySelector('input[name="password"]');


    console.log('Email:', emailInput.value);
    console.log('Password:', passwordInput.value);
});