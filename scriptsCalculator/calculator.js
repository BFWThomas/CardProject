const oddVariance = {
    '-1': [0.4518, -0.0126],
    '0': [0.2592, -0.0011],
    '1': [0.1075, 0.0047],
    '2': [0.0750, 0.0102],
    '3': [0.0364, 0.0157],
    '4': [0.0283, 0.0219],
    '5': [0.0136, 0.0273],
    '6': [0.0113, 0.0344],
    '7': [0.0054, 0.0401],
    '8': [0.0046, 0.0477],
    '9': [0.0022, 0.0523],
    '10': [0.0019, 0.0605],
    '11': [0.0009, 0.0636],
    '12': [0.0007, 0.0743]
  };

  var bankValues = [];

window.onload=function() {
    let houseEdge = -0.007;
    let bank;
    let bet;
    let numHands;

    let toggle = document.getElementById("enableCount");
    const varsDiv = document.getElementById("countVars");
    varsDiv.classList.add("hidden");
    toggle.addEventListener('click', function() {
        if (toggle.checked) {
            varsDiv.classList.remove("hidden");
        } else {
            varsDiv.classList.add("hidden");
        }
    });

    let submit = document.getElementById("calculate");
    submit.addEventListener('click', function() {
        // Get required values
        bank = Number(document.getElementById("bankStart").value);
        bet = Number(document.getElementById("bet").value);
        numHands = Number(document.getElementById("hands").value);
        bankValues = [];

        // Calculate
        const outputDiv = document.getElementById("outputText");
        if (toggle.checked) {
            let deltaBet = document.getElementById("betVariance").value;
            let minCount = document.getElementById("minCount").value;

            let under = 0;
            let undercount = 0;
            let over = 0;
            let overcount = 0;
            for (let i = -1; i < minCount-1; i++) {
                const [v1, v2] = oddVariance[i.toString()];
                under += v1 * v2;
                undercount++;
            }

            for (let i = minCount; i <=12; i++) {
                const [v1, v2] = oddVariance[i.toString()];
                over += v1 * v2;
                overcount++;
            }

            const underOdds = under/(undercount);
            const overOdds = over/(overcount);

            for (let i=0; i <= numHands; i++) {
                let underEV = bet * (1+underOdds);
                let overEV = deltaBet * (1+overOdds);
                let handDelta = (underEV - bet) + (overEV - deltaBet);
                bank += handDelta*i;
                bank = Math.round((bank + Number.EPSILON) * 100) / 100;
                bankValues.push(bank);
            }
        } else {
            for (let i=0; i <= numHands; i++) {
                let ev = bet * (1+houseEdge);
                let handDelta = ev - bet;
                bank += handDelta * i;
                bank = Math.round((bank + Number.EPSILON) * 100) / 100;
                bankValues.push(bank);
            }
        }

        // Write output
        outputDiv.innerHTML = "";
        outputDiv.innerHTML = `<span>Bank value after <b>${numHands}</b> hands at <b>$${bet}</b> per play: <b>${bank}</b><span>`
        draw();
    });
}