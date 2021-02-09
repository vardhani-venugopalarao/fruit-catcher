class Game
{
    constructor()
    {

    }
    // get the gameState
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }
    // update gameState
    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    // at the start of the game
    async start()
    {
        // if the game is at the start but not play
        if (gameState === 0)
        {
            // make object for player
            player = new Player();
            // refer to playerCount
            var playerCountRef = await database.ref('playerCount').once("value");
            if (playerCountRef.exists())
            {
                // get the playerCount value
                playerCount = playerCountRef.val();
                player.getCount();
            }
            // make form and display
            form = new Form()
            form.display();
        }

        // create player1 sprite and add image
        player1 = createSprite(200,500);
        player1.addImage("player1",player_img);
        // create player2 sprite and add image
        player2 = createSprite(800,500);
        player2.addImage("player2", player_img);
        // put sprites in array
        players=[player1,player2];
    }
    
    play(){
        // hide the form
        form.hide();

        // make an image to fit the screen
        image(back_img, 0, 0, width, height);

        // get all the players information
        Player.getPlayerInfo();
        // declare x and y
        var x =0;
        var y=0;
        // declare index for for loop
        var index =0;

        // draw sprites
        drawSprites();

        // for each player
        for(var plr in allPlayers)
        {
            // make index increase
            index = index+1;

            // make x position 500 - distance
            x = 500-allPlayers[plr].distance;
            // make y 500
            y=500;
            
            // make player's x = x and player's y = y
            players[index -1].x = x;
            players[index - 1].y = y;

            /* Differentiate the main player by printing 
            the name of the player on the basket.*/
            if(index === player.index)
            {
                fill("black");
                textSize(25);
                text(allPlayers[plr].name, x - 40, y+25);
            }
        }

        // Give movements for the players using arrow keys
        if(keyDown(RIGHT_ARROW))
        {
            player.distance -= 10;
            player.update();
        }
        if(keyDown(LEFT_ARROW))
        {
            player.distance += 10;
            player.update();
        }

        // Create and spawn fruits randomly
        if(frameCount % 20 === 0)
        {
            fruits = createSprite(random(100, 1000), 0, 100, 100);
            fruits.velocityY = 6;
            var rand = Math.round(random(1, 5));
            switch(rand)
            {
                case 1: fruits.addImage(fruit1_img);
                break;
                case 2: fruits.addImage(fruit2_img);
                break;
                case 3: fruits.addImage(fruit3_img);
                break;
                case 4: fruits.addImage(fruit4_img);
                break;
                case 5: fruits.addImage(fruit5_img);
                break;
            }
            fruitGroup.add(fruits);
        }

        for(var i=0; i < fruitGroup.length; i++)
        {
            if(fruitGroup.get(i).isTouching(players[player.index-1]))
            {
                fruitGroup.get(i).destroy();
                player.score+=1;
                player.update();
            }
        }

        if(player.score >= 10)
        {
            this.end();
        }

    }

    // log that the game ended
    end()
    {
        game.update(2);
        console.log("Game Ended");
        fill("blue");
        textSize(40);
        text("Game ended!", width/2, height/2);
    }
}