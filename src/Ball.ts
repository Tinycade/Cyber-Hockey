import * as PIXI from 'pixi.js';
import Vec2 from './Utils/Vec2';
import { GameObject } from './Utils/GenericTypes';
import Paddle from './Paddle';
 
class Ball implements GameObject {
  body: PIXI.Sprite;
  position: Vec2;
  center: Vec2;
  radius: number;
  forward: Vec2;
  speed: number;
  canCollide: boolean;
  
  appRef: PIXI.Application;
  
  constructor(x: number, y: number, appRef: PIXI.Application) {
    this.position = new Vec2(x, y);
    this.radius = 33;
    this.forward = new Vec2(-1, -1);
    this.forward.normalize();
    this.speed = 2;
    this.body = PIXI.Sprite.from('Assets/Ball_Sprite.png');
    this.body.anchor.set(0.5);
    this.canCollide = true;

    this.appRef = appRef;

    this.body.x = this.position.x;
    this.body.y = this.position.y;
  }

  syncPositions() {
    // sync up things
    this.body.x = this.position.x;
    this.body.y = this.position.y;
  }

  reflect(paddle: Paddle) {
    this.canCollide = false;

    const circleVec = Vec2.sub(this.position, paddle.capA);
    const proj = paddle.axis.dot(circleVec) / paddle.length;
    const closestPoint = paddle.axis.clone().normalize().scale(proj);
    const normal = Vec2.sub(circleVec, closestPoint).normalize();

    const dot = this.forward.dot(normal);
    this.forward.set(
      this.forward.x - 2 * dot * normal.x,
      this.forward.y - 2 * dot * normal.y
    );
    this.forward.normalize()
  }

  resetCollision() {
    this.canCollide = true;
  }

  update(dt: number) {
    this.position.addScaled(this.forward, this.speed * dt);

    if (this.position.x > this.appRef.screen.width + 10) {
      this.position.x = -35;
    }

    if (this.position.y > this.appRef.screen.height + 10) {
      this.position.y = -35;
    }

    if (this.position.x < -41) {
      this.position.x = this.appRef.screen.width + 10;
    }

    if (this.position.y < -41) {
      this.position.y = this.appRef.screen.height + 10;
    }

    this.syncPositions();
  }
}

export default Ball;