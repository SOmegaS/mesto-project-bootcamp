import {data} from "autoprefixer";

function hasValidInput(inputList) {
    let isOk = true;
    inputList.forEach((elem) => { isOk = elem.validity.valid ? isOk : false });
    return isOk;
}

function showInputError(element, errorSpan, selectors) {
    element.classList.add(selectors.inputError.replace('.', ''));
    errorSpan.classList.add(selectors.errorActiveSelector.replace('.', ''));
}

function hideInputError(element, errorSpan, selectors) {
    element.classList.remove(selectors.inputError.replace('.', ''));
    errorSpan.classList.remove(selectors.errorActiveSelector.replace('.', ''));
}

function isValid(input, spanError, selectors) {
    console.log(selectors);
    if (!input.validity.valid) {
        showInputError(input, spanError, selectors);
    } else {
        hideInputError(input, spanError, selectors);
    }
}

export function toggleSubmit(inputs, button, classDisable) {
    classDisable.replace('.', '');
    if (hasValidInput(inputs)) {
        button.classList.remove(classDisable);
        button.disabled = false;
    } else {
        button.classList.add(classDisable);
        button.disabled = true;
    }
}

export function enableValidation(data) {
    const forms = document.querySelectorAll(data.formSelector);
    forms.forEach((form) => {
        const inputs = form.querySelectorAll(data.inputSelector);
        const spans = form.querySelectorAll(data.errorSpanSelector);
        const buttonSubmit = form.querySelector(data.buttonSubmitSelector);
        for (let i = 0; i < inputs.length; ++i) {
            inputs[i].addEventListener('input', () => {
                isValid(inputs[i], spans[i], data);
                toggleSubmit(inputs, buttonSubmit, data.buttonClassDisabled);
            });
        }
    });
}