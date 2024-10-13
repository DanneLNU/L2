# Physics Simulation Module

A module for simulating physics in two-dimensional space, including vectors, shapes, rigid bodies, and a physics world to manage interactions between objects.

## Introduction

This module provides tools for creating and simulating physical objects in 2D environments. It is ideal for game development, simulations, and educational purposes where realistic physics interactions are desired.

## Features

- **Vector Calculations**: Handle 2D vectors for positions, velocities, and forces.
- **Geometric Shapes**: Create circles, rectangles, and polygons for physical objects.
- **Rigid Bodies**: Simulate objects with mass, velocity, and collision properties.
- **Physics World**: Manage multiple rigid bodies, apply gravity, and handle collisions between objects.
- **Event Handling**: Listen to and react to events such as collisions between objects.

## Installation

To use the module in your project, follow these steps:

1. **Copy the Module**: Download or copy `physics.js` into your project directory.

2. **Initialize Your Project**: If you haven't already, initialize your project using npm.

   ```bash
   npm init -y


## Examples

1. **Example 1: Basic Physics Simulation with a Falling Ball**
This example demonstrates how to create a simple physics simulation where a ball (circle) falls under gravity and bounces upon hitting the ground.

// Import the physics module
const {
  Vector2D,
  Circle,
  Rectangle,
  RigidBody,
  PhysicsWorld,
} = require('./physics');

// Create a physics world
const world = new PhysicsWorld();
world.gravity = new Vector2D(0, 9.8); // Set gravity (downward force)

// Create a ball using a circle shape
const ball = new RigidBody({
  position: new Vector2D(100, 0), // Starting at the top of the canvas
  velocity: new Vector2D(0, 0),   // Initial velocity
  mass: 1,                        // Mass of the ball
  shape: new Circle(20),          // Radius of 20 units
  restitution: 0.8,               // Bounciness (0 = no bounce, 1 = perfect bounce)
});

// Create the ground using a rectangle shape (static body)
const ground = new RigidBody({
  position: new Vector2D(0, 300), // Position at the bottom of the canvas
  shape: new Rectangle(800, 50),  // Width and height of the ground
  isStatic: true,                 // Static body (does not move)
});

// Add bodies to the world
world.addBody(ball);
world.addBody(ground);

// Simulation loop
function simulate() {
  const deltaTime = 1 / 60; // Time step (1/60th of a second)

  // Step the physics world
  world.step(deltaTime);

  // Log the ball's position
  console.log(`Ball position: x=${ball.position.x.toFixed(2)}, y=${ball.position.y.toFixed(2)}`);

  // Continue the simulation
  setTimeout(simulate, deltaTime * 1000);
}

// Start the simulation
simulate();

Explanation: 

* PhysicsWorld: Manages the simulation with gravity.
* RigidBody (Ball): Represents the falling ball with mass, position and restitution for bouncing.
* RigidBody (Ground): A static body that the ball can collide with.
* Simulation Loop: Steps the physics world forward and logs the ball´s position.


## Contributing
Contributions are welcome! If you have suggestions, discover bugs, or wish to improve the module, please create a pull request or open an issue in the project's repository.

## License
This module is open-source and licensed under the MIT License.

