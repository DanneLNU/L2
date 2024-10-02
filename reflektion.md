
# Code Quality Analysis Based on Chapter 2: *Meaningful Names* and my own reflections.

| **Identifier Name** | **Applied Rules from Chapter 2**         |
|---------------------|------------------------------------------|
| `Vector2D`          | - Use Intention-Revealing Names          | 
|                     | - Use Pronouncable names                 |
|                     |                                          |
|                     | The name Vector2d is clearly indicating  |
|                     | that the class handles two-dimensional   |
|                     | vectors. It reveals its purpose without  | 
|                     | ambiguity and is easily pronouncable,    | 
|                     | making the communication effective       |
|                     | among the developers.                    |
|----------------------------------------------------------------|
| `RigidBody`         |- Use Intention-Revealing Names           |
|                     |- Avoid Disinformation                    |
|                     | RigidBody accurately describes an        |
|                     | object that does not deform under force  |
|                     | aligning with physics terminology.       |
|                     | It avoids disinformation by not implying |
|                     | properties it does not have, ensuring    |
|                     | developers understand its purpose without|
|                     | confusion.                               |
|----------------------------------------------------------------|
| `applyForce`        | - Use Verb Phrase Names for Methods      |
|                     | - Use Consistent Verb Forms              |
|                     |                                          |
|                     | The method name applyForce is a verb     |
|                     | phrase, indicating that it performs an   |
|                     | action. It is consistent with other      |
|                     | methods like applyImpulse so it is       |
|                     | maintaining consistency in verb usage    |
|                     | throughout the codebase. It enhances     |
|                     | readibility and predictability.          |
|----------------------------------------------------------------|
| `containsPoint`     | - Use Intention-Revealing Names          |
|                     | - Pick One Word per Concept              |
|                     |                                          |
|                     | containsPoint is a method that clearly   |
|                     | states its functionality. By using the   |
|                     | same method across different shape       |
|                     | classes, it adheres to the principle of  |
|                     | using one word per concept. It promotes  |
|                     | consistency and reducing cognitive load  |
|                     | for developers.                          |
|----------------------------------------------------------------|
| `PhysicsWorld`      | - Dont Add Gratuitous Context            |
|                     | - Make Meaningful Distinction            |
|                     |                                          |
|                     | Even though PhysicsWorld provide context |
|                     | the term "Physics" might be redundant    |
|                     | since one might say that the module      |
|                     | already implies physics concepts. So,    |
|                     | according to "Don´t Add Gratuitous       |
|                     | Context" shorter name like World might be|
|                     | enough.                                  |
|----------------------------------------------------------------|