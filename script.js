window.onload = function()
{
    var canvaswidth=900;
    var canvasheight=600;
    var blocsize=30;
    var ctx;
    var delay=200; 
    var snakee;
    var applee;
    var score;
    var widthInBlocks=canvaswidth/blocsize; //Nombre de block dans la largeur 
    var heightInBlocks=canvasheight/blocsize // Nombre de block dans la hauteur
    var timeout;

    
    init();
    function init()
    {
        var canvas=document.createElement('canvas');
        canvas.width=canvaswidth;
        canvas.height=canvasheight;
        canvas.style.border="30px solid gray";
        canvas.style.margin="50px auto";
        canvas.style.display="block";
        canvas.style.backgroundColor="#ddd";
        document.body.appendChild(canvas);
        ctx= canvas.getContext('2d'); 
        snakee=new snake([[6,4],[5,4],[4,4],[3,4],[2,4]],"right");
        applee= new Apple([10,10]);
        score=0;
        refreshCanvas();

    }
    
    function refreshCanvas()
    {
        snakee.advance();
        if(snakee.checkCollision())
        {
            gameover();
        }
        else{
            if(snakee.isEatingApple(applee))
                {
                    score++;
                    snakee.ateApple=true;
                    do{
                    applee.setNewposition();

                    }while(applee.isOnSnake(snakee))
                    // le serpent  à manger la pomme
                }
        ctx.clearRect(0,0,canvaswidth,canvasheight);
        drawScore();

        snakee.draw();
        applee.draw();

        timeout=setTimeout(refreshCanvas,delay);
        }
    }
        
    function gameover()
    {
        
        ctx.save();
        ctx.font="bold 70px sans-serif";
        ctx.fillStyle="#000";
        ctx.textAlign="center";
        ctx.textBaseline="middle";
        ctx.strokeStyle="white";
        ctx.lineWidth=5;
        //calculer le centre du canvas
        var centerX=canvaswidth/2;
        var centerY=canvasheight/2;       
        ctx.strokeText("Game over", centerX , centerY-180);
        ctx.fillText("Game over", centerX , centerY-180);

        ctx.font="bold 30px sans-serif";
        ctx.strokeText("Game over", centerX , centerY-120);

        ctx.fillText("Appuyez sur la touche espace pour rejouter",centerX,centerY-120);
        ctx.restore();
    }
        
    function restart()
    {
        
        snakee=new snake([[6,4],[5,4],[4,4],[3,4],[2,4]],"right");
        applee= new Apple([10,10]);
        score=0;
        clearTimeout(timeout);
        refreshCanvas();
    }
    function drawScore()
    {
        ctx.save();
        ctx.font="bold 200px sans-serif";
        ctx.fillStyle="gray";
        ctx.textAlign="center";
        ctx.textBaseline="middle";
        //calculer le centre du canvas
        var centerX=canvaswidth/2;
        var centerY=canvasheight/2;
        ctx.fillText(score.toString(), centerX , centerY);
        ctx.restore();   
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
        this.ateApple=false;
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
            if(!this.ateApple)
                {
                  this.body.pop();
                }
            else
                this.ateApple=false;
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
                    
                }
        };
        this.checkCollision = function()
        {
            var WallCollision= false;
            var SnakeCollision= false;
            
            var head = this.body[0];
            var rest =this.body.slice(1);
            
            var snakeX=head[0];
            var snakeY=head[1];
            
            var minX=0;
            var minY=0;
            
            var maxX=widthInBlocks-1;
            var maxY=heightInBlocks -1 ;
            
            var IsNotBerweenHorizentalWalls=snakeX<minX || snakeX>maxX;
            var IsNotBerweenVerticiallWalls=snakeY<minY || snakeY>maxY;
            
            if(IsNotBerweenHorizentalWalls||IsNotBerweenVerticiallWalls)
                {
                    WallCollision=true;
                }
            for(var i=0;i<rest.length;i++)
                {
                    if(snakeX===rest[i][0]&& snakeY===[i][1])
                        {
                            SnakeCollision=true;
                        }
                }
            return WallCollision||SnakeCollision;

        };
        this.isEatingApple= function(appleToEat)
        {
          var head=this.body[0];
            console.log(head);
            console.log(appleToEat.position[0]);
                        console.log(appleToEat.position[1]);

            if(head[0]===appleToEat.position[0] && head[1]===appleToEat.position[1])
                {
                    return true;
                }
            else 
                return false;
        };
        
    }
    
    
    function Apple(position)
    {
        this.position=position;
        this.draw = function()
        {
            //Enregister les anciennes couleurs du canvas
            ctx.save();
            ctx.fillStyle="#33cc33"; // Vert
            ctx.beginPath();
            
            var radius=blocsize/2;
            
            var x= this.position[0]* blocsize + radius;
            var y= this.position[1]* blocsize + radius;
            console.log(x);
            console.log(y);
            
            ctx.arc(x,y,radius,0,Math.PI*2,true);
            ctx.fill();

            ctx.restore();
        };
        
        this.setNewposition = function()
        {
         var newX=Math.round(Math.random()*(widthInBlocks-1));

         var newY=Math.round(Math.random()*(heightInBlocks-1));
        this.position=[newX,newY];    
        }
        
        this.isOnSnake = function(SnakeToCheck)
        {
            var isOnSnake = false; 
            
            console.log(SnakeToCheck.body[1][1]);
            for (var i=0; i< SnakeToCheck.body.length;i++)
                {
                    if (this.position[0]===SnakeToCheck.body[i][0] && this.position[1]===SnakeToCheck.body[i][1])
                        {
                            isOnSnake=true;
                        }
            
                }
            return isOnSnake;
        }
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

                    break;
                case 39 :
                    newDirection="right";
                    break;
                case 40 :
                    newDirection="down";
                break;
                case 32 :
                    restart();
                    return;
                break;
                    default:
                        return;
            }
        snakee.setDirection(newDirection);
    }
    
 
 
}
   