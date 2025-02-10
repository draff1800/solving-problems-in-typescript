# TypeScript Helpers

## 1. Arrays

### Common Operations

#### Iterate Over an Array
```typescript
const arr = [1, 2, 3];
for (const num of arr) {
  console.log(num);
}
```

#### Filter Elements
```typescript
const even = arr.filter(num => num % 2 === 0); // [2]
```

#### Map Elements
```typescript
const doubled = arr.map(num => num * 2); // [2, 4, 6]
```

#### Reduce an Array
```typescript
const sum = arr.reduce((acc, num) => acc + num, 0); // 6
```

#### Find an Element
```typescript
const firstEven = arr.find(num => num % 2 === 0); // 2
```

#### Check a Condition
- **`some`:** Does any element match?
```typescript
const hasEven = arr.some(num => num % 2 === 0); // true
```
- **`every`:** Do all elements match?
```typescript
const allEven = arr.every(num => num % 2 === 0); // false
```

#### Sorting
```typescript
const sorted = [3, 1, 2].sort((a, b) => a - b); // [1, 2, 3]
```

#### Flatten Nested Arrays
```typescript
const nested = [1, [2, 3], [4]];
const flat = nested.flat(); // [1, 2, 3, 4]
```

#### Unique Elements
```typescript
const unique = [...new Set([1, 2, 2, 3])]; // [1, 2, 3]
```

#### Binary Search (If Array is Sorted)
```typescript
const binarySearch = (arr: number[], target: number) => {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1; // Not found
};
```

---

## 2. Maps

### Common Operations

#### Create a Map
```typescript
const map = new Map<string, number>([["a", 1], ["b", 2]]);
```

#### Get/Set Elements
```typescript
map.set("c", 3); // Add a key-value pair
console.log(map.get("a")); // 1
```

#### Check for a Key
```typescript
console.log(map.has("b")); // true
```

#### Delete a Key
```typescript
map.delete("b");
```

#### Iterate Over a Map
```typescript
for (const [key, value] of map.entries()) {
  console.log(key, value);
}
```

#### Convert Map to Array
```typescript
const entries = Array.from(map.entries()); // [["a", 1], ["c", 3]]
```

---

## 3. Strings

### Common Operations

#### Check If a Substring Exists
```typescript
const str = "hello world";
console.log(str.includes("world")); // true
```

#### Split a String
```typescript
const words = str.split(" "); // ["hello", "world"]
```

#### Join Strings
```typescript
const sentence = words.join(" "); // "hello world"
```

#### Change Case
```typescript
console.log(str.toLowerCase()); // "hello world"
console.log(str.toUpperCase()); // "HELLO WORLD"
```

#### Extract Substrings
```typescript
console.log(str.slice(0, 5)); // "hello"
console.log(str.substring(0, 5)); // "hello"
```

#### Trim Whitespace
```typescript
console.log("   hello   ".trim()); // "hello"
```

#### Replace Substrings
```typescript
console.log(str.replace("world", "TypeScript")); // "hello TypeScript"
```

---

## 4. String Parsing

### Parse Numbers from Strings

#### Convert a String to an Integer
```typescript
console.log(parseInt("42", 10)); // 42
```

#### Convert a String to a Float
```typescript
console.log(parseFloat("3.14")); // 3.14
```

#### Convert a String to a Number
```typescript
console.log(Number("42")); // 42
```

### Convert Numbers to Strings

#### Using `.toString()`
```typescript
console.log((42).toString()); // "42"
```

#### Using Template Literals
```typescript
console.log(`${42}`); // "42"
```

---

## 5. Integers

### Common Operations

#### Basic Math
```typescript
const a = 5, b = 2;
console.log(a + b, a - b, a * b, a / b, a % b); // 7, 3, 10, 2.5, 1
```

#### Power and Rounding
```typescript
console.log(Math.pow(2, 3)); // 8
console.log(Math.round(2.7)); // 3
console.log(Math.floor(2.7)); // 2
console.log(Math.ceil(2.7)); // 3
```

#### Generate Random Numbers
```typescript
console.log(Math.floor(Math.random() * 10)); // Random number between 0 and 9
```

#### Absolute Value
```typescript
console.log(Math.abs(-5)); // 5
```

#### Min and Max
```typescript
console.log(Math.min(1, 2, 3)); // 1
console.log(Math.max(1, 2, 3)); // 3
```

---

## 6. General Patterns to Know

### Sliding Window
Efficiently process contiguous subarrays:
```typescript
const slidingWindow = (arr: number[], k: number) => {
  let sum = 0, maxSum = 0;

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    if (i >= k - 1) {
      maxSum = Math.max(maxSum, sum);
      sum -= arr[i - k + 1];
    }
  }
  return maxSum;
};
```

### Two-Pointer Technique
Solve problems with sorted arrays:
```typescript
const twoSum = (nums: number[], target: number) => {
  let left = 0, right = nums.length - 1;

  while (left < right) {
    const sum = nums[left] + nums[right];
    if (sum === target) return [left, right];
    sum < target ? left++ : right--;
  }
  return [];
};
```

