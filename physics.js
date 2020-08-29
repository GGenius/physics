class Physics 
{
    static get g()
    {
        return 9.81 * 0.2
    }
}

class World
{
    static get bottomBorder()
    {
        return 680
    }

    static get leftBorder()
    {
        return 20
    }

    static get rightBorder()
    {
        return 1380
    }

}

class Object
{
    constructor(x, y)
    {
        this.x = x
        this.y = y
        this.lastX = x
        this.lastY = y
        this.width = 25
        this.height = 25
        this.mass = 0.5
        this.dirX = 0
        this.dirY = 0
        this.bouncy = 0.7
        this.friction = 1
        this.gravity = true
        this.onfloor = false
        this.notJumping = false
    }

    static get Create()
    {
        let obj = new Object(mouseX - 25, mouseY - 25)
        obj.dirX = Math.abs(speedX) > 3 ? -speedX : 0
        obj.dirY = Math.abs(speedY) > 3 ? -speedY : 0
        objects.push(obj)
        return obj
    }
}


let objects = []
objects.push(new Object( 500, 50))

function physicsCalculations()
{
    for (let i = 0; i < objects.length; i++)
    {
        let obj = objects[i];

        if (obj.gravity)
            obj.dirY += 0.5
            
        if (obj.y + obj.height + obj.dirY >= World.bottomBorder)
            {
                let lastdirY = obj.dirY > 3 ? obj.dirY : 0
                obj.dirY = 0
                obj.y = World.bottomBorder - obj.height
                obj.dirY = -(lastdirY * obj.bouncy) / (obj.mass * 3) 
            }
        
        if (obj.x + obj.width + obj.dirX >= World.rightBorder) 
            {
                let lastdirX = obj.dirX
                obj.x = World.rightBorder - obj.width
                obj.dirX = lastdirX * -1 * obj.bouncy
            }

        if (obj.x + obj.dirX <= World.leftBorder)
            {
                let lastdirX = obj.dirX
                obj.x = World.leftBorder
                obj.dirX = lastdirX * -1 * obj.bouncy
            }

        if (obj.y + obj.height == World.bottomBorder)
            {
                if (obj.onfloor) obj.notJumping = true
                obj.onfloor = true
            }
        else
            {
                obj.onfloor = false
                obj.notJumping = false
            }

        if (obj.notJumping)
            {
                obj.dirX *= obj.friction * (1 / obj.mass) * 5
                if (obj.dirX <= 0.1) obj.dirX = 0
            }

        for (let j = 0; j < objects.length; j++)
        {
            if (j == i) continue
            if (objects.length < 2) break
            
            let obj2 = objects[j]
            if (obj.x < obj2.x + obj2.width  && 
                obj.x + obj.width > obj2.x   && 
                obj.y < obj2.y + obj2.height && 
                obj.y + obj.height + obj.dirY > obj2.y)
            {
                
                let lastdirY = obj.dirY > 3 ? obj.dirY : 0
                obj.dirY = 0
                obj.y = obj2.y - obj.height
                obj.dirY = -(lastdirY * obj.bouncy) / (obj.mass * 3) 
            }
        }

        obj.x += obj.dirX
        obj.y += obj.dirY
    }
}

