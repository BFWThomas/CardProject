const suits = ['Hearts', 'Diamonds', 'Spades', 'Clubs'];
const values = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];

/*
Card object
*/
class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }

    cardString() {
        return `${this.value} of ${this.suit}`
    }

    cardImage() {
        const suitName = this.suit.toLowerCase();
        const valueName = this.value.toString().toLowerCase();
        return `./assets/images/${suitName}/${valueName}.png`
    }
}

/*
 Deck Object
 Takes an integer that is the number of individual decks to be shuffled together
 */
class Deck {
    constructor(size) {
        this.deck = [];
        this.create(size);
        this.count = 0;
    }

    // Create deck with *size* number of repeats
    create(size) {
        this.deck = [];
        for (let suit in suits) {
            for (let value in values) {
                for (let i=0; i < size; i ++) {
                    var card = new Card(suits[suit], values[value])
                    this.deck.push(card);
                }
            }
        }
    }

    // Randomize the deck
    shuffle() {
        let currentIndex = this.deck.length, newIndex;
        while (currentIndex != 0) {
            newIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            
            let temp = this.deck[currentIndex];
            this.deck[currentIndex] = this.deck[newIndex];
            this.deck[newIndex] = temp;
        }
        return this;
    }

    drawCard() {
        let card = this.deck.pop();
        if (card.value <= 6) {
            this.count++;
        } else if (card.value === 10 || card.value === 'Jack' || card.value === 'Queen' || card.value === 'King') {
            this.count--;
        }
        console.log(this.count);
        return card
    }
}