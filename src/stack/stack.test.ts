import { describe, test, expect, beforeEach } from "vitest"
import { Stack } from "./stack"

describe("stack data structure", () => {
    let stack: Stack<number>
    beforeEach(() => {
        stack = new Stack<number>()
    })

    test("push", () => {
        expect(stack.data.length == 0)

        const input = [5, 4, 3]
        for (let i = 0; i < input.length; i++) {
            stack.push(input[i])
        }

        expect(stack.data.length == 3)
        for (let i = 0; i < input.length; i++) {
            expect(stack.data[i] == input[i])
        }
    })

    test("pop", () => {
        const input = [5, 4, 3]
        for (let i = 0; i < input.length; i++) {
            stack.push(input[i])
        }

        for (let i = input.length; i >= 0; i--) {
            expect(stack.pop() == input[i])
        }
    })

    test("peek", () => {
        const input = [5, 4, 3]
        for (let i = 0; i < input.length; i++) {
            stack.push(input[i])
            expect(stack.peek() == input[input.length])
        }
    })

    test("length", () => {
        const input = [5, 4, 3]
        for (let i = 0; i < input.length; i++) {
            expect(stack.length() == i)
            stack.push(input[i])
        }
        expect(stack.length() == input.length)
    })
})
