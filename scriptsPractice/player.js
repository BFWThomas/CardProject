class Player {
    constructor() {
        // TODO: Allow holding multiple hands (for splits)
        this.hand = [];
        this.splitHand = [];
        this.split = false;
        this.bust = false;
        this.result = "";
    }

    // Count up the total of the player's hand
    // TODO: Refactor to allow targeting specific hand in hand
    handValue() {
        let total = 0;
        let hasAce = false;
        for (let card of this.hand) {
            if (['Jack', 'Queen', 'King'].includes(card.value)) {
                total += 10;
            } else if (card.value === 'A') {
                total++;
                hasAce = true;
            } else {
                total += card.value;
            }
        }
        // Bring total Ace value to 11 if it won't bust
        if (hasAce) {
            if (total <= 11) {
                total += 10;
            }
        }
        return total;
    }

    // TODO: Refactor to target specific hand
    busted() {
        this.bust = (this.handValue() > 21);
        return this.bust;
    }
}