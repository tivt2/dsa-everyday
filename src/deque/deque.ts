export class Deque<T> {
    public left: number = 0
    public right: number = 0
    public len: number = 0
    public cap: number = 1
    public buffer: Array<T> = new Array(this.cap)

    get length(): number {
        return this.len
    }

    push_right(data: T): Deque<T> {
        if (this.len == this.cap) {
            this.grow()
        }

        this.buffer[this.right] = data
        this.right = this.forward(this.right)
        this.len++

        return this
    }

    pop_right(): T | undefined {
        if (this.len == 0) {
            return undefined
        }

        this.right = this.backward(this.right)
        this.len--
        return this.buffer[this.right]
    }

    peek_right(): T | undefined {
        if (this.len == 0) {
            return undefined
        }

        return this.buffer[this.backward(this.right)]
    }

    push_left(data: T): Deque<T> {
        if (this.len == this.cap) {
            this.grow()
        }

        this.left = this.backward(this.left)
        this.buffer[this.left] = data
        this.len++

        return this
    }

    pop_left(): T | undefined {
        if (this.len == 0) {
            return undefined
        }

        const data = this.buffer[this.left]
        this.left = this.forward(this.left)
        return data
    }

    peek_left(): T | undefined {
        if (this.len == 0) {
            return undefined
        }

        return this.buffer[this.left]
    }

    private grow(): void {
        if (this.right <= this.left) {
            for (let i = 0; i < this.right; i++) {
                this.buffer[this.cap + i] = this.buffer[i]
            }
            this.right = this.left + this.cap
        }

        this.cap *= 2
    }

    private forward(n: number): number {
        return (n + 1) % this.cap
    }

    private backward(n: number): number {
        return (n == 0 ? this.cap : n) - 1
    }
}
