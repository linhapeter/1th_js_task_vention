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


    const emailInput = form.querySelector('input[name="email"]');
    const passwordInput = form.querySelector('input[name="password"]');


    formData.append('email', emailInput.value);
    formData.append('password', passwordInput.value);


    try {
        const response = await fetch('https://httpbin.org/post', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            await showResponse(data.form);
        } else {
            console.error('Failed to send the request.');
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}


const showResponse = async(data) => {
    console.log(data);
};


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


form.addEventListener('submit', submitForm);