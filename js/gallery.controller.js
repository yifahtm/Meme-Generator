'use strict'

// function onInit() {
//     renderGallery()
// }

function renderGallery() {
    const imgs = getImgs()
    let strHtmls = imgs.slice(0).map(img => `<img src="${img.url}" alt="Meme Image" class="gallery-img" onclick="onImgSelect(${img.id})">`
    ).join('')
    document.querySelector(".results-container").innerHTML = strHtmls
}

function onImgSelect(imgId) {
    setImg(imgId);
    renderMeme();
}