import Queue from '../data-structures/queue';

let q = new Queue<number>();
for(let i = 0; i < 10 ; i++) {
    q.enqueue(i);
}
console.log(q.reverseK(5));

