function setup() {
    const canvas = createCanvas(500,300);
    canvas.parent("output");
    noLoop();
}

function draw() {
    // Prep
    const bankMax = Math.max(...bankValues);
    const bankMin = Math.min(...bankValues);
    clear();
    background(255);

    // Label axes
    textSize(12);
    textStyle(NORMAL);
    textAlign(CENTER);
    fill(0);
    strokeWeight(0.5);
    text("Hands Played", 250, 280);
    textAlign(RIGHT);
    text("Bank\nValue", 45, 150);
    
    // Draw axes
    stroke(0);
    strokeWeight(1);
    line(50, 50, 50, 250);  // x Axis
    if (bankMin < 0) {
        let axisY = map(0, bankMin, bankMax, 250, 50);
        line(50, axisY, 450, axisY);    // y axis if negative bank
        text("$0", 470, axisY+5);
    } else {
        line(50, 250, 450, 250);   // y axis if positive bank
    }
    
    // Bank value as line graph
    let scaleMin = Math.min(0, bankMin);
    stroke(0);
    noFill();
    beginShape();
    // Only draw min/max points once
    let hasMax = false;
    let hasMin = false;
    for (let i=0; i<bankValues.length; i++) {
        let x = map(i, 0, bankValues.length-1, 50, 450);
        let y = map(bankValues[i], scaleMin, bankMax, 250, 50);
        let px = map(i-1, 0, bankValues.length-1, 50, 450);
        let py = map(bankValues[i-1], scaleMin, bankMax, 250, 50);
        line(px, py, x, y);
        if (bankValues[i] === bankMax && !hasMax) {
            strokeWeight(6);
            point(x,y);
            strokeWeight(1);
            text(`$(${bankMax} @ ${i})`, x+20, y-10);
            hasMax = true;
        } else if (bankValues[i] === bankMin && !hasMin) {
            text(`($${bankMin} @ ${i})`, x+20, y+10);
            hasMin = true;
        }
    }
    endShape();
}