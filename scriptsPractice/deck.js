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
}

/*
 Deck Object
 Takes an integer that is the number of individual decks to be shuffled together
 */
class Deck {
    constructor(size) {
        this.deck = [];
        this.create(size);
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
        return this.deck.pop();
    }
}