const canvas = document.querySelector('canvas')
const canvasContext = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576
canvasContext.fillRect(0, 0, 1024, 576)

class Sprite {
    constructor({position, velocity, color}){
        this.position = position
        this.velocity = velocity
        this.height = 180
        this.width = 60
        this.color = color
        this.attackBox = {
            position: this.position,
            width: 120,
            height: 60
        }
    }

    draw(){
        canvasContext.fillStyle = this.color
        canvasContext.fillRect(this.position.x, this.position.y, this.width, this.height)
        canvasContext.fillStyle = 'green'
        canvasContext.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
    }

    update(){
        this.draw()

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height >= canvas.height){
            this.velocity.y = 0
        }

        else {
            this.velocity.y += 0.4
        }
    }
}

const player = new Sprite({
    position: {
        x: 0,
        y: 0
    },

    velocity: {
        x: 0,
        y: 0
    },

    color: 'red'
})

const enemy = new Sprite({
    position: {
        x: 800,
        y: 100
    },

    velocity: {
        x: 0,
        y: 0
    },

    color: 'blue'
})

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    }
}

function animate(){
    window.requestAnimationFrame(animate)
    canvasContext.fillStyle = 'black'
    canvasContext.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0

    if (keys.a.pressed){
        player.velocity.x = -3
    }
    if (keys.d.pressed){
        player.velocity.x = 3
    }
    if (keys.w.pressed && player.position.y > canvas.height / 1.5){
        player.velocity.y = -12
    }

    if (
        player.position.x + player.attackBox.width >= enemy.position.x &&
        player.position.x <= enemy.position.x + enemy.width &&
        player.position.y + player.attackBox.height >= enemy.position.y &&
        player.position.y <= enemy.position.y + enemy.height
    ) {
        console.log('damage')
    }
}

animate()
window.addEventListener('keydown', (event) => {
    switch (event.key){
        case 'd':
            keys.d.pressed = true
            break
        case 'a':            
            keys.a.pressed = true
            break
        case 'w':
            keys.w.pressed = true
            break
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key){
        case 'a':
            keys.a.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
        case 'w':
            keys.w.pressed = false
    }
})