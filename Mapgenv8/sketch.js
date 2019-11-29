var cols = 192;
var rows = 192;
const chunk = 2;

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

  createCanvas(384, 490);
  noLoop();
  
  slider = createSlider(0, 1, 0.475, 0.01);
  slider.position(196, 400);
  slider.style('width', '96px');
  slider.input(myInputEvent);
  let val1 = slider.value();

  sizeSlider = createSlider(12, 85, 25, 0.01);
  sizeSlider.position(196, 430);
  sizeSlider.style('width', '96px');
  sizeSlider.input(myInputEvent);

  let r = int(random(1, 999999999));
  seed = createInput(r);
  seed.position(196, 460);
  seed.style('width', '96px');
  seed.input(myInputEvent);
  comma = '';

  landColor = color(147, 209, 132);
  waterColor = color(140, 187, 230);
  shoreColor = color(90, 130, 57);

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

  background(1000);
  
  noiseSeed(join(unchar(split(seed.value(), '')), comma));
  gen();
  
  textSize(15);
  fill(51);
  text('Land Ratio', 115, 415);
  
  textSize(15);
  fill(51);
  text('Zoom Level', 110, 445);
  
  textSize(15);
  fill(51);
  text('Map Seed', 119, 475);
  
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