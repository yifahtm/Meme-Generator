'use strict'

function onInit() {
    renderGallery()
}

function renderGallery() {
    const imgs = getImgs()
    let strHtmls = imgs.map(img => `<img src="${img.url}" alt="Meme Image" class="gallery-img">`).join('')

    document.querySelector(".gallery-container .results-container").innerHTML = strHtmls
}