
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

My own reflection: After reading Chapter 2 of the Clean Code I realized that meaningful names have
profound impact on code clarity and maintainability. The chapter tells you that names that are well-chosen 
act as effective documentation and thus reducing the need for excessive comments.

In my module i tried to use intention-revealing names such as `Vector2d`, `RigidBody` and `applyForce` in a way
that they immediately convey their purpose.

I was also reflecting on the principle "Don´t Add Gratuitous Context" and was (as said before) thinking that my 
`PhysicsWorld` might be unnecessarily verbose if the context is very clear. I might have just reduced it to the 
`World` and make the code a bit cleaner.

I was also making sure that the names accurately represented what they are to comply with the principle of
"Avoid Disinformnation". 
Also, i tried to use consistent terminology in names like `applyForce` and `applyImpulse` which aids in understanding 
and predicting the behaviour of the code.


# Code Quality Analysis Based on Chapter 3: *Functions* and my own reflections.


|            **Method Name**                              | **Applied Rules from Chapter 3**        |
|---------------------------------------------------------------------------------------------------|
| `PhysicsWorld.step(deltaTime)`                          |  Violations:                            |
|                                                         |   - Small Functions                     |
|                                                         |   - Do One Thing                        |
|                                                         |                                         |
|                                                         |  Complies with:                         |
|                                                         |   - Meaningful Names                    |
|                                                         |                                         |
|                                                         | This method might be too long and it    |
|                                                         | handles multiple responsibilities. This |
|                                                         | is violating the principle of small     |
|                                                         | functions and doing one thing.          |
|---------------------------------------------------------------------------------------------------|
| `RigidBody.integrate(deltaTime)`                        |  Violations:                            |
|                                                         |   - Single Level of Abstraction         |
|                                                         |                                         |
|                                                         |  Complies with:                         |
|                                                         |   - Meaningful Names                    |
|                                                         |                                         |
|                                                         | The method mixes high-level and low -   |
|                                                         | level operations. This is breaking the  |
|                                                         | rule of maintaining a single level of   |
|                                                         | abstraction within a function           |
|---------------------------------------------------------------------------------------------------|
| `PhysicsWorld.checkCollision(bodyA, bodyB)`             |  Violations:                            |
|                                                         |   - Single Level of Abstraction         |
|                                                         |   - Do One Thing                        |
|                                                         |                                         |
|                                                         |  Complies with:                         |
|                                                         |   - Meaningful Names                    |
|                                                         |                                         |
|                                                         | The method mixes high-level logic with  |
|                                                         | low-level collisions detection, breaking|
|                                                         | the rule of maintaining a single level  |
|                                                         | of abstraction and doing one thing per  |
|                                                         | funtion.                                |
|---------------------------------------------------------------------------------------------------|
| `Polygon.containsPoint(point, position, angle)`         |  Violations:                            |
|                                                         |   - Prefer Fewer Arguments              |
|                                                         |   - Use Descriptive Names               |
|                                                         | (parameter point could be more specific)|
|                                                         |                                         |
|                                                         |  Complies with:                         |
|                                                         |   - Do One Thing                        |
|                                                         |                                         |
|                                                         | The method has multiple argument that   |
|                                                         | might make it harder to understand and  |
|                                                         | test. It violates the guidline of       |
|                                                         | keeping the number of arguments minimal.|
|---------------------------------------------------------------------------------------------------|
| `PhysicsWorld.rectangleRectangleCollision(bodyA,bodyB)` | Violations :                            |
|                                                         |  - Long Parameter List                  |
|                                                         |  - Single Level of Abstraction          |
|                                                         |                                         |
|                                                         | Complies with:                          |
|                                                         | - Meaningful Names                      |
|                                                         |                                         |
|                                                         | The method uses detailed calculations   |
|                                                         | and could be broken into smaller        |
|                                                         | functions to maintain single level of   |
|                                                         | abstraction and improve readability.    |
|---------------------------------------------------------------------------------------------------|


**My own reflections of chapter 3 and my code:** 
I did re-read the chapter 3 after i did write my code and now I am thinking that I should have
read it again before I started coding since I recognize now that writing small, focused funtions is crucial for
creating maintainable and readable code according to the book. The funtions should do one thing and do it well. As
you can see in my code, many of my methods violate this principle by handling multiple responsibilities within a 
single function.
For example `PhysicsWorld.step(deltaTime)` is not only applying the gravity but also intergrates motion and also 
handles the collisions. This might make the method both too long and harder to understand. I could have broken it 
into smaller functions with a single responsibility. 

Another issue i have in my code is my functions with multiple arguments like `Polygon.containsPoint(point, position, angle)`.
According to the book, the functions should have minimal number of arguments to reduce complexity. 

Another key principle is maintaining a single level of abstraction within my functions. I did mix high-level logic with 
low-level details as I did in `RigidBody.integrate(deltaTime)`. This could confuse readers and complicate maintainance. I could 
split functions into smaller ones that operates at the same level of abstraction.

**My overall reflection on My Own Code**
Working on this physics simulation was very hard and time consuming. However, it was very insightful experience regarding the
code quality. After reading the chapter 2 and 3 I could see the areas where my code can improve. 
I also realized that some of my functions were trying to acomplish too much. By attempting to handle multiple tasks within a single
method I made the code more complex and less maintainable. 

Another thing I noticed was importance of meaningful names and consistent terminology. Clear and descriptive names help convey
the purpose of the functions and variables. That can greatly reduce cognitive load on those who are trying to read my code.

I would say, overall, reviewing my code with the book in the back of my mind has reinforced the value of writing the clean, maintainable
code. It did encourage me to be more mindful of function design and to try to improve my code quality. 

**Last Words**
One more thing I wanna add is that, while I do agreee with most of the guidelines from Chapter 3 i think that there must be balance
between theoretical best practices and also practical implementation. If we are to over-fragment code into too many small functions
then that can make code harder to follow. I think finding some kind of middleground where functions are neither too long not too
broken down could ensure readibility and practicality.
