---
Title: Dependency Injection in Python with Pinject
Date: 2019-12-21 15:00:00 +0100
Category: blog
Tags: python patterns
URL: python/patterns/2019/12/21/dependency-injection-with-pinject.html
SAVE_AS: python/patterns/2019/12/21/dependency-injection-with-pinject.html
---

In this post, you will learn the basic principles of Dependency Injection and how to implement it in Python using the Pinject library.

## Dependency Injection
Dependency Injection is a technique that one object supplies the dependencies of a class. In other words, when you have an object that uses different services, with this pattern, you will separate the construction and the use of objects.

# Example without using Dependency Injection
```python
class Mailer:
    def send(self, email: str):
        print(f"Sending mail to {email}")


class RegisterService:
    def __init__(self):
        self.mailer = Mailer()
    
    def register(self, email: str):
        print(f"Registering user {email}")
        self.mailer.send(email)


register_service = RegisterService()
register_service.register("petru@pepy.tech")
```

The code above has the following problems:
- The `RegisterService` class should know how to construct the `Mailer` service.
- It's not easy to change the `Mailer` service for another one.
- It's more challenging to mock the `Mailer` in unit tests.
- Repetition of code, if we have another object that uses the `Mailer` class, this new service will also have the code to instantiate the class.
- If you change the constructor of `Mailer` class, all the services that use it should be modified.

## Pinject
[Pinject](https://github.com/google/pinject) is an open-source library from Google that makes dependency injection in Python very straightforward. For example, the code above will look similar to this one:

```python
import pinject


class Mailer:
    def send(self, email: str):
        print(f"Sending mail to {email}")


class RegisterService:
    def __init__(self, mailer: Mailer):
        self.mailer = mailer
    
    def register(self, email: str):
        print(f"Registering user {email}")
        self.mailer.send(email)


obj_graph = pinject.new_object_graph()
register_service = obj_graph.provide(RegisterService)
register_service.register("petru@pepy.tech")
```

It's a little bit of magic at first, but it's straightforward to use with legacy code also. With this code, we separate the construction and the usage of `Mailer` class. Pinject will take the responsibility to construct the objects, and the classes will only need to use the dependencies. This library avoids all the problems mentioned earlier.

Hope this was useful :-)
