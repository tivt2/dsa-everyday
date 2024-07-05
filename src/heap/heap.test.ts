import { beforeEach, describe, expect, test } from "vitest"
import { Heap, heap_comp_fn } from "./heap"

describe("heap data structure", () => {
    let min_heap: Heap<number>
    let cmp_fn: heap_comp_fn<number> = (a, b) => a < b
    beforeEach(() => {
        min_heap = new Heap(cmp_fn)
    })

    test("push()", () => {
        expect(min_heap.length).toEqual(0)

        const input = [2, 4, 1, 5, 3]
        for (const data of input) {
            min_heap.push(data)
        }
        expect(min_heap.length).toEqual(5)
        expect(min_heap.data).toEqual([1, 3, 2, 5, 4])
    })

    test("pop()", () => {
        const input = [2, 4, 1, 5, 3]
        for (const data of input) {
            min_heap.push(data)
        }

        // [1,3,2,5,4]
        expect(min_heap.pop()).toEqual(1)
        expect(min_heap.length).toEqual(4)
        // [2,3,4,5]
        expect(min_heap.pop()).toEqual(2)
        expect(min_heap.length).toEqual(3)
        // [3,5,4]
        expect(min_heap.pop()).toEqual(3)
        expect(min_heap.length).toEqual(2)
        // [4,5]
        expect(min_heap.pop()).toEqual(4)
        expect(min_heap.length).toEqual(1)
        // [5]
        expect(min_heap.pop()).toEqual(5)
        expect(min_heap.length).toEqual(0)
    })

    test("peek()", () => {
        const input = [2, 4, 1, 5, 3]
        for (const data of input) {
            min_heap.push(data)
        }

        // [1,3,2,5,4]
        expect(min_heap.peek()).toEqual(1)
        min_heap.pop()
        // [2,3,4,5]
        expect(min_heap.peek()).toEqual(2)
        min_heap.pop()
        // [3,5,4]
        expect(min_heap.peek()).toEqual(3)
        min_heap.pop()
        // [4,5]
        expect(min_heap.peek()).toEqual(4)
        min_heap.pop()
        // [5]
        expect(min_heap.peek()).toEqual(5)
        min_heap.pop()
    })
})
