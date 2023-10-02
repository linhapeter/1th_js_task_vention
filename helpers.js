export const createNewElement = (tag) => {
    return document.createElement(tag);
};

export const setAttributesForElement = (element, attributes = {}) => {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
};

export const appendChildToParent = (parent, child) => {
    parent.appendChild(child);
};

export const validateForm = (email, password) => {
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
