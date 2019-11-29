var cols = 32
var rows = 32

function setup() {
  createCanvas(384, 384);
  noLoop()
}

function draw() {
  background(220);
  rectangles();
}

function rectangles() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      var x = i * 12;
      var y = j * 12;
      let color1 = color(78, 184, 61);
      let color2 = color(138, 220, 234);
      noStroke();
      if (random() < .7) {
        fill(color1)
      } else {
        fill(color2)
      }
      rect(x, y, 12, 12);
    }
  }
}