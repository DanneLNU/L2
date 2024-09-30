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

    cross(v) {
        return this.x * v.y - this.y * v.x
    }

    magnitude() {
        return Math.hypot(this.x, this.y)
    }

    normalize() {
        const mag = this.magnitude()
        return mag === 0 ? new Vector2D(0, 0) : new Vector2D(this.x / mag, this.y / mag)
    }

    rotate(angle) {
        const cos = Math.cos(angle)
        const sin = Math.sin(angle)
        return new Vector2D(this.x * cos - this.y * sin, this.x * sin + this.y * cos)
    }
}



/*=============================================
    2. Shape Classes
    *========================================*/

class Shape {
    constructor(type) {
        this.type = type
    }

    calculateInertia(mass) {
        throw new Error('calculatedInertia() must be implemented by subclasses')
    }
}

class Circle extends Shape {
    constructor(radius) {
        super('circle')
        this.radius = radius
    }

    calculateInertia(mass) {
        return 0.5 * mass * this.radius * this.radius
    }

    containsPoint(point, position) {
        const distance = point.subtract(position).magnitude()
        return distance <= this.radius
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super('rectangle')
        this.width = width
        this.height = height
    }

    calculateInertia(mass) {
        return (mass * (this.width ** 2 + this.height ** 2) / 12)
    }

    containsPoint(point, position, angle = 0) {
        const localPoint = point.subtract(position).rotate(-angle)
        const halfWidth = this.width / 2
        const halfHeight = this.height / 2

        return (
            localPoint.x >= -halfWidth &&
            localPoint.x <= halfWidth &&
            localPoint.y >= -halfHeight &&
            localPoint.y <= halfHeight
        )
    }
}

class Polygon extends Shape {
    constructor(vertices) {
        super('polygon')
        this.vertices = vertices
        this.calculateCentroid()
    }

    calculateCentroid() {
        let centroid = new Vector2D(0, 0)
        this.vertices.forEash((vertex) => {
            centroid = centroid.add(vertex)
        })
        this.centroid = centroid.multiply(1 / this.vertices.length)
    }

    calculateInertia(mass) {
        //placeholder for now...
        //dont know yet how to calculate the inertia of a polygon
        return mass
    }

    containsPoint(point, position, angle = 0) {
        const localPoint = point.subtract(position).rotate(-angle)
        let isInside = false
        const n = this.vertices.length

        for (let i = 0, j = n - 1; i < n; j = i++) {
            const xi = this.vertices[i].x
            const yi = this.vertices[i].y
            const xj = this.vertices[j].x
            const yj = this.vertices[j].y

            const intersect =
                yi > localPoint.y !== yj > localPoint.y &&
                localPoint.x < ((xj - xi) * (localPoint.y - yi)) / (yj - yi + 0.0001) + xi
            if (intersect) isInside = !isInside
        }

        return inside


    }
}


/*=============================================
    3. RigidBody Class
    *========================================*/

class RigidBody {
    constructor(options) {
        this.position = options.position || new Vector2D(0, 0)
        this.velocity = options.velocity || new Vector2D(0, 0)
        this.acceleration = new Vector2D(0, 0)
        this.mass = options.mass || 1
        this.invMass = this.mass !== 0 ? 1 / this.mass : 0
        this.force = new Vector2D(0, 0)
        this.shape = options.shape
        this.restitution = options.restitution || 0.9
        this.isStatic = options.isStatic || false
        this.eventListeners = {}
    }

    applyForce(force) {
        this.force = this.force.add(force)
    }

    integrate(deltaTime) {
        if (this.isStatic) return

        this.acceleration = this.force.multiply(this.invMass)
        this.velocity = this.velocity.add(this.acceleration.multiply(deltaTime))
        this.position = this.position.add(this.velocity.multiply(deltaTime))
        this.force = new Vector2D(0, 0)
    }