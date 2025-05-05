# Programming Scale: Abstraction and Substitution 1 (with Examples)

This scale tests students' ability to handle increasing levels of substitution and abstraction in programming. Each level builds upon the previous one. Example answers are provided in python.

If completing this scale, write your answers in Javascript, Typescript, or a non-python language of your choice.

## Level 1: Basic Function Substitution

1. Given the following functions, what is the output of `c(3, 4)`?

```
a(x) = x + 1
b(y) = y * 2
c(x, y) = a(x) + b(y)
```

Example Answer:
```
c(3, 4) = a(3) + b(4)
        = (3 + 1) + (4 * 2)
        = 4 + 8
        = 12
```

2. Rewrite the following nested function calls as a single expression:

```
f(g(h(x)))

where:
f(x) = x^2
g(x) = x + 1
h(x) = 2x
```

Example Answer:
```
f(g(h(x))) = f(g(2x))
           = f((2x) + 1)
           = ((2x) + 1)^2
           = (2x + 1)^2
```

## Level 2: Function Composition

3. Create a function `compose` that takes two functions as arguments and returns a new function that is the composition of the two functions. Use it to compose the functions `f` and `g`:

```
f(x) = x + 1
g(x) = x * 2
```

Example Answer:
```python
def compose(f, g):
    return lambda x: f(g(x))

f = lambda x: x + 1
g = lambda x: x * 2

h = compose(f, g)
print(h(3))  # Output: 7
```

4. Using the `compose` function from the previous question, create a new function that triples a number, adds 5, and then squares the result.

Example Answer:
```python
triple = lambda x: x * 3
add_five = lambda x: x + 5
square = lambda x: x ** 2

result = compose(square, compose(add_five, triple))
print(result(2))  # Output: 121
```

## Level 3: Higher-Order Functions

5. Implement a function `map` that takes a function and an array as arguments, and returns a new array with the function applied to each element.

Example Answer:
```python
def map(func, arr):
    return [func(x) for x in arr]

# Example usage
double = lambda x: x * 2
result = map(double, [1, 2, 3, 4, 5])
print(result)  # Output: [2, 4, 6, 8, 10]
```

6. Use your `map` function to create a new array where each number in `[1, 2, 3, 4, 5]` is doubled and then increased by 3.

Example Answer:
```python
double_and_add_three = lambda x: x * 2 + 3
result = map(double_and_add_three, [1, 2, 3, 4, 5])
print(result)  # Output: [5, 7, 9, 11, 13]
```

## Level 4: Currying and Partial Application

7. Implement a `curry` function that converts a function taking multiple arguments into a sequence of functions each taking a single argument.

Example Answer:
```python
def curry(func):
    def curried(*args):
        if len(args) >= func.__code__.co_argcount:
            return func(*args)
        return lambda x: curried(*args, x)
    return curried

# Example usage
def add(x, y, z):
    return x + y + z

curried_add = curry(add)
print(curried_add(1)(2)(3))  # Output: 6
```

8. Use your `curry` function to create a curried version of the following function, and then use it to create a function that always adds 5 to its argument:

```
add(x, y) = x + y
```

Example Answer:
```python
def add(x, y):
    return x + y

curried_add = curry(add)
add_five = curried_add(5)

print(add_five(3))  # Output: 8
print(add_five(7))  # Output: 12
```

## Level 5: Abstractions with Objects and Classes

9. Implement a `Person` class with properties for name and age, and a method `introduce` that returns a string introduction. Then create a `Student` class that inherits from `Person` and adds a `study` method.

Example Answer:
```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def introduce(self):
        return f"Hi, I'm {self.name} and I'm {self.age} years old."

class Student(Person):
    def __init__(self, name, age, major):
        super().__init__(name, age)
        self.major = major
    
    def study(self):
        return f"{self.name} is studying {self.major}."

# Example usage
person = Person("Alice", 30)
print(person.introduce())  # Output: Hi, I'm Alice and I'm 30 years old.

student = Student("Bob", 20, "Computer Science")
print(student.introduce())  # Output: Hi, I'm Bob and I'm 20 years old.
print(student.study())  # Output: Bob is studying Computer Science.
```

10. Create a higher-order function `createLogger` that takes a prefix string and returns a new function. The returned function should take a message string and log it with the prefix.

Example Answer:
```python
def createLogger(prefix):
    def logger(message):
        print(f"{prefix}: {message}")
    return logger

# Example usage
errorLogger = createLogger("ERROR")
infoLogger = createLogger("INFO")

errorLogger("Something went wrong")  # Output: ERROR: Something went wrong
infoLogger("Operation successful")   # Output: INFO: Operation successful
```

## Level 6: Functional Programming Patterns

11. Implement the following higher-order functions:
   - `filter`: Takes a predicate function and an array, returns a new array with only the elements for which the predicate returns true.
   - `reduce`: Takes a reducer function, an initial value, and an array, and reduces the array to a single value.

Example Answer:
```python
def filter(pred, arr):
    return [x for x in arr if pred(x)]

def reduce(reducer, initial, arr):
    result = initial
    for x in arr:
        result = reducer(result, x)
    return result

# Example usage
is_even = lambda x: x % 2 == 0
print(filter(is_even, [1, 2, 3, 4, 5, 6]))  # Output: [2, 4, 6]

sum_reducer = lambda acc, x: acc + x
print(reduce(sum_reducer, 0, [1, 2, 3, 4, 5]))  # Output: 15
```

12. Use your `filter` and `reduce` functions to find the sum of all even numbers in the array `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`.

Example Answer:
```python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
even_numbers = filter(lambda x: x % 2 == 0, numbers)
sum_of_evens = reduce(lambda acc, x: acc + x, 0, even_numbers)
print(sum_of_evens)  # Output: 30
```

## Level 7: More Higher-Order Functions memoizing function calls & adding aspects to functions

15. Create a `memoize` function that takes a function as an argument and returns a new function. The new function should cache the results of the original function for each set of arguments it's called with.

Example Answer:
```python
def memoize(func):
    cache = {}
    def memoized(*args):
        if args in cache:
            return cache[args]
        result = func(*args)
        cache[args] = result
        return result
    return memoized

# Example usage
@memoize
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(100))  # This would be very slow without memoization
```

16. Implement a simple aspect-oriented programming system with `before` and `after` advice. Use it to add logging before and after a function call without modifying the original function.

Example Answer:
```python
def aspect(before=None, after=None):
    def decorator(func):
        def wrapped(*args, **kwargs):
            if before:
                before(func.__name__, args, kwargs)
            result = func(*args, **kwargs)
            if after:
                after(func.__name__, result)
            return result
        return wrapped
    return decorator

def before_advice(func_name, args, kwargs):
    print(f"Before calling {func_name} with args {args} and kwargs {kwargs}")

def after_advice(func_name, result):
    print(f"After calling {func_name}, got result {result}")

# Example usage
@aspect(before=before_advice, after=after_advice)
def greet(name):
    return f"Hello, {name}!"

print(greet("Alice"))

# Output:
# Before calling greet with args ('Alice',) and kwargs {}
# After calling greet, got result Hello, Alice!
# Hello, Alice!
```