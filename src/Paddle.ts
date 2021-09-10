import * as PIXI from 'pixi.js';
import Vec2 from './Utils/Vec2';
import { lerp } from './Utils/MathUtils';
import { GameObject } from './Utils/GenericTypes';
import Ball from './Ball';

class Paddle implements GameObject {
  body: PIXI.Sprite;
  pointABody: PIXI.Sprite;
  pointBBody: PIXI.Sprite;
  position: Vec2;
  pointA: Vec2;
  pointB: Vec2;
  capA: Vec2;
  capB: Vec2;
  axis: Vec2;

  target: Vec2; //target position
  // marker: any;
  rotation: number;
  rotVec: Vec2;
  length: number;
  lengthSq: number;

  constructor(x: number, y: number) {
    this.position = new Vec2(x, y);
    this.target = new Vec2(x, y);
    this.pointA = new Vec2(0, 110);
    this.pointB = new Vec2(0, -110);
    this.capA = new Vec2(this.position.x, this.position.y);
    this.capB = new Vec2(this.position.x, this.position.y);
    this.axis = new Vec2(0, 0);
    this.rotation = 1;
    this.rotVec = new Vec2(0, 0);
    this.length = 220;
    this.lengthSq = this.length * this.length;

    this.body = PIXI.Sprite.from('Assets/Paddle_Sprite.png');
    this.body.anchor.set(0.5);

    this.syncPositions();
  }

  syncPositions() {
    this.body.x = this.position.x;
    this.body.y = this.position.y;

    // Angle is also offset bc sprite orientation
    this.pointA.setFromAngle(this.rotation + Math.PI / 2);
    this.pointB.set(-this.pointA.x, -this.pointA.y);

    this.capA.set(this.pointA.x + this.position.x, this.pointA.y + this.position.y);
    this.capB.set(this.pointB.x + this.position.x, this.pointB.y + this.position.y);

    this.axis.set(this.capA.x - this.capB.x, this.capA.y - this.capB.y);
  }

  checkBallCollision(ball: Ball) {
    const rSq = ball.radius * ball.radius;
    // Makes sure it's not off the point2 of the segment
    if (this.capA.dist2(ball.position) < rSq + this.lengthSq &&
      this.capB.dist2(ball.position) < rSq + this.lengthSq) {
        // If the circle is close enough to the line to collide
        const circleVec = Vec2.sub(this.capA, ball.position);
        const proj = this.axis.dot(circleVec) / this.axis.mag();
        const closestPoint = this.axis.clone().normalize().scale(proj);
        if (closestPoint.dist2(circleVec) < rSq) return true;
    }
    // Otherwise no
    return false;
  }

  setTarget(t: Vec2) {
    this.target.copy(t);
  }

  update(dt: number) {
    this.body.rotation = this.rotation;

    this.position.set(
      lerp(this.position.x, this.target.x, 0.8),
      lerp(this.position.y, this.target.y, 0.8)
    );

    this.syncPositions();
  }
}

export default Paddle;
