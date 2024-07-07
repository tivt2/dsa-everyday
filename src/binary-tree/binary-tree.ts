export type Compare_fn<T> = (a: T, b: T) => boolean

type Node<T> = {
    val: T
    left: Node<T> | undefined
    right: Node<T> | undefined
}

type NodeFind<T> = {
    parent: Node<T> | undefined
    node: Node<T> | undefined
}

export class BinaryTree<T> {
    public root: Node<T> | undefined = undefined

    constructor(private cmp_fn: Compare_fn<T>) {}

    insert(data: T): BinaryTree<T> {
        const node: Node<T> = {
            val: data,
            left: undefined,
            right: undefined,
        }

        // deals with the case of empty tree
        // so recursion fn doesnt need to
        if (this.root == undefined) {
            this.root = node
            return this
        }

        this.insert_rec(this.root, node)
        return this
    }

    find(data: T): boolean {
        const found = this.find_rec(undefined, this.root, data)
        if (found.node == undefined) {
            return false
        }
        return true
    }

    dfs(): T[] {
        if (this.root == undefined) {
            return []
        }

        return this.dfs_rec(this.root, [])
    }

    bfs(): T[] {
        if (this.root == undefined) {
            return []
        }

        return this.bfs_rec(this.root, [this.root.val])
    }

    // assume cur is always a node
    private insert_rec(cur: Node<T>, node: Node<T>): void {
        if (this.cmp_fn(node.val, cur.val)) {
            if (cur.left == undefined) {
                cur.left = node
                return
            }
            this.insert_rec(cur.left, node)
        } else {
            if (cur.right == undefined) {
                cur.right = node
                return
            }
            this.insert_rec(cur.right, node)
        }
    }

    private find_rec(
        parent: Node<T> | undefined,
        cur: Node<T> | undefined,
        data: T
    ): NodeFind<T> {
        if (cur == undefined) {
            return { parent, node: cur }
        } else if (cur.val == data) {
            return { parent, node: cur }
        }

        if (this.cmp_fn(data, cur.val)) {
            return this.find_rec(cur, cur.left, data)
        } else {
            return this.find_rec(cur, cur.right, data)
        }
    }

    private dfs_rec(cur: Node<T> | undefined, acc: T[]): T[] {
        if (cur != undefined) {
            acc.push(cur.val)
            this.dfs_rec(cur.left, acc)
            this.dfs_rec(cur.right, acc)
        }

        return acc
    }

    private bfs_rec(cur: Node<T> | undefined, acc: T[]): T[] {
        if (cur == undefined) {
            return acc
        }

        if (cur.left != undefined) {
            acc.push(cur.left.val)
        }
        if (cur.right != undefined) {
            acc.push(cur.right.val)
        }

        this.bfs_rec(cur.left, acc)
        this.bfs_rec(cur.right, acc)

        return acc
    }

    private get_biggest(parent: Node<T>, node: Node<T>): NodeFind<T> {
        if (node.right == undefined) {
            return { parent, node }
        }

        return this.get_biggest(node, node.right)
    }
}
