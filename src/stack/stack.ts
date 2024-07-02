export class Stack<T> {
    private data: Array<T> = new Array(8)

    push(input: T): void {
        this.data.push(input)
    }

    pop(): T | undefined {
        return this.data.pop()
    }

    peek(): T | undefined {
        if (this.data.length == 0) {
            return undefined
        }

        return this.data[this.data.length]
    }

    length(): number {
        return this.data.length
    }
}
