var gamePlayState = new Phaser.Class({
    // Define scene
    Extends: Phaser.Scene,
    initialize:
    function GamePlay(){
        Phaser.Scene.call(this, {key: 'GamePlay'});
    },
  
    preload: function() {
        // Preload images for this state
    },

    create: function() {
        // Create objects
        console.log("GamePlay");
        //loads audio
        music = this.sound.add('main',{loop:true});
        shoot = this.sound.add('shoot',{loop:false});
        music.play();
        //loads map from a json
        map= this.make.tilemap({key: 'map'});
        ground= map.addTilesetImage('tiles');
        groundLayer= map.createDynamicLayer('Ground',ground,0,0);
        groundLayer.setCollisionByExclusion([-1]);

        //Items
        this.bullets=this.physics.add.group();
        ammo=this.physics.add.group({
            key: 'ammo',
            repeat: 2,
            setXY:{x:210, y:100, stepX:545},
            runChildUpdate: true
        });


        //UI
        p1AmmoText= this.add.text (5,4,'player 1 ammo:3',{fontSize:'24px',fill:'#ffffff'});
        p2AmmoText= this.add.text (725.,4,'player 2 ammo:3',{fontSize:'24px',fill:'#ffffff'});
        p1ScoreText= this.add.text (5,25,'player 1 Score:0',{fontSize:'24px',fill:'#ffffff'});
        p2ScoreText= this.add.text (725.,25,'player 2 Score:0',{fontSize:'24px',fill:'#ffffff'});

        //player1
        player1=this.physics.add.sprite(830,450,'players','p1Walk0');
        player1.setScale(2,2);

        //players 2
        player2=this.physics.add.sprite(130,450,"players",'p2Walk0');
        player2.setScale(2,2);

        //world boundaries and collision
        this.physics.world.setBounds(0,0,960,640);
        this.physics.add.collider(groundLayer,[player1,player2]);
        this.physics.add.collider(groundLayer,this.bullets);
        this.physics.add.collider(groundLayer,ammo);
        //this.physics.add.collider(this.bullets,[player1,player2]);

        //used inline function for pick up as i believe i wont need to call it anywhere else
        this.physics.add.overlap([player1,player2],ammo,ammoPickUp,null,this);
        function ammoPickUp(player,ammo) {
            if (player===player1){
                p1AmmoCount++;
                this.displayUpdate();
                console.log(p1AmmoCount);
                ammo.destroy();
            }
            else if (player===player2){
              p2AmmoCount++;
              console.log(p2AmmoCount);
                this.displayUpdate();
              ammo.destroy();
            }
        }

        //This is for the winning state, checks an over lap changes text and starts the next scene
        this.physics.add.overlap([player1,player2],this.bullets,playerWin,null,this);
        function playerWin(player,bullet) {
            if (player===player2){
                p1Score++;
                this.displayUpdate();
                console.log(p1Score);
                bullet.destroy(true);
                winName= 'player 1';
                game.scene.start('Winstate');
            }
            else if (player===player1){
                p2Score++;
                console.log(p2Score);
                this.displayUpdate();
                bullet.destroy(true);
                winName= 'player 2';
                game.scene.start('Winstate');
            }
        }



        //player1 animat1ion
        this.anims.create({ key: 'p1Walk', frames: this.anims.generateFrameNames('players', { prefix:'p1Walk', start: 1, end: 5}),
        frameRate:10,
        repeat:-1});
        //player2 animation
        this.anims.create({ key: 'p2Walk', frames: this.anims.generateFrameNames('players', { prefix:'p2Walk', start: 1, end: 5}),
            frameRate:10,
            repeat:-1});
        //player1 idle animation, just a slowed down version of movement animation
        this.anims.create({ key: 'p1Idle', frames: this.anims.generateFrameNames('players', { prefix:'p1Walk', start: 1, end: 2}),
            frameRate:5,
            repeat:-1});
        //player2 idle animation, just a slowed down version of movement animation
        this.anims.create({ key: 'p2Idle', frames: this.anims.generateFrameNames('players', { prefix:'p2Walk', start: 1, end: 5}),
            frameRate:5,
            repeat:-1});


        //creating arrow keys for player1
        cursors = this.input.keyboard.createCursorKeys();
        // creates WASD for player2 movement
        keyA=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keySpace=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyEnter=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        },
    //used to update any text on screen
    displayUpdate: function(){
        console.log('displayupdaye');
        p2AmmoText.setText('player 2 ammo:'+ p2AmmoCount);
        p1AmmoText.setText('player 1 ammo:'+ p1AmmoCount);
        p2ScoreText.setText('player 2 Score:'+ p2Score);
        p1ScoreText.setText('player 1 Score:'+ p1Score);
    },
    //creates the ammo after 4 second at the location of the bullet last shot
    //had to add the pickup function in here as i should have made it a function to start with rather than inline
    //but didnt fix it to show my mistake and that it is something i would change
    itemSpawn: function (bullet){
        ammo = this.physics.add.sprite(bullet.x, bullet.y, 'ammo');
        this.physics.add.collider(groundLayer,ammo);
        this.physics.add.overlap([player1,player2],ammo,ammoPickUp,null,this);
        function ammoPickUp(player,ammo) {
            if (player===player1){
                p1AmmoCount++;
                this.displayUpdate();
                console.log(p1AmmoCount);
                ammo.destroy();
            }
            else if (player===player2){
                p2AmmoCount++;
                console.log(p2AmmoCount);
                this.displayUpdate();
                ammo.destroy();
            }
        }
        this.physics.world.wrap(ammo);
        bullet.destroy(true);
    },
    update: function(time,delta) {
        //movement for player1 and 2
        if (cursors.left.isDown) {
            player1.body.setVelocityX(-160);
            player1.anims.play('p1Walk', true);
            player1.flipX = false;
        }
        else if (cursors.right.isDown) {
            player1.body.setVelocityX(160);
            player1.anims.play('p1Walk', true);
            player1.flipX = true;
        }
        else {
            player1.body.setVelocityX(0);
            player1.anims.play('p1Idle', true);
        }
        if ((cursors.up.isDown) && player1.body.onFloor()) {
            player1.body.setVelocityY(-330);
        }
        this.physics.world.wrap(player1);

        //player2 controls
        if (keyA.isDown) {
            player2.body.setVelocityX(-160);
            player2.anims.play('p2Walk', true);
            player2.flipX = false;
        }

        else if (keyD.isDown) {
            player2.body.setVelocityX(160);
            player2.anims.play('p2Walk', true);
            player2.flipX = true;
        }
        else {
            player2.body.setVelocityX(0);
            player2.anims.play('p2Idle', true);
        }
        if ((keyW.isDown) && player2.body.onFloor()) {
            player2.body.setVelocityY(-330);
        }
        this.physics.world.wrap(player2);


        //used to make sure the bullet doesnt spawn in the player
        if (player1.flipX === true) {
            var playerPosition1 = player1.x + 30;
        }
        if (player1.flipX === false) {
            var playerPosition1 = player1.x - 30;
        }
        //player 1 shooting
        if (Phaser.Input.Keyboard.JustDown(keyEnter) && p1AmmoCount > 0) {
            bullet = this.bullets.create (playerPosition1, player1.y, 'bullet').setBounce(.3, .4);
            bullet["timeSpan"]=4000;
            bullet.body.gravity.y = (-400);
            p1AmmoCount--;

            //bullet direction
            if (player1.flipX === true) {
                bullet.body.setVelocityX(300);
                shoot.play();
            }
            else if (player1.flipX === false) {
                bullet.body.setVelocityX(-300);
                shoot.play();00
            }
            //update ammo counter
            this.displayUpdate();
        }
        if (player2.flipX === true) {
            var playerPosition2 = player2.x + 30;
        }
        if (player2.flipX === false) {
            var playerPosition2 = player2.x - 30;
        }
       //player 2 shooting
        if (Phaser.Input.Keyboard.JustDown(keySpace) && p2AmmoCount > 0) {
            var bullet = this.bullets.create(playerPosition2, player2.y, 'bullet').setBounce(.3, .4);
            bullet["timeSpan"]=4000;
            bullet.body.gravity.y = (-400);
            p2AmmoCount--;

            //bullet direction
            if (player2.flipX === true) {
                bullet.body.setVelocityX(300);
                shoot.play();
            }
            else if (player2.flipX === false) {
                bullet.body.setVelocityX(-300);
                shoot.play();
            }
            //update ammo counter
            this.displayUpdate();
        }
        //This both makes sure a bullet has had time to be created and then has it sent to the itemspawn, going from first to last
        this.physics.world.wrap(this.bullets);
        if (this.bullets !== undefined && this.bullets.children !== undefined) {
            for (var i = 0; i < this.bullets.children.entries.length; i++) {
                var b = this.bullets.children.entries[i];
                b.timeSpan -= delta;
                if (b.timeSpan <= 0&& b.active) {
                    this.itemSpawn(b);
                }
            }
        }
    }


});

        //.world.wrap(player1,0,true);
// Add scene to list of scenes
myGame.scenes.push(gamePlayState);