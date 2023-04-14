namespace SpriteKind {
    export const Gold = SpriteKind.create()
    export const Stone = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Stone, function (sprite, otherSprite) {
    otherSprite.destroy(effects.spray, 500)
    scene.cameraShake(4, 500)
    info.changeLifeBy(-1)
    music.siren.play()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy(effects.spray, 500)
    info.changeScoreBy(5)
    time += 1
    music.baDing.play()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Gold, function (sprite, otherSprite) {
    otherSprite.destroy(effects.spray, 500)
    info.changeScoreBy(randint(4, 6))
    music.powerUp.play()
})
let GoldFood: Sprite = null
let Normal_Food: Sprite = null
let Stone2: Sprite = null
let time = 0
let Basket = sprites.create(img`
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f f e 2 2 2 2 2 2 e e f . . 
    . . f e 2 f f f f f f 2 e f . . 
    . . f f f f e e e e f f f f . . 
    . f f e f b f 4 4 f b f e f f . 
    . f e e 4 1 f d d f 1 4 e e f . 
    . . f e e d d d d d d e e f . . 
    . . . f e e 4 4 4 4 e e f . . . 
    . . e 4 f 2 2 2 2 2 2 f 4 e . . 
    . . 4 d f 2 2 2 2 2 2 f d 4 . . 
    . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
    . . . . . f f f f f f . . . . . 
    . . . . . f f . . f f . . . . . 
    `, SpriteKind.Player)
Basket.setPosition(75, 110)
controller.moveSprite(Basket, 100, 0)
info.setScore(0)
let timer = 1500
info.setLife(5)
let velo = 100
let foodlist = [
img`
    . . . . . . . e c 7 . . . . . . 
    . . . . e e e c 7 7 e e . . . . 
    . . c e e e e c 7 e 2 2 e e . . 
    . c e e e e e c 6 e e 2 2 2 e . 
    . c e e e 2 e c c 2 4 5 4 2 e . 
    c e e e 2 2 2 2 2 2 4 5 5 2 2 e 
    c e e 2 2 2 2 2 2 2 2 4 4 2 2 e 
    c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
    c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
    c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
    c e e 2 2 2 2 2 2 2 2 2 2 4 2 e 
    . e e e 2 2 2 2 2 2 2 2 2 4 e . 
    . 2 e e 2 2 2 2 2 2 2 2 4 2 e . 
    . . 2 e e 2 2 2 2 2 4 4 2 e . . 
    . . . 2 2 e e 4 4 4 2 e e . . . 
    . . . . . 2 2 e e e e . . . . . 
    `,
img`
    4 4 4 . . 4 4 4 4 4 . . . . . . 
    4 5 5 4 4 5 5 5 5 5 4 4 . . . . 
    b 4 5 5 1 5 1 1 1 5 5 5 4 . . . 
    . b 5 5 5 5 1 1 5 5 1 1 5 4 . . 
    . b d 5 5 5 5 5 5 5 5 1 1 5 4 . 
    b 4 5 5 5 5 5 5 5 5 5 5 1 5 4 . 
    c d 5 5 5 5 5 5 5 5 5 5 5 5 5 4 
    c d 4 5 5 5 5 5 5 5 5 5 5 1 5 4 
    c 4 5 5 5 d 5 5 5 5 5 5 5 5 5 4 
    c 4 d 5 4 5 d 5 5 5 5 5 5 5 5 4 
    . c 4 5 5 5 5 d d d 5 5 5 5 5 b 
    . c 4 d 5 4 5 d 4 4 d 5 5 5 4 c 
    . . c 4 4 d 4 4 4 4 4 d d 5 d c 
    . . . c 4 4 4 4 4 4 4 4 5 5 5 4 
    . . . . c c b 4 4 4 b b 4 5 4 4 
    . . . . . . c c c c c c b b 4 . 
    `,
img`
    . . 2 2 b b b b b . . . . . . . 
    . 2 b 4 4 4 4 4 4 b . . . . . . 
    2 2 4 4 4 4 d 3 4 4 b . . . . . 
    2 b 4 4 4 4 4 4 d 4 b . . . . . 
    2 b 4 4 4 4 4 4 4 d 4 b . . . . 
    2 b 4 4 4 4 4 4 4 4 4 b . . . . 
    2 b 4 4 4 4 4 4 4 4 4 e . . . . 
    2 2 b 4 4 4 4 4 4 4 b e . . . . 
    . 2 b b b 4 4 4 b b b e . . . . 
    . . e b b b b b b b e e . . . . 
    . . . e e b 4 4 b e e e b . . . 
    . . . . . e e e e e e b d b b . 
    . . . . . . . . . . . b 1 1 1 b 
    . . . . . . . . . . . c 1 d d b 
    . . . . . . . . . . . c 1 b c . 
    . . . . . . . . . . . . c c . . 
    `,
img`
    . . . . . . 2 2 2 2 . . . . . . 
    . . . . 2 2 3 3 3 3 2 e . . . . 
    . . . 2 3 d 1 1 d d 3 2 e . . . 
    . . 2 3 1 d 3 3 3 d d 3 e . . . 
    . 2 3 1 3 3 3 3 3 d 1 3 b e . . 
    . 2 1 d 3 3 3 3 d 3 3 1 3 b b . 
    2 3 1 d 3 3 1 1 3 3 3 1 3 4 b b 
    2 d 3 3 d 1 3 1 3 3 3 1 3 4 4 b 
    2 d 3 3 3 1 3 1 3 3 3 1 b 4 4 e 
    2 d 3 3 3 1 1 3 3 3 3 1 b 4 4 e 
    e d 3 3 3 3 d 3 3 3 d d b 4 4 e 
    e d d 3 3 3 d 3 3 3 1 3 b 4 b e 
    e 3 d 3 3 1 d d 3 d 1 b b e e . 
    . e 3 1 1 d d 1 1 1 b b e e e . 
    . . e 3 3 3 3 3 3 b e e e e . . 
    . . . e e e e e e e e e e . . . 
    `,
img`
    . . . . . . b b b b . . . . . . 
    . . . . . . b 4 4 4 b . . . . . 
    . . . . . . b b 4 4 4 b . . . . 
    . . . . . b 4 b b b 4 4 b . . . 
    . . . . b d 5 5 5 4 b 4 4 b . . 
    . . . . b 3 2 3 5 5 4 e 4 4 b . 
    . . . b d 2 2 2 5 7 5 4 e 4 4 e 
    . . . b 5 3 2 3 5 5 5 5 e e e e 
    . . b d 7 5 5 5 3 2 3 5 5 e e e 
    . . b 5 5 5 5 5 2 2 2 5 5 d e e 
    . b 3 2 3 5 7 5 3 2 3 5 d d e 4 
    . b 2 2 2 5 5 5 5 5 5 d d e 4 . 
    b d 3 2 d 5 5 5 d d d 4 4 . . . 
    b 5 5 5 5 d d 4 4 4 4 . . . . . 
    4 d d d 4 4 4 . . . . . . . . . 
    4 4 4 4 . . . . . . . . . . . . 
    `
]
game.onUpdateInterval(2000, function () {
    if (Math.percentChance(51)) {
        Stone2 = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . e e e e e . . . . 
            . . . . e e e e f f f e e . . . 
            . . e e f f f f f f f f e . . . 
            . e e f f b f f b f f f f e . . 
            e e f f f f f f f f f f f e . . 
            e f f b f f f f f f b f f e e . 
            e f f f f f b f f f f f f f e . 
            e e f f f f f f f b f f b f e . 
            . e f f f f f f f f f f f f e . 
            . . e f f b f f f f f f e e e . 
            . . e e f f f f f b f e e . . . 
            . . . . e e f f f f e e . . . . 
            . . . . . e e e e e . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Stone)
        Stone2.setPosition(randint(0, scene.screenWidth()), 0)
        Stone2.vy = velo
    }
})
forever(function () {
    Normal_Food = sprites.create(foodlist[randint(0, 1000) % foodlist.length], SpriteKind.Food)
    Normal_Food.setPosition(randint(0, scene.screenWidth()), 0)
    Normal_Food.vy = velo
    pause(timer)
})
forever(function () {
    if (time == 5) {
        time = 0
        GoldFood = sprites.create(img`
            . . . . . . . 4 2 7 . . . . . . 
            . . . . 4 4 4 2 7 7 4 4 . . . . 
            . . 2 4 4 4 4 2 7 4 5 5 4 4 . . 
            . 2 4 4 4 4 4 2 6 4 4 5 5 5 4 . 
            . 2 4 4 4 5 4 2 2 5 4 5 4 5 4 . 
            2 4 4 4 5 5 5 5 5 5 4 5 5 5 5 4 
            2 4 4 5 5 5 5 5 5 5 5 4 4 5 5 4 
            2 4 4 5 5 5 5 5 5 5 5 5 5 5 5 4 
            2 4 4 5 5 5 5 5 5 5 5 5 5 5 5 4 
            2 4 4 5 5 5 5 5 5 5 5 5 5 5 5 4 
            2 4 4 5 5 5 5 5 5 5 5 5 5 4 5 4 
            . 4 4 4 5 5 5 5 5 5 5 5 5 4 4 . 
            . 5 4 4 5 5 5 5 5 5 5 5 4 5 4 . 
            . . 5 4 4 5 5 5 5 5 4 4 5 4 . . 
            . . . 5 5 4 4 4 4 4 5 4 4 . . . 
            . . . . . 5 5 4 4 4 4 . . . . . 
            `, SpriteKind.Gold)
        GoldFood.setPosition(randint(0, scene.screenWidth()), 0)
        GoldFood.vy = velo + 50
        timer += -10
        velo += 10
    }
})
