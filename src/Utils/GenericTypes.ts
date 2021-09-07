import * as PIXI from 'pixi.js';
import Vec2 from './Vec2';

export interface GameObject {
  body: PIXI.DisplayObject;
  position: Vec2;
  update: (dt: number) => void;
}
