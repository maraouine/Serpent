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
        snakee=new snake([[6,4],[5,4],[4,4]]);
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
   
    function snake(body)
    {
        this.body=body;
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
            nextPosition[0]+=1;
            this.body.unshift (nextPosition);
            this.body.pop();
        };
        
    }
}