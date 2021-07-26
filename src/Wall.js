class Wall {
    constructor(p1, p2) {
        this.start = p1;
        this.end = p2;
        this.updateLength();
    }
    setStart(p) {
        this.start = p;
        this.updateLength();
    }
    setEnd(p) {
        this.end = p;
        this.updateLength();
    }
    updateLength() {
        this.axis = Vec2.sub(this.start, this.end);
        this.length = this.start.dist(this.end);
        this.lengthSq = this.start.dist2(this.end);
    }
    getReflection(p, fwd) {
        const circleVec = Vec2.sub(this.start, p);
        const proj = this.axis.dot(circleVec) / this.axis.mag();
        const closestPoint = this.axis.clone().normalize().scale(proj);
        const normal = Vec2.sub(circleVec, closestPoint).normalize();
        // reflection = fwd - 2(fwd . n)n
        return Vec2.sub(Vec2.scale(normal, 2 * fwd.dot(normal)), fwd);
    }
    // just the center and radius
    checkCircleCollision(p, r) {
        const rSq = r * r;
        // Makes sure it's not off the end of the segment
        if (this.start.dist2(p) < rSq + this.lengthSq && this.end.dist2(p) < rSq + this.lengthSq) {
            // If the circle is close enough to the line to collide
            const circleVec = Vec2.sub(this.start, p);
            const proj = this.axis.dot(circleVec) / this.axis.mag();
            const closestPoint = this.axis.clone().normalize().scale(proj);
            if (closestPoint.dist2(circleVec) < rSq) return true;
        }
        // Otherwise no
        return false;
    }

    update(dt) {
        
        var ballPos = new Vec2(ball.x, ball.y);
        //console.log(ballPos);
        if(this.checkCircleCollision(ballPos, ball.radius))
        {
            console.log('ball wall collision');
            var fwd = Vec2.fromAngle(ball.angle);
            var newDir = this.getReflection(ballPos, fwd);

            ball.angle = newDir;
        }
    }

    draw(ctx) {
        ctx.beginPath();
        //ctx.translate(this.position.x, player.position.y);

        ctx.moveTo(this.start.x, this.start.y);    // Move the pen to (30, 50)
        ctx.lineTo(this.end.x, this.end.y);  // Draw a line to (150, 100)
        ctx.strokeStyle = "#add8e6";
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.closePath();

        ctx.restore();
    }

}