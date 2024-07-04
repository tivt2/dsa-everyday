import { beforeEach, describe, expect, test } from "vitest"
import { Deque } from "./deque"

describe("deque structure", () => {
    let deque: Deque<number>
    beforeEach(() => {
        deque = new Deque()
    })

    test("push_right()", () => {
        expect(deque.length).toEqual(0)

        const input = [1, 2, 3, 4]
        for (const data of input) {
            deque.push_right(data)
        }
        expect(deque.length).toEqual(4)
        expect(deque.buffer).toEqual([1, 2, 3, 4])
    })

    test("push_right() + pop_right()", () => {
        const input = [1, 2, 3, 4]
        for (const data of input) {
            deque.push_right(data)
        }

        expect(deque.pop_right()).toEqual(4)
        expect(deque.pop_right()).toEqual(3)
        expect(deque.pop_right()).toEqual(2)
        expect(deque.pop_right()).toEqual(1)
    })

    test("push_right() + peek_right()", () => {
        const input = [1, 2, 3, 4]
        for (const data of input) {
            deque.push_right(data)
        }

        expect(deque.peek_right()).toEqual(4)
        deque.pop_right()
        expect(deque.peek_right()).toEqual(3)
        deque.pop_right()
        expect(deque.peek_right()).toEqual(2)
        deque.pop_right()
        expect(deque.peek_right()).toEqual(1)
        deque.pop_right()
    })

    test("push_left()", () => {
        const input = [1, 2, 3, 4]
        for (const data of input) {
            deque.push_left(data)
        }
        expect(deque.length).toEqual(4)
        expect(deque.buffer).toEqual([3, 2, 1, 4])
    })

    test("push_left() + pop_left()", () => {
        const input = [1, 2, 3, 4]
        for (const data of input) {
            deque.push_left(data)
        }

        expect(deque.pop_left()).toEqual(4)
        expect(deque.pop_left()).toEqual(3)
        expect(deque.pop_left()).toEqual(2)
        expect(deque.pop_left()).toEqual(1)
    })

    test("push_left() + peek_left()", () => {
        const input = [1, 2, 3, 4]
        for (const data of input) {
            deque.push_left(data)
        }

        expect(deque.peek_left()).toEqual(4)
        deque.pop_left()
        expect(deque.peek_left()).toEqual(3)
        deque.pop_left()
        expect(deque.peek_left()).toEqual(2)
        deque.pop_left()
        expect(deque.peek_left()).toEqual(1)
        deque.pop_left()
    })

    test("push_right() + pop_left()", () => {
        const input = [1, 2, 3, 4]
        for (const data of input) {
            deque.push_right(data)
        }

        expect(deque.pop_left()).toEqual(1)
        expect(deque.pop_left()).toEqual(2)
        expect(deque.pop_left()).toEqual(3)
        expect(deque.pop_left()).toEqual(4)
    })

    test("push_left() + pop_right()", () => {
        const input = [1, 2, 3, 4]
        for (const data of input) {
            deque.push_left(data)
        }

        expect(deque.pop_right()).toEqual(1)
        expect(deque.pop_right()).toEqual(2)
        expect(deque.pop_right()).toEqual(3)
        expect(deque.pop_right()).toEqual(4)
    })

    test("push_right() + peek_left()", () => {
        const input = [1, 2, 3, 4]
        for (const data of input) {
            deque.push_right(data)
        }

        expect(deque.peek_left()).toEqual(1)
        deque.pop_left()
        expect(deque.peek_left()).toEqual(2)
        deque.pop_left()
        expect(deque.peek_left()).toEqual(3)
        deque.pop_left()
        expect(deque.peek_left()).toEqual(4)
        deque.pop_left()
    })

    test("push_left() + peek_right()", () => {
        const input = [1, 2, 3, 4]
        for (const data of input) {
            deque.push_left(data)
        }

        expect(deque.peek_right()).toEqual(1)
        deque.pop_right()
        expect(deque.peek_right()).toEqual(2)
        deque.pop_right()
        expect(deque.peek_right()).toEqual(3)
        deque.pop_right()
        expect(deque.peek_right()).toEqual(4)
        deque.pop_right()
    })
})
