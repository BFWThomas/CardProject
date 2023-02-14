var game;
var playerCount = 0;

function renderPlayers(game) {
    const playersDiv = document.getElementById("players");
    playersDiv.innerHTML = ""; // clear existing player divs
  
    game.players.forEach((player, index) => {
      const playerDiv = document.createElement("div");
      if (index == 0) {
        playerDiv.innerText = 'Dealer';
      } else if (index == 1){
        playerDiv.innerText = `You: ${game.bet}`;
        playerDiv.setAttribute('id', 'user-player');
      } else {
        playerDiv.innerText = `Player ${index + 1}`;
      }
      
      playersDiv.appendChild(playerDiv);
    });
}

// Button handling
window.onload=function() {
    // Create a game instance
    document.getElementById("start").addEventListener('click', function() {
        game = new Blackjack
        renderPlayers(game);
        game.deck.shuffle();
        game.bet = document.getElementById("bet").value;
    });

    // Add player
    document.getElementById("addplayer").addEventListener('click', function() {
        game.addPlayer();
        renderPlayers(game);
        playerCount += 1;
    });

    // Update bet amounts
    document.getElementById("bet").addEventListener('input', function() {
        if (game.inPlay) {
            console.log("Round in play, bet cannot be changed");
        } else {
            game.bet = document.getElementById("bet").value;
            document.getElementById("user-player").innerText = `You: ${game.bet}`;
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
