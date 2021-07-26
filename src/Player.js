class PlayerController {
    constructor(x, y, radius, speed, rotation, mode) {
        this.position = new Vec2(x, y);
        this.radius = radius;
        this.fwd = Vec2.fromAngle(rotation);
        this.speed = speed;
        this.mode = mode;
    }

    update(dt) {

    }

    rotate(angle){
        this.fwd.rotate(angle);
        //document.querySelector("#player").style.transform = "rotate(" + angle + "deg)";
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.fwd.getAngle());

        //draw green part
        ctx.beginPath();
        ctx.arc(0, 0, 50, 0, Math.PI, false);
        ctx.closePath();
        ctx.lineWidth = 5;
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.strokeStyle = '#550000';
        ctx.stroke();

        //draw red part
        ctx.beginPath();
        ctx.rect(-50, -30, 100, 30);
        ctx.closePath();
        ctx.lineWidth = 5;
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.strokeStyle = '#550000';
        ctx.stroke();


        ctx.restore();
    }
}