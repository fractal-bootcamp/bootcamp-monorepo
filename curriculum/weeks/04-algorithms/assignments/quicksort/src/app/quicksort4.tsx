"use client"
import { quicksortForAnimation, QuickSortNode } from "@/lib/quicksort4"
import { useControls } from "leva";
import { useEffect, useState } from "react";

const SAMPLE_ARRAY = [64, 34, 1, 25, 12, 3, 22, 8, 2, 11, 90, 88, 76, 50, 42, 33, 21, 30];

// as a side effect of running the sorting function.
const quicksortTree: Partial<QuickSortNode> = {
    unsortedArr: structuredClone(SAMPLE_ARRAY)
}

const animationState = {
    frames: [],
    tree: quicksortTree
}
quicksortForAnimation(SAMPLE_ARRAY, quicksortTree, animationState)

console.log(animationState.frames)

function QuicksortNode({ node }: { node: Partial<QuickSortNode> }) {
    if (!node.unsortedArr) {
        return null;
    }

    return (
        <div className="flex flex-col gap-2">
            {node.unsortedArr && <div className="flex flex-row justify-between">
                {node.unsortedArr.map((num, idx) => (
                    <div key={idx} className="w-8 h-8 flex items-center justify-center border text-sm">
                        {num}
                    </div>
                ))}
            </div>}
            <div className="flex flex-row gap-2">
                <div>
                    {node.left && <QuicksortNode node={node.left} />}
                </div>
                <div>
                    {node.pivot}
                </div>
                <div>
                    {node.right && <QuicksortNode node={node.right} />}
                </div>
            </div>
            {node.sortedArr && <div className="flex flex-row">
                {node.sortedArr.map((num, idx) => (
                    <div key={idx} className="w-8 h-8 flex items-center justify-center border text-sm">
                        {num}
                    </div>
                ))}
            </div>}
        </div>
    )
}

export default function QuicksortVisualization() {
    // const { currentFrame } = useControls({ currentFrame: { value: 0, min: 0, max: animationState.frames.length - 1, step: 1 } })

    const [currentFrame, setCurrentFrame] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [animSpeed, setAnimSpeed] = useState(10)

    console.log(currentFrame, animationState.frames.length)

    useEffect(() => {
        if (!isPlaying || currentFrame >= animationState.frames.length - 1) {
            return
        }

        const timer = setTimeout(() => {
            setCurrentFrame(currentFrame + 1)
        }, animSpeed)

        return () => clearTimeout(timer)
    }, [currentFrame, isPlaying, animSpeed])

    return (
        <div>
            <h1 className="text-2xl font-bold mb-5">Quick Sort Animation!</h1>
            <button onClick={() => setIsPlaying(prev => !prev)} className="bg-blue-500 text-white p-2 rounded-md mb-5">
                {isPlaying ? "Pause" : "Play"}
            </button>
            <button onClick={() => setCurrentFrame(0)} className="bg-blue-500 text-white p-2 rounded-md mb-5">
                Reset
            </button>
            <input type="range" min={1} max={100} value={animSpeed} onChange={e => setAnimSpeed(Number(e.target.value))} className="w-full mb-5" />
            <QuicksortNode node={animationState.frames[currentFrame]} />
            {/* {JSON.stringify(animationState.frames)} */}
        </div>
    );
}
