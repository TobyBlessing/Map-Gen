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
  let r = int(random(1, 999999));
  slider.input(myInputEvent);
  seed = createInput(r);
  seed.position(10, 420);
  seed.input(myInputEvent);
  comma = '';
  s = join(unchar(split(seed.value(), '')), comma);

}

function draw() {
  background(220);
  randomSeed(join(unchar(split(seed.value(), '')), comma));
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
  unchar(split(seed.value(), ''));
  join(unchar(split(seed.value(), '')), comma);

}