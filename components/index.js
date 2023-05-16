import '../pages/index.css';
import { initCards, renderCard } from "./card.js";
import { enableValidation } from "./validate.js";
import { closePopup, openPopup } from "./modal.js";

const profile = document.querySelector('.profile');
const buttonEdit = profile.querySelector('.profile__edit-button');
const popupProfileEdit = document.querySelector('.popup-profile-edit');
const buttonPopupProfileEditClose = popupProfileEdit.querySelector('.popup__button-close');
const formProfileEdit = popupProfileEdit.querySelector('form[name="edit"]');
export const popupAddCard = document.querySelector('.popup-add-card');
const buttonPopupAddCardClose = popupAddCard.querySelector('.popup__button-close');
const buttonAddCard = profile.querySelector('.profile__add-button');
const formAddCard = popupAddCard.querySelector('form[name="add"]');
export const popupOverview = document.querySelector('.popup-overview');
const buttonPopupOverviewClose = popupOverview.querySelector('.popup__button-close');
const inputNameEdit = popupProfileEdit.querySelector('input[name="name"]');
const inputQuoteEdit = popupProfileEdit.querySelector('input[name="quote"]');
const labelName = profile.querySelector('.profile__name');
const labelQuote = profile.querySelector('.profile__quote');
const popupContainerEdit = popupProfileEdit.querySelector('.popup__container');
const popupContainerAdd = popupAddCard.querySelector('.popup__container');
const popupContainerOverview = popupOverview.querySelector('.popup__image');
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
    event.preventDefault();
    const cardInfo = {
        name: popupAddCard.querySelector('input[name="title"]').value,
        link: popupAddCard.querySelector('input[name="link"]').value
    }
    renderCard(cardInfo);
    closePopup(popupAddCard);
}

buttonPopupProfileEditClose.addEventListener('click', () => closePopup(popupProfileEdit));

formProfileEdit.addEventListener('submit', submitFormProfileEdit);

buttonAddCard.addEventListener('click', () => openPopup(popupAddCard));

buttonPopupAddCardClose.addEventListener('click', () => closePopup(popupAddCard));

formAddCard.addEventListener('submit', submitFormAddCard);

buttonPopupOverviewClose.addEventListener('click', () => closePopup(popupOverview));

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closePopup(popupProfileEdit);
        closePopup(popupAddCard);
        closePopup(popupOverview);
    }
});

popupOverview.addEventListener( 'click', (event) => {
    let withinBoundaries = event.composedPath().includes(popupContainerOverview);
    if (!withinBoundaries) {
        closePopup(popupOverview);
    }
})

popupProfileEdit.addEventListener( 'click', (event) => {
    let withinBoundaries = event.composedPath().includes(popupContainerEdit);
    if (!withinBoundaries) {
        closePopup(popupProfileEdit);
    }
})

popupAddCard.addEventListener( 'click', (event) => {
    let withinBoundaries = event.composedPath().includes(popupContainerAdd);
    if (!withinBoundaries) {
        closePopup(popupAddCard);
    }
})

enableValidation([formProfileEdit, formAddCard]);

initCards();
