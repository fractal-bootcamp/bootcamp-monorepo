1. Initialize a typescript project 
```sh
bun init
```
2. Build an authentication app using express with NO database:
```sh
bun i express @types/express
```
3. Initialize and open your express app:
```ts
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000, http://localhost:3000');
});
```

5. Run the server
```sh
bun --watch index.ts
```

6. Test that your server is running using curl
```sh
curl localhost:3000
```

7. Add a login POST route that accepts a password and sets an authentication token as a COOKIE if the login is valid
  
- allow urlencoded data to be submitted using middleware
```ts
app.use(express.urlencoded({extended: true}))
```
- allow cookies to be interpreted
```sh
bun i cookier-parser @types/cookie-parser
```
```ts
app.use(cookieParser())
```
- create a POST route that allows the user to login
```ts
app.post('/login', (req, res) => {
  if (req.body.password === SITE_PASSWORD) {
    res.cookie('authToken', VALID_AUTH_TOKEN, { maxAge: 900000, httpOnly: true });
    return res.send('You are now logged in!');
  }
  else {
    return res.send('Incorrect password.');
  }
});
```

8. create a login GET route shows the password form HTML or redirects to dashboard AND create a dashboard GET route that shows the dashboard if authed, or redirects to login
```ts
app.get('/dashboard', (req, res) => {
  if (req.cookies.authToken === VALID_AUTH_TOKEN) {
    return res.send('Welcome to the dashboard, you are logged in!');
  }
  return res.redirect('/login');
})

app.get('/login', (req, res) => {
  if (req.cookies.authToken === VALID_AUTH_TOKEN) {
    return res.redirect('/dashboard');
  }
  return res.sendFile(__dirname + '/login.html');
});
```

- Build the login.html
```html
<div>
    <form action="/login" method="POST">
        <label for="password">Enter the Secret Password</label>
        <input type="password" name="password" placeholder="Password">
        <button type="submit">Login</button>
    </form>
</div>
```

9. Add a logout route that clears all the cookies
```ts
app.get('/logout', (req, res) => {
  res.clearCookie('authToken');
  return res.redirect('/login');
});
```
