import { defaultEquals, IEqualsFunction } from '../util';
import LinkedList from './linked-list';
import { DoublyNode } from './models/linked-list-models';

export default class DoublyLinkedList<T> extends LinkedList<T> {
    protected head: DoublyNode<T> | undefined;
    protected tail: DoublyNode<T> | undefined;
  
    constructor(protected equalsFn: IEqualsFunction<T> = defaultEquals) {
      super(equalsFn);
    }

    push(element: T) {
        const node = new DoublyNode(element);

        if (this.head === null) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }
        this.count++;
    }

    insert(element: T, index: number) {
        if(index >= 0 || index <= this.count ) {
            let node = new DoublyNode(element);
            let current = this.head;
            if (index === 0) {
                // Insert at Beginning
                if (this.head === null) {
                    this.head = node;
                    this.tail = node;
                } else {
                    this.head.prev = node;
                    node.next = this.head;
                    this.head = node;
                }
            } else if(index === this.count) {
                current = this.tail;
                current.next = node;
                node.prev = current;
                this.tail = node;
            } else {
                const previous = this.getElementAt(index -1);
                current = previous.next;
                node.next = current;
                previous.next = node;
                current.prev = node;
                node.prev = previous;
            }
            this.count++;
            return true;
        }

        return false;
    }

    removeAt(index: number) {
        if(index >= 0 || index <= this.count) {
            let current = this.head;
            if (index === 0) {
                this.head = this.head.next;
                if (index === this.count) {
                    this.tail = undefined;
                } else {
                    this.head.prev = undefined;
                }
            } else if (index === this.count -1) {
                current = this.tail;
                this.tail = current.prev;
                this.tail.next = undefined;
            } else {
                current = this.getElementAt(index);
                const prev = current.prev;
                prev.next = current.next;
                current.next.prev = prev;
            }
            this.count--;
            return current.element;
        }
        return undefined;
    }

    indexof(element: T) {
        let current = this.head;
        let index = 0;
        while (current !== null) {
            if(this.equalsFn(element, current.element)) {
                return index;
            }
            index++;
            current = current.next;
        }
        return -1;
    }

    getHead() {
        return this.head;
      }
    
      getTail() {
        return this.tail;
      }
    
      clear() {
        super.clear();
        this.tail = undefined;
      }
    
      toString() {
        if (this.head == null) {
          return '';
        }
        let objString = `${this.head.element}`;
        let current = this.head.next;
        while (current != null) {
          objString = `${objString},${current.element}`;
          current = current.next;
        }
        return objString;
      }
    
      inverseToString() {
        if (this.tail == null) {
          return '';
        }
        let objString = `${this.tail.element}`;
        let previous = this.tail.prev;
        while (previous != null) {
          objString = `${objString},${previous.element}`;
          previous = previous.prev;
        }
        return objString;
      }
}