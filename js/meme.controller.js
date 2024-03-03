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

            drawText(line, gElCanvas.width / 2, yPosition, index)
        })
    }
}

function drawText(line, x, y, lineIndex) {
    console.log('line', line)
    gCtx.fillStyle = line.color
    gCtx.strokeStyle = 'black'
    gCtx.font = `${line.size}px ${line.fontFamily || 'impact'}, monospace`
    gCtx.textAlign = `${line.align || 'center'}`
    let xPos = x
    let align = line.align
    if (align === 'left') {
        xPos = 0
    } else if (align === 'right') {
        xPos = gElCanvas.width
    }

    gCtx.fillText(line.txt, xPos, y)
    gCtx.strokeText(line.txt, xPos, y)
    const textWidth = gCtx.measureText(line.txt).width
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

function onSetFontSize(el, diff) {
    setFontSize(el, diff)
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


function onSaveMemes() {
    saveMemes()
}

function onLoadMemes() {
    loadMemes()
    //     gCtx.moveTo(gLine[0].x, gLine[0].y)
    //     gCtx.beginPath()
    //     gLine.forEach(pos => gCtx.lineTo(pos.x, pos.y))
    //     gCtx.stroke()
}

function onUpload(ev) {
    loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
    const input = ev.target
    const reader = new FileReader()

    reader.onload = ev => {
        const img = new Image()
        img.src = ev.target.result
        img.onload = () => onImageReady(img)
    }
    reader.readAsDataURL(input.files[0])
}

function renderImg(img) {
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function onUploadToFace() {
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')

    function onSuccess(uploadedImgUrl) {
        const url = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
    }

    doUploadImg(imgDataUrl, onSuccess)
}

function doUploadImg(imgDataUrl, onSuccess) {
    const formData = new FormData()
    formData.append('img', imgDataUrl)

    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {
        if (XHR.readyState !== XMLHttpRequest.DONE) return

        if (XHR.status !== 200) return console.error('Error uploading image')
        const { responseText: url } = XHR

        onSuccess(url)
    }

    XHR.onerror = (req, ev) => {
        console.error(
            'Error connecting to server with request:',
            req,
            '\nGot response data:',
            ev
        )
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
}

