class Blackjack {
    constructor() {
        // Initiate with a fresh deck and 2 players
        this.deck = new Deck(1);
        this.players = [new Player, new Player];
        this.bet = 0;
        this.turn = -1;
        this.inPlay = false;
    }

    addPlayer() {
        this.players.push(new Player);
        this.turn = this.players.length;
        return
    }

    endTurn() {
        // Dealer finished turn
        if (this.turn == 0) {
            if (this.deck.length < 52) {
                this.deck = new Deck(1);
                this.deck.shuffle();
            }
            this.turn = this.players.length-1;
            return
        }
        // Player ended turn
        this.turn -= 1;
        return
    }

    // TODO: Won't do anything until more of game is implemented
    stand(player) {
        console.log(player.hand);
        this.turn-- ;
        return
    }

    hit(player) {
        player.hand.push(this.deck.drawCard());
        if (player.bust) {
            this.turn--;
        }
        return
    }

    double(player) {
        this.bet *= 2;
        player.hand.push(this.deck.drawCard());
        this.turn--;
        return
    }

    split(player) {
        if (player.split) {
            return
        }
        player.splitHand[0] = player.hand[1];
        player.hand[1] = this.deck.drawCard();
        player.splitHand[1] = this.deck.drawCard();
        player.split = true;
        console.log(player.hand);
        console.log(player.splitHand);
        return
    }

    // Draw card until total is 17 or higher
    dealerTurn(dealer) {
        while (dealer.handValue() < 17) {
            dealer.hand.push(this.deck.drawCard());
        }
        dealer.bust = dealer.busted();
        return dealer.handValue()
    }

    computerTurn(player) {
        while (player.handValue() < 17) {
            player.hand.push(this.deck.drawCard());
        }
        return player.handValue()
    }

    startround() {
        // Mark as in play and set turn to last player
        this.inPlay = true;
        this.turn = this.players.length;

        // Clear hands and give each player 1 card then another
        for (let player of this.players) {
            player.result = "";
            player.split = false;
            player.splitHand = [];
            player.bust = false;
            player.hand = [];
            player.hand.push(this.deck.drawCard());
        }
        for (let player of this.players) {
            player.hand.push(this.deck.drawCard());
        }
    }

    checkResults() {
        let dealer = this.players[0];
        let dealerBusted = dealer.busted();
        let winners = [];
        let losers = [];
        let draw = [];
        
        for (let i = 1; i < this.players.length; i++) {
            let player = this.players[i];
            // Check player results
            if (player.busted()) {
                losers.push(player);
                player.result = "Busted";
            } else if (dealerBusted) {
                winners.push(player);
                player.result = "Winner!";
            } else if (player.handValue < dealer.handValue()) {
                losers.push(player);
                player.result = "Loser";
            } else if (player.handValue > dealer.handValue()) {
                winners.push(player);
                player.result = "Winner!";
            } else {
                draw.push(player);
                player.result = "Push";
            }
        }
        return [winners, losers, draw];
    }

    turnControl() {
        if (this.turn == 0) {
            this.dealerTurn();
            this.checkResults();
        } else if (this.turn != 1) {
            this.computerTurn();
        } else {
            return
        }
    }
}