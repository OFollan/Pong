var CanvasWidth = 500;
var CanvasHeight = 300;
var PaddleHeight = 50;
var PaddleWidth = 10;
var BallHeight = 10;
var Speed = 3;

var LP;
var RP;
var Ball;


function setup() {
	createCanvas(CanvasWidth, CanvasHeight)
	initializeGame();

	var button = createButton("Reset");
	button.mousePressed(resetGame);
}
function dummy()
{

}

function resetGame() 
{
	delete LP;
	delete RP;
	delete Ball;
	initializeGame();	
}

function initializeGame()
{

	LP = new Paddle(0);
	RP = new Paddle(CanvasWidth-PaddleWidth);
	Ball = new Ball();
}


function draw() {
	background(170);

	if(keyIsPressed === true)
	{
		keyPressed();
	}
	if(Ball.ballInCourt == true)
	{
		Ball.Update();
		LP.Update();	
		RP.Update();
		Ball.Show();	
		LP.Show();
		RP.Show();
	}
	else
	{			
		textSize(30);
		text("F5 TO REPLAY", 10, 30);
		fill(0);
	}


}

function keyPressed() {
  if (keyCode === DOWN_ARROW) 
  {
    RP.ySpeed = Speed;
  } 
  else if (keyCode === UP_ARROW) 
  {
    RP.ySpeed = -Speed;
  }
  else if (key === 'Z') 
  {
    LP.ySpeed = Speed;
  } 
  else if (key === 'Q') 
  {
    LP.ySpeed = -Speed;
  }
  else
  {
  	  return false;
  }
}


function Paddle(location)
{
	this.x = location;
	this.y = (CanvasHeight-PaddleHeight)/2;
	this.ySpeed = 0;
	
	this.Update = function()
	{
		if(this.y >= CanvasHeight-PaddleHeight)
		{
			if (this.ySpeed == -Speed)
			{
				this.y = this.y + this.ySpeed;
			}
		}
		else if(this.y <= 0)
		{
			if (this.ySpeed == Speed)
			{
				this.y = this.y + this.ySpeed;	
			}
		}
		else
		{
			this.y = this.y + this.ySpeed;

		}

	}

	this.Show = function()
	{
		fill(0);
		rect(this.x, this.y, PaddleWidth,PaddleHeight);
	}

}

function Ball()
{
	this.x = CanvasWidth/2;
	this.y = (CanvasHeight-PaddleHeight)/2 +10;
	this.ySpeed = 2;
	this.xSpeed = -2;
	this.ballInCourt = true;

	this.Update = function()

	{
		if(this.CollideWithWalls())
		{
			this.ySpeed = - this.ySpeed;
		}
		
		else if(this.CollideWithPaddle())
		{
			this.xSpeed = - this.xSpeed;

		}
		else if(this.OutOfBounds())
		{
			this.ballInCourt = false;
		}
		this.x = this.x + this.xSpeed;
		this.y = this.y + this.ySpeed;
		
	}

	this.OutOfBounds = function()
	{
		if(this.x > (CanvasWidth))
		{
			return true;
		}
		else if(this.x < 0 - BallHeight)
		{
			return true;
		}
		return false;
	}
	this.CollideWithWalls = function()
	{
		if(this.y >= CanvasHeight-BallHeight || this.y <= 0)
		{

			return true;
		}
		else
		{
			return false;
		}
	}
	this.CollideWithPaddle = function()
	{
		return(this.CollideLeft() == true || this.CollideRight() == true)
	}

	this.CollideLeft = function()
	{
		if(this.x - BallHeight == 0)
		{
			return(this.y >= LP.y && this.y <= LP.y+PaddleHeight)
		}
	}

	this.CollideRight = function()
	{
		if(this.x == (CanvasWidth - BallHeight-PaddleWidth))
		{
			return(this.y >= RP.y && this.y <= RP.y+PaddleHeight)

		}
	}

	this.Show = function()
	{
		fill(255,0,0);
			rect(this.x, this.y, BallHeight,BallHeight);
			// ellipse(this.x, this.y, BallHeight*1.5,BallHeight*1.5);

	}

}

