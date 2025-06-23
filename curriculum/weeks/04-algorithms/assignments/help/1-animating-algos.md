# Algorithm Animation Tutorial

## Part 1: Sorting a List of Data

### 1.1 Define the Problem

Before jumping into code, let's think about what we're actually trying to do.

**Your turn:** What exactly are you promising to deliver when you say "I will sort this array"?

*This question forces you to think about contracts and edge cases before writing any code. A clear problem definition prevents bugs and confusion later.*

### 1.2 Choose Your Method

**Your turn:** Which sorting algorithm will be most interesting to watch in action?

*Different algorithms create different visual stories. Bubble sort shows many small swaps. Merge sort shows divide-and-conquer clearly. Your choice here determines what your animation will teach viewers.*

### 1.3 Write Out the Steps

**Your turn:** Before coding, write out your algorithm in pseudocode or draw the steps on paper.

This helps you identify what the key operations are and when the data changes. These moments become your animation frames later.

### 1.4 Build the Function

**Your turn:** Implement your chosen sorting algorithm.

```typescript
function yourSort(arr: number[]): number[] {
  // Your implementation here
}
```

Test it with a few arrays to make sure it works before moving to animation.

## Part 2: Animating the Algorithm

### 2.1 Define the Animation Problem

Now we want to show how your algorithm works step by step.

**Your turn:** How many state changes will your algorithm generate for an array of size 1000?

*This question reveals the scaling challenge. If your algorithm makes O(n²) comparisons, that's a million animation frames for n=1000. Understanding this early helps you plan for performance.*

### 2.2 Design a Single State

Animation is just state changing over time. So first, figure out what one "frame" looks like.

**Your turn:** If you could only capture one moment in your algorithm's execution to show to someone, what information would you need to make that moment completely understandable?

*This forces you to identify the essential visual elements. The answer becomes your state interface.*

```typescript
interface YourAlgorithmState {
  // What data do you need?
  // What visual indicators do you need?
  // What metadata helps users understand what's happening?
}
```

### 2.3 Build a React Component

React lets you create a function that takes your state and renders it. Change the state, and React automatically updates the display.

**Your turn:** Build a component that can render any single state:

```typescript
function YourAlgorithmVisualizer({ state }: { state: YourAlgorithmState }) {
  return (
    <div>
      {/* Render the array */}
      {/* Show visual indicators */}
      {/* Display current operation */}
    </div>
  );
}
```

Test this component by manually creating a few different states and making sure they render correctly.

### 2.4 Capture All States

Now you need to collect every state as your algorithm runs.

**Your turn:** Should your sorting function return the sorted array, or return a history of how it got there?

*This question gets to the heart of function design. A function that returns history can't be used as a normal sort function. But a function that takes a callback can do both - sort normally when no callback is provided, or capture states when one is.*

Here are your two approaches:

**Approach A: Return a history array**
```typescript
function yourSortWithHistory(arr: number[]): YourAlgorithmState[] {
  // Returns all states, can't be used as normal sort
}
```

**Approach B: Accept a callback function** 
```typescript
function yourSortWithCallback(
  arr: number[],
  onStateChange?: (state: YourAlgorithmState) => void
): number[] {
  // Can work as normal sort OR capture states
}
```

### 2.5 Implement State Collection

Pick one approach and implement it.

**Key question:** At what moments in your algorithm should you capture state?

*You don't need to capture every tiny change. Focus on moments when something visually meaningful happens - comparisons, swaps, or major operations starting/ending.*

### 2.6 Build the Animation Controller

**Your turn:** Create a React component that can play through your captured states:

```typescript
function AnimatedSort() {
  const [frames, setFrames] = useState<YourAlgorithmState[]>([]);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const runSort = (inputArray: number[]) => {
    // Use your chosen approach to get all frames
    // Set them in state
  };
  
  return (
    <div>
      <YourAlgorithmVisualizer state={frames[currentFrame]} />
      {/* Add controls */}
    </div>
  );
}
```

## Example:

I built a little slop example using Claude that you can find [here](https://claude.ai/public/artifacts/50c5c15c-3bbd-4ff4-9269-896104c915c4).

It's not very good, so don't copy it, but it is demonstrative. This is ideal, imo, so you have room to improve it but also learn from it.

## Key Insights

**The big idea:** Animation is just state changing over time. Instead of trying to manipulate the DOM as your algorithm runs, you capture snapshots of important moments, then let React render them declaratively.

**Why this approach works:** Algorithm logic stays separate from visualization. You can test your sorting function independently. React handles all the DOM updates automatically.

**Performance insight:** For large arrays, you might need to sample frames rather than capture every state change.

**Architectural choice:** The callback approach gives you more flexibility - the same function can work as a normal sort or capture states for animation.