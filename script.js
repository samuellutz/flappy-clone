document.addEventListener("keypress",handleStart,{once : true})

const title = document.querySelector("[data-title]")


let lastTime
function updateLoop(time) {
    console.log(time - lastTime);
    lastTime = time
    window.requestAnimationFrame(updateLoop)
}

function handleStart() {
    title.classList.add("hide")
    window.requestAnimationFrame(updateLoop)
}

function handleLose() {

}