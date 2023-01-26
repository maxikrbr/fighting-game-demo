const canvas = document.querySelector('canvas')
const canvasContext = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576
canvasContext.fillRect(0, 0, 1024, 576)

class Sprite {
    constructor({position, velocity, color, offset}){
        this.position = position
        this.velocity = velocity
        this.height = 180
        this.width = 60
        this.color = color
        this.health = 100
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 120,
            height: 60
        }
        this.isAttacking = false
    }

    draw(){
        canvasContext.fillStyle = this.color
        canvasContext.fillRect(this.position.x, this.position.y, this.width, this.height)
        if (this.isAttacking){
            canvasContext.fillStyle = 'green'
            canvasContext.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        }
    }

    update(){
        this.draw()

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y
        
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height >= canvas.height){
            this.velocity.y = 0
        }

        else {
            this.velocity.y += 0.4
        }
    }

    attack(){
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 150);
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
    offset: {
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
    offset: {
        x: -60,
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
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}
function rectCollision({ rect1, rect2 }){
    return (
        rect1.position.x + rect1.attackBox.width + rect1.attackBox.offset.x >= rect2.position.x &&
        rect1.position.x + rect1.attackBox.offset.x <= rect2.position.x + rect2.width &&
        rect1.position.y + rect1.attackBox.height >= rect2.position.y &&
        rect1.position.y <= rect2.position.y + rect2.height 
        )
}

function animate(){
    window.requestAnimationFrame(animate)
    canvasContext.fillStyle = 'black'
    canvasContext.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0

    if (keys.a.pressed){
        player.velocity.x = -2
    }
    if (keys.d.pressed){
        player.velocity.x = 4
    }
    if (keys.w.pressed && player.position.y > canvas.height / 1.5){
        player.velocity.y = -12
    }
    if (keys.ArrowLeft.pressed){
        enemy.velocity.x = -4
    }
    if (keys.ArrowRight.pressed){
        enemy.velocity.x = 2
    }
    if (keys.ArrowUp.pressed && enemy.position.y > canvas.height / 1.5){
        enemy.velocity.y = -12
    }

    if (
        rectCollision({ rect1: player, rect2: enemy }) &&
        player.isAttacking
    ) {
        player.isAttacking = false
        enemy.health -= 20
        document.querySelector('#enemy-health').style.width = (enemy.health * 3) + 'px'
    }

    if (
        rectCollision({ rect1: enemy, rect2: player }) &&
        enemy.isAttacking
    ) {
        enemy.isAttacking = false
        player.health -= 20
        document.querySelector('#player-health').style.width = (player.health * 3) + 'px'
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
        case ' ':
            player.attack()
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            break
        case 'ArrowLeft':            
            keys.ArrowLeft.pressed = true
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed = true
            break
        case 'ArrowDown':
            enemy.attack()
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
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':            
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed = false
            break
    }
})