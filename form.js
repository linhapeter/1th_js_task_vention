const formData = new FormData();

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


const submitForm = async e => {
    e.preventDefault();
    if (!validateForm()) return;


    const emailInput = form.querySelector('input[name="email"]');
    const passwordInput = form.querySelector('input[name="password"]');


    formData.delete('email', emailInput.value);
    formData.delete('password', passwordInput.value);
    formData.append('email', emailInput.value);
    formData.append('password', passwordInput.value);


    try {
        const response = await fetch('https://httpbin.org/post', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        addElementsWithOutputContent(data.form);
    } catch (error) {
        console.error('An error occurred:', error);
    }
}


const addElementsWithOutputContent = (data) => {
    dataContainer.innerHTML = '';
    for (const key in data) {
        const keyValueElement = createNewElement('div');
        keyValueElement.textContent = `${key}: ${data[key]}`;
        dataContainer.appendChild(keyValueElement);
    }
}


const validateForm = () => {
    if (!form.email.value || !form.password.value) {
        console.error('Please fill in both email and password fields.');
        return false;
    }

    if (form.password.value.length <= 4) {
        console.error('Password should be more than 4 characters.');
        return false;
    }
    return true;
}


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


const dataContainer = createNewElement('div');
rootDiv.appendChild(dataContainer);


form.addEventListener('submit', submitForm);