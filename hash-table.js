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
  }

  insert(key, value) {
    // Your code here 
  }

}


module.exports = HashTable;
