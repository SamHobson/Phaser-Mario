var Winstate = new Phaser.Class({
    // Define scene
    Extends: Phaser.Scene,
    initialize:
        function winState(){
            Phaser.Scene.call(this, {key: 'Winstate'});
        },

    preload: function() {
        // Preload images for this state
    },

    create: function() {
        console.log("Winstate");
        textBoard= this.add.image(470,280,'textLog');
        textBoard.setScale(0.5,0.5);
        winner= this.add.text(300,180,'',{fontSize:'24px',fill:'#ffffff'});
        winner.setText(winName+' Is the winner');
        retry= this.add.text(300,300,'F5 to start new game',{fontSize:'24px',fill:'#ffffff'});


    },

    update: function() {
        // Update objects & variables
    }
});

// Add scene to list of scenes
myGame.scenes.push(Winstate);