class Player {
    constructor() {
        this.hand = [];
        this.splitHand = [];
        this.split = false;
        this.bust = false;
        this.result = "";
    }

    // Count up the total of the player's hand
    handValue() {
        let total = 0;
        for (let card of this.hand) {
            if (['Jack', 'Queen', 'King'].includes(card.value)) {
                total += 10;
            } else if (card.value === 'A') {
                if (total + 11 > 21) {total += 1;} 
                else {total += 11;}
            } else {
                total += card.value;
            }
        }
        return total;
    }

    busted() {
        this.bust = (this.handValue() > 21);
        return this.bust;
    }
}