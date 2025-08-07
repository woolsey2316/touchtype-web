export const JAVASCRIPT_WORDS = [
  // 1. Array Methods Example
  `const numbers = [1, 2, 3, 4, 5];↵const doubled = numbers.map(n => n * 2);↵const evens = numbers.filter(n => n % 2 === 0);↵const sum = numbers.reduce((acc, n) => acc + n, 0);↵console.log(doubled, evens, sum);↵`,

  // 2. Object Manipulation Example
  `const user = { id: 1, name: "Alice", email: "alice@example.com" };↵const keys = Object.keys(user);↵const values = Object.values(user);↵const entries = Object.entries(user);↵const userCopy = { ...user, active: true };↵console.log(keys, values, entries, userCopy);↵`,

  // 3. Function with Default and Rest Parameters
  `function greet(name = "Guest", ...messages) {↵→console.log(\`Hello, \${name}!\`);↵→messages.forEach(msg => console.log(msg));↵}↵greet("Bob", "Welcome!", "How are you?");↵`,

  // 4. Promise and Async/Await Example
  `function fetchData(url) {↵→return fetch(url).then(res => res.json());↵}↵async function main() {↵→try {↵→→const data = await fetchData("https://jsonplaceholder.typicode.com/posts/1");↵→→console.log(data);↵→} catch (e) {↵→→console.error("Error:", e);↵→}↵}↵main();↵`,

  // 5. Class with Static and Instance Methods
  `class Counter {↵→static description = "Simple counter";↵→constructor() { this.value = 0; }↵→inc() { this.value++; }↵→dec() { this.value--; }↵→get() { return this.value; }↵}↵const c = new Counter();↵c.inc();↵c.inc();↵console.log(Counter.description, c.get());↵`,

  // 6. Destructuring and Spread Example
  `const person = { name: "Eve", age: 30, city: "Paris" };↵const { name, ...rest } = person;↵const arr = [1, 2, 3];↵const arr2 = [...arr, 4, 5];↵console.log(name, rest, arr2);↵`,

  // 7. Closure Example
  `function makeCounter() {↵→let count = 0;↵→return function() {↵→→count++;↵→→return count;↵→};↵}↵const counter = makeCounter();↵console.log(counter(), counter());↵`,

  // 8. Higher-Order Function Example
  `function repeat(fn, times) {↵→for (let i = 0; i < times; i++) {↵→→fn(i);↵→}↵}↵repeat(i => console.log("Iteration", i), 3);↵`,

  // 9. Module Pattern Example
  `const Calculator = (function() {↵→let total = 0;↵→return {↵→→add(x) { total += x; },↵→→sub(x) { total -= x; },↵→→get() { return total; }↵→};↵})();↵Calculator.add(5);↵Calculator.sub(2);↵console.log(Calculator.get());↵`,

  // 10. DOM Manipulation Example
  `const div = document.createElement("div");↵div.textContent = "Hello, DOM!";↵div.className = "greeting";↵document.body.appendChild(div);↵setTimeout(() => {↵→div.style.color = "red";↵}, 1000);↵`,

  // 11. Event Listener Example
  `const btn = document.createElement("button");↵btn.textContent = "Click me";↵document.body.appendChild(btn);↵btn.addEventListener("click", () => {↵→alert("Button clicked!");↵});↵`,

  // 12. Local Storage Example
  `localStorage.setItem("theme", "dark");↵const theme = localStorage.getItem("theme");↵console.log("Theme:", theme);↵localStorage.removeItem("theme");↵`,

  // 13. JSON Parse/Stringify Example
  `const obj = { a: 1, b: 2 };↵const json = JSON.stringify(obj);↵const parsed = JSON.parse(json);↵console.log(json, parsed);↵`,

  // 14. Set and Map Example
  `const set = new Set([1, 2, 3, 2]);↵set.add(4);↵console.log([...set]);↵const map = new Map();↵map.set("a", 1);↵map.set("b", 2);↵console.log(map.get("a"));↵`,

  // 15. Array Buffer and Typed Array Example
  `const buffer = new ArrayBuffer(8);↵const view = new Uint32Array(buffer);↵view[0] = 123456;↵view[1] = 654321;↵console.log(view[0], view[1]);↵`,

  // 16. Debounce Function Example
  `function debounce(fn, delay) {↵→let timer;↵→return function(...args) {↵→→clearTimeout(timer);↵→→timer = setTimeout(() => fn.apply(this, args), delay);↵→};↵}↵const log = debounce(msg => console.log(msg), 300);↵log("Hello");↵`,

  // 17. Fetch with Headers Example
  `fetch("https://jsonplaceholder.typicode.com/posts", {↵→method: "POST",↵→headers: { "Content-Type": "application/json" },↵→body: JSON.stringify({ title: "foo", body: "bar", userId: 1 })↵})↵→.then(res => res.json())↵→.then(data => console.log(data));↵`,

  // 18. Custom Error Example
  `class CustomError extends Error {↵→constructor(message) {↵→→super(message);↵→→this.name = "CustomError";↵→}↵}↵try {↵→throw new CustomError("Something went wrong!");↵} catch (e) {↵→console.error(e.name, e.message);↵}↵`,

  // 19. Proxy Example
  `const obj = { a: 1 };↵const proxy = new Proxy(obj, {↵→get(target, prop) {↵→→return prop in target ? target[prop] : 0;↵→}↵});↵console.log(proxy.a, proxy.b);↵`,

  // 20. Generator Function Example
  `function* idGenerator() {↵→let id = 1;↵→while (true) {↵→→yield id++;↵→}↵}↵const gen = idGenerator();↵console.log(gen.next().value, gen.next().value);↵`,
  // 21. Currying Example
  `function multiply(a) {↵→return function(b) {↵→→return a * b;↵→};↵}↵const double = multiply(2);↵console.log(double(5));↵`,

  // 22. Array Flatten Example
  `function flatten(arr) {↵→return arr.reduce((flat, toFlatten) => flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten), []);↵}↵console.log(flatten([1, [2, [3, 4]], 5]));↵`,

  // 23. Deep Clone Example
  `function deepClone(obj) {↵→if (obj === null || typeof obj !== "object") return obj;↵→if (Array.isArray(obj)) return obj.map(deepClone);↵→const copy = {};↵→for (const key in obj) {↵→→copy[key] = deepClone(obj[key]);↵→}↵→return copy;↵}↵const original = { a: 1, b: { c: 2 } };↵const clone = deepClone(original);↵`,

  // 24. Memoization Example
  `function memoize(fn) {↵→const cache = {};↵→return function(...args) {↵→→const key = JSON.stringify(args);↵→→if (!(key in cache)) {↵→→→cache[key] = fn.apply(this, args);↵→→}↵→→return cache[key];↵→};↵}↵const fib = memoize(n => n < 2 ? n : fib(n - 1) + fib(n - 2));↵console.log(fib(10));↵`,

  // 25. Throttle Example
  `function throttle(fn, limit) {↵→let inThrottle;↵→return function(...args) {↵→→if (!inThrottle) {↵→→→fn.apply(this, args);↵→→→inThrottle = true;↵→→→setTimeout(() => inThrottle = false, limit);↵→→}↵→};↵}↵const log = throttle(console.log, 1000);↵log("Hello");↵`,

  // 26. Event Delegation Example
  `document.body.addEventListener("click", function(e) {↵→if (e.target.matches(".btn")) {↵→→console.log("Button clicked:", e.target.textContent);↵→}↵});↵const btn = document.createElement("button");↵btn.className = "btn";↵btn.textContent = "Delegated";↵document.body.appendChild(btn);↵`,

  // 27. Intersection Observer Example
  `const observer = new IntersectionObserver(entries => {↵→entries.forEach(entry => {↵→→if (entry.isIntersecting) {↵→→→console.log("Visible:", entry.target);↵→→}↵→});↵});↵const el = document.createElement("div");↵document.body.appendChild(el);↵observer.observe(el);↵`,

  // 28. Web Worker Example
  `const workerCode = "onmessage = function(e) { postMessage(e.data * 2); }";↵const blob = new Blob([workerCode], { type: "application/javascript" });↵const worker = new Worker(URL.createObjectURL(blob));↵worker.onmessage = e => console.log("Worker:", e.data);↵worker.postMessage(21);↵`,

  // 29. Fetch Abort Example
  `const controller = new AbortController();↵fetch("https://jsonplaceholder.typicode.com/posts/1", { signal: controller.signal })↵→.then(res => res.json())↵→.then(data => console.log(data))↵→.catch(e => console.error("Fetch aborted", e));↵setTimeout(() => controller.abort(), 100);↵`,

  // 30. Custom Iterator Example
  `const range = {↵→from: 1,↵→to: 5,↵→[Symbol.iterator]() {↵→→let current = this.from, last = this.to;↵→→return {↵→→→next() {↵→→→→return current <= last ? { done: false, value: current++ } : { done: true };↵→→→}↵→→};↵→}↵};↵for (const num of range) {↵→console.log(num);↵}↵`,

  // 31. Object.freeze Example
  `const config = { api: "v1", debug: true };↵Object.freeze(config);↵// config.api = "v2"; // No effect↵console.log(Object.isFrozen(config));↵`,

  // 32. Symbol Example
  `const sym = Symbol("unique");↵const obj = { [sym]: 42 };↵console.log(obj[sym]);↵`,

  // 33. Map/Set Iteration Example
  `const map = new Map([["a", 1], ["b", 2]]);↵for (const [k, v] of map) {↵→console.log(k, v);↵}↵const set = new Set([1, 2, 3]);↵set.forEach(v => console.log(v));↵`,

  // 34. Template Literal Tag Example
  `function tag(strings, ...values) {↵→return strings.reduce((acc, str, i) => acc + str + (values[i] || ""), "");↵}↵const name = "World";↵console.log(tag\`Hello, \${name}!\`);↵`,

  // 35. Optional Chaining Example
  `const user = { profile: { name: "Alice" } };↵console.log(user.profile?.name);↵console.log(user.address?.city);↵`,

  // 36. Nullish Coalescing Example
  `const input = "";↵const value = input ?? "default";↵console.log(value);↵`,

  // 37. Object.entries/Object.fromEntries Example
  `const obj = { a: 1, b: 2 };↵const entries = Object.entries(obj);↵const rebuilt = Object.fromEntries(entries);↵console.log(entries, rebuilt);↵`,

  // 38. ArrayBuffer/TypedArray Example
  `const buffer = new ArrayBuffer(16);↵const view = new Int16Array(buffer);↵view[0] = 256;↵view[1] = 512;↵console.log(view[0], view[1]);↵`,

  // 39. Custom Event Example
  `const event = new CustomEvent("hello", { detail: { msg: "world" } });↵document.addEventListener("hello", e => console.log(e.detail));↵document.dispatchEvent(event);↵`,

  // 40. WeakMap/WeakSet Example
  `const wm = new WeakMap();↵const ws = new WeakSet();↵let obj = {};↵wm.set(obj, 123);↵ws.add(obj);↵console.log(wm.get(obj), ws.has(obj));↵obj = null;↵`,

  // 41. Function.prototype.bind Example
  `function greet(msg) {↵→console.log(this.name + ": " + msg);↵}↵const person = { name: "Bob" };↵const bound = greet.bind(person, "Hello!");↵bound();↵`,

  // 42. Array find/findIndex Example
  `const arr = [5, 12, 8, 130, 44];↵const found = arr.find(x => x > 10);↵const idx = arr.findIndex(x => x > 10);↵console.log(found, idx);↵`,

  // 43. Array includes Example
  `const fruits = ["apple", "banana", "mango"];↵console.log(fruits.includes("banana"));↵console.log(fruits.includes("pear"));↵`,

  // 44. String.padStart/padEnd Example
  `const str = "5";↵console.log(str.padStart(3, "0"));↵console.log(str.padEnd(3, "0"));↵`,

  // 45. Object.assign Example
  `const a = { x: 1 };↵const b = { y: 2 };↵const merged = Object.assign({}, a, b);↵console.log(merged);↵`,

  // 46. Array.some/every Example
  `const nums = [1, 2, 3, 4, 5];↵console.log(nums.some(n => n > 3));↵console.log(nums.every(n => n > 0));↵`,

  // 47. Array.reduceRight Example
  `const arr = ["a", "b", "c"];↵const res = arr.reduceRight((acc, cur) => acc + cur, "");↵console.log(res);↵`,

  // 48. Date Formatting Example
  `const now = new Date();↵console.log(now.toISOString());↵console.log(now.toLocaleDateString());↵`,

  // 49. Intl.NumberFormat Example
  `const nf = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });↵console.log(nf.format(123456.789));↵`,

  // 50. ArrayBuffer to Base64 Example
  `function arrayBufferToBase64(buffer) {↵→let binary = "";↵→const bytes = new Uint8Array(buffer);↵→for (let i = 0; i < bytes.byteLength; i++) {↵→→binary += String.fromCharCode(bytes[i]);↵→}↵→return btoa(binary);↵}↵const buf = new Uint8Array([72, 101, 108, 108, 111]).buffer;↵console.log(arrayBufferToBase64(buf));↵`,
];
