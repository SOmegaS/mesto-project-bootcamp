const profile = document.querySelector('.profile');
const buttonEdit = profile.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const buttonPopupClose = popup.querySelector('.popup__button-close');
const formEditProfile = popup.querySelector('form[name="edit"]');
const cardList = document.querySelector('.card-list')

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

function openPopup() {
    popup.querySelector('input[name="name"]').value =
        profile.querySelector('.profile__name').textContent;
    popup.querySelector('input[name="quote"]').value =
        profile.querySelector('.profile__quote').textContent;
    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function submitForm(event) {
    event.preventDefault();
    profile.querySelector('.profile__name').textContent =
        popup.querySelector('input[name="name"]').value;
    profile.querySelector('.profile__quote').textContent =
        popup.querySelector('input[name="quote"]').value;
    closePopup();
}

function initCards() {
    for (const cardInfo in initialCards) {
        let newCard = document.getElementById('template-card')
            .content.querySelector('.card').cloneNode(true);
        newCard.querySelector('.card__title').textContent = initialCards[cardInfo].name;
        newCard.querySelector('.card__image').src = initialCards[cardInfo].link;
        cardList.appendChild(newCard);
    }
}

buttonEdit.addEventListener('click', openPopup);

buttonPopupClose.addEventListener('click', closePopup);

formEditProfile.addEventListener('submit', submitForm);

initCards();