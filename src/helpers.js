const Keys = {
  savedEmail: 'savedEmail',
  savedPassword: 'savedPassword',
}

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

export const saveInputValue = (email, password) => {
  localStorage.setItem(Keys.savedEmail, email);
  localStorage.setItem(Keys.savedPassword, password);
}

export const loadInputValues = () => {
  const savedEmail = localStorage.getItem(Keys.savedEmail);
  const savedPassword = localStorage.getItem(Keys.savedPassword);
  return { savedEmail, savedPassword };
};

export const deleteInputValue = () => {
  localStorage.removeItem(Keys.savedEmail);
  localStorage.removeItem(Keys.savedPassword);
}

export const removeLoadingMsg = () => document.getElementById('loadingMsg').remove();

export const createLoadingMsg = (form) => {
  const loadingMessage = createNewElement('div');
  setAttributesForElement(loadingMessage, { id: 'loadingMsg' });
  loadingMessage.textContent = 'Processing...';
  appendChildToParent(form, loadingMessage);
}
