import axios from 'axios';

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

const submitForm = async(e) => {
    console.log("4864684");
    e.preventDefault();

    if (!validateForm(form.email.value, form.password.value)) return;

    const emailInput = form.querySelector('input[name="email"]');
    const passwordInput = form.querySelector('input[name="password"]');

    const requestData = {
        email: emailInput.value,
        password: passwordInput.value,
    };

    try {
        const response = await axios.post('https://httpbin.org/post', requestData);
        const data = response.data;
        console.log(data.json);
        addElementsWithOutputContent(data.json);
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

const addElementsWithOutputContent = (data) => {
    dataContainer.innerHTML = '';
    for (const key in data) {
        const keyValueElement = createNewElement('div');
        keyValueElement.textContent = `${key}: ${data[key]}`;
        dataContainer.appendChild(keyValueElement);
    }
}

const validateForm = (email, password) => {
    if (!email || !password) {
        console.error('Please fill in both email and password fields.');
        return false;
    }

    if (password.length <= 4) {
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
