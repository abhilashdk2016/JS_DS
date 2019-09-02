import { defaultToString } from '../util';
import LinkedList from './linked-list';
import { ValuePair } from './models/value-pair';

export default class HashTableSeperateChaining<K, V> {
  protected table: { [key: string]: LinkedList<ValuePair<K, V>> };

  constructor(protected toStrFn: (key: K) => string = defaultToString) {
    this.table = {};
  }

//   private loseloseHashCode(key: K) {
//     if (typeof key === 'number') {
//       return key;
//     }
//     const tableKey = this.toStrFn(key);
//     let hash = 0;
//     for (let i = 0; i < tableKey.length; i++) {
//       hash += tableKey.charCodeAt(i);
//     }
//     return hash % 37;
//   }

  private djb2HashCode(key: K) {
    const tableKey = this.toStrFn(key);
    let hash = 5381;
    for (let i = 0; i < tableKey.length; i++) {
        hash = (hash * 33) + tableKey.charCodeAt(i);
    }
    return hash % 1013;
}

  hashCode(key: K) {
    // return this.loseloseHashCode(key);
    return this.djb2HashCode(key);
  }

  isEmpty() {
    return this.size() === 0;
    }

    size() {
        return Object.keys(this.table).length;
    }

    clear() {
        this.table = {};
    }

   toString() {
       if (this.isEmpty()) {
           return '';
       }
       const keys = Object.keys(this.table);
       let objString = `{${keys[0]} => ${this.table[keys[0]].toString()}}`;
       for (let i = 1; i < keys.length; i++) {
           objString = `${objString},{${keys[i]} => ${this.table[keys[i]].toString()}}`;
       }
       return objString;
   }

   put(key: K, value: V) {
       if (key !== null && value !== null) {
           const position = this.hashCode(key);
           if (this.table[position] === null) {
            this.table[position] = new LinkedList<ValuePair<K, V>>();
           }
           this.table[position].push(new ValuePair(key, value));
           return true;
       }
       return false;
   }

   get(key: K) {
       const position = this.hashCode(key);
       const linkedList = this.table[position];
       if (linkedList !== null && !linkedList.isEmpty()) {
           let current = linkedList.getHead();
           while (current !== null) {
               if (current.element.key === key) {
                   return current.element.value;
               }
               current = current.next;
           }
       }
       return null;
   }

   remove(key: K) {
       const position = this.hashCode(key);
       const linkedList = this.table[position];
       if (linkedList !== null && !linkedList.isEmpty()) {
           let current = linkedList.getHead();
           while (current !== null) {
               if (current.element.key === key) {
                   linkedList.remove(current.element);
                   if (linkedList.isEmpty()) {
                       delete this.table[position];
                   }
                   return true;
               }
               current = current.next;
           }
       }
       return false;
   }
}
