'use strict'

// function onInit() {
//     renderGallery()
// }

function renderGallery() {
    const imgs = getImgs()
    let strHtmls = imgs.slice(0).map(img => `<img src="${img.url}" alt="Meme Image" class="gallery-img flex wrap" onclick="onImgSelect(${img.id},this)">`
    ).join('')
    document.querySelector(".results-container").innerHTML = strHtmls
}

function onImgSelect(imgId, el) {
    onToggleHidden(el)
    setImg(imgId)
    renderMeme()
}

function onToggleHidden(el) {
    const elGallery = document.querySelector('.gallery-container')
    const elEditor = document.querySelector('.editor-container')
    if (el.classList.contains('gallery-img')) {
        elGallery.classList.add('hidden')
        elEditor.classList.remove('hidden')
    } else if (el.classList.contains('btn-gallery')) {
        elGallery.classList.toggle('hidden')
    }
}