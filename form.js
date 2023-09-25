const createNewElement = (tag) => {
    return document.createElement(tag);
};


const setAttributesForElement = (element, attributes = {}) => {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
};


const appendChildToParent = (parent, child) => {
    parent.appendChild(child);
};


const form = createNewElement('form');


const inputFields = [
    { type: 'email', name: 'email', placeholder: 'Email' },
    { type: 'password', name: 'password', placeholder: 'Password' }
];


inputFields.forEach(field => {
    const input = createNewElement('input');
    setAttributesForElement(input, { type: field.type, name: field.name, placeholder: field.placeholder });
    appendChildToParent(form, input);
});


const submitButton = createNewElement('button');
setAttributesForElement(submitButton, { type: 'submit' });
submitButton.textContent = 'Submit';
appendChildToParent(form, submitButton);


const rootDiv = document.getElementById('root');
rootDiv.appendChild(form);


//const existingForm = document.querySelector('form');


form.addEventListener('submit', e => {
    e.preventDefault();


    const emailInput = form.querySelector('input[name="email"]');
    const passwordInput = form.querySelector('input[name="password"]');


    console.log('Email:', emailInput.value);
    console.log('Password:', passwordInput.value);
});