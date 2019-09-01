export default class Stack<T> {
    private count: number;
    private items: any;
    constructor() {
        this.count = 0;
        this.items = {};
    }

    isEmpty() {
        return this.count === 0;
    }

    size() {
        return this.count;
    }

    push(element: T) {
        this.items[this.count] = element;
        this.count++;
    }

    pop() {
        if (this.isEmpty()) {
            return null;
        }
        this.count--;
        const element = this.items[this.count];
        delete this.items[this.count];
        return element;
    }

    peek() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items[this.count - 1];
    }

    clear() {
        this.items = {};
        this.count = 0;
    }

    toString() {
        if (this.isEmpty()) {
            return '';
        }
        let result = `${this.items[0]}`;
        for (let i = 1; i < this.count; i++) {
            result += `, ${this.items[i]}`;
        }
        return result;
    }
}
