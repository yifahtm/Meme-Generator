'use strict'

let gImgs = [
    { id: 1, url: 'img/one size/1.jpg', keywords: ['funny', 'man'] },
    { id: 2, url: 'img/one size/2.jpg', keywords: ['love', 'dog'] },
    { id: 3, url: 'img/one size/3.jpg', keywords: ['love', 'baby'] },
    { id: 4, url: 'img/one size/4.jpg', keywords: ['sleepy', 'cat'] },
    { id: 5, url: 'img/one size/5.jpg', keywords: ['happy', 'baby'] },
    { id: 8, url: 'img/one size/8.jpg', keywords: ['interesting', 'man'] },
    { id: 9, url: 'img/one size/9.jpg', keywords: ['funny', 'baby'] },
    { id: 10, url: 'img/one size/10.jpg', keywords: ['funny', 'man'] },
    { id: 11, url: 'img/one size/11.jpg', keywords: ['love', 'man'] },
    { id: 12, url: 'img/one size/12.jpg', keywords: ['funny', 'man'] },
    { id: 15, url: 'img/one size/15.jpg', keywords: ['interesting', 'man'] },
    { id: 16, url: 'img/one size/16.jpg', keywords: ['funny', 'man'] },
    { id: 17, url: 'img/one size/17.jpg', keywords: ['interesting', 'man'] },
    { id: 18, url: 'img/one size/18.jpg', keywords: ['funny', 'toy'] },
]
let gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: 'white'
        },
        {
            txt: 'IF YOU DONT HAVE A JOB',
            size: 20,
            color: 'white'
        },
    ]
}

let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

let gPen = { pos: null, isDown: false }
let gLine = []
let gColor = 'white'
const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']

function getMeme() {
    return gMeme
}

function getImgs() {
    return gImgs
}

function changeColor(value) {
    console.log(`Changing color of line ${gMeme.selectedLineIdx} to ${value}`)
    gMeme.lines[gMeme.selectedLineIdx].color = value
}

function getColor() {
    const color = gMeme.lines[gMeme.selectedLineIdx].color;
    console.log(`Getting color for line ${gMeme.selectedLineIdx}: ${color}`)
    return color
}

function getPenPos() {
    return gPen
}

function updateMeme(txt) {
    if (gMeme.lines.length > 0) _setLineTxt(txt)
}

function switchLine() {
    if (gMeme.lines.length > 1) {
        if (gMeme.selectedLineIdx === gMeme.lines.length - 1) {
            gMeme.selectedLineIdx = 0
        } else {
            gMeme.selectedLineIdx += 1
        }
    }
}

function getText() {
    return gMeme.lines[gMeme.selectedLineIdx].txt
}

function getSelectedIdx() {
    return gMeme.selectedLineIdx
}

function addLine() {
    const newLine = {
        txt: 'New Line',
        size: 20,
        color: 'white'
    }
    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function deleteLine() {
    if (gMeme.lines.length > 0 && gMeme.selectedLineIdx !== null) {
        gMeme.lines.splice(gMeme.selectedLineIdx, 1)
        gMeme.selectedLineIdx = gMeme.lines.length > 0 ? 0 : null
    }
}

function setLinePos(x, y, lineIndex, textWidth, textHeight) {
    gMeme.lines[lineIndex].pos = {
        x: x - textWidth / 2,
        y: y - textHeight / 2,
        width: textWidth,
        height: textHeight
    }
    // gMeme.lines.forEach((line, pos))=> {
    //     line.pos.x = x - textWidth / 2
    //     line.pos.y = y - textHeight / 2
    //     line.pos.width = textWidth
    //     line.pos.height = textHeight
    // }
}

function moveLineUp() {
    if (gMeme.lines.length > 0 && gMeme.selectedLineIdx !== null) {
        gMeme.lines[gMeme.selectedLineIdx].pos.y -= 10
    }
}

function moveLineDown() {
    if (gMeme.lines.length > 0 && gMeme.selectedLineIdx !== null) {
        gMeme.lines[gMeme.selectedLineIdx].pos.y += 10
    }
}

function setFontSize(el) {
    console.log(el.classList)
    const selectedLine = gMeme.lines[gMeme.selectedLineIdx]
    if (selectedLine) {
        if (el.classList.contains('increase')) selectedLine.size += 2
        else if (el.classList.contains('decrease')) selectedLine.size -= 2
        else if (el.classList.contains('input-font-size')) selectedLine.size = el.value
    }
}

function setFontFamily(fontFamily) {
    const selectedLine = gMeme.lines[gMeme.selectedLineIdx]
    if (selectedLine) {
        selectedLine.fontFamily = fontFamily
    }
}

function setTextAlign(align) {
    const selectedLine = gMeme.lines[gMeme.selectedLineIdx]
    if (selectedLine) {
        selectedLine.align = align;
    }
}

function getFontSize() {
    return gMeme.lines[gMeme.selectedLineIdx].size
}

function getFontFamily() {
    return gMeme.lines[gMeme.selectedLineIdx].fontFamily
}

function getFontAlignment() {
    return gMeme.lines[gMeme.selectedLineIdx].align
}

function _setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    gElCanvas.addEventListener('click', function (event) {
        const { offsetX, offsetY } = event
        const clickedLineIndex = gMeme.lines.findIndex(line => {
            const pos = line.pos
            return offsetX >= pos.x && offsetX <= pos.x + pos.width &&
                offsetY >= pos.y && offsetY <= pos.y + pos.height
        })

        if (clickedLineIndex !== -1) {
            gMeme.selectedLineIdx = clickedLineIndex
            document.getElementById('meme-text-input').value = gMeme.lines[clickedLineIndex].txt
            renderMeme()
        }
    })
}


function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', handleStart)
    gElCanvas.addEventListener('mousemove', handleMove)
    gElCanvas.addEventListener('mouseup', handleEnd)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', handleStart)
    gElCanvas.addEventListener('touchmove', handleMove)
    gElCanvas.addEventListener('touchend', handleEnd)
}

function handleStart(ev) {
    gPen.pos = getEvPos(ev)
    gPen.isDown = true
    gLine.push(gPen.pos)
    gCtx.beginPath()
    gCtx.moveTo(gPen.pos.x, gPen.pos.y)
}

function handleMove(ev) {
    if (!gPen.isDown) return
    gPen.pos = getEvPos(ev)
}

function handleEnd(ev) {
    gPen.pos = getEvPos(ev)
    gPen.isDown = false
    gCtx.closePath()
}

function getEvPos(ev) {
    let pos = { x: ev.offsetX, y: ev.offsetY }
    if (TOUCH_EVENTS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}