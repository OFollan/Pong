var CanvasWidth = 400;
var CanvasHeight = 300;
var PaddleHeight = 100;
var PaddleWidth = 10;
var gameBallHeight = 10;
var Speed = 4;
var ballSpeed = 2;
var LP;
var RP;
var gameBall;


function setup() {
	createCanvas(CanvasWidth, CanvasHeight)

	var button = createButton("Play");
	button.mousePressed(resetGame);
	LP = new Paddle(0);
	RP = new Paddle(CanvasWidth-PaddleWidth);
	gameBall = new gameBall();

}

function resetGame() 
{
	delete LP;
	delete RP;
	delete gameBall;
	initializeGame();
}

function initializeGame()
{
	LP = new Paddle(0);
	RP = new Paddle(CanvasWidth-PaddleWidth);
	gameBall = new gameBall();
}


function draw() {
	background(170);

	if(keyIsPressed == true)
	{
		keyPressed();
	}
	if(gameBall.gameBallInCourt == true)
	{
		gameBall.Update();
		LP.Update();	
		RP.Update();
		gameBall.Show();	
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
  if (keyIsDown(DOWN_ARROW)) 
  {
    RP.ySpeed = Speed;
  } 
  else if (keyIsDown(UP_ARROW))
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

function gameBall()
{
	this.x = CanvasWidth/2;
	this.y = (CanvasHeight)/2;
	this.ySpeed = ballSpeed;
	this.xSpeed = -ballSpeed;
	this.gameBallInCourt = true;

	this.Update = function()

	{
		if(this.CollideWithWalls())
		{
			this.ySpeed = - this.ySpeed;
		}
		
		else if(this.CollideWithPaddle())
		{
			this.changeSpeed();
		}
		else if(this.OutOfBounds())
		{
			this.gameBallInCourt = false;
		}
		this.x = this.x + this.xSpeed;
		this.y = this.y + this.ySpeed;	
	}

	this.changeSpeed = function()
	{
		if (this.CollideLeft())
		{
			this.ySpeed = this.ySpeed - (LP.y + PaddleHeight/2 - this.y) / 20;
			this.xSpeed = - this.xSpeed;
		}
		if (this.CollideRight())
		{
			this.ySpeed = this.ySpeed - (RP.y + PaddleHeight/2 - this.y) / 20;
			this.xSpeed = - this.xSpeed;
		}
	}
	this.OutOfBounds = function()
	{
		if(this.x > (CanvasWidth))
		{
			return true;
		}
		else if(this.x < 0 - gameBallHeight)
		{
			return true;
		}
		return false;
	}
	this.CollideWithWalls = function()
	{
		if(this.y >= CanvasHeight-gameBallHeight || this.y <= 0)
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
		if(this.x - gameBallHeight == 0 || this.x - gameBallHeight == 1)
		{
			return(this.y >= LP.y && this.y <= LP.y+PaddleHeight)
		}
	}

	this.CollideRight = function()
	{
		if(this.x == (CanvasWidth - gameBallHeight-PaddleWidth) || this.x == (CanvasWidth - gameBallHeight-PaddleWidth) + 1)
		{
			return(this.y >= RP.y && this.y <= RP.y+PaddleHeight)

		}
	}

	this.Show = function()
	{
		fill(255,0,0);
		rect(this.x, this.y, gameBallHeight,gameBallHeight);
			// ellipse(this.x, this.y, gameBallHeight*1.5,gameBallHeight*1.5);

	}

}

