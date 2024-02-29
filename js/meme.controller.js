'use strict'

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    addListeners()
    renderMeme()
}

function renderMeme() {
    const InitX = gElCanvas.width / 2
    const initY = 50;
    const meme = getMeme()
    drawImg()
    drawText(meme[0].lines[0].txt, InitX, initY)
}

// function drawImg() {
//     const img = new Image()
//     img.src = getImg().url
//     img.onload = () => {
//         gCtx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight)
//     }
// }

// function drawImg() {
//     const elImg = document.querySelector('img')
//     gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
// }


function drawImg() {
    const elImg = new Image()
    elImg.src = getImg().url
    elImg.onload = () =>
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function drawText(text, x, y) {
    gCtx.beginPath()
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'orange'
    gCtx.fillStyle = 'lightsteelblue'
    gCtx.font = '45px Arial'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function OnUpdateMeme(txt) {
    const updatedMeme = updateMeme(txt)
    renderMeme()
}