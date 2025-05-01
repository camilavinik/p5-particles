//////////////////////////////////
// COURSERA GRAPHICS PROGRAMMING
//////////////////////////////////
// Adapted from https://github.com/nature-of-code/
// released under MIT license

var balls = [];
////////////////////////////////////////////////////
function setup() {
  createCanvas(900, 600);
  balls = [];
}
////////////////////////////////////////////////////
function draw() {
  background(0);

  var gravity = createVector(0, 0.1);
  
  for (var i = 0; i < balls.length; i++) {
    var friction = balls[i].velocity.copy();
    friction.mult(-1);
    friction.normalize();
    friction.mult(balls[i].size / 1000);
    balls[i].applyForce(friction);
    balls[i].applyForce(gravity);
    balls[i].run();
  }
}
//////////////////////////////////////////////////////
class Ball {

  constructor(x, y){
    this.velocity = new createVector(random(-3, 3), random(-3, 3));
    this.location = new createVector(x, y);
    this.acceleration = new createVector(0, 0);
    this.size = random(10, 50);
    this.color = color(random(255), random(255), random(255));
    this.age = 255;
  }

  run(){
    this.draw();
    this.move();
    this.bounce();
  }

  draw(){
    if (this.age > 0) {
      this.age -= 0.5;
      this.color.setAlpha(this.age);
      
      fill(this.color);
      ellipse(this.location.x, this.location.y, this.size, this.size);
    }
  }

  move(){
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

  bounce(){
    if (this.location.x > width-this.size/2) {
          this.location.x = width-this.size/2;
          this.velocity.x *= -1;
    } else if (this.location.x < this.size/2) {
          this.velocity.x *= -1;
          this.location.x = this.size/2;
    }
    if (this.location.y > height-this.size/2) {
          this.velocity.y *= -1;
          this.location.y = height-this.size/2;
    }
  }

  applyForce(force){
    this.acceleration.add(force);
  }
}

function mouseDragged(){
  balls.push(new Ball(mouseX, mouseY));
}
