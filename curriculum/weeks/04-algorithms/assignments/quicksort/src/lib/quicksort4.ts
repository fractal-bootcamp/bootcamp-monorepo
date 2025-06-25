
export type QuickSortNode = {
    unsortedArr: number[],
    pivot: number,
    left?: Partial<QuickSortNode>,
    right?: Partial<QuickSortNode>,
    sortedArr: number[],
}

// okay so my quicksort has a couple purposes.
// 1. it should sort the array
// 2. it should fill in the node that it is passed with as much information as possible.
// the animation state is a bit of a hack, but it's the best way to get the frames to work.
// and it stores global state that will be tracked and updated for the duration of the whole quicksort.
// whereas node and arr are just local state that are passed into each recursive call of quicksort.
export function quicksortForAnimation(arr: number[], node: Partial<QuickSortNode>, animationState: { frames: Partial<QuickSortNode>[], tree: Partial<QuickSortNode> }): number[] {
    // anytime that the state substantially changes, we should push a new frame.
    animationState.frames.push(structuredClone(animationState.tree))
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr.pop()!;
    node.pivot = pivot;
    animationState.frames.push(structuredClone(animationState.tree))
    const left = arr.filter(x => x <= pivot);
    node.left = {
        unsortedArr: structuredClone(left)
    }
    animationState.frames.push(structuredClone(animationState.tree))
    const right = arr.filter(x => x > pivot);
    node.right = {
        unsortedArr: structuredClone(right)
    }
    animationState.frames.push(structuredClone(animationState.tree))

    const sortedArr = [...quicksortForAnimation(left, node.left, animationState), pivot, ...quicksortForAnimation(right, node.right, animationState)];

    node.sortedArr = structuredClone(sortedArr);
    animationState.frames.push(structuredClone(animationState.tree))
    // just obviously my sort function sorts the array duh
    return sortedArr;
}