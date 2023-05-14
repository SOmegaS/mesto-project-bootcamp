import {initialCards} from "./cards.js";

const profile = document.querySelector('.profile');
const buttonEdit = profile.querySelector('.profile__edit-button');
const popupProfileEdit = document.querySelector('.popup-profile-edit');
const buttonPopupProfileEditClose = popupProfileEdit.querySelector('.popup__button-close');
const formProfileEdit = popupProfileEdit.querySelector('form[name="edit"]');
const cardList = document.querySelector('.card-list');
const popupAddCard = document.querySelector('.popup-add-card');
const buttonPopupAddCardClose = popupAddCard.querySelector('.popup__button-close');
const buttonAddCard = profile.querySelector('.profile__add-button');
const formAddCard = popupAddCard.querySelector('form[name="add"]');
const popupOverview = document.querySelector('.popup-overview');
const buttonPopupOverviewClose = popupOverview.querySelector('.popup__button-close');
const inputNameEdit = popupProfileEdit.querySelector('input[name="name"]');
const inputQuoteEdit = popupProfileEdit.querySelector('input[name="quote"]');
const labelName = profile.querySelector('.profile__name');
const labelQuote = profile.querySelector('.profile__quote');

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function openPopupProfileEdit() {
    inputNameEdit.value = labelName.textContent;
    inputQuoteEdit.value = labelQuote.textContent;
    openPopup(popupProfileEdit)
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function submitFormProfileEdit(event) {
    event.preventDefault();
    labelName.textContent = inputNameEdit.value;
    labelQuote.textContent = inputQuoteEdit.value;
    closePopup(popupProfileEdit);
}

function createCard(cardInfo) {
    const newCard = document.getElementById('template-card')
        .content.querySelector('.card').cloneNode(true);
    newCard.querySelector('.card__title').textContent = cardInfo.name;
    const cardImage = newCard.querySelector('.card__image');
    cardImage.src = cardInfo.link;
    cardImage.alt = cardInfo.link;
    const buttonLike = newCard.querySelector('.card__like');
    buttonLike.addEventListener(
        'click',
        () => {
            setLike(buttonLike);
        }
    );
    const buttonDelete = newCard.querySelector('.card__delete');
    buttonDelete.addEventListener(
        'click',
        () => {
            setDelete(newCard);
        }
    )
    const image = newCard.querySelector('.card__image');
    image.addEventListener(
        'click',
        () => {
            openPopupOverview(image.src);
        }
    )
    return newCard;
}

function renderCard(cardInfo) {
    const newCard = createCard(cardInfo);
    cardList.insertBefore(newCard, cardList.firstChild);
}

function openPopupOverview(image) {
    openPopup(popupOverview)
    const domImage = popupOverview.querySelector('.popup__image');
    domImage.src = image;
    domImage.alt = "картинка";
}

function setDelete(card) {
    card.remove();
}

function initCards() {
    initialCards.forEach(renderCard);
}

function submitFormAddCard(event) {
    event.preventDefault();
    const cardInfo = {
        name: popupAddCard.querySelector('input[name="title"]').value,
        link: popupAddCard.querySelector('input[name="link"]').value
    }
    renderCard(cardInfo);
    closePopup(popupAddCard);
}

function setLike(buttonLike) {
    buttonLike.classList.toggle('card__like_active');
}

buttonEdit.addEventListener('click', openPopupProfileEdit);

buttonPopupProfileEditClose.addEventListener('click', () => closePopup(popupProfileEdit));

formProfileEdit.addEventListener('submit', submitFormProfileEdit);

buttonAddCard.addEventListener('click', () => openPopup(popupAddCard));

buttonPopupAddCardClose.addEventListener('click', () => closePopup(popupAddCard));

formAddCard.addEventListener('submit', submitFormAddCard);

buttonPopupOverviewClose.addEventListener('click', () => closePopup(popupOverview));

initCards();