'use strict'

// function onInit() {
//     renderGallery()
// }

function renderGallery() {
    const imgs = getImgs()
    let strHtml = imgs.slice(0).map(img => `<img src="${img.url}" alt="Meme Image" class="gallery-img flex wrap" onclick="onImgSelect(${img.id},this)">`
    ).join('')
    document.querySelector(".results-container").innerHTML = strHtml
}

function onImgSelect(imgId, el) {
    onToggleHidden(el)
    setImg(imgId)
    renderMeme()
}

function onToggleHidden(el) {
    const elGallery = document.querySelector('.gallery-container')
    const elEditor = document.querySelector('.editor-container')
    const elSavedMemes = document.querySelector('.saved-memes-container')

    if (el.classList.contains('gallery-img')) {
        elGallery.classList.add('hidden')
        elEditor.classList.remove('hidden')
    } else if (el.classList.contains('btn-gallery')) {
        elGallery.classList.toggle('hidden')
    } else if (el.classList.contains('btn-saved-memes')) elSavedMemes.classList.toggle('hidden')
}

function renderSavedMemes() {
    const savedMemes = loadMemes()
    let strHtml = savedMemes.map((meme, index) => {
        return `<div class="saved-meme">
                    <img src="${meme.imgDataUrl}" onclick="editSavedMeme(${index})"/>
                </div>`
    }).join('')
    document.querySelector('.saved-memes').innerHTML = strHtml
}

function onEditSavedMeme(index) {
    editSavedMeme(index)
    renderMeme()
}