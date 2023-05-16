import { popupOverview } from "./index.js";
import { openPopup } from "./modal.js";

const cardList = document.querySelector('.card-list');

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

export function createCard(cardInfo) {
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

export function renderCard(cardInfo) {
    const newCard = createCard(cardInfo);
    cardList.insertBefore(newCard, cardList.firstChild);
}

export function initCards() {
    initialCards.forEach(renderCard);
}

function setDelete(card) {
    card.remove();
}

function setLike(buttonLike) {
    buttonLike.classList.toggle('card__like_active');
}

function openPopupOverview(image) {
    openPopup(popupOverview);
    const domImage = popupOverview.querySelector('.popup__image');
    domImage.src = image;
    domImage.alt = "картинка";
}
