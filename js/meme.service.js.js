'use strict'

let gImgs = []
_createImgs()


gImgs = [{ id: 1, url: 'img/one size/1.jpg', keywords: ['funny', 'cat'] }]
let gMemes = [{
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: 'red'
        }
    ]
}]

let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

let gPen = { pos: null, isDown: false }
let gLine = []
const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']

function getMeme() {
    return gMemes
}

function getImg() {
    return gImgs[0]
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

function _setLineTxt(newTxt) {
    gMemes[0].lines[0].txt = newTxt
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

function _createImgs() {
    let imgId = 1
    for (let i = 0; i < 18; i++) {
        gImgs.push({
            id: imgId,
            url: `img/one size/${imgId}.jpg`,
            keywords: ['funny', 'cat']
        })
        imgId++
        console.log(gImgs)
    }




    // let newImgs = []
    // for(let i = 0;i<17;i++){
    //  gImgs[i].id=i+2
    // gImgs[i].url= `$`.push()
}

function _createImg() {
    let imgId = 1
    return {
        id: imgId++,
        url: `img/one size/${imgId++}.jpg`,
        keywords: ['funny', 'cat']
    }
}