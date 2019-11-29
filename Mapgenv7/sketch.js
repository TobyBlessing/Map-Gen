var cols = 128;
var rows = 128;
const chunk = 3;

class Square {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.color = color(255);
  }
  
  setColor(col) {
    this.color = col;
  }
  
  getColor() {
    return this.color;
  }
  
  draw() {
    fill(this.color);
    rect(this.x, this.y, chunk, chunk);
  }
}

function setup() {

  createCanvas(384, 384);
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
  
  landColor = color(78, 184, 61);
  waterColor = color(138, 220, 234);
  shoreColor = color(81, 163, 67);
  
  grid = [];
  for (let i = 0; i < rows; i++) {
    let row = []
    for (let j = 0; j < cols; j++) {
      row.push(new Square(j * chunk, i * chunk));
    }
    grid.push(row);
  }
  
}

function draw() {

  background(200);
  noiseSeed(join(unchar(split(seed.value(), '')), comma));
  gen();

}

function gen() {
  
  let val1 = slider.value();
  let size = sizeSlider.value();
  noStroke();
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (noise(i / size, j / size) < val1) {
        grid[j][i].setColor(landColor);
      } else {
        grid[j][i].setColor(waterColor);
      }
    }
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[j][i].getColor() == waterColor) {
        const neighbours = getNeighbours(i, j);
        for (let n of neighbours) {
          if (grid[n.row][n.col].getColor() == landColor) {
            grid[n.row][n.col].setColor(shoreColor);
          }
        }
      }
    }
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[j][i].draw();
    }
  }
}

function getNeighbours(col, row) {
  let result = [];
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (!(i == 0 && j == 0) &&
        col + i >= 0 && row + j >= 0 &&
        col + i < cols && row + j < rows) {
        result.push({
          row: row + j,
          col: col + i
        });
      }
    }
  }
  return result;
}
function myInputEvent() {

  redraw()
  unchar(split(seed.value(), ''));
  join(unchar(split(seed.value(), '')), comma);

}