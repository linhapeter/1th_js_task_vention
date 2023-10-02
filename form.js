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
    { type: 'password', name: 'password', placeholder: 'Password' },
];


const submitForm = async(e) => {
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

    saveInputValue(Keys.savedEmail, emailInput.value);
    saveInputValue(Keys.savedPassword, passwordInput.value);
};


const loadInputState = () => {
    const emailInput = form.querySelector('input[name="email"]');
    const passwordInput = form.querySelector('input[name="password"]');
    const savedEmail = loadInputValue(Keys.savedEmail);
    const savedPassword = loadInputValue(Keys.savedPassword);

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


    deleteInputValue(Keys.savedEmail);
    deleteInputValue(Keys.savedPassword);
};

const saveInputValue = (key, value) => {
    localStorage.setItem(key, value);
}

const loadInputValue = (key) => {
    return localStorage.getItem(key);
}

const deleteInputValue = (key) => {
    localStorage.removeItem(key);
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
