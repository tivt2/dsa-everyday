import { beforeEach, describe, expect, test } from "vitest"
import { RingBuffer } from "./ring-buffer"

describe("ring-buffer data structure", () => {
    let ring_buffer: RingBuffer<number>
    beforeEach(() => {
        ring_buffer = new RingBuffer(8)
    })

    test("initialization+length()", () => {
        expect(ring_buffer.buffer).toEqual(new Array(8))
        expect(ring_buffer.length).toEqual(0)
    })

    test("write()", () => {
        const input = [1, 2, 3, 4]
        for (let i = 0; i < input.length; i++) {
            ring_buffer.write(input[i])
        }

        expect(ring_buffer.length).toEqual(input.length)
        for (let i = 0; i < input.length; i++) {
            expect(ring_buffer.buffer[i]).toEqual(input[i])
        }
    })

    test("read()", () => {
        const input = [1, 2, 3, 4]
        for (let i = 0; i < input.length; i++) {
            ring_buffer.write(input[i])
        }

        for (let i = 0; i < input.length; i++) {
            expect(ring_buffer.length).toEqual(input.length - i)
            expect(ring_buffer.read()).toEqual(input[i])
        }
        expect(ring_buffer.length).toEqual(0)
    })

    test("peek()", () => {
        const input = [1, 2, 3, 4]
        for (let i = 0; i < input.length; i++) {
            ring_buffer.write(input[i])
        }

        expect(ring_buffer.peek()).toEqual(input[0])
    })

    test("compound test", () => {
        const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        for (let i = 0; i < input.length; i++) {
            ring_buffer.write(input[i])
        }
        expect(ring_buffer.length).toEqual(8)

        expect(ring_buffer.peek()).toEqual(3)
        expect(ring_buffer.read()).toEqual(3)
        expect(ring_buffer.read()).toEqual(4)
        expect(ring_buffer.length).toEqual(6)

        expect(ring_buffer.buffer).toEqual([9, 10, 3, 4, 5, 6, 7, 8])
        expect(ring_buffer.peek()).toEqual(5)
    })
})
