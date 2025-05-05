# Step-by-Step Guide to Building Async vs Sync Functions in JavaScript

Follow these instructions to create and understand various async and sync operations in JavaScript.

## Example 1: Simple Synchronous vs Asynchronous Function

1. Open your JavaScript environment (e.g., a `index.ts` file to run with bun, probably).
2. Create a synchronous function:
   ```javascript
   function syncFunction() {
     console.log("Sync function executed");
   }
   ```
3. Create an asynchronous function using setTimeout:
   ```javascript
   function asyncFunction() {
     setTimeout(() => {
       console.log("Async function executed");
     }, 1000);
   }
   ```
4. Call both functions and add a console.log after:
   ```javascript
   syncFunction();
   asyncFunction();
   console.log("Code after function calls");
   ```
5. Run the code and observe the order of execution.

## Example 2: Callback Hell vs Promises

1. Create a function demonstrating callback hell:
   ```javascript
   function callbackHell() {
     setTimeout(() => {
       console.log("First callback");
       setTimeout(() => {
         console.log("Second callback");
         setTimeout(() => {
           console.log("Third callback");
         }, 1000);
       }, 1000);
     }, 1000);
   }
   ```
2. Create a function using Promises to achieve the same result:
   ```javascript
   function promiseChain() {
     return new Promise((resolve) => {
       setTimeout(() => {
         console.log("First promise");
         resolve();
       }, 1000);
     })
       .then(() => {
         return new Promise((resolve) => {
           setTimeout(() => {
             console.log("Second promise");
             resolve();
           }, 1000);
         });
       })
       .then(() => {
         return new Promise((resolve) => {
           setTimeout(() => {
             console.log("Third promise");
             resolve();
           }, 1000);
         });
       });
   }
   ```
3. Call both functions and compare the readability and structure.

## Example 3: Async/Await

1. Create an async function using the async/await syntax:
   ```javascript
   async function asyncAwaitExample() {
     console.log("Start of async function");
     
     await new Promise(resolve => setTimeout(resolve, 1000));
     console.log("After 1 second");
     
     await new Promise(resolve => setTimeout(resolve, 1000));
     console.log("After 2 seconds");
     
     console.log("End of async function");
   }
   ```
2. Call the function and add a console.log after:
   ```javascript
   asyncAwaitExample();
   console.log("Code after async function call");
   ```
3. Run the code and observe how async/await makes asynchronous code look more synchronous.

## Example 4: Parallel vs Sequential Async Operations

1. Create a function for sequential fetch operations (note: replace with actual API endpoints):
   ```javascript
   async function sequentialFetch() {
     const start = Date.now();
     const response1 = await fetch('https://api.example.com/data1');
     const response2 = await fetch('https://api.example.com/data2');
     console.log(`Sequential fetch took ${Date.now() - start} ms`);
   }
   ```
2. Create a function for parallel fetch operations:
   ```javascript
   async function parallelFetch() {
     const start = Date.now();
     const [response1, response2] = await Promise.all([
       fetch('https://api.example.com/data1'),
       fetch('https://api.example.com/data2')
     ]);
     console.log(`Parallel fetch took ${Date.now() - start} ms`);
   }
   ```
3. Call both functions and compare the execution times.

## Example 5: Error Handling in Async Operations

1. Create a function that simulates an async operation with a success/fail condition:
   ```javascript
   function simulateAsyncOperation(shouldSucceed) {
     return new Promise((resolve, reject) => {
       setTimeout(() => {
         if (shouldSucceed) {
           resolve("Operation successful");
         } else {
           reject(new Error("Operation failed"));
         }
       }, 1000);
     });
   }
   ```
2. Create an async function to handle errors:
   ```javascript
   async function handleAsyncErrors() {
     try {
       console.log(await simulateAsyncOperation(true));
       console.log(await simulateAsyncOperation(false));
     } catch (error) {
       console.error("Caught an error:", error.message);
     }
     console.log("Continuing after error");
   }
   ```
3. Call the function and observe how errors are handled.

## Example 6: Race Conditions and Promise.race()

1. Create a function that returns a promise resolving after a given timeout:
   ```javascript
   function asyncOperationWithTimeout(timeout) {
     return new Promise((resolve, reject) => {
       setTimeout(() => {
         resolve(`Operation completed in ${timeout}ms`);
       }, timeout);
     });
   }
   ```
2. Create a function using Promise.race():
   ```javascript
   async function raceExample() {
     const result = await Promise.race([
       asyncOperationWithTimeout(2000),
       asyncOperationWithTimeout(1000),
       asyncOperationWithTimeout(3000)
     ]);
     console.log(result);
   }
   ```
3. Call the function and observe which promise resolves first.

## (Advanced) Example 7: Web Workers for CPU-Intensive Tasks

Note: This example typically runs in a browser environment.

1. Create a main script:
   ```javascript
   function runWorker() {
     const worker = new Worker('worker.js');
     
     worker.postMessage({ number: 42 });
     
     worker.onmessage = function(event) {
       console.log('Result from worker:', event.data);
     };
   }
   ```
