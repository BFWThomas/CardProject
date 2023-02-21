window.onload=function() {
    const houseEdge = 0.007;
    let bank;
    let bet;
    let numHands;

    let submit = document.getElementById("calculate");
    submit.addEventListener('click', function() {
        // Get required values
        bank = Number(document.getElementById("bankStart").value);
        bet = Number(document.getElementById("bet").value);
        numHands = Number(document.getElementById("hands").value);

        //Calculate
        let ev = bet * (1-houseEdge);
        let handDelta = ev - bet;
        bank += handDelta * numHands;
        bank = bank.toFixed(2);

        const outputDiv = document.getElementById("output");
        outputDiv.innerHTML = "";

        outputDiv.innerHTML = `<span>Bank value after <b>${numHands}</b> hands at <b>$${bet}</b> per play: <b>${bank}</b><span>`
    });
}