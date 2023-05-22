function checkResponse(prom) {
    if (prom.ok) {
        return prom.json();
    }
    return Promise.reject(`Ошибка ${prom.status}`);
}

const data = {
    baseUrl: 'https://nomoreparties.co/v1/exp-mipt-fbc-1',
    headers: {
        authorization: 'b20c01b9-ffa4-4ea0-9a1b-772000c2285c',
        'Content-Type': 'application/json'
    }
}

export function getProfile() {
    return fetch(`${data.baseUrl}/users/me`, {
        headers: {authorization: data.headers.authorization}
    }).then(checkResponse)
}

export function getStartCards() {
    return fetch(`${data.baseUrl}/cards`, {
        headers: {authorization: data.headers.authorization}
    }).then(checkResponse)
}

export function addCard(name, link) {
    return fetch(`${data.baseUrl}/cards`, {
        method: 'POST',
        headers: data.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    }).then(checkResponse)
}

export function editProfileImage(url) {
    return fetch(`${data.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: data.headers,
        body: JSON.stringify({
            avatar: url
        })
    }).then(checkResponse)
}

export function editProfile(name, quote) {
    return fetch(`${data.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: data.headers,
        body: JSON.stringify({
            name: name,
            about: quote
        })
    }).then(checkResponse)
}

export function activateLike(id) {
    return fetch(`${data.baseUrl}/cards/likes/${id}`, {
        method: 'PUT',
        headers: {authorization: data.headers.authorization}
    }).then(checkResponse)
}

export function deactivateLike(id) {
    return fetch(`${data.baseUrl}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: {authorization: data.headers.authorization}
    }).then(checkResponse)
}

export function deleteCard(id) {
    return fetch(`${data.baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: {authorization: data.headers.authorization}
    }).then(checkResponse)
}