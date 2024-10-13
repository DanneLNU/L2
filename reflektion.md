# Code Quality Analysis Based on Chapter 2: *Meaningful Names* and my own reflections.

| **Identifier Name** | **Applied Rules from Chapter 2**                               |
|---------------------|----------------------------------------------------------------|
| `Vector2D`          | - Use Intention-Revealing Names                                |
|                     | - Use Pronounceable names                                      |
|                     | The name `Vector2D` clearly indicates that the class handles   |
|                     | two-dimensional vectors. It reveals its purpose without        |
|                     | ambiguity and is easily pronounceable, making communication    |
|                     | effective among developers.                                    |
| `RigidBody`         | - Use Intention-Revealing Names                                |
|                     | - Avoid Disinformation                                         |
|                     | `RigidBody` accurately describes an object that does not       |
|                     | deform under force, aligning with physics terminology. It      |
|                     | avoids disinformation by not implying properties it does not   |
|                     | have, ensuring developers understand its purpose without       |
|                     | confusion.                                                     |
| `applyForce`        | - Use Verb Phrase Names for Methods                            |
|                     | - Use Consistent Verb Forms                                    |
|                     | The method name `applyForce` is a verb phrase, indicating      |
|                     | that it performs an action. It is consistent with other        |
|                     | methods like `applyImpulse`, maintaining consistency in verb   |
|                     | usage throughout the codebase. It enhances readability and     |
|                     | predictability.                                                |
| `containsPoint`     | - Use Intention-Revealing Names                                |
|                     | - Pick One Word per Concept                                    |
|                     | `containsPoint` is a method that clearly states its            |
|                     | functionality. By using the same method across different shape |
|                     | classes, it adheres to the principle of using one word per     |
|                     | concept. It promotes consistency and reduces cognitive load    |
|                     | for developers.                                                |
| `PhysicsWorld`      | - Don't Add Gratuitous Context                                 |
|                     | - Make Meaningful Distinctions                                 |
|                     | Although `PhysicsWorld` provides context, the term "Physics"   |
|                     | might be redundant since the module already implies physics    |
|                     | concepts. According to "Don't Add Gratuitous Context," a       |
|                     | shorter name like `World` might be sufficient.                 |

My own reflection: After reading Chapter 2 of *Clean Code*, I realized that meaningful names have a profound impact on code clarity and maintainability. The chapter explains that well-chosen names act as effective documentation, thus reducing the need for excessive comments.

In my module, I tried to use intention-revealing names such as `Vector2D`, `RigidBody`, and `applyForce` so that they immediately convey their purpose.

I was also reflecting on the principle "Don't Add Gratuitous Context" and was (as said before) considering that my `PhysicsWorld` might be unnecessarily verbose if the context is already clear. I might just reduce it to `World` to make the code a bit cleaner.

I also ensured that the names accurately represented what they are, to comply with the principle of "Avoid Disinformation". Furthermore, I tried to use consistent terminology in names like `applyForce` and `applyImpulse`, which aids in understanding and predicting the behavior of the code.

# Code Quality Analysis Based on Chapter 3: *Functions* and my own reflections.

| **Method Name**                               | **Applied Rules from Chapter 3**                    |
|-----------------------------------------------|----------------------------------------------------|
| `PhysicsWorld.step(deltaTime)`                | **Violations:**                                    |
|                                               | - Small Functions                                  |
|                                               | - Do One Thing                                     |
|                                               | **Complies with:**                                 |
|                                               | - Meaningful Names                                 |
|                                               | This method might be too long and handle multiple  |
|                                               | responsibilities, violating the principle of small |
|                                               | functions and "Do One Thing."                      |
| `RigidBody.integrate(deltaTime)`              | **Violations:**                                    |
|                                               | - Single Level of Abstraction                      |
|                                               | **Complies with:**                                 |
|                                               | - Meaningful Names                                 |
|                                               | The method mixes high-level and low-level          |
|                                               | operations, breaking the rule of maintaining a     |
|                                               | single level of abstraction.                       |
| `PhysicsWorld.checkCollision(bodyA, bodyB)`   | **Violations:**                                    |
|                                               | - Single Level of Abstraction                      |
|                                               | - Do One Thing                                     |
|                                               | **Complies with:**                                 |
|                                               | - Meaningful Names                                 |
|                                               | The method mixes high-level logic with low-level   |
|                                               | collision detection, breaking the rule of         |
|                                               | maintaining a single level of abstraction and "Do  |
|                                               | One Thing."                                        |
| `Polygon.containsPoint(point, position, angle)` | **Violations:**                                   |
|                                               | - Prefer Fewer Arguments                           |
|                                               | - Use Descriptive Names                            |
|                                               | (parameter `point` could be more specific)         |
|                                               | **Complies with:**                                 |
|                                               | - Do One Thing                                     |
|                                               | The method has multiple arguments, which makes it  |
|                                               | harder to understand and test. It violates the     |
|                                               | guideline of keeping the number of arguments       |
|                                               | minimal.                                           |
| `PhysicsWorld.rectangleRectangleCollision(bodyA, bodyB)` | **Violations:**                                   |
|                                               | - Long Parameter List                              |
|                                               | - Single Level of Abstraction                      |
|                                               | **Complies with:**                                 |
|                                               | - Meaningful Names                                 |
|                                               | The method uses detailed calculations and could be |
|                                               | broken into smaller functions to maintain a single |
|                                               | level of abstraction and improve readability.      |

**My own reflections of Chapter 3 and my code:** 
I re-read Chapter 3 after writing my code and now think I should have read it again before I started coding. I recognize now that writing small, focused functions is crucial for creating maintainable and readable code, as suggested by the book. Functions should do one thing and do it well. Many of my methods violate this principle by handling multiple responsibilities within a single function.

For example, `PhysicsWorld.step(deltaTime)` is not only applying gravity but also integrating motion and handling collisions. This makes the method both too long and harder to understand. I could have broken it into smaller functions with a single responsibility.

Another issue in my code is functions with multiple arguments like `Polygon.containsPoint(point, position, angle)`. According to the book, functions should have a minimal number of arguments to reduce complexity.

Another key principle is maintaining a single level of abstraction within functions. In `RigidBody.integrate(deltaTime)`, I mixed high-level logic with low-level details. This could confuse readers and complicate maintenance. I could split the function into smaller ones that operate at the same level of abstraction.

**My overall reflection on my own code:** 
Working on this physics simulation was very challenging and time-consuming. However, it was an insightful experience regarding code quality. After reading Chapters 2 and 3, I can see areas where my code can improve. 

I also realized that some of my functions were trying to accomplish too much. By attempting to handle multiple tasks within a single method, I made the code more complex and less maintainable.

Another thing I noticed was the importance of meaningful names and consistent terminology. Clear and descriptive names help convey the purpose of functions and variables, greatly reducing the cognitive load on those trying to read my code.

Overall, reviewing my code with the book in mind has reinforced the value of writing clean, maintainable code. It encouraged me to be more mindful of function design and to strive to improve code quality.

**Last words:** 
One more thing I want to add is that while I agree with most of the guidelines from Chapter 3, I think there must be a balance between theoretical best practices and practical implementation. Over-fragmenting code into too many small functions can make it harder to follow. I believe finding a middle ground where functions are neither too long nor too fragmented ensures both readability and practicality.
