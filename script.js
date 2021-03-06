import {updateBird, setupBird, getbirdRect} from './bird.js'
import {updatePipes, setUpPipes} from './pipe.js'




document.addEventListener("keypress",handleStart,{once : true})

const title = document.querySelector("[data-title]")
const subtitle = document.querySelector("[data-subtitle]")


let lastTime
function updateLoop(time) {
    if (lastTime == null) {
        lastTime = time
        window.requestAnimationFrame(updateLoop)
        return
    }
    const delta = time - lastTime
    updateBird(delta)
    updatePipes(delta)
    if (checkLose()) return handleLose()
    lastTime = time
    window.requestAnimationFrame(updateLoop)
}

function checkLose() {
    const birdRect = getbirdRect()
    const outsideWorld = birdRect.top < 0 || birdRect.bottom > window.innerHeight
    return outsideWorld
}

function handleStart() {
    title.classList.add("hide")
    setupBird()
    setUpPipes()
    lastTime = null
    window.requestAnimationFrame(updateLoop)
}

function handleLose() {
    setTimeout (()=> {
    title.classList.remove("hide")
    subtitle.classList.remove("hide")
    subtitle.textContent = "0 pipes"
    document.addEventListener("keypress",handleStart,{once : true})
    },100)
    
}