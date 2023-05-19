import '../pages/index.css';
import { initCards, renderCard } from "./card.js";
import { enableValidation, toggleSubmit } from "./validate.js";
import { closePopup, openPopup } from "./modal.js";

const profile = document.querySelector('.profile');
const buttonEdit = profile.querySelector('.profile__edit-button');
const popupProfileEdit = document.querySelector('.popup-profile-edit');
const buttonPopupProfileEditClose = popupProfileEdit.querySelector('.popup__button-close');
export const popupAddCard = document.querySelector('.popup-add-card');
const buttonPopupAddCardClose = popupAddCard.querySelector('.popup__button-close');
const buttonAddCard = profile.querySelector('.profile__add-button');

const formProfileEdit = document.forms["edit"];
const formAddCard = document.forms["add"];

export const popupOverview = document.querySelector('.popup-overview');
const buttonPopupOverviewClose = popupOverview.querySelector('.popup__button-close');
const inputNameEdit = popupProfileEdit.querySelector('input[name="name"]');
const inputQuoteEdit = popupProfileEdit.querySelector('input[name="quote"]');
const labelName = profile.querySelector('.profile__name');
const labelQuote = profile.querySelector('.profile__quote');
const popupContainerEdit = popupProfileEdit.querySelector('.popup__container');
const popupContainerAdd = popupAddCard.querySelector('.popup__container');
const popupContainerOverview = popupOverview.querySelector('.popup__image');
const cardName = popupAddCard.querySelector('input[name="title"]');
const cardLink = popupAddCard.querySelector('input[name="link"]');
export const domImage = popupOverview.querySelector('.popup__image');
const buttonSubmitAdd = formAddCard.querySelector('.popup__submit')
const data = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    errorSpanSelector: '.popup__error',
    errorActiveSelector: '.popup__error_active',
    buttonSubmitSelector: '.popup__submit',
    inputError: '.popup__input_error',
    buttonClassDisabled: '.popup__button_disabled',
}

buttonEdit.addEventListener('click', () => {
    inputNameEdit.value = labelName.textContent;
    inputQuoteEdit.value = labelQuote.textContent;
    openPopup(popupProfileEdit);
});

function submitFormProfileEdit(event) {
    event.preventDefault();
    labelName.textContent = inputNameEdit.value;
    labelQuote.textContent = inputQuoteEdit.value;
    closePopup(popupProfileEdit);
}

function submitFormAddCard(event) {
    event.preventDefault();
    const cardInfo = {
        name: cardName.value,
        link: cardLink.value
    }
    cardName.value = "";
    cardLink.value = "";
    renderCard(cardInfo);
    closePopup(popupAddCard);
}

buttonPopupProfileEditClose.addEventListener('click', () => closePopup(popupProfileEdit));

formProfileEdit.addEventListener('submit', submitFormProfileEdit);

buttonAddCard.addEventListener('click', () => {
    openPopup(popupAddCard);
    toggleSubmit([cardName, cardLink], buttonSubmitAdd, data.buttonClassDisabled);
});

buttonPopupAddCardClose.addEventListener('click', () => closePopup(popupAddCard));

formAddCard.addEventListener('submit', submitFormAddCard);

buttonPopupOverviewClose.addEventListener('click', () => closePopup(popupOverview));

popupOverview.addEventListener( 'click', (event) => {
    const withinBoundaries = event.composedPath().includes(popupContainerOverview);
    if (!withinBoundaries) {
        closePopup(popupOverview);
    }
})

popupProfileEdit.addEventListener( 'click', (event) => {
    const withinBoundaries = event.composedPath().includes(popupContainerEdit);
    if (!withinBoundaries) {
        closePopup(popupProfileEdit);
    }
})

popupAddCard.addEventListener( 'click', (event) => {
    const withinBoundaries = event.composedPath().includes(popupContainerAdd);
    if (!withinBoundaries) {
        closePopup(popupAddCard);
    }
})

enableValidation(data);

initCards();
