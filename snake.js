var Snake = function(){
    this.x = 60;
    this.y = 80;
    this.xspeed = 1;
    this.yspeed = 0;
    this.length = 1;
    this.tail = [];

    this.eat = function(food){
        var distance = dist(food.x,food.y,this.x,this.y);
        if(distance<scl){
            this.length++;
            runningSound.stop();
            this.songPlay(eatSound,800); 
            return true;
        }
        return false;
    }
    
    this.update = function(){ 
        for(var i=0; i<this.tail.length-1; i++){
            this.tail[i] = this.tail[i+1];
        }
        this.tail[this.length-1] = createVector(this.x, this.y);
        this.x = (this.x+ width + this.xspeed*scl)%width;
        this.y = (this.y + height + this.yspeed*scl)%height;  
        this.death();    
    }

    this.death = function(){
        var head = this.tail[this.length -1];
        for(var i=0; i<this.tail.length-1; i++){
            var distance = dist(head.x,head.y,this.tail[i].x,this.tail[i].y);
            if(distance<scl){
             runningSound.stop();
             this.songPlay(deathSound, 1000); 
             this.reset();
            }
        }
    }

    this.reset = function(){
        snake = new Snake();       
    }

    this.show = function() {
        fill(0,255, 0);
        for(var i=0; i<this.tail.length; i++){
            rect(this.tail[i].x,this.tail[i].y,scl,scl);
        } 
    }

    this.songPlay = function(sound,time){
        sound.jump();
            sound.play();
            setTimeout(function(){
                sound.stop();
            }, time);
    }

    this.dir = function(xdir, ydir){
        this.xspeed = xdir;
        this.yspeed = ydir;
        this.update();
        this.show();
    }
}