const HOLE_HEIGHT = 200
const PIPE_INTERVAL = 1500
const PIPE_WIDTH = 120
const PIPE_SPEED = .75
let pipes = []
let timeSinceLastPipe = 0
let passedPipeCount 

export function setUpPipes(){
    document.documentElement.style.setProperty("--pipe-width", PIPE_WIDTH)
    document.documentElement.style.setProperty("--hole-height", HOLE_HEIGHT)
    pipes.forEach(pipe => pipe.remove())
    timeSinceLastPipe = PIPE_INTERVAL
    passedPipeCount = 0
}

export function updatePipes(delta) {
    timeSinceLastPipe += delta

    if (timeSinceLastPipe > PIPE_INTERVAL) {
        timeSinceLastPipe -= PIPE_INTERVAL
        createPipe()
    }
    pipes.forEach(pipe => {
        if (pipe.left + PIPE_WIDTH < 0){
            passedPipeCount++
            return pipe.remove()
        }
        pipe.left = pipe.left - delta * PIPE_SPEED
    })
}

export function getPassedPipesCount(){
    return passedPipeCount
}

export function getPipeRect(){
    return pipes.flatMap(pipe => pipe.rects())
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
        },
        remove(){
            pipes = pipes.filter(p => p !== pipe)
            pipeEl.remove()
        },
        rects(){
            return [
                topEl.getBoundingClientRect(),
                bottomEl.getBoundingClientRect()
            ]
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