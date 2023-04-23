const profile = document.querySelector('.profile');
const buttonEdit = profile.querySelector('.profile__edit-button');
const popupProfileEdit = document.querySelector('.popup_profile-edit');
const buttonPopupProfileEditClose = popupProfileEdit.querySelector('.popup__button-close');
const formProfileEdit = popupProfileEdit.querySelector('form[name="edit"]');
const cardList = document.querySelector('.card-list')
const popupAddCard = document.querySelector('.popup_add-card')
const buttonPopupAddCardClose = popupAddCard.querySelector('.popup__button-close')
const buttonAddCard = profile.querySelector('.profile__add-button')
const formAddCard = popupAddCard.querySelector('form[name="add"]')

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function openPopupProfileEdit() {
    popupProfileEdit.querySelector('input[name="name"]').value =
        profile.querySelector('.profile__name').textContent;
    popupProfileEdit.querySelector('input[name="quote"]').value =
        profile.querySelector('.profile__quote').textContent;
    popupProfileEdit.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function submitFormProfileEdit(event) {
    event.preventDefault();
    profile.querySelector('.profile__name').textContent =
        popupProfileEdit.querySelector('input[name="name"]').value;
    profile.querySelector('.profile__quote').textContent =
        popupProfileEdit.querySelector('input[name="quote"]').value;
    closePopup(popupProfileEdit);
}

function addCard(cardInfo) {
    let newCard = document.getElementById('template-card')
        .content.querySelector('.card').cloneNode(true);
    newCard.querySelector('.card__title').textContent = cardInfo.name;
    newCard.querySelector('.card__image').src = cardInfo.link;
    cardList.insertBefore(newCard, cardList.firstChild);
    const buttonLike = newCard.querySelector('.card__like');
    buttonLike.addEventListener(
        'click',
        () => {
            setLike(buttonLike);
        }
    );
}

function initCards() {
    for (const cardInfo in initialCards) {
        addCard(initialCards[cardInfo]);
    }
}

function openPopupAddCard() {
    popupAddCard.classList.add('popup_opened');
}

function submitFormAddCard(event) {
    event.preventDefault();
    cardInfo = {
        name: popupAddCard.querySelector('input[name="title"]').value,
        link: popupAddCard.querySelector('input[name="link"]').value
    }
    addCard(cardInfo);
    closePopup(popupAddCard);
}

function setLike(buttonLike) {
    if (buttonLike.classList.contains('card__like_active')) {
        buttonLike.classList.remove('card__like_active');
        return;
    }
    buttonLike.classList.add('card__like_active');
}

buttonEdit.addEventListener('click', openPopupProfileEdit);

buttonPopupProfileEditClose.addEventListener('click', () => closePopup(popupProfileEdit));

formProfileEdit.addEventListener('submit', submitFormProfileEdit);

buttonAddCard.addEventListener('click', openPopupAddCard);

buttonPopupAddCardClose.addEventListener('click', () => closePopup(popupAddCard));

formAddCard.addEventListener('submit', submitFormAddCard);

initCards();