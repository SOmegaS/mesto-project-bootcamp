function hasValidInput(inputList) {
    let isOk = true;
    inputList.forEach((elem) => { isOk = elem.validity.valid ? isOk : false });
    return isOk;
}

function showInputError(element, errorSpan) {
    element.classList.add('popup__input_error');
    errorSpan.classList.add('popup__error_active');
}

function hideInputError(element, errorSpan) {
    element.classList.remove('popup__input_error');
    errorSpan.classList.remove('popup__error_active');
}

function isValid(input, spanError) {
    if (!input.validity.valid) {
        showInputError(input, spanError);
    } else {
        hideInputError(input, spanError);
    }
}

export function toggleSubmit(inputs, button) {
    if (hasValidInput(inputs)) {
        button.classList.remove('popup__submit_disabled');
        button.disabled = false;
    } else {
        button.classList.add('popup__submit_disabled');
        button.disabled = true;
    }
}

export function enableValidation(forms) {
    forms.forEach((form) => {
        const inputs = form.querySelectorAll('.popup__input');
        const spans = form.querySelectorAll('.popup__error');
        const buttonSubmit = form.querySelector('.popup__submit');
        for (let i = 0; i < inputs.length; ++i) {
            inputs[i].addEventListener('input', () => {
                isValid(inputs[i], spans[i]);
                toggleSubmit(inputs, buttonSubmit);
            });
        }
    });
}