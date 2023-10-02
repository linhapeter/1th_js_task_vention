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


    localStorage.setItem('savedEmail', emailInput.value);
    localStorage.setItem('savedPassword', passwordInput.value);
};


const loadInputState = () => {
    const emailInput = form.querySelector('input[name="email"]');
    const passwordInput = form.querySelector('input[name="password"]');
    const savedEmail = localStorage.getItem('savedEmail');
    const savedPassword = localStorage.getItem('savedPassword');


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


    localStorage.removeItem('savedEmail');
    localStorage.removeItem('savedPassword');
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


const dataContainer = createNewElement('div');
rootDiv.appendChild(dataContainer);

form.addEventListener('submit', submitForm);
