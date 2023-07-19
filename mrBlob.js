class mrBlob {
    constructor(){
        this.wave = 0;                  // update blob shape movement (sin function)
        this.wave_speed = 0.1;          // wave update speed
        this.diameter = 300;            // diameter
        this.radius = this.diameter/2;  // radius
        this.bumps = 3;                 // number of "bumps" (better if integer)
        this.roughness = 10;            // how "wiggly" is the blob (smaller - smoother, larger - rougher)
        this.color = 'white';           // blob inner or outer color (depends on inverse)        
        this.inverse = 1;               // inverse = 0: the blob is filled, inverse = 1: the blob is empty (the outside is colored)
        this.blobX = 0;
        this.blobY = 0;
        this.enterFrom = 100;           // offset for entering from the bottom/side of the canvas
        this.rise_speed = 0.8;          // how fast does the blob move across the screen
        this.horizontal = 0;            // move horizontaly or vertically
        this.stop = 0;

        this.offset = 0;                      // the change in the general radius for each point in blob shape 
        this.r = this.radius + this.offset;   // new radius for each point in blob shape
        this.x = this.r * Math.cos(0);        // new point's X position
        this.y = this.r * Math.sin(0);        // new point's Y position
    }

    // pass new parameters to update the blob
    updateParams(new_wave_speed, new_rise_speed, new_diameter, new_bumps, new_roughness){
        if(!isNaN(new_wave_speed)){
            this.wave_speed = new_wave_speed;
        }

        if(!isNaN(new_rise_speed)){
            this.rise_speed = new_rise_speed;
        }

        if(!isNaN(new_diameter) && new_diameter > 0){
            this.diameter = new_diameter;
            this.radius = this.diameter/2;
            this.offset = 0;
            this.r = this.radius + this.offset;
            this.x = this.r * Math.cos(0);
            this.y = this.r * Math.sin(0);
        }

        if(!isNaN(new_bumps)){
            this.bumps = new_bumps;
        }

        if(!isNaN(new_roughness) && new_roughness > 0 ){
            this.roughness = new_roughness;
        }
    }

    // check if the blob is outside the canvas
    checkBoundries(screen_width, screen_height){
        // going up
        if(this.rise_speed > 0 && this.blobY < - this.radius){
            this.blobY = screen_height + 2*this.radius;
            this.enterFrom = Math.random()*screen_width*0.8 + screen_width*0.1;
        }

        // going down
        if(this.rise_speed < 0 && this.blobY > screen_height + this.radius){
            this.blobY = - 2*this.radius;
            this.enterFrom = Math.random()*screen_width*0.8 + screen_width*0.1;
        }

        // going left
        if(this.rise_speed > 0 && this.blobX < - this.radius){
            this.blobX = screen_width + 2*this.radius;
            this.enterFrom = Math.random()*screen_height*0.8 + screen_height*0.1;
        }

        // going right
        if(this.rise_speed < 0 && this.blobX > screen_width + this.radius){
            this.blobX = - 2*this.radius;
            this.enterFrom = Math.random()*screen_height*0.8 + screen_height*0.1;
        }
    }

    // pass new position to the blob
    updatePosition(newX, newY){
        this.blobX = newX;
        this.blobY = newY;
    }

    // update the sin function (blob's wavy shape)
    updateWave(){
        this.wave += this.wave_speed;
    }

    // switch between a cutout and a filled shape
    invert(){
        if(this.inverse){
            this.inverse = 0;
        } else {
            this.inverse = 1;
        }
    }

    // switch between horizontal and vertical movement
    switchDirection(){
        if(this.horizontal){
            this.horizontal = 0;
        } else {
            this.horizontal = 1;
        }
    }

    // stop or continue the updating of the shape and the movement
    stopPlay(){
        if(this.stop){
            this.stop = 0;
        } else {
            this.stop = 1;
        }
    }

    // draw the shape on the canvas with the passed context
    drawBlob(ctx){

        if(this.inverse){
            ctx.fillStyle = this.color;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fill();

            ctx.save();
            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillStyle = 'black';
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = this.color;
        }

        ctx.beginPath();

        let b = (Math.PI*2)/360;    // delta for the loop

        // clacuulate the first point on the sin function
        this.offset = this.roughness * Math.sin(b * this.bumps + Math.sin(b + this.wave));
        this.r = this.radius + this.offset;
        this.x = this.r * Math.cos(b) + this.blobX;
        this.y = this.r * Math.sin(b) + this.blobY;

        // clacuulate the rest of the points on the sin function
        for(let a = 2*b; a < Math.PI*2; a+=b){
            this.offset = this.roughness * Math.sin(a * this.bumps + Math.sin(a + this.wave));
            this.r = this.radius + this.offset;
            this.x = this.r * Math.cos(a) + this.blobX;
            this.y = this.r * Math.sin(a) + this.blobY;
            ctx.lineTo(this.x, this.y);
        }

        ctx.fill();
        ctx.closePath();
        ctx.restore();

    }

    // animate (update) the shape
    animateBlob(ctx){
      
        // update frames
        setInterval(() => {
            this.drawBlob(ctx);

            if(!this.stop){
                this.updateWave();
                if(this.horizontal){
                    this.updatePosition(this.blobX-this.rise_speed, (canvas.width/8)*Math.cos(this.wave/7) + this.enterFrom);
                } else {
                    this.updatePosition((canvas.height/8)*Math.cos(this.wave/7) + this.enterFrom, this.blobY-this.rise_speed);  
                }

                this.checkBoundries(canvas.width, canvas.height);
            }
              
        }, 20);
    }
}