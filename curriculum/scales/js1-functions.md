### JAVASCRIPT SCALE 1 - Functions
##### Refactor the following functions by breaking them down into tiny sub-functions.
##### This should take <1 minute each. The more sub-functions the better, in this case.

1. Refactor function A into function B
```js
// a: f(x) = x^2 + x^3 / x - (x+1)
// b: function F(x) = a(x) / b(x)
```

2. Refactor function A into function B
```js
// a: g(x) = x^2 + x^3 + (x^4 -1) / x - (x+1)
// b: function G(x) = a(x) / b(x)
```

3. Refactor function A into function B
```js
// a: h(x, y) = x + y + y^2 + x^2 / y^2 - y - 1
// b: function H(x, y) = a(y) + b(x) / c(y)
```

4. Refactor function A into function B
```js
// a: j(x, y, z) = (x + x^2 + x^3) + (y + y^2 + y^3) + (z + z^2 + z^3)
// b: function J(x, y, z) = a(x) + a(y) + a(z)
```


5. Evaluate the following twelve functions:
```js
// Question 1 (Beginner)
function a(name) {
  return "Hello, " + name + "!";
}
a("Alice")
// OUTPUT: 

// Question 2 (Beginner)
function b(num) {
  return num * num;
}
b(5)
// OUTPUT: 

// Question 3 (Beginner)
function c(num) {
  return num % 2 === 0;
}
c(7)

// Question 4 (Intermediate)
function d(a, b) {
  if (b === 0) {
    return 0;
  }
  return a + d(a, b - 1);
}
d(3, 4)

// Question 5 (Intermediate)
function e(n) {
  if (n === 0) {
    return 1;
  }
  return n * e(n - 1);
}
console.log("Question 5:", e(5));

// Question 6 (Intermediate)
function f(arr) {
  if (arr.length === 0) {
    return 0;
  }
  return arr[0] + f(arr.slice(1));
}
console.log("Question 6:", f([1, 2, 3, 4, 5]));

// Question 7 (Intermediate)
function g(n) {
  if (n <= 1) {
    return n;
  }
  return g(n - 1) + g(n - 2);
}
console.log("Question 7:", g(6));

// Question 8 (Intermediate)
function h(str) {
  if (str.length <= 1) {
    return true;
  }
  if (str[0] !== str[str.length - 1]) {
    return false;
  }
  return h(str.slice(1, -1));
}
h("racecar")

// Question 9 (Intermediate)
function j(num) {
  if (num < 10) {
    return num;
  }
  return (num % 10) + j(Math.floor(num / 10));
}
j(1234)

// Question 10 (Intermediate)
function k(a, b) {
  if (b === 0) {
    return a;
  }
  return k(b, a % b);
}
k(48, 18)

// Question 11 (Intermediate)
function l(str) {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  if (str.length === 0) {
    return 0;
  }
  return vowels.includes(str[0].toLowerCase()) ? 1 + l(str.slice(1)) : l(str.slice(1));
}
l("JavaScript")

// Question 12 (Intermediate)
function m(base, exponent) {
  if (exponent === 0) {
    return 1;
  }
  return base * m(base, exponent - 1);
}
m(2, 5)
```