var game;
var playerCount = 0;

// Button handling
window.onload=function() {
    // Create a game instance
    document.getElementById("start").addEventListener('click', function() {
        game = new Blackjack
        game.deck.shuffle();
        game.bet = document.getElementById("bet").value;
    });

    // Add player
    document.getElementById("addplayer").addEventListener('click', function() {
        game.addPlayer();
        playerCount += 1
    });

    // Update bet amounts
    document.getElementById("bet").addEventListener('input', function() {
        if (game.inPlay) {
            console.log("Round in play, bet cannot be changed");
        } else {
            game.bet = document.getElementById("bet").value;
        }
    });

    // Game controls
    document.getElementById("stand").addEventListener('click', function() {
        if (game.turn == 1) {
            game.stand(game.players[1]);
        } else {
            console.log("Can only play on your turn");
        }
    });

    document.getElementById("hit").addEventListener('click', function() {
        if (game.turn == 1) {
            game.hit(game.players[1]);
        } else {
            console.log("Can only play on your turn");
        }
    });

    document.getElementById("double").addEventListener('click', function() {
        if (game.turn == 1) {
            game.double(game.players[1]);
        } else {
            console.log("Can only play on your turn");
        }
    });

    document.getElementById("split").addEventListener('click', function() {
        if (game.turn == 1) {
            game.split(game.players[1]);
        } else {
            console.log("Can only play on your turn");
        }
    });
}
