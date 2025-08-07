export const CPLUSPLUS_WORDS = [
  // 1. Hello World
  '#include <iostream>↵int main() {↵→std::cout << "Hello, World!" << std::endl;↵→return 0;↵}',

  // 2. Sum of Two Numbers
  "#include <iostream>↵int main() {↵→int a = 5, b = 7;↵→std::cout << (a + b) << std::endl;↵→return 0;↵}",

  // 3. For Loop Example
  '#include <iostream>↵int main() {↵→for(int i = 0; i < 5; ++i) {↵→→std::cout << i << " ";↵→}↵→return 0;↵}',

  // 4. Function Example
  "#include <iostream>↵int add(int x, int y) {↵→return x + y;↵}↵int main() {↵→std::cout << add(3, 4) << std::endl;↵→return 0;↵}",

  // 5. Class Example
  '#include <iostream>↵class Point {↵public:↵→int x, y;↵→Point(int x, int y): x(x), y(y) {}↵→void print() { std::cout << x << "," << y << std::endl; }↵};↵int main() {↵→Point p(1,2);↵→p.print();↵→return 0;↵}',

  // 6. Vector Example
  '#include <iostream>↵#include <vector>↵int main() {↵→std::vector<int> v = {1,2,3};↵→for(auto n : v) std::cout << n << " ";↵→return 0;↵}',

  // 7. String Example
  '#include <iostream>↵#include <string>↵int main() {↵→std::string s = "C++";↵→std::cout << s << std::endl;↵→return 0;↵}',

  // 8. If-Else Example
  '#include <iostream>↵int main() {↵→int n = 10;↵→if(n > 5) std::cout << "big";↵→else std::cout << "small";↵→return 0;↵}',

  // 9. Switch Example
  '#include <iostream>↵int main() {↵→int n = 2;↵→switch(n) {↵→→case 1: std::cout << "one"; break;↵→→case 2: std::cout << "two"; break;↵→→default: std::cout << "other";↵→}↵→return 0;↵}',

  // 10. Array Example
  '#include <iostream>↵int main() {↵→int arr[3] = {1,2,3};↵→for(int i=0;i<3;++i) std::cout << arr[i] << " ";↵→return 0;↵}',

  // 11. Reference Example
  "#include <iostream>↵void inc(int& n) { n++; }↵int main() {↵→int x = 5;↵→inc(x);↵→std::cout << x;↵→return 0;↵}",

  // 12. Pointer Example
  "#include <iostream>↵int main() {↵→int x = 10;↵→int* p = &x;↵→std::cout << *p;↵→return 0;↵}",

  // 13. Const Example
  "#include <iostream>↵int main() {↵→const int x = 42;↵→std::cout << x;↵→return 0;↵}",

  // 14. Struct Example
  '#include <iostream>↵struct Person {↵→std::string name;↵→int age;↵};↵int main() {↵→Person p = {"Bob", 20};↵→std::cout << p.name;↵→return 0;↵}',

  // 15. Namespace Example
  "#include <iostream>↵namespace math {↵→int add(int a, int b) { return a + b; }↵}↵int main() {↵→std::cout << math::add(2,3);↵→return 0;↵}",

  // 16. Overloading Example
  '#include <iostream>↵int add(int a, int b) { return a + b; }↵double add(double a, double b) { return a + b; }↵int main() {↵→std::cout << add(2,3) << " " << add(2.5,3.5);↵→return 0;↵}',

  // 17. Operator Overload
  '#include <iostream>↵struct Point {↵→int x, y;↵→Point operator+(const Point& p) { return {x+p.x, y+p.y}; }↵};↵int main() {↵→Point a{1,2}, b{3,4};↵→Point c = a + b;↵→std::cout << c.x << "," << c.y;↵→return 0;↵}',

  // 18. Inheritance Example
  '#include <iostream>↵class Animal {↵public:↵→virtual void speak() { std::cout << "?"; }↵};↵class Dog : public Animal {↵public:↵→void speak() override { std::cout << "Woof"; }↵};↵int main() {↵→Dog d;↵→d.speak();↵→return 0;↵}',

  // 19. Virtual Function Example
  '#include <iostream>↵class Base {↵public:↵→virtual void foo() { std::cout << "Base"; }↵};↵class Derived : public Base {↵public:↵→void foo() override { std::cout << "Derived"; }↵};↵int main() {↵→Base* b = new Derived();↵→b->foo();↵→delete b;↵→return 0;↵}',

  // 20. Pure Virtual Example
  "#include <iostream>↵class Shape {↵public:↵→virtual double area() const = 0;↵};↵class Square : public Shape {↵public:↵→Square(double s):side(s){}↵→double area() const override { return side*side; }↵private:↵→double side;↵};↵int main() {↵→Square s(3);↵→std::cout << s.area();↵→return 0;↵}",

  // 21. Template Function Example
  '#include <iostream>↵template<typename T>↵T max(T a, T b) { return a > b ? a : b; }↵int main() {↵→std::cout << max(2, 3) << " " << max(2.5, 1.5);↵→return 0;↵}',

  // 22. Template Class Example
  "#include <iostream>↵template<typename T>↵class Box {↵public:↵→T value;↵→Box(T v):value(v){}↵};↵int main() {↵→Box<int> b(5);↵→std::cout << b.value;↵→return 0;↵}",

  // 23. Lambda Example
  "#include <iostream>↵int main() {↵→auto add = [](int a, int b) { return a + b; };↵→std::cout << add(2,3);↵→return 0;↵}",

  // 24. Exception Example
  '#include <iostream>↵#include <stdexcept>↵int main() {↵→try {↵→→throw std::runtime_error("fail");↵→} catch(const std::exception& e) {↵→→std::cout << e.what();↵→}↵→return 0;↵}',

  // 25. File I/O Example
  '#include <fstream>↵#include <iostream>↵int main() {↵→std::ofstream out("test.txt");↵→out << "Hello";↵→out.close();↵→std::ifstream in("test.txt");↵→std::string s;↵→in >> s;↵→std::cout << s;↵→return 0;↵}',

  // 26. std::map Example
  '#include <iostream>↵#include <map>↵int main() {↵→std::map<std::string, int> m;↵→m["a"] = 1;↵→m["b"] = 2;↵→for(auto& p : m) std::cout << p.first << p.second;↵→return 0;↵}',

  // 27. std::set Example
  "#include <iostream>↵#include <set>↵int main() {↵→std::set<int> s = {1,2,3};↵→s.insert(2);↵→for(auto n : s) std::cout << n;↵→return 0;↵}",

  // 28. std::stack Example
  "#include <iostream>↵#include <stack>↵int main() {↵→std::stack<int> s;↵→s.push(1);↵→s.push(2);↵→std::cout << s.top();↵→return 0;↵}",

  // 29. std::queue Example
  "#include <iostream>↵#include <queue>↵int main() {↵→std::queue<int> q;↵→q.push(1);↵→q.push(2);↵→std::cout << q.front();↵→return 0;↵}",

  // 30. std::priority_queue Example
  "#include <iostream>↵#include <queue>↵int main() {↵→std::priority_queue<int> pq;↵→pq.push(3);↵→pq.push(1);↵→pq.push(2);↵→std::cout << pq.top();↵→return 0;↵}",

  // 31. std::pair Example
  '#include <iostream>↵#include <utility>↵int main() {↵→std::pair<int, std::string> p(1, "a");↵→std::cout << p.first << p.second;↵→return 0;↵}',

  // 32. std::tuple Example
  '#include <iostream>↵#include <tuple>↵int main() {↵→auto t = std::make_tuple(1, 2.5, "hi");↵→std::cout << std::get<0>(t);↵→return 0;↵}',

  // 33. std::unique_ptr Example
  "#include <iostream>↵#include <memory>↵int main() {↵→auto p = std::make_unique<int>(42);↵→std::cout << *p;↵→return 0;↵}",

  // 34. std::shared_ptr Example
  "#include <iostream>↵#include <memory>↵int main() {↵→auto p = std::make_shared<int>(42);↵→std::cout << *p;↵→return 0;↵}",

  // 35. std::move Example
  '#include <iostream>↵#include <utility>↵#include <string>↵int main() {↵→std::string a = "abc";↵→std::string b = std::move(a);↵→std::cout << b;↵→return 0;↵}',

  // 36. std::sort Example
  "#include <iostream>↵#include <vector>↵#include <algorithm>↵int main() {↵→std::vector<int> v = {3,1,2};↵→std::sort(v.begin(), v.end());↵→for(int n : v) std::cout << n;↵→return 0;↵}",

  // 37. std::find Example
  "#include <iostream>↵#include <vector>↵#include <algorithm>↵int main() {↵→std::vector<int> v = {1,2,3};↵→auto it = std::find(v.begin(), v.end(), 2);↵→if(it != v.end()) std::cout << *it;↵→return 0;↵}",

  // 38. std::accumulate Example
  "#include <iostream>↵#include <vector>↵#include <numeric>↵int main() {↵→std::vector<int> v = {1,2,3};↵→int sum = std::accumulate(v.begin(), v.end(), 0);↵→std::cout << sum;↵→return 0;↵}",

  // 39. std::transform Example
  "#include <iostream>↵#include <vector>↵#include <algorithm>↵int main() {↵→std::vector<int> v = {1,2,3};↵→std::transform(v.begin(), v.end(), v.begin(), [](int n){return n*2;});↵→for(int n : v) std::cout << n;↵→return 0;↵}",

  // 40. std::reverse Example
  "#include <iostream>↵#include <vector>↵#include <algorithm>↵int main() {↵→std::vector<int> v = {1,2,3};↵→std::reverse(v.begin(), v.end());↵→for(int n : v) std::cout << n;↵→return 0;↵}",

  // 41. std::min_element Example
  "#include <iostream>↵#include <vector>↵#include <algorithm>↵int main() {↵→std::vector<int> v = {3,1,2};↵→std::cout << *std::min_element(v.begin(), v.end());↵→return 0;↵}",

  // 42. std::max_element Example
  "#include <iostream>↵#include <vector>↵#include <algorithm>↵int main() {↵→std::vector<int> v = {3,1,2};↵→std::cout << *std::max_element(v.begin(), v.end());↵→return 0;↵}",

  // 43. std::fill Example
  "#include <iostream>↵#include <vector>↵#include <algorithm>↵int main() {↵→std::vector<int> v(5);↵→std::fill(v.begin(), v.end(), 7);↵→for(int n : v) std::cout << n;↵→return 0;↵}",

  // 44. std::copy Example
  "#include <iostream>↵#include <vector>↵#include <algorithm>↵int main() {↵→std::vector<int> a = {1,2,3};↵→std::vector<int> b(3);↵→std::copy(a.begin(), a.end(), b.begin());↵→for(int n : b) std::cout << n;↵→return 0;↵}",

  // 45. std::remove Example
  "#include <iostream>↵#include <vector>↵#include <algorithm>↵int main() {↵→std::vector<int> v = {1,2,3,2};↵→v.erase(std::remove(v.begin(), v.end(), 2), v.end());↵→for(int n : v) std::cout << n;↵→return 0;↵}",

  // 46. std::distance Example
  "#include <iostream>↵#include <vector>↵#include <algorithm>↵int main() {↵→std::vector<int> v = {1,2,3};↵→auto it = std::find(v.begin(), v.end(), 2);↵→std::cout << std::distance(v.begin(), it);↵→return 0;↵}",

  // 47. std::advance Example
  "#include <iostream>↵#include <list>↵#include <iterator>↵int main() {↵→std::list<int> l = {1,2,3};↵→auto it = l.begin();↵→std::advance(it, 2);↵→std::cout << *it;↵→return 0;↵}",

  // 48. std::swap Example
  "#include <iostream>↵int main() {↵→int a = 1, b = 2;↵→std::swap(a, b);↵→std::cout << a << b;↵→return 0;↵}",

  // 49. std::to_string Example
  "#include <iostream>↵int main() {↵→int n = 42;↵→std::string s = std::to_string(n);↵→std::cout << s;↵→return 0;↵}",

  // 50. std::stoi Example
  '#include <iostream>↵#include <string>↵int main() {↵→std::string s = "123";↵→int n = std::stoi(s);↵→std::cout << n;↵→return 0;↵}',
  // 51. std::getline Example
  "#include <iostream>↵#include <string>↵int main() {↵→std::string line;↵→std::getline(std::cin, line);↵→std::cout << line;↵→return 0;↵}",

  // 52. std::istringstream Example
  '#include <iostream>↵#include <sstream>↵int main() {↵→std::istringstream iss("10 20 30");↵→int x, y, z;↵→iss >> x >> y >> z;↵→std::cout << x + y + z;↵→return 0;↵}',

  // 53. std::ostringstream Example
  '#include <iostream>↵#include <sstream>↵int main() {↵→std::ostringstream oss;↵→oss << "Value: " << 42;↵→std::cout << oss.str();↵→return 0;↵}',

  // 54. std::stringstream Example
  "#include <iostream>↵#include <sstream>↵int main() {↵→std::stringstream ss;↵→ss << 123 << ' ' << 456;↵→int a, b;↵→ss >> a >> b;↵→std::cout << a + b;↵→return 0;↵}",

  // 55. std::array Example
  "#include <iostream>↵#include <array>↵int main() {↵→std::array<int, 3> arr = {1,2,3};↵→for(int n : arr) std::cout << n;↵→return 0;↵}",

  // 56. std::deque Example
  "#include <iostream>↵#include <deque>↵int main() {↵→std::deque<int> d = {1,2,3};↵→d.push_front(0);↵→std::cout << d.front();↵→return 0;↵}",

  // 57. std::bitset Example
  "#include <iostream>↵#include <bitset>↵int main() {↵→std::bitset<8> b(42);↵→std::cout << b;↵→return 0;↵}",

  // 58. std::multimap Example
  "#include <iostream>↵#include <map>↵int main() {↵→std::multimap<int, char> mm;↵→mm.insert({1, 'a'});↵→mm.insert({1, 'b'});↵→for(auto& p : mm) std::cout << p.second;↵→return 0;↵}",

  // 59. std::multiset Example
  "#include <iostream>↵#include <set>↵int main() {↵→std::multiset<int> ms = {1,2,2,3};↵→for(int n : ms) std::cout << n;↵→return 0;↵}",

  // 60. std::unordered_map Example
  '#include <iostream>↵#include <unordered_map>↵int main() {↵→std::unordered_map<std::string, int> m;↵→m["x"] = 10;↵→std::cout << m["x"];↵→return 0;↵}',

  // 61. std::unordered_set Example
  "#include <iostream>↵#include <unordered_set>↵int main() {↵→std::unordered_set<int> us = {1,2,3};↵→us.insert(4);↵→for(int n : us) std::cout << n;↵→return 0;↵}",

  // 62. std::unordered_multimap Example
  "#include <iostream>↵#include <unordered_map>↵int main() {↵→std::unordered_multimap<int, char> umm;↵→umm.insert({1, 'a'});↵→umm.insert({1, 'b'});↵→for(auto& p : umm) std::cout << p.second;↵→return 0;↵}",

  // 63. std::unordered_multiset Example
  "#include <iostream>↵#include <unordered_set>↵int main() {↵→std::unordered_multiset<int> ums = {1,2,2,3};↵→for(int n : ums) std::cout << n;↵→return 0;↵}",

  // 64. std::stack with std::string
  '#include <iostream>↵#include <stack>↵#include <string>↵int main() {↵→std::stack<std::string> s;↵→s.push("abc");↵→std::cout << s.top();↵→return 0;↵}',

  // 65. std::queue with std::string
  '#include <iostream>↵#include <queue>↵#include <string>↵int main() {↵→std::queue<std::string> q;↵→q.push("xyz");↵→std::cout << q.front();↵→return 0;↵}',

  // 66. std::priority_queue with custom comparator
  "#include <iostream>↵#include <queue>↵#include <vector>↵struct Greater {↵→bool operator()(int a, int b) { return a > b; }↵};↵int main() {↵→std::priority_queue<int, std::vector<int>, Greater> pq;↵→pq.push(3);↵→pq.push(1);↵→pq.push(2);↵→std::cout << pq.top();↵→return 0;↵}",

  // 67. std::list Example
  "#include <iostream>↵#include <list>↵int main() {↵→std::list<int> l = {1,2,3};↵→l.push_back(4);↵→for(int n : l) std::cout << n;↵→return 0;↵}",

  // 68. std::forward_list Example
  "#include <iostream>↵#include <forward_list>↵int main() {↵→std::forward_list<int> fl = {1,2,3};↵→fl.push_front(0);↵→for(int n : fl) std::cout << n;↵→return 0;↵}",

  // 69. std::stack with std::vector
  "#include <iostream>↵#include <stack>↵#include <vector>↵int main() {↵→std::stack<int, std::vector<int>> s;↵→s.push(5);↵→std::cout << s.top();↵→return 0;↵}",

  // 70. std::queue with std::deque
  "#include <iostream>↵#include <queue>↵#include <deque>↵int main() {↵→std::queue<int, std::deque<int>> q;↵→q.push(7);↵→std::cout << q.front();↵→return 0;↵}",

  // 71. std::unique Example
  "#include <iostream>↵#include <vector>↵#include <algorithm>↵int main() {↵→std::vector<int> v = {1,2,2,3};↵→auto it = std::unique(v.begin(), v.end());↵→v.erase(it, v.end());↵→for(int n : v) std::cout << n;↵→return 0;↵}",

  // 72. std::distance with list
  "#include <iostream>↵#include <list>↵#include <algorithm>↵int main() {↵→std::list<int> l = {1,2,3};↵→auto it = std::find(l.begin(), l.end(), 2);↵→std::cout << std::distance(l.begin(), it);↵→return 0;↵}",

  // 73. std::advance with vector
  "#include <iostream>↵#include <vector>↵#include <iterator>↵int main() {↵→std::vector<int> v = {1,2,3};↵→auto it = v.begin();↵→std::advance(it, 2);↵→std::cout << *it;↵→return 0;↵}",

  // 74. std::swap with vector
  "#include <iostream>↵#include <vector>↵#include <algorithm>↵int main() {↵→std::vector<int> v = {1,2};↵→std::swap(v[0], v[1]);↵→for(int n : v) std::cout << n;↵→return 0;↵}",

  // 75. std::to_string with double
  "#include <iostream>↵int main() {↵→double d = 3.14;↵→std::string s = std::to_string(d);↵→std::cout << s;↵→return 0;↵}",

  // 76. std::stoi with error handling
  '#include <iostream>↵#include <string>↵int main() {↵→try {↵→→int n = std::stoi("abc");↵→→std::cout << n;↵→} catch(...) {↵→→std::cout << "error";↵→}↵→return 0;↵}',

  // 77. std::getline with file
  "#include <iostream>↵#include <fstream>↵#include <string>↵int main() {↵→std::ifstream in(\"test.txt\");↵→std::string line;↵→while(std::getline(in, line)) std::cout << line << '\\n';↵→return 0;↵}",

  // 78. std::remove_if Example
  "#include <iostream>↵#include <vector>↵#include <algorithm>↵int main() {↵→std::vector<int> v = {1,2,3,4};↵→v.erase(std::remove_if(v.begin(), v.end(), [](int n){return n%2==0;}), v.end());↵→for(int n : v) std::cout << n;↵→return 0;↵}",

  // 79. std::generate Example
  "#include <iostream>↵#include <vector>↵#include <algorithm>↵int main() {↵→std::vector<int> v(5);↵→int x = 1;↵→std::generate(v.begin(), v.end(), [&x]{return x++;});↵→for(int n : v) std::cout << n;↵→return 0;↵}",

  // 80. std::iota Example
  "#include <iostream>↵#include <vector>↵#include <numeric>↵int main() {↵→std::vector<int> v(5);↵→std::iota(v.begin(), v.end(), 1);↵→for(int n : v) std::cout << n;↵→return 0;↵}",

  // 81. std::accumulate with lambda
  "#include <iostream>↵#include <vector>↵#include <numeric>↵int main() {↵→std::vector<int> v = {1,2,3};↵→int prod = std::accumulate(v.begin(), v.end(), 1, [](int a, int b){return a*b;});↵→std::cout << prod;↵→return 0;↵}",

  // 82. std::count Example
  "#include <iostream>↵#include <vector>↵#include <algorithm>↵int main() {↵→std::vector<int> v = {1,2,2,3};↵→std::cout << std::count(v.begin(), v.end(), 2);↵→return 0;↵}",

  // 83. std::count_if Example
  "#include <iostream>↵#include <vector>↵#include <algorithm>↵int main() {↵→std::vector<int> v = {1,2,3,4};↵→std::cout << std::count_if(v.begin(), v.end(), [](int n){return n%2==0;});↵→return 0;↵}",

  // 84. std::replace Example
  "#include <iostream>↵#include <vector>↵#include <algorithm>↵int main() {↵→std::vector<int> v = {1,2,2,3};↵→std::replace(v.begin(), v.end(), 2, 9);↵→for(int n : v) std::cout << n;↵→return 0;↵}",

  // 85. std::replace_if Example
  "#include <iostream>↵#include <vector>↵#include <algorithm>↵int main() {↵→std::vector<int> v = {1,2,3,4};↵→std::replace_if(v.begin(), v.end(), [](int n){return n%2==0;}, 0);↵→for(int n : v) std::cout << n;↵→return 0;↵}",

  // 86. std::all_of Example
  "#include <iostream>↵#include <vector>↵#include <algorithm>↵int main() {↵→std::vector<int> v = {2,4,6};↵→std::cout << std::all_of(v.begin(), v.end(), [](int n){return n%2==0;});↵→return 0;↵}",

  // 87. std::any_of Example
  "#include <iostream>↵#include <vector>↵#include <algorithm>↵int main() {↵→std::vector<int> v = {1,3,4};↵→std::cout << std::any_of(v.begin(), v.end(), [](int n){return n%2==0;});↵→return 0;↵}",

  // 88. std::none_of Example
  "#include <iostream>↵#include <vector>↵#include <algorithm>↵int main() {↵→std::vector<int> v = {1,3,5};↵→std::cout << std::none_of(v.begin(), v.end(), [](int n){return n%2==0;});↵→return 0;↵}",

  // 89. std::partition Example
  "#include <iostream>↵#include <vector>↵#include <algorithm>↵int main() {↵→std::vector<int> v = {1,2,3,4};↵→std::partition(v.begin(), v.end(), [](int n){return n%2==0;});↵→for(int n : v) std::cout << n;↵→return 0;↵}",

  // 90. std::stable_partition Example
  "#include <iostream>↵#include <vector>↵#include <algorithm>↵int main() {↵→std::vector<int> v = {1,2,3,4};↵→std::stable_partition(v.begin(), v.end(), [](int n){return n%2==0;});↵→for(int n : v) std::cout << n;↵→return 0;↵}",

  // 91. std::next_permutation Example
  "#include <iostream>↵#include <vector>↵#include <algorithm>↵int main() {↵→std::vector<int> v = {1,2,3};↵→std::next_permutation(v.begin(), v.end());↵→for(int n : v) std::cout << n;↵→return 0;↵}",

  // 92. std::prev_permutation Example
  "#include <iostream>↵#include <vector>↵#include <algorithm>↵int main() {↵→std::vector<int> v = {3,2,1};↵→std::prev_permutation(v.begin(), v.end());↵→for(int n : v) std::cout << n;↵→return 0;↵}",

  // 93. std::lower_bound Example
  "#include <iostream>↵#include <vector>↵#include <algorithm>↵int main() {↵→std::vector<int> v = {1,2,4,4,5};↵→auto it = std::lower_bound(v.begin(), v.end(), 4);↵→std::cout << (it - v.begin());↵→return 0;↵}",

  // 94. std::upper_bound Example
  "#include <iostream>↵#include <vector>↵#include <algorithm>↵int main() {↵→std::vector<int> v = {1,2,4,4,5};↵→auto it = std::upper_bound(v.begin(), v.end(), 4);↵→std::cout << (it - v.begin());↵→return 0;↵}",

  // 95. std::equal_range Example
  "#include <iostream>↵#include <vector>↵#include <algorithm>↵int main() {↵→std::vector<int> v = {1,2,4,4,5};↵→auto p = std::equal_range(v.begin(), v.end(), 4);↵→std::cout << (p.second - p.first);↵→return 0;↵}",

  // 96. std::reverse_iterator Example
  "#include <iostream>↵#include <vector>↵int main() {↵→std::vector<int> v = {1,2,3};↵→for(auto it = v.rbegin(); it != v.rend(); ++it) std::cout << *it;↵→return 0;↵}",

  // 97. std::distance with reverse_iterator
  "#include <iostream>↵#include <vector>↵int main() {↵→std::vector<int> v = {1,2,3};↵→std::cout << std::distance(v.rbegin(), v.rend());↵→return 0;↵}",

  // 98. std::accumulate with double
  "#include <iostream>↵#include <vector>↵#include <numeric>↵int main() {↵→std::vector<double> v = {1.5,2.5,3.5};↵→double sum = std::accumulate(v.begin(), v.end(), 0.0);↵→std::cout << sum;↵→return 0;↵}",

  // 99. std::find_if Example
  "#include <iostream>↵#include <vector>↵#include <algorithm>↵int main() {↵→std::vector<int> v = {1,3,5,8};↵→auto it = std::find_if(v.begin(), v.end(), [](int n){return n%2==0;});↵→if(it != v.end()) std::cout << *it;↵→return 0;↵}",

  // 100. std::transform with two vectors
  "#include <iostream>↵#include <vector>↵#include <algorithm>↵int main() {↵→std::vector<int> a = {1,2,3};↵→std::vector<int> b = {4,5,6};↵→std::vector<int> c(3);↵→std::transform(a.begin(), a.end(), b.begin(), c.begin(), [](int x, int y){return x+y;});↵→for(int n : c) std::cout << n;↵→return 0;↵}",
];
