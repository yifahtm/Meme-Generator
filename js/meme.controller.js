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
        meme.lines.forEach((line, index) => {
            let yPosition
            if (index === 0) {
                yPosition = 50
            } else if (index === 1) {
                yPosition = 400
            } else {
                yPosition = 50 + (index * 60)
            }
            drawText(line.txt, gElCanvas.width / 2, yPosition)
        })
    }
}

function drawText(text, x, y) {
    gCtx.fillStyle = getColor()
    gCtx.strokeStyle = 'black'
    gCtx.font = `${getFontSize()}px Arial`
    gCtx.textAlign = 'center'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function OnUpdateMeme(txt) {
    updateMeme(txt)
    renderMeme()
}

function onAddLine() {
    addLine()
    renderMeme()
}


function onChangeColor({ value }) {
    changeColor(value)
    renderMeme()
}

function onSetFont(el) {
    setFontSize(el)
    renderMeme()
}
// function onIncreaseFont() {
//     decreaseFont()
//     renderMeme()
// }

function onDownload(elLink) {
    const content = gElCanvas.toDataURL('image/jpeg')
    elLink.href = content
}

