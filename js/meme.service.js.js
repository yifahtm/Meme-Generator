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
            color: 'red'
        }
    ]
}

let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

let gPen = { pos: null, isDown: false }
let gLine = []
const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']

function getMeme() {
    return gMeme
}

function getImgs() {
    return gImgs
}

function getPenPos() {
    return gPen
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

function updateMeme(txt) {
    _setLineTxt(txt)
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
}

function _setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
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