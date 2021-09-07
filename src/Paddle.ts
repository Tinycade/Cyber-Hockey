import * as PIXI from 'pixi.js';
import Vec2 from './Utils/Vec2';
import { GameObject } from './Utils/GenericTypes';

class Paddle implements GameObject {
  body: PIXI.Sprite;
  pointABody: PIXI.Sprite;
  pointBBody: PIXI.Sprite;
  position: Vec2;
  pointA: Vec2;
  pointB: Vec2;
  // marker: any;
  rotation: number;

  constructor(x: number, y: number) {
    this.position = new Vec2(x, y);
    this.pointA = new Vec2(0, 110);
    this.pointB = new Vec2(0, -110);
    this.rotation = 0.25;

    this.body = PIXI.Sprite.from('Assets/Paddle_Sprite.png');
    this.body.anchor.set(0.5);
    // this.pointABody = PIXI.Sprite.from('Assets/Debug/Circle.png');
    // this.pointABody.anchor.set(0.5);
    // this.pointBBody = PIXI.Sprite.from('Assets/Debug/Circle.png');
    // this.pointBBody.anchor.set(0.5);

    this.syncPositions();
  }

  syncPositions() {
    this.body.x = this.position.x;
    this.body.y = this.position.y;

    // Angle is also offset bc sprite orientation
    this.pointA.setFromAngle(this.rotation + Math.PI / 2);
    this.pointB.set(-this.pointA.x, -this.pointA.y);

    // debug bodies
    // this.pointABody.x = this.pointA.x + this.position.x;
    // this.pointABody.y = this.pointA.y + this.position.y;
    // this.pointBBody.x = this.pointB.x + this.position.x;
    // this.pointBBody.y = this.pointB.y + this.position.y;
  }

  update(dt: number) {
    this.body.rotation = this.rotation;
    this.syncPositions();
  }
}

export default Paddle;
