class Ball{
    constructor(x,y) {
        this.visible = true;
        this.x = x;
        this.y = y;
        this.speed = 6;
        this.radius = 20;
        this.angle = (Math.floor(Math.random() * 359)) * (Math.PI/180);
        this.strokeColor = 'white';
        this.hasCollided = false;
        this.trail = [];
        this.trailTimer = 15;
    }
    update(dt){
        let radians = this.angle;
        this.x += Math.cos(radians) * this.speed;
        this.y += Math.sin(radians) * this.speed;

        this.trailTimer -= dt;
        if (this.trailTimer < 0) {
            this.trail.push(new Vec2(this.x, this.y));
            this.trailTimer = 20
        }
        if (this.trail.length > 14) {
            this.trail.shift();
        }


        //teleports objects back onto screen
        if (this.x < -this.radius * 1.2) {
            this.x = canvas.width + this.radius -2;
        }
        if (this.x > canvas.width + this.radius) {
            this.x = 2-this.radius;
        }
        if (this.y < -this.radius * 1.2) {
            this.y = canvas.height + this.radius -2;
        }
        if (this.y > canvas.height + this.radius) {
            this.y = 2 - this.radius;
        }
    }

    resetPosition(){
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.speed = 0;
        setTimeout(this.shootBall.bind(this), 1000);
    }

    shootBall(){
        
        this.angle = (Math.floor(Math.random() * 359)) * (Math.PI/180);
        this.speed = 6;
        //console.log(this.x);
        //console.log('speed is ' + speed);
    }

    draw(ctx){
        this.trail.forEach((t, i) => {
            ctx.save();
            ctx.translate(t.x, t.y);

            ctx.beginPath();
            ctx.arc(0, 0, this.radius / 3 + i * 0.9, 0, Math.PI * 2, false);
            ctx.fillStyle = `rgb(${(20 - i) / 20 * 70 + 10}, ${(20 - i) / 20 * 70 + 10}, ${(20 - i) / 20 * 100 + 10})`;
            ctx.fill();
            ctx.closePath();

            ctx.restore();
        });

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