const HOLE_HEIGHT = 120
const PIPE_INTERVAL = 1500
const PIPE_WIDTH = 120
const PIPE_SPEED = .75
const pipes = []
let timeSinceLastPipe = 0

export function setUpPipes(){
    document.documentElement.style.setProperty("--pipe-width", PIPE_WIDTH)
    document.documentElement.style.setProperty("--hole-height", HOLE_HEIGHT)
}

export function updatePipes(delta) {
    timeSinceLastPipe += delta

    if (timeSinceLastPipe > PIPE_INTERVAL) {
        timeSinceLastPipe = timeSinceLastPipe -= PIPE_INTERVAL
        createPipe()
    }
    pipes.forEach(pipe => {pipe.left = pipe.left - delta * PIPE_SPEED})
}

function createPipe(){
    const pipeEl = document.createElement('div')
    const topEl = createPipeSegment('top')
    const bottomEl = createPipeSegment('bottom')
    pipeEl.append(topEl)
    pipeEl.append(bottomEl)
    pipeEl.classList.add('pipe')
    pipeEl.style.setProperty('--hole-top', randomNumberBetween(HOLE_HEIGHT * 1.5, window.innerHeight - HOLE_HEIGHT * .5))
    const pipe = {
        get left() {
            return parseFloat(getComputedStyle(pipeEl).getPropertyValue('--pipe-left'))
        },
        set left(value) {
            pipeEl.style.setProperty('--pipe-left', value)
        }
    }
    pipe.left = window.innerWidth
    document.body.append(pipeEl)
    pipes.push(pipe)
}

function createPipeSegment(position) {
    const segment = document.createElement('div')
    segment.classList.add('segment', position)
    return segment
}

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() *(max - min + 1) +min)
}