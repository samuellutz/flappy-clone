const HOLE_HEIGHT = 120

function createPipe(){
    const pipeEl = document.createElement('div')
    const topEl = createPipeSegment('top')
    const bottomEl = createPipeSegment('bottom')
    pipeEl.append(topEl)
    pipeEl.append(bottomEl)
    pipeEl.classList.add('pipe')
    pipeEl.style.setProperty('--hole-top', randomNumberBetween(HOLE_HEIGHT * 1.5, window.innerHeight - HOLE_HEIGHT * .5))
    const pipe = {}
}

function createPipeSegment(position) {
    const segment = document.createElement('div')
    segment.classList.add('segment', position)
    return segment
}

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() *(max - min + 1) +min)
}