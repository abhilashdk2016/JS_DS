import { defaultToString } from '../util';
import { ValuePair } from './models/value-pair';

export default class Dictionary<K, V> {
    private table: { [key: string]: ValuePair<K, V> };

    constructor(private toStrFn: (key: K) => string = defaultToString) {
        this.table = {};
    }

    hasKey(key: any) {
        return this.table[this.toStrFn(key)] !== null;
    }

    set(key: K, value: V) {
        if (key !== null && value !== null) {
            const tableKey = this.toStrFn(key);
            this.table[tableKey] = new ValuePair(key, value);
            return true;
        }
        return false;
    }

    remove(key: K) {
        if (this.hasKey(key)) {
            delete this.table[this.toStrFn(key)];
            return true;
        }
        return false;
    }

    get(key: K) {
        const valuePair = this.table[this.toStrFn(key)];
        return valuePair === null ? null : valuePair.value;
    }

    // get(key: K) {
    //     if (this.hasKey(key)) {
    //         return this.table[this.toStrFn(key)];
    //     }
    //     return null;
    // }

    // keyValues(): ValuePair<K, V>[] {
    //     return Object['values'](this.table);
    // }

    keyValues(): ValuePair<K, V>[] {
        const valuePairs: ValuePair<K, V>[] = [];
        for (const k in this.table) {
            if (this.hasKey(k)) {
                valuePairs.push(this.table[k]);
            }
        }
        return valuePairs;
    }

    keys(): K[] {
        return this.keyValues().map((valuePair: ValuePair<K, V>) => valuePair.key);
    }

    values(): V[] {
        return this.keyValues().map((valuePair: ValuePair<K, V>) => valuePair.value);
    }

    forEach(callbackFn: (key: K, value: V) => any) {
        const valuePairs = this.keyValues();
        for (let i = 0; i < valuePairs.length; i++) {
            const result = callbackFn(valuePairs[i].key, valuePairs[i].value);
            if (result === false) {
                break;
            }
        }
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
        const valuePairs = this.keyValues();
        let objString = `${valuePairs[0].toString()}`;
        for (let i = 1; i < valuePairs.length; i++) {
            objString = `${objString},${valuePairs[i].toString()}`;
        }
        return objString;
    }

}
