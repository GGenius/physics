let mouseX, mouseY
let speedX, speedY
document.onmousemove = e =>
{
    //console.log("speed X: " + (mouseX - e.clientX) + " speed Y: " + (mouseY - e.clientY) )
    speedX = mouseX - e.clientX
    speedY = mouseY - e.clientY

    mouseX = e.clientX
    mouseY = e.clientY
}

document.onmousedown = e => { Object.Create }