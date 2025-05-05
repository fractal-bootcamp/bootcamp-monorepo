### JAVASCRIPT SCALE 2 - Working with Arrays and Objects.
##### Pre-requisite: Javascript Scale 1: Functions

This tutorial demonstrates standard library operations on data structures using PURE functions (that means functions which don't modify any external state, they only return a value based on the input). We'll work with a state object containing an array of books.

## Step 1: Set up the Dataset and State

First, define your types and initial state:

```typescript
type Book = {
  id: number;
  title: string;
  author: string;
  year: number;
  genres: string[];
};

type AppState = {
  books: Book[];
};

const initialState: AppState = {
  books: [
    { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960, genres: ["Fiction", "Drama"] },
    { id: 2, title: "1984", author: "George Orwell", year: 1949, genres: ["Fiction", "Dystopian"] },
    { id: 3, title: "Pride and Prejudice", author: "Jane Austen", year: 1813, genres: ["Fiction", "Romance"] },
    { id: 4, title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937, genres: ["Fiction", "Fantasy"] },
    { id: 5, title: "To the Lighthouse", author: "Virginia Woolf", year: 1927, genres: ["Fiction", "Modernist"] },
  ]
};
```

## Step 2: Basic Array Operations

Let's start with basic array operations.
Type all these operations by hand and test them one by one.

```typescript
// return the first book in the books array
function getFirstBook(state: AppState): Book | undefined {
  return state.books[0];
}
```

Test the function:
```typescript
function demonstrateBasicOperations(state: AppState): void {
  const firstBook = getFirstBook(state);
  console.log("First book:", firstBook);
}
```

Okay, not let's build some more functions.
1. Get the last book in the books list
2. Add a new book to the END of the books list
3. remove the first book from the books list
4. find a book by title
5. filter to all the books with a given genre
6. Does the library have a book with a given author?

```typescript
function getLastBook(state: AppState): Book | undefined {
  return state.books[state.books.length - 1];
}

function addBook(state: AppState, newBook: Book): AppState {
  return {
    ...state,
    books: [...state.books, newBook]
  };
}

function removeFirstBook(state: AppState): AppState {
  const booksWithoutFirst = state.books.slice(1); // remember: slice() returns a COPY, so it's not mutating the original array
  return {
    ...state,
    books: booksWithoutFirst
  };
}

function findBookByTitle(state: AppState, title: string): Book | undefined {
  return state.books.find(book => book.title === title);
}

// filter is a powerful array method that takes a function which returns a boolean
// the function is applied to each element in the array, and the elements which return true are returned
function filterBooksByGenre(state: AppState, genre: string): Book[] {
  return state.books.filter(book => book.genres.includes(genre));
}

// does the library have a book with the given author?
function libraryHasAuthor(state: AppState, author: string): boolean {
  return state.books.some(book => book.author === author);
}

// Okay, now let's test all these functions (you can also do this one step at a time yourself):
function demonstrateBasicOperations(state: AppState): void {
  console.log("First book:", getFirstBook(state));
  console.log("Last book:", getLastBook(state));
  
  const newBook: Book = { id: 6, title: "Dune", author: "Frank Herbert", year: 1965, genres: ["Science Fiction"] };
  const updatedState = addBook(state, newBook);
  console.log("Books after adding:", updatedState.books);
  
  const stateWithoutFirst = removeFirstBook(state);
  console.log("Books without first:", stateWithoutFirst.books);
  
  console.log("Found book:", findBookByTitle(state, "1984"));

  const fictionBooks = filterBooksByGenre(state, "Fiction");
  console.log("Fiction books:", fictionBooks);

  const hasJaneBook = libraryHasAuthor(state, "Jane Austen");
  console.log("Has Jane Austen book?:", hasJaneBook);

}
```

## Step 3: Array Transformation

Now let's look at methods for transforming arrays:

```typescript
function getAllTitles(state: AppState): string[] {
  return state.books.map(book => book.title);
}

function getModernBooks(state: AppState): Book[] {
  return state.books.filter(book => book.year > 1950);
}

// get the earliest publication year by reducing the books array to the minimum year
// remember: reduce() is a higher-order function that takes a reducer function and an initial value
// the reducer function takes the current minimum year and the current book, and returns whichever is smaller
// for future iterations.
// it runs the reducer function on each element in the array, and returns the final reduced value
function getEarliestPublicationYear(state: AppState): number {
  return state.books.reduce((earliest, book) => Math.min(earliest, book.year), Infinity);
}

// sort the books by year
// remember: sort() MODIFIES the array in place
// if you want a "pure" version, use `toSorted()` instead
function sortBooksByYear(state: AppState): AppState {
  const sortedBooks = [...state.books].sort((a, b) => a.year - b.year);
  return {
    ...state,
    books: sortedBooks
  }
}

// example of using toSorted()
function sortBooksByYear2(state: AppState): AppState {
  return {
    ...state,
    books: state.books.toSorted((a, b) => a.year - b.year)
  }
}

// remember: reverse() MODIFIES the array in place
// if you want a "pure" version, use `toReversed()` instead
function reverseBooks(state: AppState): AppState {
  const reversedBooks = [...state.books].reverse();
  return {
    ...state,
    books: reversedBooks
  }
}
// example of using toReversed()
function reverseBooks2(state: AppState): AppState {
  return {
    ...state,
    books: state.books.toReversed()
  }
}

// Usage
function demonstrateArrayTransformations(state: AppState): void {
  console.log("All titles:", getAllTitles(state));
  console.log("Modern books:", getModernBooks(state));
  console.log("Earliest publication year:", getEarliestPublicationYear(state));
  
  console.log("Books sorted by year:", sortBooksByYear(state));
  console.log("Books sorted by year 2:", sortBooksByYear2(state));

  console.log("Reversed books:", reverseBooks(state));
  console.log("Reversed books 2:", reverseBooks2(state));
}
```

## Step 4: Advanced Array Operations

Let's explore some more advanced array operations:

```typescript
// flatMap() is a version of map() that works on nested arrays
// it takes a function which returns an array, and flattens the returned array
// for example, if you have an array of books, and each book has an array of genres
// flatMap() can return all the genres in a single array, instead of an array of arrays
// this is super useful.
function getAllGenres(state: AppState): string[] {
  const allGenres = state.books.flatMap(book => book.genres);
  const removeDuplicates = new Set(allGenres);
  return [...removeDuplicates];
}

// get a list of all the authors and titles of all the books
function getAllAuthorsAndTitles(state: AppState): string[][] {
  return state.books.map(book => [book.author, book.title]);
}

// does every book have a fiction genre?
function areAllBooksFiction(state: AppState): boolean {
  return state.books.every(book => book.genres.includes("Fiction"));
}

// does every book have a title?
function doAllBooksHaveTitles(state: AppState): boolean {
  return state.books.every(book => book.title && book.title.length > 0);
}

// get a count of each genre in the library
// reduce is a great choice for this because the return value is a singular new object, not an array; whereas map() return an array 
function getGenreCounts(state: AppState): Record<string, number> {
  return state.books.reduce((counts, book) => {
    book.genres.forEach(genre => {
      counts[genre] = (counts[genre] || 0) + 1;
    });
    return counts;
  }, {} as Record<string, number>);
}

// Usage
function demonstrateAdvancedOperations(state: AppState): void {
  console.log("All genres (flattened):", getAllGenres(state));
  console.log("Authors and their books:", getAuthorsAndBooks(state));
  console.log("All books are fiction:", areAllBooksFiction(state));
  console.log("All books have titles:", doAllBooksHaveTitles(state));
  console.log("Genre counts:", getGenreCounts(state));
}
```

## Step 5: Object Operations

Now let's look at operations on individual book objects:

```typescript
function getBookProperties(book: Book): string[] {
  return Object.keys(book);
}

function getBookValues(book: Book): any[] {
  return Object.values(book);
}

function getBookEntries(book: Book): [string, any][] {
  return Object.entries(book);
}

function shallowCloneBook(book: Book): Book {
  return {...book};
}

function cloneBook(book: Book): Book {
  return structuredClone(book);
}

function changeYearOfBook(book: Book, year: number): Book {
  return { ...book, year: year };
}

// Usage
function demonstrateObjectOperations(state: AppState): void {
  const book = state.books[0];
  console.log("Book:", book);
  console.log("Book properties:", getBookProperties(book));
  console.log("Book values:", getBookValues(book));
  console.log("Book entries:", getBookEntries(book));
  console.log("Cloned book:", cloneBook(book));
  const newBook = changeYearOfBook(book, 1984);
  console.log("Book with changed year:", newBook);
}
```

## Step 6: Destructuring

Let's practice destructuring objects and arrays:

```typescript
function logBookInfo(book: Book): void {
  const { title, author, year } = book;
  console.log(`${title} was written by ${author} in ${year}`);
}

function logBookInfoWithRest(book: Book): void {
  const { title, author, year, ...rest } = book;
  console.log(`${title} was written by ${author} in ${year}`);
  console.log("Other properties:", rest);
}

function getFirstTwoBooks(state: AppState): [Book, Book, Book[]] {
  const [firstBook, secondBook, ...restBooks] = state.books;
  return [firstBook, secondBook, restBooks];
}

function getPrimaryGenre(book: Book): string | undefined {
  const [primaryGenre] = book.genres;
  return primaryGenre;
}

// Usage
function demonstrateDestructuring(state: AppState): void {
  logBookInfo(state.books[0]);
  logBookInfoWithRest(state.books[0]);
  const [first, second, rest] = getFirstTwoBooks(state);
  console.log("First book:", first);
  console.log("Second book:", second);
  console.log("Rest of the books:", rest);
  console.log("Primary genre of the first book:", getPrimaryGenre(state.books[0]));
}
```


## Final Step: Putting It All Together

Now let's use all these functions:

```typescript
function runDemo(initialState: AppState): void {
  console.log("--- Basic Operations ---");
  demonstrateBasicOperations(initialState);

  console.log("\n--- Array Transformations ---");
  demonstrateArrayTransformations(initialState);

  console.log("\n--- Advanced Operations ---");
  demonstrateAdvancedOperations(initialState);

  console.log("\n--- Object Operations ---");
  demonstrateObjectOperations(initialState);

  console.log("\n--- Destructuring ---");
  demonstrateDestructuring(initialState);

}

runDemo(initialState);
```
