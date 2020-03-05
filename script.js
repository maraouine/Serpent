window.onload = function()
{
    var canvaswidth=900;
    var canvasheight=500;
    var blocsize=30;
    var ctx;
    var delay=100; 
    var xCorrd=0;
    var yCorrd=0;
    var snakee;
    
    init();
    function init()
    {
        var canvas=document.createElement('canvas');
        canvas.width=canvaswidth;
        canvas.height=canvasheight;
        canvas.style.border="1px solid";
        document.body.appendChild(canvas);
        ctx= canvas.getContext('2d'); 
        snakee=new snake([[6,4],[5,4],[4,4]],"right");
        refreshCanvas();

    }
    
    function refreshCanvas()
    {
    
        ctx.clearRect(0,0,canvaswidth,canvasheight);
        snakee.draw();
        snakee.advance();
        setTimeout(refreshCanvas,delay);
    }
    
    function drawBlock (ctx,position)
    {
        var x = position[0] * blocsize;
        var y = position[1] * blocsize;
        ctx.fillRect(x,y,blocsize,blocsize);
        
    }
   
    
    /*Construteur*/
    
    function snake(body,direction)
    {
        this.body=body;
        this.direction=direction;
        this.draw=function()
        {
          ctx.save();
          ctx.fillStyle="#ff0000";
          for(var i=0;i<this.body.length;i++)
              {
                  drawBlock(ctx,this.body[i])
              }
            ctx.restore();
          
        };
        this.advance=function()
        {
            var nextPosition = this.body[0].slice();
            
            console.log(this.direction);
            switch (this.direction)
                {
                    
                    case "left":
                        nextPosition[0]-=1;

                        break;
                    case "right":
                        nextPosition[0]+=1;
                        break;
                    case "down":
                         nextPosition[1]+=1;

                        break;
                    case "up":
                         nextPosition[1]-=1;
                        break;
                    default:
                        throw("invalid direction");
                }
            this.body.unshift (nextPosition);
            this.body.pop();
        };
        
        this.setDirection = function(newDirection)
        {
            
            var allowedDirection;
            switch (this.direction)
                {
                    case "left":
                    case "right":
                        allowedDirection=["up","down"];
                    break;
                    case "down":
                    case "up":
                     allowedDirection=["left","right"];
                        break;
                    default:
                        throw("invalid direction");
                        
                }

            console.log(allowedDirection.indexOf(newDirection));
            if(allowedDirection.indexOf(newDirection) > -1)
                {
                    this.direction=newDirection;
                    
                    console.log(this.direction);
                }
        };
        
    }
    document.onkeydown= function handlekeydown(e)
    {
        var key =e.keyCode;
        var newDirection;
        
        switch(key)
            {
                case 37 :
                    newDirection="left";
                    console.log(key);
                    break;
                case 38 :
                    newDirection="up";
                                        console.log(key);

                    break;
                case 39 :
                    newDirection="right";
                                        console.log(key);

                    break;
                case 40 :
                    newDirection="down";
                                        console.log(key);

                break;
                    default:
                        return;
            }
        snakee.setDirection(newDirection);
    }
    
 
}
   