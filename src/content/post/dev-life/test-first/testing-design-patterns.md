---
comments: true
description: Testing interfaces, abstract classes, and design patterns efficiently can be tricky since parents and children depend on each other.<br><br>We can write tests to eliminate these dependencies during the test time, making our tests very short and decoupled.
tags:
 - design-patterns
 - tdd
 - testing
publishDate: 2022-09-25T20:52:08.052481
last-modified-purpose:
permalink: /testing-design-patterns/
title: How to test interfaces, abstract classes and design patterns?
image: /images/testing-design-patterns.jpg
image-fit: contain
---
![](/images/testing-design-patterns.jpg)

{% include note.html content="For beginners: Design patterns are template solutions to common problems developers face. There are many design patterns; the best known are the 2 Gang of Four (GoF)  object-oriented design patterns." %}

Testing interfaces, abstract classes, and design patterns efficiently can be tricky since parents and children depend on each other. We can write tests to eliminate these dependencies during the test time, making our tests very short and decoupled.

But first, why should you even use abstract classes and design patterns?

# Why should we use interfaces, abstract classes and design patterns?

Good code should enforce the intent of how it is to be used.

Ideally, we strive for a SOLID design: A code with a single responsibility that cannot be changed but is extensible. Interfaces and abstract classes help us achieve this goal.

Suppose your systems represent different vehicles. Instead of having separate logic for each, you can represent the common logic in a 'Vehicle' class and have its behaviour implemented and modified by the subclasses.

```java
abstract class Vehicle{

    void travelTo(Point destination){
        // common logic to move a vehicle that uses this.getHorn()
    }

    abstract Horn getHorn(); // this will be implemented by children

}

class Tesla extends Vehicle{

    Horn getHorn(){
        return new Horn("John Cena: You can't see me");
    }
}

```

The above code corresponds to the factory method design pattern.

All 24 object-oriented GoF design patterns also embody SOLID principles. Developers should prefer these patterns as they help our code be very clean.

# How should we unit test them?

Unit testing a pattern can be tricky since things are so abstract.

Testing all the concrete and parent classes together will make our tests very dependent on the parent and will be hard to maintain.

The trick here is to test both separately. 

## Testing abstract class

make a dummy concrete implementation within the test class.

```java

// this is a test file for the abstract class

// 1. Make a Dummy implementation of the abstract class/interface within the test
class DummyVehicleImpl extends Vehicle{
    Horn getHorn(){
        return new Horn("THIS IS DUMMY BUT IT CAN SING FROZEN");
    }
}

// 2. Create the instance of a dummy

Vehicle vehicle = new DummyVehicleImpl();

// 3. Use the dummy implementation to assert the parent.
```
The steps to test composition is also similar.

## Testing children

In the above section, we tested parents. Now we can test the child.

Each child will have a separate test class that tests its method, excluding the parent's methods.

```java
class TeslaTests{
    Tesla tesla = new Tesla();

    // code which tests methods of tesla class and not the parent.
}
```

***

What do you think about this approach? Is there a better approach to testing abstract classes and design patterns? Do let me know what you think. 

Thank you for reading so far.