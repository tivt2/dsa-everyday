type Callback<T> = (message: T) => void

export class PubSub {
    public store: Map<string, Array<Callback<any>>> = new Map()

    subscribe<T>(topic: string, callback: Callback<T>): PubSub {
        let subscribers = this.store.get(topic)

        if (!subscribers) {
            this.store.set(topic, [callback])
        } else {
            subscribers.push(callback)
        }

        return this
    }

    publish<T>(topic: string, message: T): PubSub {
        const subscribers = this.store.get(topic)

        if (!!subscribers) {
            for (const callback of subscribers) {
                callback(message)
            }
        }

        return this
    }

    peek(topic: string): Array<Callback<any>> | undefined {
        return this.store.get(topic)
    }
}
