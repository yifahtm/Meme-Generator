'use strict'

let gElCanvas
let gCtx

function onInit() {
    renderGallery()
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    addListeners()
    renderMeme()
}

function renderMeme() {
    const meme = getMeme()
    drawImg(meme)
}

function drawImg(meme) {
    const elImg = new Image()
    elImg.src = getImgs().find(img => img.id === meme.selectedImgId).url
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(meme.lines[0].txt, gElCanvas.width / 2, 50)
    }
}

function drawText(text, x, y) {
    gCtx.fillStyle = 'white'
    gCtx.strokeStyle = 'black'
    gCtx.font = '30px Arial'
    gCtx.textAlign = 'center'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function OnUpdateMeme(txt) {
    updateMeme(txt)
    renderMeme()
}