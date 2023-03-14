var game;
var playerCount = 0;
var recommendedPlay;

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
        
        // Differenciate between players and user
        if (i==1) {
            playerDiv.innerHTML = `${player.result} <b>You</b>: `;
            // Get card image
            for (let j=0; j<player.hand.length; j++) {
                const cardDiv = document.createElement("div");
                cardDiv.className = "card";

                const cardImg = document.createElement("img");
                cardImg.src = player.hand[j].cardImage();
                cardImg.alt = player.hand[j].cardString();
                cardDiv.appendChild(cardImg);
                playerDiv.appendChild(cardDiv);
            }
        } else {
            playerDiv.innerText = `${player.result} Player ${i + 1}: ${playerHand.join(", ")}`;
        }
        playersDiv.appendChild(playerDiv);
    }

    // If not dealer turn, only show card 1 otherwise show entire hand
    const dealerDiv = document.createElement("div");
    if (game.turn != 0) {
        dealerDiv.innerHTML = "Dealer: ";
        const cardDiv = document.createElement("div");
        cardDiv.className = "card";

        const cardImg = document.createElement("img");
        cardImg.src = game.players[0].hand[0].cardImage();
        cardImg.alt = game.players[0].hand[0].cardString();
        cardDiv.appendChild(cardImg);
        dealerDiv.appendChild(cardDiv);
    } else {
        
        dealerDiv.innerHTML = "Dealer: ";
        for (let j=0; j<game.players[0].hand.length; j++) {        
            const cardDiv = document.createElement("div");
            cardDiv.className = "card";

            const cardImg = document.createElement("img");
            cardImg.src = game.players[0].hand[j].cardImage();
            cardImg.alt = game.players[0].hand[j].cardString();
            cardDiv.appendChild(cardImg);
            dealerDiv.appendChild(cardDiv);
        }
        ;
    }
    playersDiv.prepend(dealerDiv);
    return
}

function updateCountDisplay(game) {
    const displayCount = document.getElementById("displayCount");
    const count = game.deck.count;
    const trueCount = count / game.size;
    let color;

    if (count < 1) {
        color = "red";
    } else if (count < 4) {
        color = "yellow";
    } else {
        color = "green";
    }

    displayCount.innerHTML = `Running Count: <span class="${color}">${count}</span>
    <br>True Count: ${trueCount}`;
}

function strategyFeedback(isRight) {
    if (isRight) {
        return `<span class="green">Correct! The right play was to ${recommendedPlay}.</span>`;
    } else {
        return `<span class="red">Incorrect, the right was to ${recommendedPlay}.</span>`;
    }
}

window.onload=function() {
    // Hide controls until new game made
    const controlsDiv = document.getElementById("controls");
    controlsDiv.classList.add("hidden");

    /* ---Controls------------------------------------ */
    // Create a game instance
    document.getElementById("start").addEventListener('click', function() {
        game = new Blackjack(document.getElementById("numDecks").value);
        renderPlayers(game);
        game.deck.shuffle();
        game.bet = document.getElementById("bet").value;

        controlsDiv.classList.remove("hidden");
    });

    // Toggle count tracker
    const countToggle = document.getElementById("countToggle");
    const displayCount = document.getElementById("displayCount");

    countToggle.addEventListener("change", function() {
        if (countToggle.checked) {
            displayCount.removeAttribute("hidden");
            updateCountDisplay(game);
        } else {
            displayCount.setAttribute("hidden", "");
        }
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
        updateCountDisplay(game);
        game.startround();
        document.getElementById("correctPlay").innerHTML = "";
        recommendedPlay = basicStrategy(game.players[0].hand[0], game.players[1].hand);
        renderCards(game);
        game.turn = game.players.length-1;
    });

    let stratDiv = document.getElementById("correctPlay");

    document.getElementById("stand").addEventListener('click', function() {
        if (game.turn == 1) {
            stratDiv.innerHTML = strategyFeedback(recommendedPlay === 'Stand');
            game.stand(game.players[1]);
            game.dealerTurn(game.players[0]);
            updateCountDisplay(game);
            game.checkResults();
        } else {
            console.log("Can only play on your turn");
        }
        renderCards(game);
    });

    document.getElementById("hit").addEventListener('click', function() {
        if (game.turn == 1) {
            stratDiv.innerHTML = strategyFeedback(recommendedPlay === 'Hit');
            game.hit(game.players[1]);
            if (game.players[1].busted()) {
                game.turn--;
                game.dealerTurn(game.players[0]);
                updateCountDisplay(game);
                game.checkResults();
            }
            renderCards(game);
        } else {
            console.log("Can only play on your turn");
        }
    });

    document.getElementById("double").addEventListener('click', function() {
        if (game.turn == 1) {
            stratDiv.innerHTML = strategyFeedback(recommendedPlay === 'Double');
            game.double(game.players[1]);
            game.turn--;
            game.dealerTurn(game.players[0]);
            updateCountDisplay(game);
            game.checkResults();
            renderCards(game);
        } else {
            console.log("Can only play on your turn");
        }
    });

    document.getElementById("split").addEventListener('click', function() {
        if (game.turn == 1) {
            stratDiv.innerHTML = strategyFeedback(recommendedPlay === 'Split');
            game.split(game.players[1]);
            renderCards(game);
        } else {
            console.log("Can only play on your turn");
        }
    });

    document.getElementById("surrender").addEventListener('click', function () {
        if (game.turn == 1) {
            stratDiv.innerHTML = strategyFeedback(recommendedPlay === 'Surrender');
            game.stand(game.players[1]);
            game.dealerTurn(game.players[0]);
            updateCountDisplay(game);
            game.checkResults();
        } else {
            console.log("Can only play on your turn");
        }
        renderCards(game);
    });
}
