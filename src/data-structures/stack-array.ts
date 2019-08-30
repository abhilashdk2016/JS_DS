export default class StackArray<T> {
    private items : T[];

    constructor() {
        this.items = [];
    }

    push(element: T) {
        this.items.push(element);
    }

    pop() {
        return this.items.pop();
    }

    peek() {
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }

    toArray() {
        return this.items;
    }

    toString() {
        return this.items.toString();
    }

    clear() {
        this.items = [];
    }
}