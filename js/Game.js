class Game{
    constructor(){
    }
    getState(){
        var stateref=database.ref("gameState");
        stateref.on("value",function(data){
            gameState=data.val();
        })
    }

    update(state){
        database.ref("/").update({
            gameState:state
        })
    }
    start(){
        if (gameState===0){
            player=new Player();
            player.getCount();
            form=new Form();
            form.display(); 
        }
        car1=createSprite(100,200);
        car1.addImage(car1img)
        car2=createSprite(300,200);
        car2.addImage(car2img)
       // car3=createSprite(500,200);
       // car4=createSprite(700,200);
        cars=[car1,car2];
        
    }
    play(){
        form.hide();
        player.getCarsAtEnd();
        textSize(30);
        text("Start Game",120,100)
        Player.getPlayerInfo();

        if(allPlayers!= undefined){
            background(ground);
            image(track,0,-displayHeight*4,displayWidth,displayHeight*5);
            var index=0;
            var x=200
            var y
            for(var plr in allPlayers){
                index=index+1;
                x=x+200
                y=displayHeight-allPlayers[plr].distance;
                cars[index-1].x=x;
                cars[index-1].y=y;
                if(index===player.index){
                    stroke(10);
                    fill("purple");
                    ellipse(x,y,60,60);
                    camera.position.x=displayWidth/2;
                    camera.position.y=cars[index-1].y;
                }
            }
        }
        if(keyDown(UP_ARROW)&&player.index!=null){
            player.distance=player.distance+20;
            player.update();
        }
        if(player.distance>5180){
            gameState=2;
            player.rank=player.rank+1;
            Player.updateCarsAtEnd(player.rank);
        }
        
        drawSprites();
    }
    end(){
        var messages=createElement("H2");
        messages.html("CONGRAGULATIONS "+player.name+" your rank is: "+player.rank);
        messages.position(displayWidth/2-70,displayHeight/4);    }
}