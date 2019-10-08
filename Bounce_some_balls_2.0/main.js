let para = document.querySelector("p");
let count = 0;

// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

//Basic Constructor
function Shape(x, y, velX, velY, exists)
{
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists = exists;
}

//define Ball -> inhert from Shape
function Ball(x, y, velX, velY, exists, color, size)
{
  Shape.call(this, x, y, velX, velY, exists);
  this.color = color;
  this.size = size;
}
Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;

//define EvilCircle -> inhert from Shape
function EvilCircle(x, y, exists)
{
  Shape.call(this, x, y, 10, 10, exists);
  this.color = "white";
  this.size = 10;
}
EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = EvilCircle;
//Drawing ball
Ball.prototype.draw = function()
{
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
    ctx.fill();
}

//Drawing EvilCricle
EvilCircle.prototype.draw = function()
{
  ctx.beginPath();
  ctx.strokeStyle = this.color;
  ctx.lineWidth = 3;
  ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
  ctx.stroke();
}
// Update ball - Does it is off screen and update position
Ball.prototype.update = function()
{
    if((this.size + this.x) >= width)
    {
        this.velX = -(this.velX);
    }
    if((this.x - this.size) <= 0)
    {
        this.velX = -(this.velX);
    }
    if((this.size + this.y) >= height)
    {
        this.velY = -(this.velY);
    }
    if((this.y - this.size) <= 0 )
    {
        this.velY = -(this.velY);
    }
    this.x += this.velX;
    this.y += this.velY;
}
//checkBounds - Does it is off screen
EvilCircle.prototype.checkBounds = function()
{
  if((this.size + this.x) >= width)
    {
        this.x -= this.size;
    }
    if((this.x - this.size) <= 0)
    {
        this.x += this.size;
    }
    if((this.size + this.y) >= height)
    {
        this.y -= this.size;
    }
    if((this.y - this.size) <= 0 )
    {
        this.y += this.size;
    }
}
// setControls -> check pressing key
EvilCircle.prototype.setControls = function()
{
  let _this = this;
  window.onkeydown = function(e)
    {
      if (e.keyCode === 65) {
        _this.x -= _this.velX;
      } else if (e.keyCode === 68) {
        _this.x += _this.velX;
      } else if (e.keyCode === 87) {
        _this.y -= _this.velY;
      } else if (e.keyCode === 83) {
        _this.y += _this.velY;
    }
  }
}
// Collision detect
Ball.prototype.collisionDetect = function() {
    for (var j = 0; j < balls.length; j++) {
      if (!(this === balls[j])) {
        var dx = this.x - balls[j].x;
        var dy = this.y - balls[j].y;
        var distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < this.size + balls[j].size) {
          balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
        }
      }
    }
  }

  // Collision detect
EvilCircle.prototype.collisionDetect = function() {
  for (var j = 0; j < balls.length; j++) {
    if (balls[j].exists) 
    {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) 
      {
        balls.splice(j,1);
        count--;
        para.textContent = "Ball Count: " + count;
      }
    }
  }
}
// Animating ball

let balls = [];
while (balls.length < 25)
{
    let size = random(10, 20);
    let ball = new Ball(
        // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size,width - size),
    random(0 + size,height - size),
    random(-7,7),
    random(-7,7),
    true,
    'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    size);

    balls.push(ball);
    count++;
    para.textContent = "Ball Count: " + count;
}

  let Evil1 = new EvilCircle(random(0,width),random(0,height),true);
  Evil1.setControls();
  function loop()
  {
      ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
      ctx.fillRect(0, 0, width, height);
      for (let i=0; i<balls.length; i++)
      {
        if(balls[i].exists)
        {
          balls[i].draw();
          balls[i].update();
          balls[i].collisionDetect();
        }
      }
      Evil1.draw();
      Evil1.checkBounds();
      Evil1.collisionDetect();
      requestAnimationFrame(loop);
  }
  loop();