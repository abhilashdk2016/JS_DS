export default class Queue<T> {
    private count: number;
    private lowestCount: number;
    private items: any;

    constructor() {
        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
    }

    isEmpty() {
        return this.size() === 0;
    }

    size() {
        return this.count - this.lowestCount;
    }

    clear() {
        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
    }

    toString() {
        if (this.isEmpty()) {
            return '';
        }
        let objString = `${this.items[this.lowestCount]}`;
        for (let i = this.lowestCount + 1; i < this.count; i++) {
            objString = `${objString},${this.items[i]}`;
        }
        return objString;
    }

    enqueue(element: T) {
        this.items[this.count] = element;
        this.count++;
    }

    dequeue() {
        if(this.isEmpty()) {
            return null;
        }

        let result = this.items[this.lowestCount];
        delete this.items[this.lowestCount];
        this.lowestCount++;
        return result;
    }

    peek() {
        if(this.isEmpty()) {
            return null;
        }
        return this.items[this.lowestCount];
    }

    reverseK(k: number) {
        let kElements : number[] = [];
        for(let i = 0; i < k; i++) {
            kElements[i] = this.dequeue();
        }
        if(this.lowestCount > 0) {
            for(let i = kElements.length; i > 0 ; i--) {
                this.lowestCount--;
                this.items[this.lowestCount] = kElements[i];
            }
        }
        return this.items;
    }
}