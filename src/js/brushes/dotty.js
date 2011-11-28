function dotty( context )
{
	this.init( context );
}

dotty.prototype =
{
	context: null,

  npoints: null,
	points: null,

	init: function( context )
	{
		this.context = context;
		this.npoints = 0;
		this.points = new Array();
	},

	destroy: function()
	{
	},

	strokeStart: function( mouseX, mouseY )
	{
		this.points.push( [ mouseX, mouseY ] );
	  this.npoints = 1;
	},

	stroke: function( mouseX, mouseY )
	{
	  var lastX,lastY,dx,dy,speedSq,speed;
	  
	  // Remember this new mouse position.
		this.points.push( [ mouseX, mouseY ] );
		this.npoints++;

    // Assign a speed value to the current move movement based on a weighted average of the
    // recent line segment lengths.
    lastX = this.points[this.npoints-2][0];
    lastY = this.points[this.npoints-2][1];
    dx = mouseX - lastX;
    dy = mouseY - lastY;
    speedSq = dx*dx + dy*dy;
    if(this.npoints > 2) {
      dx = lastX - this.points[this.npoints-3][0];
      dy = lastY - this.points[this.npoints-3][1];
      speedSq = (4*speedSq + dx*dx + dy*dy)/5;
    }
    speed = Math.sqrt(speedSq);
    
    // Initialize canvas drawing options.
		this.context.lineWidth = BRUSH_SIZE;	
		this.context.strokeStyle = "rgba(" + COLOR[0] + ", " + COLOR[1] + ", " + COLOR[2] + ", " + 0.5 * BRUSH_PRESSURE + ")";

    // Draw a circle at the current mouse coordinates with a radius scaled to the speed.
		this.context.beginPath();
		this.context.arc(mouseX,mouseY,speed,0,2*Math.PI,true);
		this.context.stroke();

		this.prevMouseX = mouseX;
		this.prevMouseY = mouseY;
	},

	strokeEnd: function()
	{
		
	}
}
