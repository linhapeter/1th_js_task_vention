import {
  createNewElement,
  setAttributesForElement,
  appendChildToParent,
  validateForm,
  saveInputValue,
  loadInputValues,
  deleteInputValue,
  removeLoadingMsg,
  createLoadingMsg,
} from "./helpers.js";
import { apiPost } from "./api.js";

const submitForm = async (e) => {
  e.preventDefault();

  if (!validateForm(form.email.value, form.password.value)) return;

  const emailInput = form.querySelector('input[name="email"]');
  const passwordInput = form.querySelector('input[name="password"]');

  const requestData = {
    email: emailInput.value,
    password: passwordInput.value,
  };

  createLoadingMsg(form);

  try {
    const data = await apiPost(requestData);

    removeLoadingMsg();

    addElementsWithOutputContent(data.json);
    clearInputState(form);
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

const addElementsWithOutputContent = (data) => {
  dataContainer.innerHTML = "";
  for (const key in data) {
    const keyValueElement = createNewElement("div");
    keyValueElement.textContent = `${key}: ${data[key]}`;
    dataContainer.appendChild(keyValueElement);
  }
};

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
  form.querySelectorAll("input").forEach((input) => {
    input.value = "";
  });

  deleteInputValue();
};

const formData = new FormData();

const form = createNewElement("form");

const inputFields = [
  { type: "email", name: "email", placeholder: "Email" },
  { type: "password", name: "password", placeholder: "Password" },
];

inputFields.forEach((field) => {
  const input = createNewElement("input");
  setAttributesForElement(input, {
    type: field.type,
    name: field.name,
    placeholder: field.placeholder,
  });
  appendChildToParent(form, input);
});

const submitButton = createNewElement("button");
setAttributesForElement(submitButton, { type: "submit" });
submitButton.textContent = "Submit";
appendChildToParent(form, submitButton);

const rootDiv = document.getElementById("root");
rootDiv.appendChild(form);

document.addEventListener("DOMContentLoaded", loadInputState);

form.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", saveInputState);
});

const dataContainer = createNewElement("div");
rootDiv.appendChild(dataContainer);

form.addEventListener("submit", submitForm);
