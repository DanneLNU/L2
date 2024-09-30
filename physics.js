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

    on(eventName, callback) {
        if (!this.eventListeners[eventType]) this.eventListeners[eventType] = []
        this.eventListeners[eventType].push(callback)
    }

    emit(eventType, data) {
        const listeners = this.eventListeners[eventType]
        if (listeners) {
            listeners.forEach((callback) => callback(data))
        }
    }
}

/*=============================================
    4. PhysicsWorld Class
    *========================================*/

class PhysicsWorld {
    constructor() {
        this.bodies = []
        this.gravity = new Vector2D(0, 9.8)
    }

    addBody(body) {
        this.bodies.push(body)
    }

    removeBody(body) {
        this.bodies = this.bodies.filter((b) => b !== body)
    }

    step(deltaTime) {
        this.bodies.forEach((body) => {
            if (!body,isStatic) {
                const gravityForce = this.gravity.multiply(body.mass)
                body.applyForce(gravityForce)
            }
        })

        this.bodies.forEach((body) => {
            body.integrate(deltaTime)
        })

        this.handleCollisions()
    }

    handleCollisions() {
        const pairs = this.getPotentialCollisions()

        pairs.forEach(([bodyA, bodyB]) => {
            const collision = this.checkCollision(bodyA, bodyB)
            if (collision) {
                this.resolveCollision(bodyA, bodyB, collision)
                bodyA.emit('collision', { other: bodyB })
                bodyB.emit('collision', { other: bodyA })
            }
        })
    }

    getPotentialCollisions() {
        const pairs = []
        for (let i = 0; i < this.bodies.length; i++) {
            for (let j = i + 1; j < this.bodies.length; j++) {
                pairs.push([this.bodies[i], this.bodies[j]])
            }
        }
        return pairs
    }

    checkCollision(bodyA, bodyB) {
        const typeA = bodyA.shape.type
        const typeB = bodyB.shape.type

        if (typeA === 'circle' && typeB === 'circle') {
            return this.circleCircleCollision(bodyA, bodyB)
        }
        if (typeA === 'rectangle' && typeB === 'rectangle') {
            return this.rectangleRectangleCollision(bodyA, bodyB)
        }
        if (typeA === 'circle' && typeB === 'rectangle') {
            return this.circleRectangleCollision(bodyA, bodyB)
        }
        if (typeA === 'rectangle' && typeB === 'circle') {
            return this.circleRectangleCollision(bodyB, bodyA)
        }

        return null
    }

    circleCircleCollision(bodyA, bodyB) {
        const diff = bodyB.position.subtract(bodyA.position)
        const distance = diff.magnitude()
        const radiumSum = bodyA.shape.radius + bodyB.shape.radius

        if (distance < radiumSum) {
            const normal = diff.normalize()
            const penetration = radiumSum - distance
            return { normal, penetration }
        }
        return null
    }

    rectangleRectangleCollision(bodyA, bodyB) {
        const ax = bodyA.position.x - bodyA.shape.width / 2
        const ay = bodyA.position.y - bodyA.shape.height / 2
        const aWidth = bodyA.shape.width
        const aHeight = bodyA.shape.height

        const bx = bodyB.position.x - bodyB.shape.width / 2
        const by = bodyB.position.y - bodyB.shape.height / 2
        const bWidth = bodyB.shape.width
        const bHeight = bodyB.shape.height

        if (
            ax < bx + bWidth &&
            ax + aWidth > bx &&
            ay < by + bHeight &&
            ay + aHeight > by
        ) {

            const overlapX = Math.min(
                ay + aHeight - by,
                by + bHeight - ay
            )

            if (overlapX < overlapY) {
                const normal = new Vector2D(ax + aWidth / 2 < bx + bWidth / 2 ? -1 : 1, 0)
                return { normal, penetration: overlapX }
            } else {
                const normal = new Vector2D(0, ay + aHeight / 2 < by + bHeight / 2 ? -1 : 1)
                return { normal, penetration: overlapY }
            }
        }
        return null
    }

    resolveCollision(bodyA, bodyB, collision) {
        const { normal, penetration } = collision
        const totalInvMass = bodyA.invMass + bodyB.invMass
        if (totalInvMass === 0) return

        const moveA = normal.multiply(-penetration * (bodyA.invMass / totalInvMass))
        const moveB = normal.multiply(penetration * (bodyB.invMass / totalInvMass))

        if (!bodyA.isStatic) {
            bodyA.position = bodyA.position.add(moveA)
        if (!bodyB.isStatic) {
            bodyB.position = bodyB.position.add(moveB)
        }

        const relativeVelocity = bodyB.velocity.subtract(bodyA.velocity)
        const velocityAlongNormal = relativeVelocity.dot(normal)

        if (velocityAlongNormal > 0) return

        const restitution = Math.min(bodyA.restitution, bodyB.restitution)

        const impulseMagnitude = -(1 + restitution) * velocityAlongNormal / totalInvMass

        const impulse = normal.multiply(impulseMagnitude)

        if (!bodyA.isStatic) bodyA.velocity = bodyA.velocity.subtract(impulse.multiply(bodyA.invMass))
        if (!bodyB.isStatic) bodyB.velocity = bodyB.velocity.add(impulse.multiply(bodyB.invMass))
    }
  }
}

/*=============================================
    5. Export Module
    *========================================*/

module.exports = {
    Vector2D,
    Shape,
    Circle,
    Rectangle,
    Polygon,
    RigidBody,
    PhysicsWorld,
}