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
    deleteElementAccordingToClass('temp');
    for (const key in data) {
        const keyValueElement = createNewElement('div');
        setAttributesForElement(keyValueElement, { class: 'temp' })
        keyValueElement.textContent = `${key}: ${data[key]}`;
        rootDiv.appendChild(keyValueElement);
    }
}


const deleteElementAccordingToClass = (className) => {
    const elements = Array.from(document.getElementsByClassName(className));
    elements.forEach(element => element.remove());
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