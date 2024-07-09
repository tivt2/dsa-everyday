import { describe, test, expect, beforeEach } from "vitest"
import { Trie } from "./trie"

describe("trie data structure", () => {
    let trie: Trie<string, boolean>
    beforeEach(() => {
        trie = new Trie<string, boolean>()
    })

    test("set() + get()", () => {
        trie.set("cat".split(""), true)
        trie.set("case".split(""), true)
        trie.set("corridor".split(""), true)
        trie.set("vase".split(""), true)

        expect(trie.get("cat".split(""))).toEqual(true)
        expect(trie.get("case".split(""))).toEqual(true)
        expect(trie.get("corridor".split(""))).toEqual(true)
        expect(trie.get("vase".split(""))).toEqual(true)
        expect(trie.get("ball".split(""))).toEqual(undefined)
        expect(trie.get("call".split(""))).toEqual(undefined)
    })

    test("set() + delete() + get())", () => {
        trie.set("cat".split(""), true)
        trie.set("case".split(""), true)
        trie.set("corridor".split(""), true)
        trie.set("vase".split(""), true)

        expect(trie.get("ball".split(""))).toEqual(undefined)
        expect(trie.get("call".split(""))).toEqual(undefined)

        expect(trie.delete("cat".split(""))).toEqual(true)
        expect(trie.delete("case".split(""))).toEqual(true)
        expect(trie.delete("corridor".split(""))).toEqual(true)
        expect(trie.delete("vase".split(""))).toEqual(true)

        expect(trie.get("cat".split(""))).toEqual(undefined)
        expect(trie.get("case".split(""))).toEqual(undefined)
        expect(trie.get("corridor".split(""))).toEqual(undefined)
        expect(trie.get("vase".split(""))).toEqual(undefined)
    })

    test("check delete() correctness)", () => {
        trie.set("cat".split(""), true)
        trie.set("case".split(""), true)

        expect(trie.get("cat".split(""))).toEqual(true)
        expect(trie.get("case".split(""))).toEqual(true)

        expect(trie.delete("cat".split(""))).toEqual(true)
        expect(trie.get("cat".split(""))).toEqual(undefined)

        let c = trie.root.children.get("c")
        expect(c).toBeTruthy()
        const a = c!.children.get("a")
        expect(a).toBeTruthy()
        const t = a!.children.get("t")
        expect(t).toEqual(undefined)

        expect(trie.delete("case".split(""))).toEqual(true)
        expect(trie.get("case".split(""))).toEqual(undefined)

        c = trie.root.children.get("c")
        expect(c).toEqual(undefined)
    })

    test("some edge cases", () => {
        // empty trie get
        expect(trie.get("cat".split(""))).toEqual(undefined)
        // empty trie delete
        expect(trie.delete("cat".split(""))).toEqual(undefined)

        // empty keys argument with empty trie
        expect(trie.get([])).toEqual(undefined)

        trie.set("cat".split(""), true)
        // empty keys argument with trie elements
        expect(trie.get([])).toEqual(undefined)

        // get empty keys
        expect(trie.get("ca".split(""))).toEqual(undefined)
        // delete empty keys
        expect(trie.get("ca".split(""))).toEqual(undefined)
        let c = trie.root.children.get("c")
        expect(c).toBeTruthy()
        const a = c!.children.get("a")
        expect(a).toBeTruthy()
        const t = a!.children.get("t")
        expect(t).toBeTruthy()
        expect(t!.val).toEqual(true)

        // overwrite existing value
        trie.set("cat".split(""), false)
        expect(trie.get("cat".split(""))).toEqual(false)
    })
})
