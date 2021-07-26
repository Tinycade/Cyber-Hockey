class Wall {
    constructor(p1, p2, p3, p4) {
        this.point1 = p1;
        this.point2 = p2;
        this.point3 = p3;
        this.point4 = p4;
        this.center = this.getMidpoint(this.point1, this.point4)
        this.updateLength(this.point1, this.point3);
        this.updateLength(this.point2, this.point4);
    }
    // setStart(p) {
    //     this.point1 = p;
    //     this.updateLength();
    // }
    // setEnd(p) {
    //     this.point2 = p;
    //     this.updateLength();
    // }
    updateLength(p1, p2) {
        this.axis = Vec2.sub(p1, p2);
        this.length = p1.dist(p2);
        this.lengthSq = p1.dist2(p2);
    }
    getReflection(p, fwd, p1) {
        const circleVec = Vec2.sub(p1, p);
        const proj = this.axis.dot(circleVec) / this.axis.mag();
        const closestPoint = this.axis.clone().normalize().scale(proj);
        const normal = Vec2.sub(circleVec, closestPoint).normalize();
        // reflection = fwd - 2(fwd . n)n
        return Vec2.sub(Vec2.scale(normal, 2 * fwd.dot(normal)), fwd);
    }
    // just the center and radius
    checkCircleCollision(p, r, p1, p2) {
        const rSq = r * r;
        // Makes sure it's not off the point2 of the segment
        if (p1.dist2(p) < rSq + this.lengthSq && p2.dist2(p) < rSq + this.lengthSq) {
            // If the circle is close enough to the line to collide
            const circleVec = Vec2.sub(p1, p);
            const proj = this.axis.dot(circleVec) / this.axis.mag();
            const closestPoint = this.axis.clone().normalize().scale(proj);
            if (closestPoint.dist2(circleVec) < rSq) return true;
        }
        // Otherwise no
        return false;
    }

    getMidpoint(p1, p2){
        var newX = (p1.x + p2.x) / 2;
        var newY = (p1.y + p2.y) / 2;
        var midpoint = new Vec2(newX, newY);
        return midpoint;
    }

    rotate(value){

        var v1 = Vec2.sub(this.center, this.point1);
        var v2 = Vec2.sub(this.center, this.point2);
        var v3 = Vec2.sub(this.center, this.point3);
        var v4 = Vec2.sub(this.center, this.point4);

        this.point1 = Vec2.rotate(v1, value).add(this.center);
        this.point2 = Vec2.rotate(v2, value).add(this.center);
        this.point3 = Vec2.rotate(v3, value).add(this.center);
        this.point4 = Vec2.rotate(v4, value).add(this.center);
        this.updateLength(this.point1, this.point3);
        this.updateLength(this.point2, this.point4);
        // this.center = this.getMidpoint();
    }

    translate(newDir){
        this.point1 += newDir;
        this.point2 += newDir;
        this.point3 += newDir;
        this.point4 += newDir;
    }

    update(dt) {

        var ballPos = new Vec2(ball.x, ball.y);
        //console.log(ballPos);
        if(this.checkCircleCollision(ballPos, ball.radius, this.point1, this.point3) && ball.hasCollided == false)
        {
            console.log('hit');

            //end game!
            ball.resetPosition();
        } else if(this.checkCircleCollision(ballPos, ball.radius, this.point2, this.point4) && ball.hasCollided == false)
        {
            console.log('reflection');
            ball.hasCollided = true;
            setTimeout(() => {  ball.hasCollided = false; }, 75);

            var fwd = Vec2.fromAngle(ball.angle);
            var newDir = this.getReflection(ballPos, fwd, this.point1);

            ball.angle = Math.atan2(newDir.y, newDir.x);
        }
    }

    draw(ctx) {


        ctx.beginPath();

        ctx.moveTo(this.point1.x, this.point1.y);
        ctx.lineTo(this.point3.x, this.point3.y);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();

        ctx.moveTo(this.point2.x, this.point2.y);
        ctx.lineTo(this.point4.x, this.point4.y);
        ctx.strokeStyle = "#add8e6";
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.closePath();

        ctx.restore();
    }

}