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
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
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
            drawText(line.txt, gElCanvas.width / 2, yPosition, index)
        })
    }
}

function drawText(text, x, y, lineIndex) {
    gCtx.fillStyle = getColor()
    gCtx.strokeStyle = 'black'
    gCtx.font = `${getFontSize()}px ${getFontFamily() || 'impact'}, monospace`
    gCtx.textAlign = `${getFontAlignment() || 'center'}`
    let xPos = x;
    let align = getFontAlignment()
    if (align === 'left') {
        xPos = 0
    } else if (align === 'right') {
        xPos = gElCanvas.width
    }

    gCtx.fillText(text, xPos, y);
    gCtx.strokeText(text, xPos, y);
    const textWidth = gCtx.measureText(text).width
    const textHeight = parseInt(gCtx.font, 10)
    setLinePos(x, y, lineIndex, textWidth, textHeight)
    // const selectedIdx = getSelectedIdx()
    // if (lineIndex === selectedIdx) {
    //     drawRectangleAroundText(text, x, y)
    // }
}

// function drawRectangleAroundText(text, x, y) {
//     const measurements = gCtx.measureText(text)
//     const textWidth = measurements.width
//     const fontSize = parseInt(gCtx.font, 10)
//     const padding = 10


//     const rectX = x - textWidth / 2 - padding
//     const rectY = y - fontSize / 2 - padding
//     const rectWidth = textWidth + 2 * padding
//     const rectHeight = fontSize + 2 * padding
//     gCtx.beginPath()
//     gCtx.rect(rectX, rectY, rectWidth, rectHeight)
//     gCtx.strokeStyle = 'lightgrey'
//     gCtx.lineWidth = 2
//     gCtx.stroke()
// }

function OnUpdateMeme(txt) {
    updateMeme(txt)
    renderMeme()
}

function onAddLine() {
    addLine()
    renderMeme()
}

function onDeleteLine() {
    deleteLine()
    renderMeme()
}


function onSwitchLine() {
    switchLine()
    document.getElementById('meme-text-input').value = getText()
    renderMeme()
}

function onMoveLineUp() {
    moveLineUp()
    renderMeme()
}

function onMoveLineDown() {
    moveLineDown()
    renderMeme()
}


function onChangeColor(event) {
    const { value } = event.target
    changeColor(value)
    renderMeme()
}

function onSetFontSize(el) {
    setFontSize(el)
    renderMeme()
}

function onSetFontFamily(fontFamily) {
    setFontFamily(fontFamily)
    renderMeme()
}

function onSetTextAlign(align) {
    setTextAlign(align)
    renderMeme()
}

function onDownload(elLink) {
    const content = gElCanvas.toDataURL('image/jpeg')
    elLink.href = content
}

