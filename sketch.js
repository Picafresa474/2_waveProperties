
/*
 * DM3008 Generative Art
 * Underwater Garden
 * Inspired by Week 4 - Waves & Distribution
 */

var spacing = 40;
var elements = 50;
var canvasFormat;

function centreCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canvasFormat.position(x, y);
}

function setup() {
  canvasFormat = createCanvas(1000, 600);
  centreCanvas();
  rectMode(CENTER);
  colorMode(RGB);
  noStroke();
}

function draw() {
  background(23, 77, 98);

  // COLOUR PALETTES

  var seaColors = [
    color(132, 160, 133),
    color(161, 186, 153),
    color(91, 145, 139),
    color(104, 183, 177),
    color(190, 210, 170)
  ];

  var coralColors = [
    color(242, 174, 188),
    color(232, 90, 114),
    color(169, 184, 255),
    color(251, 159, 79),
    color(200, 80, 255),
    color(255, 224, 138)
  ];


  // SEA FLOOR

  fill(20, 59, 68);
  rect(width / 2, 580, width, 40);

  // BUBBLES

  fill(180, 225, 220);

  for (var i = 0; i < 18; i++) {
    var bx = (i * 53) % width;
    var by = height - ((frameCount * 1.2 + i * 75) % height);

    var bubbleSize = map(
      sin(radians(frameCount * 2 + i * 20)),
      -1, 1, 5, 12
    );

    circle(bx, by, bubbleSize);

  }
  
// ART NOUVEAU SPIRAL ALGAE

  for (var i = 0; i < 4; i++) {

    var spiralX = 180 + i * 215;
    var spiralY = 450 + sin(frameCount * 0.03 + i) * 10;

    stroke(seaColors[i % seaColors.length]);
    strokeWeight(3);
    noFill();

    push();

    translate(spiralX, spiralY);
    rotate(sin(frameCount * 0.02 + i) * 0.2);

    beginShape();

    for (var a = 0; a < TWO_PI * 1.5; a += 0.1) {
      var r = a * 3;

      vertex(
        cos(a) * r,
        sin(a) * r
      );
    }

    endShape();

    pop();
  }

  noStroke();
  // LEFT SEAWEED

  fill(seaColors[0]);

  for (var i = 0; i < 13; i++) {
    var y = i * 24;
    var sway = sin(frameCount * 0.03 + i * 0.25) * 16;

    push();
    translate(115 + sway, 550 - y);
    rotate(sin(frameCount * 0.03 + i * 0.25) * 0.2);

    ellipse(-13, 0, 32, 13);
    ellipse(13, -5, 32, 13);

    pop();
  }

  // RIGHT SEAWEED

  for (var i = 0; i < 15; i++) {
    var y = i * 22;
    var sway = sin(frameCount * 0.025 + i * 0.3) * 18;

    fill(seaColors[i % seaColors.length]);

    push();
    translate(885 + sway, 550 - y);
    rotate(sin(frameCount * 0.025 + i * 0.3) * 0.25);

    ellipse(-14, 0, 35, 14);
    ellipse(14, -6, 35, 14);

    pop();
  }

  // LEFT CORAL FAN

  translate(300, 520);

  for (var i = 0; i < elements; i++) {
    fill(coralColors[i % coralColors.length]);

    push();

    var angle = map(i, 0, elements - 1, -1.3, 1.3);
    rotate(angle + sin(frameCount * 0.025 + i * 0.1) * 0.04);

    ellipse(0, -50, 12, 50);

    pop();
  }

  fill(255, 224, 138);
  circle(0, 0, 22);

  translate(-300, -520);

  // RIGHT CORAL FAN

  translate(700, 530);

  for (var i = 0; i < elements; i++) {
    fill(coralColors[i % coralColors.length]);

    push();

    var angle = map(i, 0, elements - 1, -1.4, 1.4);
    rotate(angle + sin(frameCount * 0.025 + i * 0.1) * 0.04);

    ellipse(0, -45, 10, 45);

    pop();
  }

  fill(255, 224, 138);
  circle(0, 0, 20);

  translate(-700, -530);

  // ROUND CORAL CLUSTERS

  for (var x = 0; x <= width; x += spacing) {
    for (var y = 0; y <= height; y += spacing) {

      var wave = sin(x * 0.05 + frameCount * 0.03)
                 * cos(y * 0.05);

      var csize = map(wave, -1, 1, 3, 13);

      if (y > 520 && x > 180 && x < 820) {
        fill(coralColors[(x + y) % coralColors.length]);
        circle(x, y, csize);
      }
    }
  }
  translate(500, 550);
//middle coral fan
  for (var i = 0; i < elements; i++) {
    fill(coralColors[i % coralColors.length]);

    push();

    var angle = map(i, 0, elements - 1, -1.5, 1.5);

    rotate(angle + sin(frameCount * 0.025 + i * 0.1) * 0.04);

    ellipse(0, -65, 12, 65);

    pop();
  }

  fill(255, 224, 138);
  circle(0, 0, 24);

  translate(-500, -550);

  // SMALL DECORATIVE SEA PLANTS

  for (var i = 0; i < 30; i++) {
    var x = 200 + i * 20;
    var y = 565 + sin(frameCount * 0.04 + i * 0.5) * 8;

    fill(seaColors[i % seaColors.length]);
    ellipse(x, y, 13, 25);
  }
    // LEFT LATERAL SEAWEED

  for (var i = 0; i < 2; i++) {

    for (var j = 0; j < 13 - i * 4; j++) {

      var y = j * (25 + i * 3);
      var sway = sin(frameCount * 0.03 + j * 0.25 + i) * (12 + i * 5);

      fill(seaColors[(j + i) % seaColors.length]);

      push();

      translate(75 + i * 100 + sway, 550 - y);

      rotate(sin(frameCount * 0.03 + j * 0.25 + i) * 0.2);

      ellipse(-13, 0, 32 - i * 8, 13 - i * 3);
      ellipse(13, -5, 32 - i * 8, 13 - i * 3);

      pop();
    }
  }

  // RIGHT LATERAL SEAWEED

  for (var i = 0; i < 2; i++) {

    for (var j = 0; j < 15 - i * 5; j++) {

      var y = j * (22 + i * 4);
      var sway = sin(frameCount * 0.025 + j * 0.3 + i) * (16 + i * 5);

      fill(seaColors[(j + i + 2) % seaColors.length]);

      push();

      translate(820 + i * 85 + sway, 550 - y);

      rotate(sin(frameCount * 0.025 + j * 0.3 + i) * 0.25);

      ellipse(-14, 0, 35 - i * 9, 14 - i * 3);
      ellipse(14, -6, 35 - i * 9, 14 - i * 3);

      pop();
    }
  }
   // COLOURFUL ART NOUVEAU SPIRAL ALGAE

  var algaeColors = [
    color(242, 174, 188),  // dusty pink
    color(169, 184, 255),  // lavender
    color(251, 159, 79),   // peach
    color(104, 183, 177),  // turquoise
    color(190, 210, 170),  // sage green
    color(200, 80, 180)    // pink-purple
  ];

  for (var i = 0; i < 6; i++) {

    var spiralX = 100 + i * 155;
    var spiralY = 350 + sin(frameCount * 0.03 + i) * 12;

    stroke(algaeColors[i % algaeColors.length]);
    strokeWeight(3);
    noFill();

    push();

    translate(spiralX, spiralY);
    rotate(sin(frameCount * 0.02 + i) * 0.2);

    beginShape();

    for (var a = 0; a < TWO_PI * 1.5; a += 0.1) {

      var r = a * 3;

      vertex(
        cos(a) * r,
        sin(a) * r
      );
    }

    endShape();
    pop();
  }

  noStroke();
}

