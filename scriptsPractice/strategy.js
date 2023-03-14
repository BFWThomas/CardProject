function basicStrategy(dealerCard, hand) {
    const FACE_CARD_VALUES = ['Jack', 'Queen', 'King'];
    let upCard = dealerCard.value;
    if (FACE_CARD_VALUES.includes(upCard)) {
        upCard = 10;
    }

    const handValues = hand.map(card => {
        if (FACE_CARD_VALUES.includes(card.value)) {
            return 10;
        } else {
            return card.value;
        }
    });

    // If hand is a pair
    if (new Set(handValues).size !== handValues.length) {
        switch(handValues[0]) {
            case 2:
            case 3:
                if (upCard <= 7) {
                    return 'Split'
                }
                return 'Hit'
            case 4:
                if (upCard === 5 || upCard === 6) {
                    return 'Split'
                }
                return 'Hit'
            case 5:
                if (upCard <= 9) {
                    return 'Double'
                }
                return 'Hit'
            case 6:
                if (upCard <= 6) {
                    return 'Split'
                }
                return 'Hit'
            case 7:
                if (upCard <= 7) {
                    return 'Split'
                }
                return 'Hit'
            case 8:
                if (upCard !== 'A') {
                    return 'Split'
                }
                return 'Surrender'
            case 9:
                if (upCard === 7 || upCard === 10 || upCard === 'A') {
                    return 'Stand'
                }
                return 'Split'
            case 10:
                return 'Stand'
            default:
                return 'Split'
        }
    }

    // If soft total
    if (handValues.includes('A')) {
        // Ace without pair
        let card;
        for (let value of handValues) {
            if (value !== 'A') {
                card = value;
            }
        }

        switch (card) {
            case 2:
            case 3:
                if (upCard === 5 || upCard === 6) {
                    return 'Double'
                }
                return 'Hit'
            case 4:
            case 5:
                if (4 <= upCard && upCard <= 6) {
                    return 'Double'
                }
                return 'Hit'
            case 6:
                if (3 <= upCard && upCard <= 6) {
                    return 'Double'
                }
                return 'Hit'
            case 7:
                if (upCard <= 6) {
                    return 'Double'
                }
                if (upCard === 7 || upCard === 8) {
                    return 'Stand'
                }
                return 'Hit'
            case 8:
                if (upCard === 6) {
                    return 'Double'
                }
                return 'Stand'
            case 9:
                return 'Stand'
            default:
                return 'Error: invalid hand total for soft hand'
        }
    }

    // Hard total without pair
    const handTotal = handValues.reduce(
        (accumulator, currentValue) => accumulator + currentValue
    );

    switch (handTotal) {
        case 5:
        case 6:
        case 7:
        case 8:
            return 'Hit'
        case 9:
            if (3 <= upCard && upCard <= 6) {
                return 'Double'
            }
            return 'Hit'
        case 10:
            if (upCard <= 9) {
                return 'Double'
            }
            return 'Hit'
        case 11:
            return 'Double'
        case 12:
            if (4 <= upCard && upCard <=6) {
                return 'Stand'
            }
            return 'Hit'
        case 13:
        case 14:
            if (2 <= upCard <= 6) {
                return 'Stand'
            }
            return 'Hit'
        case 15:
            if (upCard <= 6) {
                return 'Stand'
            } else if (7 <= upCard && upCard<= 9) {
                return 'Hit'
            }
            return 'Surrender'
        case 16:
            if (upCard <= 6) {
                return 'Stand'
            } else if (7 <= upCard && upCard<= 8) {
                return 'Hit'
            }
            return 'Surrender'
        case 17:
            if (upCard !== 'A') {
                return 'Stand'
            }
            return 'Surrender'
        case 18:
        case 19:
        case 20:
        case 21:
            return 'Stand'
        default:
            return 'Error: invalid hand total for hard hand'
    }
}