2. Create a separate 'worker.js' file:
   ```javascript
   self.onmessage = function(event) {
     const number = event.data.number;
     let result = 0;
     
     // Simulate a CPU-intensive task
     for (let i = 0; i < 1000000000; i++) {
       result += Math.sqrt(number);
     }
     
     self.postMessage(result);
   };
   ```
3. Run the main script in a browser environment and observe how the worker performs the CPU-intensive task without blocking the main thread.


# React and useEffect Examples

These examples demonstrate how to work with async operations in React, particularly using the useEffect hook. Make sure you have a React environment set up before proceeding.

### Example 1: Basic Data Fetching with useEffect

1. Create a new functional component:
   ```jsx
   import React, { useState, useEffect } from 'react';

   function DataFetcher() {
     const [data, setData] = useState(null);

     useEffect(() => {
       fetch('https://api.example.com/data')
         .then(response => response.json())
         .then(result => setData(result))
         .catch(error => console.error('Error fetching data:', error));
     }, []);

     if (!data) return <div>Loading...</div>;
     return <div>{JSON.stringify(data)}</div>;
   }
   ```
2. Use this component in your React app.
3. Observe how the data is fetched when the component mounts and how the UI updates once the data is available.

### Example 2: Async/Await in useEffect

1. Modify the previous example to use async/await:
   ```jsx
   import React, { useState, useEffect } from 'react';

   function AsyncDataFetcher() {
     const [data, setData] = useState(null);

     useEffect(() => {
       async function fetchData() {
         try {
           const response = await fetch('https://api.example.com/data');
           const result = await response.json();
           setData(result);
         } catch (error) {
           console.error('Error fetching data:', error);
         }
       }
       fetchData();
     }, []);

     if (!data) return <div>Loading...</div>;
     return <div>{JSON.stringify(data)}</div>;
   }
   ```
2. Use this component in your React app.
3. Notice how the async function is defined inside useEffect and then called immediately.

### Example 3: Cleanup in useEffect with Async Operations

1. Create a component that simulates a long-running async operation:
   ```jsx
   import React, { useState, useEffect } from 'react';

   function AsyncCounter() {
     const [count, setCount] = useState(0);

     useEffect(() => {
       let isMounted = true;
       const intervalId = setInterval(() => {
         if (isMounted) {
           setCount(prevCount => prevCount + 1);
         }
       }, 1000);

       return () => {
         isMounted = false;
         clearInterval(intervalId);
       };
     }, []);

     return <div>Count: {count}</div>;
   }
   ```
2. Use this component in your React app, perhaps with a toggle to mount/unmount it.
3. Observe how the cleanup function prevents state updates after the component unmounts.

### Example 4: Debouncing API Calls in useEffect

1. Create a component that fetches data based on user input:
   ```jsx
   import React, { useState, useEffect } from 'react';

   function DebouncedSearch() {
     const [query, setQuery] = useState('');
     const [results, setResults] = useState([]);

     useEffect(() => {
       const debounceTimeout = setTimeout(() => {
         if (query) {
           fetch(`https://api.example.com/search?q=${query}`)
             .then(response => response.json())
             .then(data => setResults(data))
             .catch(error => console.error('Error searching:', error));
         }
       }, 300);

       return () => clearTimeout(debounceTimeout);
     }, [query]);

     return (
       <div>
         <input
           type="text"
           value={query}
           onChange={e => setQuery(e.target.value)}
           placeholder="Search..."
         />
         <ul>
           {results.map(item => (
             <li key={item.id}>{item.name}</li>
           ))}
         </ul>
       </div>
     );
   }
   ```
2. Implement this component in your React app.
3. Test it by typing in the search box and observe how the API calls are debounced.

### Example 5: Parallel API Calls in useEffect

1. Create a component that fetches data from multiple APIs in parallel:
   ```jsx
   import React, { useState, useEffect } from 'react';

   function ParallelDataFetcher() {
     const [userData, setUserData] = useState(null);
     const [postsData, setPostsData] = useState(null);

     useEffect(() => {
       async function fetchData() {
         try {
           const [userResponse, postsResponse] = await Promise.all([
             fetch('https://api.example.com/user'),
             fetch('https://api.example.com/posts')
           ]);
           const userData = await userResponse.json();
           const postsData = await postsResponse.json();
           setUserData(userData);
           setPostsData(postsData);
         } catch (error) {
           console.error('Error fetching data:', error);
         }
       }
       fetchData();
     }, []);

     if (!userData || !postsData) return <div>Loading...</div>;
     return (
       <div>
         <h2>User: {userData.name}</h2>
         <h3>Posts:</h3>
         <ul>
           {postsData.map(post => (
             <li key={post.id}>{post.title}</li>
           ))}
         </ul>
       </div>
     );
   }
   ```
2. Implement this component in your React app.
3. Observe how both API calls are made in parallel, potentially improving load times.

These examples demonstrate key concepts of working with async operations in React:

1. Basic data fetching using useEffect
2. Using async/await syntax within useEffect
3. Proper cleanup of async operations to prevent memory leaks
4. Debouncing API calls for performance optimization
5. Making parallel API calls for efficiency