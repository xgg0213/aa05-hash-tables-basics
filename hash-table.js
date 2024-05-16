const sha256 = require('js-sha256');

class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {

  constructor(numBuckets = 4) {
    // Your code here 
    this.count = 0;
    this.capacity = numBuckets;
    this.data = new Array(this.capacity).fill(null);
  }

  hash(key) {
    // Your code here 
    let sha = sha256(key).substring(0,8);
    let hashValue = parseInt(sha,16);
    return hashValue;
  }

  hashMod(key) {
    // Your code here 
    return this.hash(key) % this.capacity
  }

  insertNoCollisions(key, value) {
    // Your code here 
    this.data[this.count] = {'key':key, 'value':value}
    this.count++;

    if (this.count>this.capacity) {
      throw new Error('hash collision or same key/value pair already exists!')
    }
  }

  insertWithHashCollisions(key, value) {
    // Your code here 
    let node = new KeyValuePair(key, value)
    this.count++;

    if (this.count <= this.capacity) this.data[this.count-1] = node;

    else {
      let col = this.data[this.count-this.capacity-1];
      this.data[this.count-this.capacity-1]= node
      this.data[this.count-this.capacity-1].next = col;
    }
  }

  insert(key, value) {
    // Your code here 
  }

}


module.exports = HashTable;

hashTable = new HashTable(2);

hashTable.insertWithHashCollisions("key-1", "val-1");
hashTable.insertWithHashCollisions("key-2", "val-2");
hashTable.insertWithHashCollisions("key-3", "val-3");

console.log(hashTable.count)//.to.equal(3);
console.log(hashTable.capacity)//.to.equal(2);
console.log(hashTable.data.length)//.to.equal(2);

const pairC = hashTable.data[0];
const pairB = hashTable.data[1];
const pairA = hashTable.data[0].next;

// console.log(pairB)

console.log(pairA.key)//.to.equal("key-1");
console.log(pairA.value)//.to.equal("val-1");

console.log(pairB.key)//.to.equal("key-2");
console.log(pairB.value)//.to.equal("val-2");

console.log(pairC.key)//.to.equal("key-3");
console.log(pairC.value)//.to.equal("val-3");
