import '../pages/index.css';
import { initCards, renderCard } from "./card.js";
import { enableValidation, toggleSubmit } from "./validate.js";
import { closePopup, openPopup } from "./modal.js";
import {addCard, editProfile, editProfileImage, getProfile, getStartCards} from "./api.js";

export let userID;
const profile = document.querySelector('.profile');
const buttonEditAvatar = profile.querySelector('.profile__edit-avatar');
const buttonEdit = profile.querySelector('.profile__edit-button');
const avatar = profile.querySelector('.profile__avatar');
const popupProfileEdit = document.querySelector('.popup-profile-edit');
const buttonPopupProfileEditClose = popupProfileEdit.querySelector('.popup__button-close');
export const popupAddCard = document.querySelector('.popup-add-card');
const buttonPopupAddCardClose = popupAddCard.querySelector('.popup__button-close');
const buttonAddCard = profile.querySelector('.profile__add-button');

const formProfileEdit = document.forms["edit"];
const formAddCard = document.forms["add"];
const popupEditAvatar = document.querySelector('.popup-edit-avatar');
const formEditAvatar = document.forms["edit-avatar"];

export const popupOverview = document.querySelector('.popup-overview');
const buttonPopupOverviewClose = popupOverview.querySelector('.popup__button-close');
const inputNameEdit = popupProfileEdit.querySelector('input[name="name"]');
const inputQuoteEdit = popupProfileEdit.querySelector('input[name="quote"]');
const labelName = profile.querySelector('.profile__name');
const labelQuote = profile.querySelector('.profile__quote');
const imageProfile = profile.querySelector('.profile__avatar');
const popupContainerEdit = popupProfileEdit.querySelector('.popup__container');
const popupContainerAdd = popupAddCard.querySelector('.popup__container');
const popupContainerEditAvatar = popupEditAvatar.querySelector('.popup__container');
const popupContainerOverview = popupOverview.querySelector('.popup__image');
const cardName = popupAddCard.querySelector('input[name="title"]');
const avatarLink = popupContainerEditAvatar.querySelector('input[name="link"]');
const cardLink = popupAddCard.querySelector('input[name="link"]');
export const domImage = popupOverview.querySelector('.popup__image');
const buttonEditAvatarClose = popupEditAvatar.querySelector('.popup__button-close');
const buttonSubmitAdd = formAddCard.querySelector('.popup__submit');
const buttonSubmitEdit = formProfileEdit.querySelector('.popup__submit');
const buttonSubmitEditAvatar = formEditAvatar.querySelector('.popup__submit');
const data = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    errorSpanSelector: '.popup__error',
    errorActiveSelector: '.popup__error_active',
    buttonSubmitSelector: '.popup__submit',
    inputError: '.popup__input_error',
    buttonClassDisabled: '.popup__button_disabled',
}

function showUpdating(isUpdating, elem, text) {
    if (isUpdating) {
        elem.textContent = text[1];
    } else {
        elem.textContent = text[0];
    }
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

    showUpdating(true, buttonSubmitEdit, "Сохранение...");
    editProfile(inputNameEdit.value, inputQuoteEdit.value)
        .then(() => {
            labelName.textContent = inputNameEdit.value;
            labelQuote.textContent = inputQuoteEdit.value;
            closePopup(popupProfileEdit);
        })
        .finally(() => showUpdating(false, buttonSubmitEdit, "Сохранить"))
        .catch((err) => {
            console.log(err);
        });
}

function submitFormAddCard(event) {
    event.preventDefault();
    const cardInfo = {
        name: cardName.value,
        link: cardLink.value
    }
    cardName.value = "";
    cardLink.value = "";

    showUpdating(true, buttonSubmitAdd, "Создание...");
    addCard(cardInfo.name, cardInfo.link)
        .then(res => {
            cardInfo._id = res._id;
            cardInfo.likes = res.likes;
            renderCard(cardInfo, true);
            closePopup(popupAddCard);
            event.target.reset();
            buttonSubmitAdd.setAttribute("disabled", "disabled");
        })
        .finally(() => showUpdating(false, buttonSubmitAdd, "Создать"))
        .catch((err) => {
            console.log(err);
        });
}

buttonPopupProfileEditClose.addEventListener('click', () => closePopup(popupProfileEdit));

formProfileEdit.addEventListener('submit', submitFormProfileEdit);

buttonAddCard.addEventListener('click', () => {
    openPopup(popupAddCard);
    toggleSubmit([cardName, cardLink], buttonSubmitAdd, data.buttonClassDisabled);
});

buttonEditAvatar.addEventListener('click', () => {
    openPopup(popupEditAvatar);
    toggleSubmit([avatarLink], buttonSubmitEditAvatar, data.buttonClassDisabled);
});

buttonPopupAddCardClose.addEventListener('click', () => closePopup(popupAddCard));

formAddCard.addEventListener('submit', submitFormAddCard);

formEditAvatar.addEventListener('submit', (event) => {
    event.preventDefault();
    showUpdating(true, buttonSubmitEditAvatar, "Сохранение...");
    editProfileImage(avatarLink.value)
        .then(() => {
            avatar.src = avatarLink.value;
            avatarLink.value = "";
            closePopup(popupContainerEditAvatar);
        })
        .finally(() => showUpdating(false, buttonSubmitEditAvatar, "Сохранить"))
        .catch((err) => {
            console.log(err);
        });
})

buttonPopupOverviewClose.addEventListener('click', () => closePopup(popupOverview));
buttonEditAvatarClose.addEventListener('click', () => closePopup(popupEditAvatar));

popupOverview.addEventListener( 'click', (event) => {
    const withinBoundaries = event.composedPath().includes(popupContainerOverview);
    if (!withinBoundaries) {
        closePopup(popupOverview);
    }
});

popupProfileEdit.addEventListener( 'click', (event) => {
    const withinBoundaries = event.composedPath().includes(popupContainerEdit);
    if (!withinBoundaries) {
        closePopup(popupProfileEdit);
    }
});

popupAddCard.addEventListener( 'click', (event) => {
    const withinBoundaries = event.composedPath().includes(popupContainerAdd);
    if (!withinBoundaries) {
        closePopup(popupAddCard);
    }
});

popupEditAvatar.addEventListener('click', (event) => {
    const withinBoundaries = event.composedPath().includes(popupContainerEditAvatar);
    if (!withinBoundaries) {
        closePopup(popupEditAvatar);
    }
});

enableValidation(data);

function setProfile(obj) {
    labelName.textContent = obj.name;
    labelQuote.textContent = obj.about;
    imageProfile.src = obj.avatar;
    userID = obj._id;
}

Promise.all([getProfile(), getStartCards()])
    .then(([user, cards]) => {
        setProfile(user);
        initCards(cards);
    })
    .catch(err => {
        console.log(err);
    });
