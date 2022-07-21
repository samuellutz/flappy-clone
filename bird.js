const birdEl = document.querySelector('[data-bird]')
const BIRD_SPEED = 5

export function updateBird (delta){
    setTop(getTop() + BIRD_SPEED)
    console.log(getTop());

}

function setTop(top){
    birdEl.style.setProperty('--bird-top', top)
}

function getTop(){
    return parseFloat(getComputedStyle(birdEl).getPropertyValue('--bird-top'))
}