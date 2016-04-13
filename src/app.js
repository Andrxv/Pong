var HelloWorldLayer = cc.Layer.extend({
    player1:null,    
    player2:null,    
    ball:null,
    sco1:0, //score player 1
    sco2:0, //score player 2
    po1:null, //points player 1
    po2:null, // points player 2
    move_x:0,
    move_y:0,
    speed:0,
    
    //Pong Game
    start:function(){
        
        var size = cc.winSize;
        var color = cc.color(100,100,100);
        var white = cc.color(255,255,255);
        
        this.po1 = new PointsLabel();
        this.po1.setPosition(size.width * 0.4, size.height - (size.height * 0.10));
        this.addChild(this.po1,0);
        
        this.po2 = new PointsLabel();
        this.po2.setPosition(size.width - (size.width * 0.4), size.height - (size.height * 0.10));
        this.addChild(this.po2,0);
        
        var middle =  new cc.DrawNode();
        middle.drawSegment(cc.p(size.width/2,0),cc.p(size.width/2,size.height),3,color);
        this.addChild(middle,0);
    
        this.move_x = this.random(1,3);
        this.move_y = this.random(1,3);
        this.speed = this.random(0.0001,0.001);
        
        this.player1 = new cc.Sprite(res.player_png);
        this.player1.setPosition(size.width * 0.1,size.height / 2);
        this.addChild(this.player1, 1);

        this.player2 = new cc.Sprite(res.player_png);
        this.player2.setPosition(size.width -(size.width * 0.1),size.height / 2);
        this.addChild(this.player2, 1);        

        
        this.ball = new cc.Sprite(res.ball_png);
        this.ball.setPosition(size.width / 2, this.random(15, size.height - 80));
        this.addChild(this.ball, 1);
    


    },
    
    
    controls: function(keyCode, event){
        
         random: function getRandomInt(min, max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
	},
        
        var target = event.getCurrentTarget();
        var size = cc.winSize;
            
        if(keyCode == cc.KEY.w){
            if(target.player1.getPositionY() + 30 < size.height - 80)
                target.player1.setPosition(target.player1.getPositionX(), target.player1.getPositionY() + 40);
        }
        
        if(keyCode == cc.KEY.s){
            if(target.player1.getPositionY() - 30 > size.height/2 - size.height/2 + 40)
                target.player1.setPosition(target.player1.getPositionX(), target.player1.getPositionY() - 40);
        }
        

        if(keyCode == cc.KEY.up){
            if(target.player2.getPositionY() + 30 < size.height - 80)
                target.player2.setPosition(target.player2.getPositionX(), target.player2.getPositionY() + 40);
        }
        
        if(keyCode == cc.KEY.down){
            if(target.player2.getPositionY() - 30 > size.height/2 - size.height/2 +40)
                target.player2.setPosition(target.player2.getPositionX(), target.player2.getPositionY() - 40);
        }
    },
    
    
    
    moveBall: function(){
        
        var position = this.ball.getPosition();
        
        if(position.y <= 20 || position.y >= cc.winSize.height - 40){
            this.move_y *= -1;
            
        } else if(position.x <= 0 ){
        	
            this.sco2++;
            this.reset();
            
            
        } else if(position.x >= cc.winSize.width){
        	
            this.sco1++;
            this.reset();
            
            
        } else if (cc.rectIntersectsRect(this.ball.getBoundingBox(), this.player1.getBoundingBox())){
            this.move_x *= -1;
        }
        
        else if(cc.rectIntersectsRect(this.ball.getBoundingBox(), this.player2.getBoundingBox()))
            this.move_x *= -1;       
        }
        
        var newX = this.ball.getPosition().x + this.move_x;
        var newY = this.ball.getPosition().y + this.move_y;
        this.ball.setPosition(newX, newY);
        
         reset:function(){
        var size = cc.winSize;
        this.speed = this.random(0.0001,0.001);
        this.ball.setPosition(size.width / 2, this.random(0, size.height - 80));
        this.move_x = this.random(1,3);
        this.move_y = this.random(1,3);
        this.po1.setString(this.sco1);
        this.po2.setString(this.sco2);
    },
   
    
    ctor:function () {
        this._super();
        this.initializer();
      
        this.schedule(this.moveBall, this.speed);
        
		cc.eventManager.addListener({
			event: cc.EventListener.KEYBOARD,
			onKeyPressed:  this.moveControls
		}, this);
        
        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

