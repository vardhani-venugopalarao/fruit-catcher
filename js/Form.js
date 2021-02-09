class Form
{
    constructor()
    {
        // create variables for buttons, inputs and text
       this.input = createInput("Name");
       this.button = createButton('Play');
       this.greeting = createElement('h2');
       this.title = createElement('h2');
       this.resetButton = createButton("reset");
    }
    hide() 
    {
        // hide everything
        this.greeting.hide();
        this.button.hide();
        this.input.hide();
        this.title.hide();
    }
    display()
    {
        // make title
        this.title.html("FRUIT CATCHER");
        this.title.position(350, 50);
        this.title.style('font-size', '70px');
        this.title.style('color', 'skyblue');
        // make input
        this.input.position(550,400);
        this.input.style('width', '200px');
        this.input.style('height', '20px');
        this.input.style('background', 'lavender');
        // make button
        this.button.position(560,500);
        this.button.style('width', '200px');
        this.button.style('height', '40px');
        this.button.style('background', 'lightpink');
        // make reset button and if pressed
        this.resetButton.position(560, 550);
        this.resetButton.mousePressed(() => 
        {
            game.update(0);
            player.updateCount(0);
        })
        // if the button is pressed
        this.button.mousePressed(() => {
            // hide input and button
            this.input.hide();
            this.button.hide();
            // player.name becomes the value of their input
            player.name = this.input.value();
            // the player count increases
            playerCount += 1;
            // the index becomes the player count (1st player gets 1, e.t.c)
            player.index = playerCount;
            // make all categories in database for players
            player.update();
            // make the playerCount in database match the one in game
            player.updateCount(playerCount);
            // display a greeting
            this.greeting.html("Hello " + player.name)
            this.greeting.position(400,250);
            this.greeting.style('color', 'white');
            this.greeting.style('font-size', '100px');
        });

    }
}