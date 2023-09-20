function createElement(tag, attributes = {}) {
    const element = document.createElement(tag);
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
    console.log(element);
    return element;
}


function appendChildToParent(parent, child) {
    parent.appendChild(child);
}


const form = createElement('form');


const inputFields = [
    { type: 'email', name: 'email', placeholder: 'Email' },
    { type: 'password', name: 'password', placeholder: 'Password' }
];


inputFields.forEach(field => {
    const input = createElement('input', { type: field.type, name: field.name, placeholder: field.placeholder });
    appendChildToParent(form, input);
});


const submitButton = createElement('button', { type: 'submit' });
submitButton.textContent = 'Submit';
appendChildToParent(form, submitButton);


const rootDiv = document.getElementById('root');
appendChildToParent(rootDiv, form);