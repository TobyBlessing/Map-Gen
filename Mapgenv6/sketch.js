var cols = 128;
var rows = 128;

let slider;
let sizeSlider;

function setup() {

  createCanvas(384, 384);
  cursor(CROSS);
  noLoop();

  slider = createSlider(0, 1, 0.5, 0.05);
  slider.position(10, 390);
  slider.style('width', '80px');
  slider.input(myInputEvent);
  let val1 = slider.value();

  sizeSlider = createSlider(7.5, 100, 15, 0.01);
  sizeSlider.position(100, 390);
  sizeSlider.style('width', '80px');
  sizeSlider.input(myInputEvent);

  let r = int(random(1, 999999999));
  seed = createInput(r);
  seed.position(10, 420);
  seed.input(myInputEvent);
  comma = '';

  noiseDetail(200, 0.475);

}

function draw() {

  background(200);
  noiseSeed(join(unchar(split(seed.value(), '')), comma));
  land();

}

function land() {

  let land = color(78, 184, 61);
  let water = color(138, 220, 234);
  let shore = color(51, 110, 45);
  
  let val1 = slider.value();
  let size = sizeSlider.value();
  
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      var x = i * 3;
      var y = j * 3;
      if (noise(i / size, j / size) < val1) {
        fill(land)
      } else {
        fill(water)
      }
      noStroke();
      rect(x, y, 3, 3)
      
    }
  }
}

function myInputEvent() {

  redraw()
  unchar(split(seed.value(), ''));
  join(unchar(split(seed.value(), '')), comma);

}