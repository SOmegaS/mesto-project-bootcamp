import { popupOverview, domImage, userID } from "./index.js";
import { openPopup } from "./modal.js";
import {activateLike, deactivateLike, deleteCard} from "./api.js";

const cardList = document.querySelector('.card-list');

export function createCard(cardInfo, own) {
    const newCard = document.getElementById('template-card')
        .content.querySelector('.card').cloneNode(true);
    newCard.querySelector('.card__like-count').textContent = cardInfo.likes.length;
    newCard.querySelector('.card__title').textContent = cardInfo.name;
    const cardImage = newCard.querySelector('.card__image');
    cardImage.src = cardInfo.link;
    cardImage.alt = cardInfo.link;
    const buttonLike = newCard.querySelector('.card__like');
    const labelCount = newCard.querySelector('.card__like-count');
    if (cardInfo.likes.some((elem) => {
        return elem._id === userID;
    })) {
        setLike(buttonLike, labelCount, cardInfo.likes.length);
    }
    buttonLike.addEventListener(
        'click',
        () => {
            if (buttonLike.classList.contains('card__like_active')) {
                deactivateLike(cardInfo._id)
                    .then((res) => {
                        setLike(buttonLike, labelCount, res.likes.length);
                    });
            } else {
                activateLike(cardInfo._id)
                    .then((res) => {
                        setLike(buttonLike, labelCount, res.likes.length);
                    });
            }
        }
    );
    const buttonDelete = newCard.querySelector('.card__delete');
    if (own) {
        buttonDelete.addEventListener(
            'click',
            () => {
                deleteCard(cardInfo._id)
                    .then(() => {
                        setDelete(newCard);
                    });
            }
        )
    } else {
        buttonDelete.style.display = "none";
    }
    cardImage.addEventListener(
        'click',
        () => {
            openPopupOverview(cardImage.src, cardImage.alt);
        }
    )
    return newCard;
}

export function renderCard(cardInfo, own) {
    const newCard = createCard(cardInfo, own);
    cardList.insertBefore(newCard, cardList.firstChild);
}

export function initCards(initialCards) {
    initialCards.forEach((card) => {
        if (card.owner._id === userID) {
            renderCard(card, true);
        } else {
            renderCard(card, false);
        }
    });
}

function setDelete(card) {
    card.remove();
}

function setLike(buttonLike, labelCount, count) {
    buttonLike.classList.toggle('card__like_active');
    labelCount.textContent = count;
}

function openPopupOverview(image, alt) {
    openPopup(popupOverview);
    domImage.src = image;
    domImage.alt = alt;
}
