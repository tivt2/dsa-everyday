type TrieNode<K, V> = {
    children: Map<K, TrieNode<K, V>>
    val?: V
}

export class Trie<K, V> {
    public root: TrieNode<K, V> = { children: new Map() }

    set(keys: Array<K>, val: V): Trie<K, V> {
        if (keys.length == 0) return this

        let cur = this.root

        for (const key of keys) {
            if (!cur.children.get(key)) {
                cur.children.set(key, { children: new Map() })
            }
            cur = cur.children.get(key) as TrieNode<K, V>
        }

        cur.val = val

        return this
    }

    get(keys: Array<K>): V | undefined {
        if (keys.length == 0) return undefined

        let cur: TrieNode<K, V> | undefined = this.root

        for (const key of keys) {
            cur = cur.children.get(key)
            if (!cur) {
                return undefined
            }
        }

        return cur.val
    }

    delete(keys: Array<K>): V | undefined {
        if (keys.length == 0) return undefined

        const delete_rec = (
            keys: Array<K>,
            cur: TrieNode<K, V>
        ): { hasChildren: boolean; val: V | undefined } => {
            if (keys.length == 0) {
                const out = { hasChildren: true, val: cur.val }
                cur.val = undefined
                if (cur.children.size == 0) {
                    out.hasChildren = false
                }
                return out
            }

            const next = cur.children.get(keys[0])
            if (!next) {
                return { hasChildren: false, val: undefined }
            }

            const { hasChildren, val } = delete_rec(keys.slice(1), next)
            if (!hasChildren) {
                cur.children.delete(keys[0])
            }

            return { hasChildren: cur.children.size > 0, val }
        }

        return delete_rec(keys, this.root).val
    }
}
