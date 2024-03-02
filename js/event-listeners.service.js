'use strict'

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