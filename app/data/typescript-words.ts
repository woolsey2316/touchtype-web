export const TYPESCRIPT_WORDS = [
  // 6. Discriminated Union Example
  `type Shape = { kind: "circle"; radius: number } | { kind: "square"; size: number };\nfunction area(shape: Shape): number {\n\tswitch (shape.kind) {\n\t\tcase "circle": return Math.PI * shape.radius ** 2;\n\t\tcase "square": return shape.size ** 2;\n\t}\n}\nconst s: Shape = { kind: "circle", radius: 5 };\nconsole.log(area(s));\n`,

  // 7. Type Guard Example
  `function isString(val: unknown): val is string {\n\treturn typeof val === "string";\n}\nfunction printLength(val: unknown) {\n\tif (isString(val)) {\n\t\tconsole.log(val.length);\n\t} else {\n\t\tconsole.log("Not a string");\n\t}\n}\nprintLength("hello");\n`,

  // 8. Partial and Pick Utility Types
  `interface User {\n\tid: number;\n\tname: string;\n\temail: string;\n}\nfunction updateUser(user: User, updates: Partial<Pick<User, "name" | "email">>) {\n\treturn { ...user, ...updates };\n}\nconst u = updateUser({ id: 1, name: "A", email: "a@b.com" }, { name: "B" });\n`,

  // 9. Async/Await with Error Handling
  `async function getData(url: string) {\n\ttry {\n\t\tconst res = await fetch(url);\n\t\tif (!res.ok) throw new Error("Bad response");\n\t\treturn await res.json();\n\t} catch (e) {\n\t\tconsole.error(e);\n\t}\n}\ngetData("https://api.example.com");\n`,

  // 10. Generic Stack Class
  `class Stack<T> {\n\tprivate items: T[] = [];\n\tpush(item: T) { this.items.push(item); }\n\tpop(): T | undefined { return this.items.pop(); }\n\tpeek(): T | undefined { return this.items[this.items.length - 1]; }\n}\nconst s = new Stack<number>();\ns.push(1);\ns.push(2);\nconsole.log(s.pop());\n`,

  // 11. Readonly and Record
  `type Config = Readonly<Record<string, string>>;\nconst config: Config = { api: "v1", env: "prod" };\n// config.api = "v2"; // Error: Cannot assign to 'api' because it is a read-only property\nconsole.log(config.env);\n`,

  // 12. Function Overload Example
  `function reverse(s: string): string;\nfunction reverse<T>(arr: T[]): T[];\nfunction reverse(arg: any): any {\n\tif (typeof arg === "string") return arg.split("").reverse().join("");\n\treturn arg.slice().reverse();\n}\nconsole.log(reverse("abc"));\nconsole.log(reverse([1,2,3]));\n`,

  // 13. Template Literal Types
  `type Event = "click" | "focus";\ntype HandlerName = \`on\${Capitalize<Event>}\`;\nconst handler: HandlerName = "onClick";\n`,

  // 14. Awaited and Promise Example
  `type AwaitedType<T> = T extends Promise<infer U> ? U : T;\nasync function foo(): Promise<number> { return 42; }\ntype Result = AwaitedType<ReturnType<typeof foo>>;\n`,

  // 15. Conditional Types Example
  `type IsString<T> = T extends string ? true : false;\ntype A = IsString<"abc">;\ntype B = IsString<123>;\nconst a: A = true;\nconst b: B = false;\n`,

  // 16. Index Signature Example
  `interface Dictionary {\n\t[key: string]: number;\n}\nconst dict: Dictionary = { apples: 5, oranges: 10 };\nconsole.log(dict["apples"]);\n`,

  // 17. Keyof and Lookup Types
  `interface Car {\n\tmake: string;\n\tmodel: string;\n\tyear: number;\n}\ntype CarKeys = keyof Car;\nfunction getCarProp(car: Car, key: CarKeys) {\n\treturn car[key];\n}\n`,

  // 18. Omit Utility Type
  `interface Person {\n\tid: number;\n\tname: string;\n\tage: number;\n}\ntype PersonNoAge = Omit<Person, "age">;\nconst p: PersonNoAge = { id: 1, name: "Bob" };\n`,

  // 19. Namespace Example
  `namespace MathUtils {\n\texport function add(a: number, b: number) { return a + b; }\n\texport function mul(a: number, b: number) { return a * b; }\n}\nconsole.log(MathUtils.add(2, 3));\n`,

  // 20. Abstract Class Example
  `abstract class Animal {\n\tabstract speak(): void;\n}\nclass Cat extends Animal {\n\tspeak() { console.log("Meow"); }\n}\nconst c = new Cat();\nc.speak();\n`,

  // 21. Static Method Example
  `class MathHelper {\n\tstatic square(x: number) { return x * x; }\n}\nconsole.log(MathHelper.square(5));\n`,

  // 22. Private Field Example
  `class Secret {\n\t#value = 123;\n\tgetValue() { return this.#value; }\n}\nconst s = new Secret();\nconsole.log(s.getValue());\n`,

  // 23. Intersection Type Example
  `type A = { a: number };\ntype B = { b: string };\ntype AB = A & B;\nconst ab: AB = { a: 1, b: "hi" };\n`,

  // 24. Module Import/Export Example
  `// utils.ts\nexport function double(x: number) { return x * 2; }\n// main.ts\nimport { double } from "./utils";\nconsole.log(double(4));\n`,

  // 25. Satisfies Operator Example
  `const config = {\n\tport: 3000,\n\tsecure: true\n} satisfies Record<string, unknown>;\nconsole.log(config.port);\n`,
  // 26. Tuple Usage Example
  `const entry: [number, string] = [1, "one"];\nfunction printEntry([id, value]: [number, string]) {\n\tconsole.log(\`ID: \${id}, Value: \${value}\`);\n}\nprintEntry(entry);\n`,

  // 27. Enum with Switch
  `enum Status {\n\tPending,\n\tActive,\n\tDone\n}\nfunction getStatusLabel(status: Status): string {\n\tswitch (status) {\n\t\tcase Status.Pending: return "Pending";\n\t\tcase Status.Active: return "Active";\n\t\tcase Status.Done: return "Done";\n\t}\n}\nconsole.log(getStatusLabel(Status.Active));\n`,

  // 28. Type Assertion Example
  `const el = document.querySelector("#myInput");\nconst input = el as HTMLInputElement;\ninput.value = "Hello";\n`,

  // 29. Optional Properties Example
  `interface Product {\n\tid: number;\n\tname: string;\n\tdescription?: string;\n}\nconst p: Product = { id: 1, name: "Book" };\n`,

  // 30. Rest Parameters Example
  `function sumAll(...nums: number[]): number {\n\treturn nums.reduce((a, b) => a + b, 0);\n}\nconsole.log(sumAll(1, 2, 3, 4));\n`,

  // 31. Readonly Array Example
  `const arr: ReadonlyArray<number> = [1, 2, 3];\n// arr.push(4); // Error\nconsole.log(arr[0]);\n`,

  // 32. Function Type Example
  `type Comparator<T> = (a: T, b: T) => number;\nconst numCompare: Comparator<number> = (a, b) => a - b;\nconsole.log(numCompare(5, 3));\n`,

  // 33. Generic Interface Example
  `interface ApiResponse<T> {\n\tdata: T;\n\tsuccess: boolean;\n}\nconst resp: ApiResponse<string> = { data: "ok", success: true };\n`,

  // 34. Union with Literal Types
  `type Direction = "up" | "down" | "left" | "right";\nfunction move(dir: Direction) {\n\tconsole.log("Moving", dir);\n}\nmove("left");\n`,

  // 35. Non-null Assertion Example
  `function printLength(str?: string) {\n\tconsole.log(str!.length);\n}\nprintLength("hello");\n`,

  // 36. Default Generic Parameter
  `type Box<T = string> = { value: T };\nconst b: Box = { value: "default" };\n`,

  // 37. Recursive Type Example
  `type NestedArray<T> = T | NestedArray<T>[];\nconst arr: NestedArray<number> = [1, [2, [3]]];\n`,

  // 38. Key Remapping in Mapped Types
  `type PrefixKeys<T> = {\n\t[K in keyof T as \`prefix_\${string & K}\`]: T[K]\n};\ntype User = { id: number, name: string };\ntype PrefixedUser = PrefixKeys<User>;\n`,

  // 39. Typeof Usage Example
  `const settings = { dark: true, version: 2 };\ntype Settings = typeof settings;\nconst s: Settings = { dark: false, version: 3 };\n`,

  // 40. Exclude Utility Example
  `type Letters = "a" | "b" | "c";\ntype NotA = Exclude<Letters, "a">;\nconst letter: NotA = "b";\n`,

  // 41. Extract Utility Example
  `type Mixed = string | number | (() => void);\ntype JustFunc = Extract<Mixed, Function>;\nconst fn: JustFunc = () => {};\n`,

  // 42. Awaited Utility Example
  `type AsyncString = Promise<string>;\ntype Resolved = Awaited<AsyncString>;\nconst str: Resolved = "done";\n`,

  // 43. Infer in Conditional Types
  `type ReturnTypeOf<T> = T extends (...args: any[]) => infer R ? R : never;\nfunction foo() { return 123; }\ntype FooReturn = ReturnTypeOf<typeof foo>;\n`,

  // 44. Function with This Parameter
  `function say(this: { name: string }, msg: string) {\n\tconsole.log(this.name + ": " + msg);\n}\nsay.call({ name: "Bob" }, "Hello");\n`,

  // 45. Symbol Type Example
  `const sym: unique symbol = Symbol("id");\nconst obj = { [sym]: 123 };\nconsole.log(obj[sym]);\n`,

  // 46. Never Type Example
  `function fail(msg: string): never {\n\tthrow new Error(msg);\n}\n// fail("Error!");\n`,

  // 47. Discriminated Union with Exhaustiveness
  `type Shape = { kind: "circle", r: number } | { kind: "rect", w: number, h: number };\nfunction area(s: Shape): number {\n\tswitch (s.kind) {\n\t\tcase "circle": return Math.PI * s.r * s.r;\n\t\tcase "rect": return s.w * s.h;\n\t}\n}\n`,

  // 48. Optional Chaining and Nullish Coalescing
  `const user = { profile: { name: "Alice" } };\nconst name = user.profile?.name ?? "Unknown";\nconsole.log(name);\n`,

  // 49. Assertion Functions Example
  `function assertString(val: unknown): asserts val is string {\n\tif (typeof val !== "string") throw new Error("Not a string");\n}\nlet x: unknown = "hi";\nassertString(x);\nconsole.log(x.length);\n`,

  // 50. Readonly Tuple Example
  `const point: readonly [number, number] = [10, 20];\n// point[0] = 5; // Error\nconsole.log(point[1]);\n`,
];
