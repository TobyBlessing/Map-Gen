var cols = 32
var rows = 32

let slider;

function setup() {
  createCanvas(384, 384);
  noLoop()
  slider = createSlider(0, 1, .5, .1);
  slider.position(10, 390);
  slider.style('width', '80px');
  let val1 = slider.value();
  let inp = slider
  inp.input(myInputEvent);
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
      let val1 = slider.value();
      if (random() < val1) {
        fill(color1)
      } else {
        fill(color2)
      }
      rect(x, y, 12, 12);
    }
  }
}
function myInputEvent() {
  redraw()
}