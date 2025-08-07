export const TYPESCRIPT_WORDS = [
  // 6. Discriminated Union Example
  `type Shape = { kind: "circle"; radius: number } | { kind: "square"; size: number };↵function area(shape: Shape): number {↵→switch (shape.kind) {↵→→case "circle": return Math.PI * shape.radius ** 2;↵→→case "square": return shape.size ** 2;↵→}↵}↵const s: Shape = { kind: "circle", radius: 5 };↵console.log(area(s));↵`,

  // 7. Type Guard Example
  `function isString(val: unknown): val is string {↵→return typeof val === "string";↵}↵function printLength(val: unknown) {↵→if (isString(val)) {↵→→console.log(val.length);↵→} else {↵→→console.log("Not a string");↵→}↵}↵printLength("hello");↵`,

  // 8. Partial and Pick Utility Types
  `interface User {↵→id: number;↵→name: string;↵→email: string;↵}↵function updateUser(user: User, updates: Partial<Pick<User, "name" | "email">>) {↵→return { ...user, ...updates };↵}↵const u = updateUser({ id: 1, name: "A", email: "a@b.com" }, { name: "B" });↵`,

  // 9. Async/Await with Error Handling
  `async function getData(url: string) {↵→try {↵→→const res = await fetch(url);↵→→if (!res.ok) throw new Error("Bad response");↵→→return await res.json();↵→} catch (e) {↵→→console.error(e);↵→}↵}↵getData("https://api.example.com");↵`,

  // 10. Generic Stack Class
  `class Stack<T> {↵→private items: T[] = [];↵→push(item: T) { this.items.push(item); }↵→pop(): T | undefined { return this.items.pop(); }↵→peek(): T | undefined { return this.items[this.items.length - 1]; }↵}↵const s = new Stack<number>();↵s.push(1);↵s.push(2);↵console.log(s.pop());↵`,

  // 11. Readonly and Record
  `type Config = Readonly<Record<string, string>>;↵const config: Config = { api: "v1", env: "prod" };↵// config.api = "v2"; // Error: Cannot assign to 'api' because it is a read-only property↵console.log(config.env);↵`,

  // 12. Function Overload Example
  `function reverse(s: string): string;↵function reverse<T>(arr: T[]): T[];↵function reverse(arg: any): any {↵→if (typeof arg === "string") return arg.split("").reverse().join("");↵→return arg.slice().reverse();↵}↵console.log(reverse("abc"));↵console.log(reverse([1,2,3]));↵`,

  // 13. Template Literal Types
  `type Event = "click" | "focus";↵type HandlerName = \`on\${Capitalize<Event>}\`;↵const handler: HandlerName = "onClick";↵`,

  // 14. Awaited and Promise Example
  `type AwaitedType<T> = T extends Promise<infer U> ? U : T;↵async function foo(): Promise<number> { return 42; }↵type Result = AwaitedType<ReturnType<typeof foo>>;↵`,

  // 15. Conditional Types Example
  `type IsString<T> = T extends string ? true : false;↵type A = IsString<"abc">;↵type B = IsString<123>;↵const a: A = true;↵const b: B = false;↵`,

  // 16. Index Signature Example
  `interface Dictionary {↵→[key: string]: number;↵}↵const dict: Dictionary = { apples: 5, oranges: 10 };↵console.log(dict["apples"]);↵`,

  // 17. Keyof and Lookup Types
  `interface Car {↵→make: string;↵→model: string;↵→year: number;↵}↵type CarKeys = keyof Car;↵function getCarProp(car: Car, key: CarKeys) {↵→return car[key];↵}↵`,

  // 18. Omit Utility Type
  `interface Person {↵→id: number;↵→name: string;↵→age: number;↵}↵type PersonNoAge = Omit<Person, "age">;↵const p: PersonNoAge = { id: 1, name: "Bob" };↵`,

  // 19. Namespace Example
  `namespace MathUtils {↵→export function add(a: number, b: number) { return a + b; }↵→export function mul(a: number, b: number) { return a * b; }↵}↵console.log(MathUtils.add(2, 3));↵`,

  // 20. Abstract Class Example
  `abstract class Animal {↵→abstract speak(): void;↵}↵class Cat extends Animal {↵→speak() { console.log("Meow"); }↵}↵const c = new Cat();↵c.speak();↵`,

  // 21. Static Method Example
  `class MathHelper {↵→static square(x: number) { return x * x; }↵}↵console.log(MathHelper.square(5));↵`,

  // 22. Private Field Example
  `class Secret {↵→#value = 123;↵→getValue() { return this.#value; }↵}↵const s = new Secret();↵console.log(s.getValue());↵`,

  // 23. Intersection Type Example
  `type A = { a: number };↵type B = { b: string };↵type AB = A & B;↵const ab: AB = { a: 1, b: "hi" };↵`,

  // 24. Module Import/Export Example
  `// utils.ts↵export function double(x: number) { return x * 2; }↵// main.ts↵import { double } from "./utils";↵console.log(double(4));↵`,

  // 25. Satisfies Operator Example
  `const config = {↵→port: 3000,↵→secure: true↵} satisfies Record<string, unknown>;↵console.log(config.port);↵`,
  // 26. Tuple Usage Example
  `const entry: [number, string] = [1, "one"];↵function printEntry([id, value]: [number, string]) {↵→console.log(\`ID: \${id}, Value: \${value}\`);↵}↵printEntry(entry);↵`,

  // 27. Enum with Switch
  `enum Status {↵→Pending,↵→Active,↵→Done↵}↵function getStatusLabel(status: Status): string {↵→switch (status) {↵→→case Status.Pending: return "Pending";↵→→case Status.Active: return "Active";↵→→case Status.Done: return "Done";↵→}↵}↵console.log(getStatusLabel(Status.Active));↵`,

  // 28. Type Assertion Example
  `const el = document.querySelector("#myInput");↵const input = el as HTMLInputElement;↵input.value = "Hello";↵`,

  // 29. Optional Properties Example
  `interface Product {↵→id: number;↵→name: string;↵→description?: string;↵}↵const p: Product = { id: 1, name: "Book" };↵`,

  // 30. Rest Parameters Example
  `function sumAll(...nums: number[]): number {↵→return nums.reduce((a, b) => a + b, 0);↵}↵console.log(sumAll(1, 2, 3, 4));↵`,

  // 31. Readonly Array Example
  `const arr: ReadonlyArray<number> = [1, 2, 3];↵// arr.push(4); // Error↵console.log(arr[0]);↵`,

  // 32. Function Type Example
  `type Comparator<T> = (a: T, b: T) => number;↵const numCompare: Comparator<number> = (a, b) => a - b;↵console.log(numCompare(5, 3));↵`,

  // 33. Generic Interface Example
  `interface ApiResponse<T> {↵→data: T;↵→success: boolean;↵}↵const resp: ApiResponse<string> = { data: "ok", success: true };↵`,

  // 34. Union with Literal Types
  `type Direction = "up" | "down" | "left" | "right";↵function move(dir: Direction) {↵→console.log("Moving", dir);↵}↵move("left");↵`,

  // 35. Non-null Assertion Example
  `function printLength(str?: string) {↵→console.log(str!.length);↵}↵printLength("hello");↵`,

  // 36. Default Generic Parameter
  `type Box<T = string> = { value: T };↵const b: Box = { value: "default" };↵`,

  // 37. Recursive Type Example
  `type NestedArray<T> = T | NestedArray<T>[];↵const arr: NestedArray<number> = [1, [2, [3]]];↵`,

  // 38. Key Remapping in Mapped Types
  `type PrefixKeys<T> = {↵→[K in keyof T as \`prefix_\${string & K}\`]: T[K]↵};↵type User = { id: number, name: string };↵type PrefixedUser = PrefixKeys<User>;↵`,

  // 39. Typeof Usage Example
  `const settings = { dark: true, version: 2 };↵type Settings = typeof settings;↵const s: Settings = { dark: false, version: 3 };↵`,

  // 40. Exclude Utility Example
  `type Letters = "a" | "b" | "c";↵type NotA = Exclude<Letters, "a">;↵const letter: NotA = "b";↵`,

  // 41. Extract Utility Example
  `type Mixed = string | number | (() => void);↵type JustFunc = Extract<Mixed, Function>;↵const fn: JustFunc = () => {};↵`,

  // 42. Awaited Utility Example
  `type AsyncString = Promise<string>;↵type Resolved = Awaited<AsyncString>;↵const str: Resolved = "done";↵`,

  // 43. Infer in Conditional Types
  `type ReturnTypeOf<T> = T extends (...args: any[]) => infer R ? R : never;↵function foo() { return 123; }↵type FooReturn = ReturnTypeOf<typeof foo>;↵`,

  // 44. Function with This Parameter
  `function say(this: { name: string }, msg: string) {↵→console.log(this.name + ": " + msg);↵}↵say.call({ name: "Bob" }, "Hello");↵`,

  // 45. Symbol Type Example
  `const sym: unique symbol = Symbol("id");↵const obj = { [sym]: 123 };↵console.log(obj[sym]);↵`,

  // 46. Never Type Example
  `function fail(msg: string): never {↵→throw new Error(msg);↵}↵// fail("Error!");↵`,

  // 47. Discriminated Union with Exhaustiveness
  `type Shape = { kind: "circle", r: number } | { kind: "rect", w: number, h: number };↵function area(s: Shape): number {↵→switch (s.kind) {↵→→case "circle": return Math.PI * s.r * s.r;↵→→case "rect": return s.w * s.h;↵→}↵}↵`,

  // 48. Optional Chaining and Nullish Coalescing
  `const user = { profile: { name: "Alice" } };↵const name = user.profile?.name ?? "Unknown";↵console.log(name);↵`,

  // 49. Assertion Functions Example
  `function assertString(val: unknown): asserts val is string {↵→if (typeof val !== "string") throw new Error("Not a string");↵}↵let x: unknown = "hi";↵assertString(x);↵console.log(x.length);↵`,

  // 50. Readonly Tuple Example
  `const point: readonly [number, number] = [10, 20];↵// point[0] = 5; // Error↵console.log(point[1]);↵`,
];
