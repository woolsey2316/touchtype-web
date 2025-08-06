export const JAVASCRIPT_WORDS = [
  // 1. Array Methods Example
  `const numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(n => n * 2);\nconst evens = numbers.filter(n => n % 2 === 0);\nconst sum = numbers.reduce((acc, n) => acc + n, 0);\nconsole.log(doubled, evens, sum);\n`,

  // 2. Object Manipulation Example
  `const user = { id: 1, name: "Alice", email: "alice@example.com" };\nconst keys = Object.keys(user);\nconst values = Object.values(user);\nconst entries = Object.entries(user);\nconst userCopy = { ...user, active: true };\nconsole.log(keys, values, entries, userCopy);\n`,

  // 3. Function with Default and Rest Parameters
  `function greet(name = "Guest", ...messages) {\n\tconsole.log(\`Hello, \${name}!\`);\n\tmessages.forEach(msg => console.log(msg));\n}\ngreet("Bob", "Welcome!", "How are you?");\n`,

  // 4. Promise and Async/Await Example
  `function fetchData(url) {\n\treturn fetch(url).then(res => res.json());\n}\nasync function main() {\n\ttry {\n\t\tconst data = await fetchData("https://jsonplaceholder.typicode.com/posts/1");\n\t\tconsole.log(data);\n\t} catch (e) {\n\t\tconsole.error("Error:", e);\n\t}\n}\nmain();\n`,

  // 5. Class with Static and Instance Methods
  `class Counter {\n\tstatic description = "Simple counter";\n\tconstructor() { this.value = 0; }\n\tinc() { this.value++; }\n\tdec() { this.value--; }\n\tget() { return this.value; }\n}\nconst c = new Counter();\nc.inc();\nc.inc();\nconsole.log(Counter.description, c.get());\n`,

  // 6. Destructuring and Spread Example
  `const person = { name: "Eve", age: 30, city: "Paris" };\nconst { name, ...rest } = person;\nconst arr = [1, 2, 3];\nconst arr2 = [...arr, 4, 5];\nconsole.log(name, rest, arr2);\n`,

  // 7. Closure Example
  `function makeCounter() {\n\tlet count = 0;\n\treturn function() {\n\t\tcount++;\n\t\treturn count;\n\t};\n}\nconst counter = makeCounter();\nconsole.log(counter(), counter());\n`,

  // 8. Higher-Order Function Example
  `function repeat(fn, times) {\n\tfor (let i = 0; i < times; i++) {\n\t\tfn(i);\n\t}\n}\nrepeat(i => console.log("Iteration", i), 3);\n`,

  // 9. Module Pattern Example
  `const Calculator = (function() {\n\tlet total = 0;\n\treturn {\n\t\tadd(x) { total += x; },\n\t\tsub(x) { total -= x; },\n\t\tget() { return total; }\n\t};\n})();\nCalculator.add(5);\nCalculator.sub(2);\nconsole.log(Calculator.get());\n`,

  // 10. DOM Manipulation Example
  `const div = document.createElement("div");\ndiv.textContent = "Hello, DOM!";\ndiv.className = "greeting";\ndocument.body.appendChild(div);\nsetTimeout(() => {\n\tdiv.style.color = "red";\n}, 1000);\n`,

  // 11. Event Listener Example
  `const btn = document.createElement("button");\nbtn.textContent = "Click me";\ndocument.body.appendChild(btn);\nbtn.addEventListener("click", () => {\n\talert("Button clicked!");\n});\n`,

  // 12. Local Storage Example
  `localStorage.setItem("theme", "dark");\nconst theme = localStorage.getItem("theme");\nconsole.log("Theme:", theme);\nlocalStorage.removeItem("theme");\n`,

  // 13. JSON Parse/Stringify Example
  `const obj = { a: 1, b: 2 };\nconst json = JSON.stringify(obj);\nconst parsed = JSON.parse(json);\nconsole.log(json, parsed);\n`,

  // 14. Set and Map Example
  `const set = new Set([1, 2, 3, 2]);\nset.add(4);\nconsole.log([...set]);\nconst map = new Map();\nmap.set("a", 1);\nmap.set("b", 2);\nconsole.log(map.get("a"));\n`,

  // 15. Array Buffer and Typed Array Example
  `const buffer = new ArrayBuffer(8);\nconst view = new Uint32Array(buffer);\nview[0] = 123456;\nview[1] = 654321;\nconsole.log(view[0], view[1]);\n`,

  // 16. Debounce Function Example
  `function debounce(fn, delay) {\n\tlet timer;\n\treturn function(...args) {\n\t\tclearTimeout(timer);\n\t\ttimer = setTimeout(() => fn.apply(this, args), delay);\n\t};\n}\nconst log = debounce(msg => console.log(msg), 300);\nlog("Hello");\n`,

  // 17. Fetch with Headers Example
  `fetch("https://jsonplaceholder.typicode.com/posts", {\n\tmethod: "POST",\n\theaders: { "Content-Type": "application/json" },\n\tbody: JSON.stringify({ title: "foo", body: "bar", userId: 1 })\n})\n\t.then(res => res.json())\n\t.then(data => console.log(data));\n`,

  // 18. Custom Error Example
  `class CustomError extends Error {\n\tconstructor(message) {\n\t\tsuper(message);\n\t\tthis.name = "CustomError";\n\t}\n}\ntry {\n\tthrow new CustomError("Something went wrong!");\n} catch (e) {\n\tconsole.error(e.name, e.message);\n}\n`,

  // 19. Proxy Example
  `const obj = { a: 1 };\nconst proxy = new Proxy(obj, {\n\tget(target, prop) {\n\t\treturn prop in target ? target[prop] : 0;\n\t}\n});\nconsole.log(proxy.a, proxy.b);\n`,

  // 20. Generator Function Example
  `function* idGenerator() {\n\tlet id = 1;\n\twhile (true) {\n\t\tyield id++;\n\t}\n}\nconst gen = idGenerator();\nconsole.log(gen.next().value, gen.next().value);\n`,
  // 21. Currying Example
  `function multiply(a) {\n\treturn function(b) {\n\t\treturn a * b;\n\t};\n}\nconst double = multiply(2);\nconsole.log(double(5));\n`,

  // 22. Array Flatten Example
  `function flatten(arr) {\n\treturn arr.reduce((flat, toFlatten) => flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten), []);\n}\nconsole.log(flatten([1, [2, [3, 4]], 5]));\n`,

  // 23. Deep Clone Example
  `function deepClone(obj) {\n\tif (obj === null || typeof obj !== "object") return obj;\n\tif (Array.isArray(obj)) return obj.map(deepClone);\n\tconst copy = {};\n\tfor (const key in obj) {\n\t\tcopy[key] = deepClone(obj[key]);\n\t}\n\treturn copy;\n}\nconst original = { a: 1, b: { c: 2 } };\nconst clone = deepClone(original);\n`,

  // 24. Memoization Example
  `function memoize(fn) {\n\tconst cache = {};\n\treturn function(...args) {\n\t\tconst key = JSON.stringify(args);\n\t\tif (!(key in cache)) {\n\t\t\tcache[key] = fn.apply(this, args);\n\t\t}\n\t\treturn cache[key];\n\t};\n}\nconst fib = memoize(n => n < 2 ? n : fib(n - 1) + fib(n - 2));\nconsole.log(fib(10));\n`,

  // 25. Throttle Example
  `function throttle(fn, limit) {\n\tlet inThrottle;\n\treturn function(...args) {\n\t\tif (!inThrottle) {\n\t\t\tfn.apply(this, args);\n\t\t\tinThrottle = true;\n\t\t\tsetTimeout(() => inThrottle = false, limit);\n\t\t}\n\t};\n}\nconst log = throttle(console.log, 1000);\nlog("Hello");\n`,

  // 26. Event Delegation Example
  `document.body.addEventListener("click", function(e) {\n\tif (e.target.matches(".btn")) {\n\t\tconsole.log("Button clicked:", e.target.textContent);\n\t}\n});\nconst btn = document.createElement("button");\nbtn.className = "btn";\nbtn.textContent = "Delegated";\ndocument.body.appendChild(btn);\n`,

  // 27. Intersection Observer Example
  `const observer = new IntersectionObserver(entries => {\n\tentries.forEach(entry => {\n\t\tif (entry.isIntersecting) {\n\t\t\tconsole.log("Visible:", entry.target);\n\t\t}\n\t});\n});\nconst el = document.createElement("div");\ndocument.body.appendChild(el);\nobserver.observe(el);\n`,

  // 28. Web Worker Example
  `const workerCode = "onmessage = function(e) { postMessage(e.data * 2); }";\nconst blob = new Blob([workerCode], { type: "application/javascript" });\nconst worker = new Worker(URL.createObjectURL(blob));\nworker.onmessage = e => console.log("Worker:", e.data);\nworker.postMessage(21);\n`,

  // 29. Fetch Abort Example
  `const controller = new AbortController();\nfetch("https://jsonplaceholder.typicode.com/posts/1", { signal: controller.signal })\n\t.then(res => res.json())\n\t.then(data => console.log(data))\n\t.catch(e => console.error("Fetch aborted", e));\nsetTimeout(() => controller.abort(), 100);\n`,

  // 30. Custom Iterator Example
  `const range = {\n\tfrom: 1,\n\tto: 5,\n\t[Symbol.iterator]() {\n\t\tlet current = this.from, last = this.to;\n\t\treturn {\n\t\t\tnext() {\n\t\t\t\treturn current <= last ? { done: false, value: current++ } : { done: true };\n\t\t\t}\n\t\t};\n\t}\n};\nfor (const num of range) {\n\tconsole.log(num);\n}\n`,

  // 31. Object.freeze Example
  `const config = { api: "v1", debug: true };\nObject.freeze(config);\n// config.api = "v2"; // No effect\nconsole.log(Object.isFrozen(config));\n`,

  // 32. Symbol Example
  `const sym = Symbol("unique");\nconst obj = { [sym]: 42 };\nconsole.log(obj[sym]);\n`,

  // 33. Map/Set Iteration Example
  `const map = new Map([["a", 1], ["b", 2]]);\nfor (const [k, v] of map) {\n\tconsole.log(k, v);\n}\nconst set = new Set([1, 2, 3]);\nset.forEach(v => console.log(v));\n`,

  // 34. Template Literal Tag Example
  `function tag(strings, ...values) {\n\treturn strings.reduce((acc, str, i) => acc + str + (values[i] || ""), "");\n}\nconst name = "World";\nconsole.log(tag\`Hello, \${name}!\`);\n`,

  // 35. Optional Chaining Example
  `const user = { profile: { name: "Alice" } };\nconsole.log(user.profile?.name);\nconsole.log(user.address?.city);\n`,

  // 36. Nullish Coalescing Example
  `const input = "";\nconst value = input ?? "default";\nconsole.log(value);\n`,

  // 37. Object.entries/Object.fromEntries Example
  `const obj = { a: 1, b: 2 };\nconst entries = Object.entries(obj);\nconst rebuilt = Object.fromEntries(entries);\nconsole.log(entries, rebuilt);\n`,

  // 38. ArrayBuffer/TypedArray Example
  `const buffer = new ArrayBuffer(16);\nconst view = new Int16Array(buffer);\nview[0] = 256;\nview[1] = 512;\nconsole.log(view[0], view[1]);\n`,

  // 39. Custom Event Example
  `const event = new CustomEvent("hello", { detail: { msg: "world" } });\ndocument.addEventListener("hello", e => console.log(e.detail));\ndocument.dispatchEvent(event);\n`,

  // 40. WeakMap/WeakSet Example
  `const wm = new WeakMap();\nconst ws = new WeakSet();\nlet obj = {};\nwm.set(obj, 123);\nws.add(obj);\nconsole.log(wm.get(obj), ws.has(obj));\nobj = null;\n`,

  // 41. Function.prototype.bind Example
  `function greet(msg) {\n\tconsole.log(this.name + ": " + msg);\n}\nconst person = { name: "Bob" };\nconst bound = greet.bind(person, "Hello!");\nbound();\n`,

  // 42. Array find/findIndex Example
  `const arr = [5, 12, 8, 130, 44];\nconst found = arr.find(x => x > 10);\nconst idx = arr.findIndex(x => x > 10);\nconsole.log(found, idx);\n`,

  // 43. Array includes Example
  `const fruits = ["apple", "banana", "mango"];\nconsole.log(fruits.includes("banana"));\nconsole.log(fruits.includes("pear"));\n`,

  // 44. String.padStart/padEnd Example
  `const str = "5";\nconsole.log(str.padStart(3, "0"));\nconsole.log(str.padEnd(3, "0"));\n`,

  // 45. Object.assign Example
  `const a = { x: 1 };\nconst b = { y: 2 };\nconst merged = Object.assign({}, a, b);\nconsole.log(merged);\n`,

  // 46. Array.some/every Example
  `const nums = [1, 2, 3, 4, 5];\nconsole.log(nums.some(n => n > 3));\nconsole.log(nums.every(n => n > 0));\n`,

  // 47. Array.reduceRight Example
  `const arr = ["a", "b", "c"];\nconst res = arr.reduceRight((acc, cur) => acc + cur, "");\nconsole.log(res);\n`,

  // 48. Date Formatting Example
  `const now = new Date();\nconsole.log(now.toISOString());\nconsole.log(now.toLocaleDateString());\n`,

  // 49. Intl.NumberFormat Example
  `const nf = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });\nconsole.log(nf.format(123456.789));\n`,

  // 50. ArrayBuffer to Base64 Example
  `function arrayBufferToBase64(buffer) {\n\tlet binary = "";\n\tconst bytes = new Uint8Array(buffer);\n\tfor (let i = 0; i < bytes.byteLength; i++) {\n\t\tbinary += String.fromCharCode(bytes[i]);\n\t}\n\treturn btoa(binary);\n}\nconst buf = new Uint8Array([72, 101, 108, 108, 111]).buffer;\nconsole.log(arrayBufferToBase64(buf));\n`,
];
