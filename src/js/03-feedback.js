import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const formObject = {
  email: document.querySelector('input'),
  message: document.querySelector('textarea'),
  form: document.querySelector('.feedback-form'),
};

const params = {};

formObject.form.addEventListener('input', throttle(onFormInput, 500));
formObject.form.addEventListener('submit', onFormSubmit);

function onFormInput(evt) {
  const key = evt.target.name;
  params[key] = evt.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(params));
}

function onFormSubmit(evt) {
  evt.preventDefault();

  console.log(params);

  evt.currentTarget.reset();

  localStorage.removeItem(STORAGE_KEY);
}

function getStorageData() {
  const data = localStorage.getItem(STORAGE_KEY);
  const parseData = JSON.parse(data);

  if (parseData) {
    parseData.email
      ? (formObject.email.value = parseData.email)
      : (formObject.email.value = '');
    parseData.message
      ? (formObject.message.value = parseData.message)
      : (formObject.message.value = '');
  }
}

getStorageData();
