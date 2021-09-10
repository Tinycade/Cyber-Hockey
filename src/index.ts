// @ts-ignore
import Beholder from 'beholder-detection';
// ^^^ ignoring types for now
import * as PIXI from 'pixi.js';
import Ball from './Ball';
import Paddle from './Paddle';
import Vec2 from './Utils/Vec2';
import { map } from './Utils/MathUtils';

let app: any;
let ball: Ball;
let paddle1: Paddle;
let mRef: any;
let m1: any;
let m2: any;

// working vectors so I don't need to create new ones every frame
const mVec = new Vec2(0, 0);
const refVec = new Vec2(0, 0);

function update(delta: number) {
  Beholder.update();
  ball.update(delta);
  paddle1.update(delta);

  if (mRef.present) refVec.set(mRef.center.x, mRef.center.y);
  if (m1.present) {
    mVec.set(m1.center.x, m1.center.y);
    mVec.sub(refVec);
    // x: 139 -> 78
    // y: -60 -> -90
    mVec.set(
      map(78, 140, app.screen.width / 2, app.screen.width, mVec.x),
      map(-60, -120, 0, app.screen.height, mVec.y),
    );

    paddle1.setTarget(mVec);
  }

  // Handle ball collision
  if (paddle1.checkBallCollision(ball)) {
    // automatically turns off paddle collision and sets new movement angle
    ball.reflect(paddle1);
  } else {
    // enables ball to collide with a player again
    ball.resetCollision();
  }
}

function run() {
  app = new PIXI.Application({ antialias: true });
  document.body.appendChild(app.view);
  Beholder.init('#beholder-root', { overlay_params: { present: true }, feed_params: { brightness: 0 }, camera_params: { rearCamera: true, torch: true, videoSize: 0 } });


  ball = new Ball(0, 0, app);
  paddle1 = new Paddle(400, 200);
  mRef = Beholder.getMarker(0);
  m1 = Beholder.getMarker(1);
  m2 = Beholder.getMarker(2);

  // setup
  app.stage.addChild(ball.body);
  app.stage.addChild(paddle1.body);
  app.ticker.add(update);
}

window.onload = run;