// compare function works as return true if a should go up, false if b should go up
export type heap_comp_fn<T> = (a: T, b: T) => boolean

export class Heap<T> {
    public data: Array<T | undefined> = new Array()
    public len: number = 0

    constructor(private compare_fn: heap_comp_fn<T>) {}

    get length(): number {
        return this.len
    }

    push(data: T): Heap<T> {
        this.data[this.len] = data
        this.heapfy_up(this.len)
        this.len++
        return this
    }

    pop(): T | undefined {
        if (this.len == 0) {
            return undefined
        }

        this.len--
        const out = this.data[0]
        this.data[0] = this.data[this.len]
        this.data[this.len] = undefined
        this.heapfy_down(0)

        return out
    }

    peek(): T | undefined {
        return this.data[0]
    }

    static heapfy<T>(compare_fn: heap_comp_fn<T>, data: T[]): Heap<T> {
        const heap = new Heap<T>(compare_fn)
        for (const d of data) {
            heap.push(d)
        }
        return heap
    }

    private swap(idx1: number, idx2: number): void {
        const temp = this.data[idx1]
        this.data[idx1] = this.data[idx2]
        this.data[idx2] = temp
    }

    private heapfy_up(idx: number): void {
        if (idx <= 0) {
            return
        }

        const parent_idx = this.parent(idx)
        const parent = this.data[parent_idx] as T

        const cur = this.data[idx] as T
        if (this.compare_fn(cur, parent)) {
            this.swap(idx, parent_idx)
            this.heapfy_up(parent_idx)
        }
    }

    private heapfy_down(idx: number): void {
        const left_idx = this.left_child(idx)
        if (left_idx >= this.len) {
            return
        }

        const left_child = this.data[left_idx] as T
        const right_idx = this.right_child(idx)
        const cur = this.data[idx] as T

        if (right_idx >= this.len) {
            if (this.compare_fn(left_child, cur)) {
                this.swap(left_idx, idx)
                this.heapfy_down(left_idx)
            }
            return
        }

        const right_child = this.data[right_idx] as T

        if (this.compare_fn(left_child, right_child)) {
            if (this.compare_fn(left_child, cur)) {
                this.swap(left_idx, idx)
                this.heapfy_down(left_idx)
            }
        } else if (this.compare_fn(right_child, cur)) {
            this.swap(right_idx, idx)
            this.heapfy_down(right_idx)
        }
    }

    private parent(idx: number): number {
        return Math.floor((idx - 1) / 2)
    }

    private left_child(idx: number): number {
        return idx * 2 + 1
    }

    private right_child(idx: number): number {
        return idx * 2 + 2
    }
}
