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
    return this.hash(key) % this.capacity // how it guarantees the result is within capacity: because it's MOD!!!
  }

  insertNoCollisions(key, value) {
    // Your code here 
    let node = new KeyValuePair(key, value)
    this.count++;

    if (this.count>this.capacity) {
      throw new Error('hash collision or same key/value pair already exists!')
    }

    this.data[this.hashMod(key)] = node;
  }

  insertWithHashCollisions(key, value) {
    // Your code here 
    let node = new KeyValuePair(key, value);
    let index = this.hashMod(key);
    this.count++;

    if (this.count <= this.capacity) this.data[index] = node;

    else {
      const oldHead = this.data[index];
      node.next = oldHead;
      this.data[index] = node;
      console.log(oldHead);

    }
  }

  insert(key, value) {
    // Your code here 
    let node = new KeyValuePair(key, value);
    let index = this.hashMod(key);
    this.count++;

    if (this.count <= this.capacity) this.data[index] = node;

    else {
      
      // if key already exists
      let current = this.data[index];
      while(current) {
        if (current.key === node.key) {
          current.value = node.value;
          this.count--;
          return;
        }
        current = current.next;
      }

      // if key does not exist
      const oldHead = this.data[index];
      node.next = oldHead;
      this.data[index] = node;
      console.log(oldHead);
    }
    
  

  }
}


module.exports = HashTable;

let hashTable = new HashTable(2);

// hashTable.insertWithHashCollisions("key-1", "val-1");
// hashTable.insertWithHashCollisions("key-2", "val-2");
// hashTable.insertWithHashCollisions("key-3", "val-3");

hashTable.insert("key-1", "val-1");
hashTable.insert("key-2", "val-2");
hashTable.insert("key-3", "val-3");
hashTable.insert("key-1", "val-100000");

console.log(hashTable.count)//.to.equal(3);
console.log(hashTable.capacity)//.to.equal(2);
console.log(hashTable.data.length)//.to.equal(2);

const pairC = hashTable.data[0];
const pairB = hashTable.data[1];
const pairA = hashTable.data[0].next;

console.log(pairB);

// console.log(pairC.key)//.to.equal("key-3");
// console.log(pairC.value)//.to.equal("val-3");
// console.log(pairA.key)//.to.equal("key-1");
// console.log(pairA.value)//.to.equal("val-1");


console.log(pairA.key)//.to.equal("key-1");
console.log(pairA.value)//.to.equal("val-100000");

console.log(pairB.key)//.to.equal("key-2");
console.log(pairB.value)//.to.equal("val-2");

console.log(pairC.key)//.to.equal("key-3");
console.log(pairC.value)//.to.equal("val-3");

