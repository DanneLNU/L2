// physics.js

/**********************************************
 * Physics Simulation Module
 * Author Daniel A
 * Licence Open Source
 * Description: This module is responsible for simulating physics in 2D space.
 **********************************************/


/*=============================================
    1. Vector2D Class
    *========================================*/

class Vector2D {
    constructor(x, Y) {
        this.x = x
        this.y = Y
    }

    add(v) {
        return new Vector2D(this.x +v.x, this.y + v.y)
    }

    subtract(v) {
        return new Vector2D(this.x - v.x, this.y - v.y)
    }

    multiply(scalar) {
        return new Vector2D(this.x * scalar, this.y * scalar)
    }

    dot(v) {
        return this.x * v.x + this.y * v.y
    }

    magnitude() {
        return Math.hypot(this.x, this.y)
    }

    normalize() {
        const mag = this.magnitude()
        return mag === 0 ? new Vector2D(0, 0) : new Vector2D(this.x / mag, this.y / mag)
    }
}