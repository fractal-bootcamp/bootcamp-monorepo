### REACT SCALE 2 - Props, Children, and Controlled Components
##### Pre-requisites: React Scale 1 (Input/Output Box)

1. Create a new react app
```sh
bun create vite
```
- Choose React and TypeScript

2. Set up the App.tsx file
```tsx
import { useState } from 'react'

function App() {
  return (
    <>
      <h1>Props and Controlled Components</h1>
    </>
  )
}

export default App
```

3. Create a new component called InputField
```tsx
function InputField() {
  return (
    <input type="text" />
  )
}

function App() {
  return (
    <>
      <h1>Props and Controlled Components</h1>
      <InputField />
    </>
  )
}
```

4. Pass a prop to InputField for placeholder text
```tsx
function InputField({ placeholder }: { placeholder: string }) {
  return (
    <input type="text" placeholder={placeholder} />
  )
}

function App() {
  return (
    <>
      <h1>Props and Controlled Components</h1>
      <InputField placeholder="Enter your name" />
    </>
  )
}
```

5. Make InputField a controlled component
```tsx
function InputField({ placeholder, value, onChange }: { placeholder: string; value: string; onChange: (value: string) => void }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

function App() {
  const [name, setName] = useState('')

  return (
    <>
      <h1>Props and Controlled Components</h1>
      <InputField
        placeholder="Enter your name"
        value={name}
        onChange={setName}
      />
    </>
  )
}
```

6. Add a submit button and display the entered name
```tsx
function InputField({ placeholder, value, onChange }: { placeholder: string; value: string; onChange: (value: string) => void }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

function App() {
  const [name, setName] = useState('')
  const [submittedName, setSubmittedName] = useState('')

  const handleSubmit = () => {
    setSubmittedName(name)
  }

  return (
    <>
      <h1>Props and Controlled Components</h1>
      <InputField
        placeholder="Enter your name"
        value={name}
        onChange={setName}
      />
      <button onClick={handleSubmit}>Submit</button>
      {submittedName && <p>Hello, {submittedName}!</p>}
    </>
  )
}
```

7. Create a new component called NameDisplay to show the submitted name
```tsx
function InputField({ placeholder, value, onChange }: { placeholder: string; value: string; onChange: (value: string) => void }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

function NameDisplay({ name }: { name: string }) {
  return <p>Hello, {name}!</p>
}

function App() {
  const [name, setName] = useState('')
  const [submittedName, setSubmittedName] = useState('')

  const handleSubmit = () => {
    setSubmittedName(name)
  }

  return (
    <>
      <h1>Props and Controlled Components</h1>
      <InputField
        placeholder="Enter your name"
        value={name}
        onChange={setName}
      />
      <button onClick={handleSubmit}>Submit</button>
      {submittedName && <NameDisplay name={submittedName} />}
    </>
  )
}
```

8. Add error handling for empty input
```tsx

interface InputFieldProps {
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

function InputField({ placeholder, value, onChange, error }: InputFieldProps) {
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ borderColor: error ? 'red' : undefined }}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

function NameDisplay({ name }: { name: string }) {
  return <p>Hello, {name}!</p>
}

function App() {
  const [name, setName] = useState('')
  const [submittedName, setSubmittedName] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (name.trim() === '') {
      setError('Name cannot be empty')
    } else {
      setSubmittedName(name)
      setError('')
    }
  }

  return (
    <>
      <h1>Props and Controlled Components</h1>
      <InputField
        placeholder="Enter your name"
        value={name}
        onChange={setName}
        error={error}
      />
      <button onClick={handleSubmit}>Submit</button>
      {submittedName && <NameDisplay name={submittedName} />}
    </>
  )
}
```


9. Stop destructuring props in the function signature on InputField. Verify to yourself that this works exactly the same as the previous example.

```tsx

interface InputFieldProps {
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

function InputField(props: InputFieldProps) {
  return (
    <div>
      <input
        type="text"
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        style={{ borderColor: props.error ? 'red' : undefined }}
      />
      {props.error && <p style={{ color: 'red' }}>{props.error}</p>}
    </div>
  )
}
```



10.   Instead, destructure props in the function BODY of InputField. Verify to yourself that this works exactly the same as the previous TWO examples.

```tsx

interface InputFieldProps {
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

function InputField(props: InputFieldProps) {
  const { placeholder, value, onChange, error } = props;
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ borderColor: error ? 'red' : undefined }}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}
```