export default class StackOneArray<T> {
    private arr: T[];
    private top1: number;
    private top2: number;
    private size: number;
    constructor(size: number) {
        this.arr = [];
        this.top1 = 0;
        this.top2 = size;
        this.size = size;
    }

    push1(value: T) {
        if(this.top1 < this.top2 -1) {
            this.top1++;
            this.arr[this.top1] = value;
        }
    }

    push2(value: T) {
        if(this.top1 < this.top2 - 1) {
            this.top2--;
            this.arr[this.top2] = value;
        }
    }

    pop1() {
        if(this.top1 >= 0) {
            let value = this.arr[this.top1];
            this.top1--;
            return value;
        } else {
            return -1;
        }
    }

    pop2() {
        if(this.top2 < this.size) {
            let value = this.arr[this.top2];
            this.top2++;
            return value;
        } else {
            return -1;
        }
    }
}