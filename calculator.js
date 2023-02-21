window.onload=function() {
    let submit = document.getElementById("calculate");
    const houseEdge = 0.007;
    let bank;
    let bet;
    let numHands;
    
    submit.onclick = function() {
        // Get required values
        bank = document.getElementById("bankStart").value;
        bet = document.getElementById("bet").value;
        numHands = document.getElementById("hands").value;

        //Calculate
        let eValue = bet * (1-houseEdge);
        let handDelta = eValue - bet;
        bank = bank + (handDelta * numHands);

        const outputDiv = documet.getElementById("output");
        outputDiv.innerHTMl = "";

        outputDiv.innerHTML = `<span>Bank value after <b>${numHabds}</b> hands at $${bet} per play: ${bank}<span>`
    }

    return
}