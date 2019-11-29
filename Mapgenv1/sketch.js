var cols = 32
var rows = 32

function setup() {
  createCanvas(256, 256); 
  noLoop()
}

function draw() {
  background(220);
  rectangles();
}

function rectangles(){
for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      var x = i * 8;
      var y = j * 8;
    let g = color(78,184,61);
    let b = color(138,220,234);
    let earth = [g, b];
      noStroke();
      fill(color(random(earth)));
      rect(x, y, 8, 8);
    }  
}
}