import axios from 'axios';
import { createNewElement, setAttributesForElement, appendChildToParent, validateForm, saveInputValue, loadInputValues, deleteInputValue } from './helpers.js';
const formData = new FormData();

const form = createNewElement('form');

const inputFields = [
    { type: 'email', name: 'email', placeholder: 'Email' },
    { type: 'password', name: 'password', placeholder: 'Password' },
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
        clearInputState(form);
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

const saveInputState = () => {
    const emailInput = form.querySelector('input[name="email"]');
    const passwordInput = form.querySelector('input[name="password"]');

    saveInputValue(emailInput.value, passwordInput.value);
};

const loadInputState = () => {
    const emailInput = form.querySelector('input[name="email"]');
    const passwordInput = form.querySelector('input[name="password"]');
    const { savedEmail, savedPassword } = loadInputValues();

    if (savedEmail !== null) {
        emailInput.value = savedEmail;
    }

    if (savedPassword !== null) {
        passwordInput.value = savedPassword;
    }
};

const clearInputState = (form) => {
    form.querySelectorAll('input').forEach(input => {
        input.value = '';
    });

    deleteInputValue();
};

inputFields.forEach(field => {
    const input = createNewElement('input');
    setAttributesForElement(input, {
        type: field.type,
        name: field.name,
        placeholder: field.placeholder,
    });
    appendChildToParent(form, input);
});

const submitButton = createNewElement('button');
setAttributesForElement(submitButton, { type: 'submit' });
submitButton.textContent = 'Submit';
appendChildToParent(form, submitButton);

const rootDiv = document.getElementById('root');
rootDiv.appendChild(form);

document.addEventListener('DOMContentLoaded', loadInputState);

form.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', saveInputState);
});

const dataContainer = createNewElement('div');
rootDiv.appendChild(dataContainer);

form.addEventListener('submit', submitForm);
