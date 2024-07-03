export class RingBuffer<T> {
    public head = 0
    public tail = 0
    public len = 0
    public buffer: Array<T>
    constructor(public capacity: number = 8) {
        this.buffer = new Array(this.capacity)
    }

    get length(): number {
        return this.len
    }

    write(data: T): RingBuffer<T> {
        this.buffer[this.tail] = data
        this.increment_tail()

        if (this.len >= this.capacity) {
            this.increment_head()
        } else {
            this.len++
        }

        return this
    }

    read(): T | undefined {
        if (this.len == 0) {
            return undefined
        }

        const data = this.buffer[this.head]
        this.increment_head()
        this.len--

        return data
    }

    peek(): T | undefined {
        if (this.len == 0) {
            return undefined
        }

        return this.buffer[this.head]
    }

    private increment_head() {
        this.head = (this.head + 1) % this.capacity
    }

    private increment_tail() {
        this.tail = (this.tail + 1) % this.capacity
    }
}
