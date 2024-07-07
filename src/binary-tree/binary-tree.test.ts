import { beforeEach, describe, expect, test } from "vitest"
import { BinaryTree, Compare_fn } from "./binary-tree"

describe("binary-tree structure", () => {
    let binary_tree: BinaryTree<number>
    beforeEach(() => {
        const cmp_fn: Compare_fn<number> = (a, b) => a < b
        binary_tree = new BinaryTree(cmp_fn)
    })

    test("insert()", () => {
        expect(binary_tree.root == undefined)

        const input = [3, 4, 1, 2, 5]
        for (const data of input) {
            binary_tree.insert(data)
        }

        expect(binary_tree.root?.val).toEqual(3)
        expect(binary_tree.root?.left?.val).toEqual(1)
        expect(binary_tree.root?.right?.val).toEqual(4)
        expect(binary_tree.root?.left?.right?.val).toEqual(2)
        expect(binary_tree.root?.right?.right?.val).toEqual(5)
    })

    test("find()", () => {
        const input = [3, 4, 1, 2, 5]
        for (const data of input) {
            binary_tree.insert(data)
        }

        expect(binary_tree.find(3)).toEqual(true)
        expect(binary_tree.find(4)).toEqual(true)
        expect(binary_tree.find(1)).toEqual(true)
        expect(binary_tree.find(2)).toEqual(true)
        expect(binary_tree.find(5)).toEqual(true)

        expect(binary_tree.find(0)).toEqual(false)
        expect(binary_tree.find(6)).toEqual(false)
        expect(binary_tree.find(42)).toEqual(false)
    })

    test("dfs()", () => {
        const input = [3, 4, 1, 2, 5]
        for (const data of input) {
            binary_tree.insert(data)
        }

        expect(binary_tree.dfs()).toEqual([3, 1, 2, 4, 5])
    })

    test("bfs()", () => {
        const input = [3, 4, 1, 2, 5]
        for (const data of input) {
            binary_tree.insert(data)
        }

        expect(binary_tree.bfs()).toEqual([3, 1, 4, 2, 5])
    })
})
