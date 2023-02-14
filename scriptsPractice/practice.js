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
        playerDiv.innerHTML = `<b>You</b>: ${game.bet}`;
        playerDiv.setAttribute('id', 'user-player');
      } else {
        playerDiv.innerText = `Player ${index + 1}`;
      }
      
      playersDiv.appendChild(playerDiv);
    });
}

function renderCards(game) {
    const playersDiv = document.getElementById("players");
    playersDiv.innerHTML = ""; // clear existing player divs

    for (let i=1; i<game.players.length; i++) {
        const player = game.players[i];
        const playerDiv = document.createElement("div");
        
        // Convert cards to a string
        let playerHand = [];
        for (let j=0; j<player.hand.length; j++) {
            playerHand.push(player.hand[j].cardString());
        }

        // Differenciate between players and user
        if (i==1) {
            playerDiv.innerHTML = `<b>You</b>: ${playerHand.join(", ")}`; 
        } else {
            playerDiv.innerText = `Player ${i + 1}: ${playerHand.join(", ")}`;
        }
        playersDiv.appendChild(playerDiv);
    }

    const dealerDiv = document.createElement("div");
    dealerDiv.innerText = `Dealer: ${game.players[0].hand[0].cardString()}`;
    playersDiv.prepend(dealerDiv);
}



window.onload=function() {
    // Hide controls until new game made
    const controlsDiv = document.getElementById("controls");
    controlsDiv.classList.add("hidden");

    /* ---Controls------------------------------------ */
    // Create a game instance
    document.getElementById("start").addEventListener('click', function() {
        game = new Blackjack
        renderPlayers(game);
        game.deck.shuffle();
        game.bet = document.getElementById("bet").value;

        controlsDiv.classList.remove("hidden");
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
            document.getElementById("bet").value = game.bet;
        } else {
            game.bet = document.getElementById("bet").value;
            document.getElementById("user-player").innerText = `You: ${game.bet}`;
        }
    });

    // Game controls

    document.getElementById("deal").addEventListener('click', function() {
        game.startround();
        renderCards(game);
        game.turn = game.players.length-1;
    });

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
            renderCards(game);
        } else {
            console.log("Can only play on your turn");
        }
    });

    document.getElementById("double").addEventListener('click', function() {
        if (game.turn == 1) {
            game.double(game.players[1]);
            renderCards(game);
        } else {
            console.log("Can only play on your turn");
        }
    });

    document.getElementById("split").addEventListener('click', function() {
        if (game.turn == 1) {
            game.split(game.players[1]);
            renderCards(game);
        } else {
            console.log("Can only play on your turn");
        }
    });
}
