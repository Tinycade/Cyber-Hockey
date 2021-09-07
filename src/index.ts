import * as PIXI from 'pixi.js';
import Ball from './Ball';
import Paddle from './Paddle';

let app: any;
let ball: Ball;
let paddle1: Paddle;

function update(delta: number) {
  ball.update(delta);
  paddle1.update(delta);

  // Handle ball collision
  if (paddle1.checkBallCollision(ball)) {
    // automatically turns off paddle collision and sets new movement angle
    ball.reflect(paddle1);
  } else {
    // enables ball to collide with a player again
    ball.resetCollision()
  }
}

function run() {
  app = new PIXI.Application({ antialias: true });
  document.body.appendChild(app.view);

  ball = new Ball(0, 0, app);
  paddle1 = new Paddle(400, 200);

  // setup
  app.stage.addChild(ball.body);
  app.stage.addChild(paddle1.body);
  app.ticker.add(update);
}

window.onload = run;