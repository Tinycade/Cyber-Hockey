import * as PIXI from 'pixi.js';
import Ball from './Ball';
import Paddle from './Paddle';

let app: any;
let ball: Ball;
let paddle1: Paddle;

function update(delta: number) {
  ball.update(delta);
  paddle1.update(delta);
}

function run() {
  app = new PIXI.Application({ antialias: true });
  document.body.appendChild(app.view);

  ball = new Ball(0, 0, app);
  paddle1 = new Paddle(100, 200);

  // setup
  app.stage.addChild(ball.body);
  app.stage.addChild(paddle1.body);
  app.stage.addChild(paddle1.pointABody);
  app.stage.addChild(paddle1.pointBBody);
  app.ticker.add(update);
}

window.onload = run;