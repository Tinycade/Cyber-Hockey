class Ball{
    constructor(x,y,radius) {
        this.visible = true;
        this.x = x;
        this.y = y;
        this.speed = 3;
        this.radius = radius || 50;
        this.angle = Math.floor(Math.random() * 359);
        this.strokeColor = 'white';
    }
    update(dt){
        let radians = this.angle / Math.PI * 180;
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

        if(CircleCollision(this.x, this.y, this.radius, 
            player.position.x, player.position.y, player.radius))
            {
                ctx.fillStyle = 'black';
                ctx.font = '50px Arial';
                ctx.fillText("GAME OVER", canvas.width / 2 - 150, canvas.height / 2);
                console.log("collision");
            }
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