const form = document.createElement('form');

const inputFields = [
    { type: 'email', name: 'email', palaceholder: 'Email' },
    { type: 'password', name: 'password', palaceholder: 'Password' }
];

inputFields.forEach(field => {
    let input = document.createElement('input');
    input.setAttribute('type', field.type);
    input.setAttribute('name', field.name);
    input.setAttribute('placeholder', field.palaceholder);
    form.appendChild(input);
});


const submitButton = document.createElement('button');
submitButton.setAttribute('type', 'submit');
submitButton.textContent = 'Submit';
form.appendChild(submitButton);

const rootDiv = document.getElementById('root');
rootDiv.appendChild(form);