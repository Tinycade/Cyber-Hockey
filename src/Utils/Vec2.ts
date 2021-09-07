import { NumberLiteralType } from "typescript";

class Vec2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  clone(): Vec2 {
    return new Vec2(this.x, this.y);
  }

  copy(v: Vec2): Vec2 {
    this.x = v.x;
    this.y = v.y;

    return this;
  }

  set(x: number, y: number): Vec2 {
    this.x = x;
    this.y = y;

    return this;
  }

  add(v: Vec2): Vec2 {
    this.x += v.x;
    this.y += v.y;

    return this;
  }

  addScaled(v: Vec2, s: number): Vec2 {
    this.x += v.x * s;
    this.y += v.y * s;

    return this;
  }

  sub(v: Vec2): Vec2 {
    this.x -= v.x;
    this.y -= v.y;

    return this;
  }

  subScaled(v: Vec2, s: number): Vec2 {
    this.x -= v.x * s;
    this.y -= v.y * s;

    return this;
  }

  scale(s: number): Vec2 {
    this.x *= s;
    this.y *= s;

    return this;
  }

  mag(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  magSq(): number {
    return (this.x * this.x + this.y * this.y);
  }

  normalize(): Vec2 {
    const m = this.mag();
    this.x /= m;
    this.y /= m;

    return this;
  }

  getAngle(): number {
    return Math.atan2(this.y, this.x);
  }

  // Sets a vector to point at an angle while maintaining the same magnitude
  setFromAngle(angle: number) {
    const m = this.mag();

    // this creates a unit vector from the angle
    this.x = Math.cos(angle) * m;
    this.y = Math.sin(angle) * m;
    return this;
  }

  rotate(angle: number): Vec2 {
    const x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
    const y = this.x * Math.sin(angle) + this.y * Math.cos(angle);
    this.x = x;
    this.y = y;

    return this;
  }

  dot(v: Vec2): number {
    return (this.x * v.x) + (this.y * v.y);
  }
}

export default Vec2;