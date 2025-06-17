# Testing and TDD

As your code bases get larger, testing becomes more and more important. In general, more tests is better;
all your core logic and components should definitely be tested. A healthy suite of tests
is your primary defense against shipping broken code to production.

## Readings

- (10min) [Design for Testability](https://blog.nelhage.com/2016/03/design-for-testability/)

## Instructions

- Follow the Next.js guide for using [vitest](https://nextjs.org/docs/app/guides/testing/vitest).
- Add unit tests for single bits of logic, complex functions, or client-side components
- Follow the Next.js guide for [Cypress](https://nextjs.org/docs/app/guides/testing/cypress)
- Write at least one end-to-end test using cypress
- Set up Vercel to [automatically run the tests when it builds](https://github.com/vercel/vercel/discussions/4589#discussioncomment-85589)