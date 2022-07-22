const birdEl = document.querySelector('[data-bird]')
const BIRD_SPEED = .5
const JUMP_DURATION = 150
let timeSinceLastJump = Number.POSITIVE_INFINITY

export function setupBird() {
    setTop(window.innerHeight / 2)
    document.removeEventListener('keydown', handleJump)
    document.addEventListener('keydown', handleJump)
}

export function updateBird (delta){
    if (timeSinceLastJump < JUMP_DURATION){
        setTop(getTop() - BIRD_SPEED * delta)
    } else {
        setTop(getTop() + BIRD_SPEED * delta)
    }
    timeSinceLastJump += delta
}

export function getbirdRect(){
    return birdEl.getBoundingClientRect()
}

function setTop(top){
    birdEl.style.setProperty('--bird-top', top)
}

function getTop(){
    return parseFloat(getComputedStyle(birdEl).getPropertyValue('--bird-top'))
}

function handleJump(e){
    if (e.code === 'space') return

    timeSinceLastJump = 0 
}