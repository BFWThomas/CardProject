function setup() {
    const canvas = createCanvas(400,300);
    canvas.parent("output");
    background(255);
}

function draw() {
    // Draw axes
    stroke(0);
    line(50, 250, 350, 250);
    line(50, 50, 50, 250);

    // Bank value as line graph
    stroke(255, 0, 0);
    noFill();
    beginShape();
    for (let i=0; i<bankValues.length; i++) {
        let x = map(i, 0, bankValues.length-1, 50, 250);
        let y = map(bankValues[i], 0, 1000, 250, 50);
        vertex(x, y);
    }
    endShape();
}