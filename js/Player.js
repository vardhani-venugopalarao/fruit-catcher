class Player {
    // define variables
    constructor() {
        this.index = null;
        this.distance = 0;
        this.name = null;
        this.score =0;
    }

    // get the playerCount
    getCount() {
        var playerCountRef = database.ref('playerCount');
        playerCountRef.on("value", (data) => {
            playerCount = data.val();
        })
    }

    // update the count
    updateCount(count) {
        database.ref('/').update({
            playerCount: count
        });
    }

    // update all data for players
    update()
    {
        // refer to player 1, player 2 inside players
        var playerIndex = "players/player" + this.index;
        // make nodes in database set to values
        database.ref(playerIndex).set({
            name: this.name,
            distance: this.distance,
            score:this.score
        });
    }

    // get all info under players
    static getPlayerInfo() {
        var playerInfoRef = database.ref('players');
        playerInfoRef.on("value", (data) => {
            allPlayers = data.val();
        })
    }

    
}
