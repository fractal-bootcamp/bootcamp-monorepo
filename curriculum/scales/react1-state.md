### REACT SCALE 1 - Input // Output Box
##### Pre-requisites: Javascript Scale 1 (doesn't exist // pre-course material covered this)

1. Create a new react app
```sh
bun create vite
```
- Choose React and Typescript

2. Gut the App.tsx
```ts
import { useState } from 'react'

function App() {

  return (
    <>

    </>
  )
}

export default App
```

3. Create an input

```ts
function App() {
  return (
    <>
      <input type="text" />
    </>
  )
}
```

4. Create a button
```ts
function App() {

  return (
    <>
      <input type="text" />
      <button type="submit">Submit</button>
    </>
  )
}
```

5. CONTROL the input
```ts
function App() {

  const [input, setInput] = useState('')

  return (
    <>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      <button type="submit">Submit</button>
    </>
  )
}
```

6. When the user clicks the button, put the INPUT into an OUTPUT box.
```ts
function App() {

  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  return (
    <>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      <button type="submit" onClick={() => setOutput(input)}>Submit</button>
      <div>{output}</div>
    </>
  )
}
```

7. whenever the output changes, console.log "new output!"
```ts
function App() {

  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  useEffect(() => {
    console.log("new output!", output)
  }, [output])

  return (
    <>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      <button type="submit" onClick={() => setOutput(input)}>Submit</button>
      <div>{output}</div>
    </>
  )
}
```