import { createNewElement, setAttributesForElement, appendChildToParent, validateForm } from './helpers.js';

const formData = new FormData();

const form = createNewElement('form');

const inputFields = [
    { type: 'email', name: 'email', placeholder: 'Email' },
    { type: 'password', name: 'password', placeholder: 'Password' },
];

const submitForm = async e => {
    e.preventDefault();
    if (!validateForm(form.email.value, form.password.value)) return;

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
        clearInputState(form);
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

const saveInputValue = (email, password) => {
    localStorage.setItem(Keys.savedEmail, email);
    localStorage.setItem(Keys.savedPassword, password);
}

const loadInputValues = () => {
    const savedEmail = localStorage.getItem(Keys.savedEmail);
    const savedPassword = localStorage.getItem(Keys.savedPassword);
    return { savedEmail, savedPassword };
};

const deleteInputValue = () => {
    localStorage.removeItem(Keys.savedEmail);
    localStorage.removeItem(Keys.savedPassword);
}

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

const Keys = {
    savedEmail: 'savedEmail',
    savedPassword: 'savedPassword',
}

document.addEventListener('DOMContentLoaded', loadInputState);

form.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', saveInputState);
});

const dataContainer = createNewElement('div');
rootDiv.appendChild(dataContainer);

form.addEventListener('submit', submitForm);
