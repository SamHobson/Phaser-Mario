var preloadState = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function Preload(){
        Phaser.Scene.call(this, {key: 'Preload'});
    },
    preload: function() {
    // Loading all needed images a long with a base url so i can shorten my work. and makes it easier to change the assets location
        this.load.baseURL='./Assets/';
        this.load.tilemapTiledJSON('map','map.json');
        this.load.spritesheet('tiles','sheet1.png', {frameWidth: 32, frameHeight: 32});
        this.load.image('ammo','Ammo.png');
        this.load.image('bullet','Bullet.png');
        this.load.image('textLog','textlog.png');
        //this.load.Spritesheet('button','buttonSprite',{frameWidth: 400, frameHight: 96});
        //using texturepacker to make a sprite sheet. that uses atlas and loads all my player sprites
        this.load.atlas('players','/Sprites/Sprites.png','/Sprites/Sprites.json');
        this.load.audio('main','one.mp3');
        this.load.audio('shoot','swish_2.wav');
    },

    create: function() {
        console.log("Preload");
        game.scene.start('MainMenu');

    },
    update: function() {
        // Update objects & variables

    }
});

// Add scene to list of scenes
myGame.scenes.push(preloadState);