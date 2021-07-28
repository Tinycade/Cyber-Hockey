class Ball{
    constructor(x,y) {
        this.visible = true;
        this.x = x;
        this.y = y;
        this.speed = 4;
        this.radius = 20;
        this.angle = Math.PI;// Math.floor(Math.random() * 359);
        this.strokeColor = 'white';
        this.hasCollided = false;
    }
    update(dt){
        let radians = this.angle;
        this.x += Math.cos(radians) * this.speed;
        this.y += Math.sin(radians) * this.speed;


        //teleports objects back onto screen
        if (this.x < this.radius) {
            this.x = canvas.width;
        }
        if (this.x > canvas.width) {
            this.x = this.radius;
        }
        if (this.y < this.radius) {
            this.y = canvas.height;
        }
        if (this.y > canvas.height) {
            this.y = this.radius;
        }
    }

    resetPosition(){
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.speed = 4;
        console.log(this.x);
        //setTimeout(this.shootBall, 1000);
    }

    shootBall(){
        
        this.angle = Math.PI;
        this.speed = 4;
        console.log(this.x);
        //console.log('speed is ' + speed);
    }

    draw(ctx){
        ctx.save();
        ctx.translate(this.x, this.y);

        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();

        ctx.restore();
    }
}