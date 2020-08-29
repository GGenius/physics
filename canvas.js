const ctx = cnv.getContext("2d")

let loop = setInterval(update, 1000/60);

function update()
{
    ctx.clearRect(0, 0, cnv.width, cnv.height)  
    drawDecorations()
    physicsCalculations()
    
    ctx.fillRect(mouseX - 25, mouseY - 25, 25, 25)

    for (let i = 0; i < objects.length; i++)
        ctx.fillRect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
}

function drawDecorations()
{
    ctx.fillRect(0, 680, 1400, 20)
    ctx.fillRect(0, 0, 20, 700)
    ctx.fillRect(1380, 0, 20, 700)
}