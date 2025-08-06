export const CPLUSPLUS_WORDS = [
  // 1. Hello World
  '#include <iostream>\nint main() {\n\tstd::cout << "Hello, World!" << std::endl;\n\treturn 0;\n}',

  // 2. Sum of Two Numbers
  "#include <iostream>\nint main() {\n\tint a = 5, b = 7;\n\tstd::cout << (a + b) << std::endl;\n\treturn 0;\n}",

  // 3. For Loop Example
  '#include <iostream>\nint main() {\n\tfor(int i = 0; i < 5; ++i) {\n\t\tstd::cout << i << " ";\n\t}\n\treturn 0;\n}',

  // 4. Function Example
  "#include <iostream>\nint add(int x, int y) {\n\treturn x + y;\n}\nint main() {\n\tstd::cout << add(3, 4) << std::endl;\n\treturn 0;\n}",

  // 5. Class Example
  '#include <iostream>\nclass Point {\npublic:\n\tint x, y;\n\tPoint(int x, int y): x(x), y(y) {}\n\tvoid print() { std::cout << x << "," << y << std::endl; }\n};\nint main() {\n\tPoint p(1,2);\n\tp.print();\n\treturn 0;\n}',

  // 6. Vector Example
  '#include <iostream>\n#include <vector>\nint main() {\n\tstd::vector<int> v = {1,2,3};\n\tfor(auto n : v) std::cout << n << " ";\n\treturn 0;\n}',

  // 7. String Example
  '#include <iostream>\n#include <string>\nint main() {\n\tstd::string s = "C++";\n\tstd::cout << s << std::endl;\n\treturn 0;\n}',

  // 8. If-Else Example
  '#include <iostream>\nint main() {\n\tint n = 10;\n\tif(n > 5) std::cout << "big";\n\telse std::cout << "small";\n\treturn 0;\n}',

  // 9. Switch Example
  '#include <iostream>\nint main() {\n\tint n = 2;\n\tswitch(n) {\n\t\tcase 1: std::cout << "one"; break;\n\t\tcase 2: std::cout << "two"; break;\n\t\tdefault: std::cout << "other";\n\t}\n\treturn 0;\n}',

  // 10. Array Example
  '#include <iostream>\nint main() {\n\tint arr[3] = {1,2,3};\n\tfor(int i=0;i<3;++i) std::cout << arr[i] << " ";\n\treturn 0;\n}',

  // 11. Reference Example
  "#include <iostream>\nvoid inc(int& n) { n++; }\nint main() {\n\tint x = 5;\n\tinc(x);\n\tstd::cout << x;\n\treturn 0;\n}",

  // 12. Pointer Example
  "#include <iostream>\nint main() {\n\tint x = 10;\n\tint* p = &x;\n\tstd::cout << *p;\n\treturn 0;\n}",

  // 13. Const Example
  "#include <iostream>\nint main() {\n\tconst int x = 42;\n\tstd::cout << x;\n\treturn 0;\n}",

  // 14. Struct Example
  '#include <iostream>\nstruct Person {\n\tstd::string name;\n\tint age;\n};\nint main() {\n\tPerson p = {"Bob", 20};\n\tstd::cout << p.name;\n\treturn 0;\n}',

  // 15. Namespace Example
  "#include <iostream>\nnamespace math {\n\tint add(int a, int b) { return a + b; }\n}\nint main() {\n\tstd::cout << math::add(2,3);\n\treturn 0;\n}",

  // 16. Overloading Example
  '#include <iostream>\nint add(int a, int b) { return a + b; }\ndouble add(double a, double b) { return a + b; }\nint main() {\n\tstd::cout << add(2,3) << " " << add(2.5,3.5);\n\treturn 0;\n}',

  // 17. Operator Overload
  '#include <iostream>\nstruct Point {\n\tint x, y;\n\tPoint operator+(const Point& p) { return {x+p.x, y+p.y}; }\n};\nint main() {\n\tPoint a{1,2}, b{3,4};\n\tPoint c = a + b;\n\tstd::cout << c.x << "," << c.y;\n\treturn 0;\n}',

  // 18. Inheritance Example
  '#include <iostream>\nclass Animal {\npublic:\n\tvirtual void speak() { std::cout << "?"; }\n};\nclass Dog : public Animal {\npublic:\n\tvoid speak() override { std::cout << "Woof"; }\n};\nint main() {\n\tDog d;\n\td.speak();\n\treturn 0;\n}',

  // 19. Virtual Function Example
  '#include <iostream>\nclass Base {\npublic:\n\tvirtual void foo() { std::cout << "Base"; }\n};\nclass Derived : public Base {\npublic:\n\tvoid foo() override { std::cout << "Derived"; }\n};\nint main() {\n\tBase* b = new Derived();\n\tb->foo();\n\tdelete b;\n\treturn 0;\n}',

  // 20. Pure Virtual Example
  "#include <iostream>\nclass Shape {\npublic:\n\tvirtual double area() const = 0;\n};\nclass Square : public Shape {\npublic:\n\tSquare(double s):side(s){}\n\tdouble area() const override { return side*side; }\nprivate:\n\tdouble side;\n};\nint main() {\n\tSquare s(3);\n\tstd::cout << s.area();\n\treturn 0;\n}",

  // 21. Template Function Example
  '#include <iostream>\ntemplate<typename T>\nT max(T a, T b) { return a > b ? a : b; }\nint main() {\n\tstd::cout << max(2, 3) << " " << max(2.5, 1.5);\n\treturn 0;\n}',

  // 22. Template Class Example
  "#include <iostream>\ntemplate<typename T>\nclass Box {\npublic:\n\tT value;\n\tBox(T v):value(v){}\n};\nint main() {\n\tBox<int> b(5);\n\tstd::cout << b.value;\n\treturn 0;\n}",

  // 23. Lambda Example
  "#include <iostream>\nint main() {\n\tauto add = [](int a, int b) { return a + b; };\n\tstd::cout << add(2,3);\n\treturn 0;\n}",

  // 24. Exception Example
  '#include <iostream>\n#include <stdexcept>\nint main() {\n\ttry {\n\t\tthrow std::runtime_error("fail");\n\t} catch(const std::exception& e) {\n\t\tstd::cout << e.what();\n\t}\n\treturn 0;\n}',

  // 25. File I/O Example
  '#include <fstream>\n#include <iostream>\nint main() {\n\tstd::ofstream out("test.txt");\n\tout << "Hello";\n\tout.close();\n\tstd::ifstream in("test.txt");\n\tstd::string s;\n\tin >> s;\n\tstd::cout << s;\n\treturn 0;\n}',

  // 26. std::map Example
  '#include <iostream>\n#include <map>\nint main() {\n\tstd::map<std::string, int> m;\n\tm["a"] = 1;\n\tm["b"] = 2;\n\tfor(auto& p : m) std::cout << p.first << p.second;\n\treturn 0;\n}',

  // 27. std::set Example
  "#include <iostream>\n#include <set>\nint main() {\n\tstd::set<int> s = {1,2,3};\n\ts.insert(2);\n\tfor(auto n : s) std::cout << n;\n\treturn 0;\n}",

  // 28. std::stack Example
  "#include <iostream>\n#include <stack>\nint main() {\n\tstd::stack<int> s;\n\ts.push(1);\n\ts.push(2);\n\tstd::cout << s.top();\n\treturn 0;\n}",

  // 29. std::queue Example
  "#include <iostream>\n#include <queue>\nint main() {\n\tstd::queue<int> q;\n\tq.push(1);\n\tq.push(2);\n\tstd::cout << q.front();\n\treturn 0;\n}",

  // 30. std::priority_queue Example
  "#include <iostream>\n#include <queue>\nint main() {\n\tstd::priority_queue<int> pq;\n\tpq.push(3);\n\tpq.push(1);\n\tpq.push(2);\n\tstd::cout << pq.top();\n\treturn 0;\n}",

  // 31. std::pair Example
  '#include <iostream>\n#include <utility>\nint main() {\n\tstd::pair<int, std::string> p(1, "a");\n\tstd::cout << p.first << p.second;\n\treturn 0;\n}',

  // 32. std::tuple Example
  '#include <iostream>\n#include <tuple>\nint main() {\n\tauto t = std::make_tuple(1, 2.5, "hi");\n\tstd::cout << std::get<0>(t);\n\treturn 0;\n}',

  // 33. std::unique_ptr Example
  "#include <iostream>\n#include <memory>\nint main() {\n\tauto p = std::make_unique<int>(42);\n\tstd::cout << *p;\n\treturn 0;\n}",

  // 34. std::shared_ptr Example
  "#include <iostream>\n#include <memory>\nint main() {\n\tauto p = std::make_shared<int>(42);\n\tstd::cout << *p;\n\treturn 0;\n}",

  // 35. std::move Example
  '#include <iostream>\n#include <utility>\n#include <string>\nint main() {\n\tstd::string a = "abc";\n\tstd::string b = std::move(a);\n\tstd::cout << b;\n\treturn 0;\n}',

  // 36. std::sort Example
  "#include <iostream>\n#include <vector>\n#include <algorithm>\nint main() {\n\tstd::vector<int> v = {3,1,2};\n\tstd::sort(v.begin(), v.end());\n\tfor(int n : v) std::cout << n;\n\treturn 0;\n}",

  // 37. std::find Example
  "#include <iostream>\n#include <vector>\n#include <algorithm>\nint main() {\n\tstd::vector<int> v = {1,2,3};\n\tauto it = std::find(v.begin(), v.end(), 2);\n\tif(it != v.end()) std::cout << *it;\n\treturn 0;\n}",

  // 38. std::accumulate Example
  "#include <iostream>\n#include <vector>\n#include <numeric>\nint main() {\n\tstd::vector<int> v = {1,2,3};\n\tint sum = std::accumulate(v.begin(), v.end(), 0);\n\tstd::cout << sum;\n\treturn 0;\n}",

  // 39. std::transform Example
  "#include <iostream>\n#include <vector>\n#include <algorithm>\nint main() {\n\tstd::vector<int> v = {1,2,3};\n\tstd::transform(v.begin(), v.end(), v.begin(), [](int n){return n*2;});\n\tfor(int n : v) std::cout << n;\n\treturn 0;\n}",

  // 40. std::reverse Example
  "#include <iostream>\n#include <vector>\n#include <algorithm>\nint main() {\n\tstd::vector<int> v = {1,2,3};\n\tstd::reverse(v.begin(), v.end());\n\tfor(int n : v) std::cout << n;\n\treturn 0;\n}",

  // 41. std::min_element Example
  "#include <iostream>\n#include <vector>\n#include <algorithm>\nint main() {\n\tstd::vector<int> v = {3,1,2};\n\tstd::cout << *std::min_element(v.begin(), v.end());\n\treturn 0;\n}",

  // 42. std::max_element Example
  "#include <iostream>\n#include <vector>\n#include <algorithm>\nint main() {\n\tstd::vector<int> v = {3,1,2};\n\tstd::cout << *std::max_element(v.begin(), v.end());\n\treturn 0;\n}",

  // 43. std::fill Example
  "#include <iostream>\n#include <vector>\n#include <algorithm>\nint main() {\n\tstd::vector<int> v(5);\n\tstd::fill(v.begin(), v.end(), 7);\n\tfor(int n : v) std::cout << n;\n\treturn 0;\n}",

  // 44. std::copy Example
  "#include <iostream>\n#include <vector>\n#include <algorithm>\nint main() {\n\tstd::vector<int> a = {1,2,3};\n\tstd::vector<int> b(3);\n\tstd::copy(a.begin(), a.end(), b.begin());\n\tfor(int n : b) std::cout << n;\n\treturn 0;\n}",

  // 45. std::remove Example
  "#include <iostream>\n#include <vector>\n#include <algorithm>\nint main() {\n\tstd::vector<int> v = {1,2,3,2};\n\tv.erase(std::remove(v.begin(), v.end(), 2), v.end());\n\tfor(int n : v) std::cout << n;\n\treturn 0;\n}",

  // 46. std::distance Example
  "#include <iostream>\n#include <vector>\n#include <algorithm>\nint main() {\n\tstd::vector<int> v = {1,2,3};\n\tauto it = std::find(v.begin(), v.end(), 2);\n\tstd::cout << std::distance(v.begin(), it);\n\treturn 0;\n}",

  // 47. std::advance Example
  "#include <iostream>\n#include <list>\n#include <iterator>\nint main() {\n\tstd::list<int> l = {1,2,3};\n\tauto it = l.begin();\n\tstd::advance(it, 2);\n\tstd::cout << *it;\n\treturn 0;\n}",

  // 48. std::swap Example
  "#include <iostream>\nint main() {\n\tint a = 1, b = 2;\n\tstd::swap(a, b);\n\tstd::cout << a << b;\n\treturn 0;\n}",

  // 49. std::to_string Example
  "#include <iostream>\nint main() {\n\tint n = 42;\n\tstd::string s = std::to_string(n);\n\tstd::cout << s;\n\treturn 0;\n}",

  // 50. std::stoi Example
  '#include <iostream>\n#include <string>\nint main() {\n\tstd::string s = "123";\n\tint n = std::stoi(s);\n\tstd::cout << n;\n\treturn 0;\n}',
  // 51. std::getline Example
  "#include <iostream>\n#include <string>\nint main() {\n\tstd::string line;\n\tstd::getline(std::cin, line);\n\tstd::cout << line;\n\treturn 0;\n}",

  // 52. std::istringstream Example
  '#include <iostream>\n#include <sstream>\nint main() {\n\tstd::istringstream iss("10 20 30");\n\tint x, y, z;\n\tiss >> x >> y >> z;\n\tstd::cout << x + y + z;\n\treturn 0;\n}',

  // 53. std::ostringstream Example
  '#include <iostream>\n#include <sstream>\nint main() {\n\tstd::ostringstream oss;\n\toss << "Value: " << 42;\n\tstd::cout << oss.str();\n\treturn 0;\n}',

  // 54. std::stringstream Example
  "#include <iostream>\n#include <sstream>\nint main() {\n\tstd::stringstream ss;\n\tss << 123 << ' ' << 456;\n\tint a, b;\n\tss >> a >> b;\n\tstd::cout << a + b;\n\treturn 0;\n}",

  // 55. std::array Example
  "#include <iostream>\n#include <array>\nint main() {\n\tstd::array<int, 3> arr = {1,2,3};\n\tfor(int n : arr) std::cout << n;\n\treturn 0;\n}",

  // 56. std::deque Example
  "#include <iostream>\n#include <deque>\nint main() {\n\tstd::deque<int> d = {1,2,3};\n\td.push_front(0);\n\tstd::cout << d.front();\n\treturn 0;\n}",

  // 57. std::bitset Example
  "#include <iostream>\n#include <bitset>\nint main() {\n\tstd::bitset<8> b(42);\n\tstd::cout << b;\n\treturn 0;\n}",

  // 58. std::multimap Example
  "#include <iostream>\n#include <map>\nint main() {\n\tstd::multimap<int, char> mm;\n\tmm.insert({1, 'a'});\n\tmm.insert({1, 'b'});\n\tfor(auto& p : mm) std::cout << p.second;\n\treturn 0;\n}",

  // 59. std::multiset Example
  "#include <iostream>\n#include <set>\nint main() {\n\tstd::multiset<int> ms = {1,2,2,3};\n\tfor(int n : ms) std::cout << n;\n\treturn 0;\n}",

  // 60. std::unordered_map Example
  '#include <iostream>\n#include <unordered_map>\nint main() {\n\tstd::unordered_map<std::string, int> m;\n\tm["x"] = 10;\n\tstd::cout << m["x"];\n\treturn 0;\n}',

  // 61. std::unordered_set Example
  "#include <iostream>\n#include <unordered_set>\nint main() {\n\tstd::unordered_set<int> us = {1,2,3};\n\tus.insert(4);\n\tfor(int n : us) std::cout << n;\n\treturn 0;\n}",

  // 62. std::unordered_multimap Example
  "#include <iostream>\n#include <unordered_map>\nint main() {\n\tstd::unordered_multimap<int, char> umm;\n\tumm.insert({1, 'a'});\n\tumm.insert({1, 'b'});\n\tfor(auto& p : umm) std::cout << p.second;\n\treturn 0;\n}",

  // 63. std::unordered_multiset Example
  "#include <iostream>\n#include <unordered_set>\nint main() {\n\tstd::unordered_multiset<int> ums = {1,2,2,3};\n\tfor(int n : ums) std::cout << n;\n\treturn 0;\n}",

  // 64. std::stack with std::string
  '#include <iostream>\n#include <stack>\n#include <string>\nint main() {\n\tstd::stack<std::string> s;\n\ts.push("abc");\n\tstd::cout << s.top();\n\treturn 0;\n}',

  // 65. std::queue with std::string
  '#include <iostream>\n#include <queue>\n#include <string>\nint main() {\n\tstd::queue<std::string> q;\n\tq.push("xyz");\n\tstd::cout << q.front();\n\treturn 0;\n}',

  // 66. std::priority_queue with custom comparator
  "#include <iostream>\n#include <queue>\n#include <vector>\nstruct Greater {\n\tbool operator()(int a, int b) { return a > b; }\n};\nint main() {\n\tstd::priority_queue<int, std::vector<int>, Greater> pq;\n\tpq.push(3);\n\tpq.push(1);\n\tpq.push(2);\n\tstd::cout << pq.top();\n\treturn 0;\n}",

  // 67. std::list Example
  "#include <iostream>\n#include <list>\nint main() {\n\tstd::list<int> l = {1,2,3};\n\tl.push_back(4);\n\tfor(int n : l) std::cout << n;\n\treturn 0;\n}",

  // 68. std::forward_list Example
  "#include <iostream>\n#include <forward_list>\nint main() {\n\tstd::forward_list<int> fl = {1,2,3};\n\tfl.push_front(0);\n\tfor(int n : fl) std::cout << n;\n\treturn 0;\n}",

  // 69. std::stack with std::vector
  "#include <iostream>\n#include <stack>\n#include <vector>\nint main() {\n\tstd::stack<int, std::vector<int>> s;\n\ts.push(5);\n\tstd::cout << s.top();\n\treturn 0;\n}",

  // 70. std::queue with std::deque
  "#include <iostream>\n#include <queue>\n#include <deque>\nint main() {\n\tstd::queue<int, std::deque<int>> q;\n\tq.push(7);\n\tstd::cout << q.front();\n\treturn 0;\n}",

  // 71. std::unique Example
  "#include <iostream>\n#include <vector>\n#include <algorithm>\nint main() {\n\tstd::vector<int> v = {1,2,2,3};\n\tauto it = std::unique(v.begin(), v.end());\n\tv.erase(it, v.end());\n\tfor(int n : v) std::cout << n;\n\treturn 0;\n}",

  // 72. std::distance with list
  "#include <iostream>\n#include <list>\n#include <algorithm>\nint main() {\n\tstd::list<int> l = {1,2,3};\n\tauto it = std::find(l.begin(), l.end(), 2);\n\tstd::cout << std::distance(l.begin(), it);\n\treturn 0;\n}",

  // 73. std::advance with vector
  "#include <iostream>\n#include <vector>\n#include <iterator>\nint main() {\n\tstd::vector<int> v = {1,2,3};\n\tauto it = v.begin();\n\tstd::advance(it, 2);\n\tstd::cout << *it;\n\treturn 0;\n}",

  // 74. std::swap with vector
  "#include <iostream>\n#include <vector>\n#include <algorithm>\nint main() {\n\tstd::vector<int> v = {1,2};\n\tstd::swap(v[0], v[1]);\n\tfor(int n : v) std::cout << n;\n\treturn 0;\n}",

  // 75. std::to_string with double
  "#include <iostream>\nint main() {\n\tdouble d = 3.14;\n\tstd::string s = std::to_string(d);\n\tstd::cout << s;\n\treturn 0;\n}",

  // 76. std::stoi with error handling
  '#include <iostream>\n#include <string>\nint main() {\n\ttry {\n\t\tint n = std::stoi("abc");\n\t\tstd::cout << n;\n\t} catch(...) {\n\t\tstd::cout << "error";\n\t}\n\treturn 0;\n}',

  // 77. std::getline with file
  "#include <iostream>\n#include <fstream>\n#include <string>\nint main() {\n\tstd::ifstream in(\"test.txt\");\n\tstd::string line;\n\twhile(std::getline(in, line)) std::cout << line << '\\n';\n\treturn 0;\n}",

  // 78. std::remove_if Example
  "#include <iostream>\n#include <vector>\n#include <algorithm>\nint main() {\n\tstd::vector<int> v = {1,2,3,4};\n\tv.erase(std::remove_if(v.begin(), v.end(), [](int n){return n%2==0;}), v.end());\n\tfor(int n : v) std::cout << n;\n\treturn 0;\n}",

  // 79. std::generate Example
  "#include <iostream>\n#include <vector>\n#include <algorithm>\nint main() {\n\tstd::vector<int> v(5);\n\tint x = 1;\n\tstd::generate(v.begin(), v.end(), [&x]{return x++;});\n\tfor(int n : v) std::cout << n;\n\treturn 0;\n}",

  // 80. std::iota Example
  "#include <iostream>\n#include <vector>\n#include <numeric>\nint main() {\n\tstd::vector<int> v(5);\n\tstd::iota(v.begin(), v.end(), 1);\n\tfor(int n : v) std::cout << n;\n\treturn 0;\n}",

  // 81. std::accumulate with lambda
  "#include <iostream>\n#include <vector>\n#include <numeric>\nint main() {\n\tstd::vector<int> v = {1,2,3};\n\tint prod = std::accumulate(v.begin(), v.end(), 1, [](int a, int b){return a*b;});\n\tstd::cout << prod;\n\treturn 0;\n}",

  // 82. std::count Example
  "#include <iostream>\n#include <vector>\n#include <algorithm>\nint main() {\n\tstd::vector<int> v = {1,2,2,3};\n\tstd::cout << std::count(v.begin(), v.end(), 2);\n\treturn 0;\n}",

  // 83. std::count_if Example
  "#include <iostream>\n#include <vector>\n#include <algorithm>\nint main() {\n\tstd::vector<int> v = {1,2,3,4};\n\tstd::cout << std::count_if(v.begin(), v.end(), [](int n){return n%2==0;});\n\treturn 0;\n}",

  // 84. std::replace Example
  "#include <iostream>\n#include <vector>\n#include <algorithm>\nint main() {\n\tstd::vector<int> v = {1,2,2,3};\n\tstd::replace(v.begin(), v.end(), 2, 9);\n\tfor(int n : v) std::cout << n;\n\treturn 0;\n}",

  // 85. std::replace_if Example
  "#include <iostream>\n#include <vector>\n#include <algorithm>\nint main() {\n\tstd::vector<int> v = {1,2,3,4};\n\tstd::replace_if(v.begin(), v.end(), [](int n){return n%2==0;}, 0);\n\tfor(int n : v) std::cout << n;\n\treturn 0;\n}",

  // 86. std::all_of Example
  "#include <iostream>\n#include <vector>\n#include <algorithm>\nint main() {\n\tstd::vector<int> v = {2,4,6};\n\tstd::cout << std::all_of(v.begin(), v.end(), [](int n){return n%2==0;});\n\treturn 0;\n}",

  // 87. std::any_of Example
  "#include <iostream>\n#include <vector>\n#include <algorithm>\nint main() {\n\tstd::vector<int> v = {1,3,4};\n\tstd::cout << std::any_of(v.begin(), v.end(), [](int n){return n%2==0;});\n\treturn 0;\n}",

  // 88. std::none_of Example
  "#include <iostream>\n#include <vector>\n#include <algorithm>\nint main() {\n\tstd::vector<int> v = {1,3,5};\n\tstd::cout << std::none_of(v.begin(), v.end(), [](int n){return n%2==0;});\n\treturn 0;\n}",

  // 89. std::partition Example
  "#include <iostream>\n#include <vector>\n#include <algorithm>\nint main() {\n\tstd::vector<int> v = {1,2,3,4};\n\tstd::partition(v.begin(), v.end(), [](int n){return n%2==0;});\n\tfor(int n : v) std::cout << n;\n\treturn 0;\n}",

  // 90. std::stable_partition Example
  "#include <iostream>\n#include <vector>\n#include <algorithm>\nint main() {\n\tstd::vector<int> v = {1,2,3,4};\n\tstd::stable_partition(v.begin(), v.end(), [](int n){return n%2==0;});\n\tfor(int n : v) std::cout << n;\n\treturn 0;\n}",

  // 91. std::next_permutation Example
  "#include <iostream>\n#include <vector>\n#include <algorithm>\nint main() {\n\tstd::vector<int> v = {1,2,3};\n\tstd::next_permutation(v.begin(), v.end());\n\tfor(int n : v) std::cout << n;\n\treturn 0;\n}",

  // 92. std::prev_permutation Example
  "#include <iostream>\n#include <vector>\n#include <algorithm>\nint main() {\n\tstd::vector<int> v = {3,2,1};\n\tstd::prev_permutation(v.begin(), v.end());\n\tfor(int n : v) std::cout << n;\n\treturn 0;\n}",

  // 93. std::lower_bound Example
  "#include <iostream>\n#include <vector>\n#include <algorithm>\nint main() {\n\tstd::vector<int> v = {1,2,4,4,5};\n\tauto it = std::lower_bound(v.begin(), v.end(), 4);\n\tstd::cout << (it - v.begin());\n\treturn 0;\n}",

  // 94. std::upper_bound Example
  "#include <iostream>\n#include <vector>\n#include <algorithm>\nint main() {\n\tstd::vector<int> v = {1,2,4,4,5};\n\tauto it = std::upper_bound(v.begin(), v.end(), 4);\n\tstd::cout << (it - v.begin());\n\treturn 0;\n}",

  // 95. std::equal_range Example
  "#include <iostream>\n#include <vector>\n#include <algorithm>\nint main() {\n\tstd::vector<int> v = {1,2,4,4,5};\n\tauto p = std::equal_range(v.begin(), v.end(), 4);\n\tstd::cout << (p.second - p.first);\n\treturn 0;\n}",

  // 96. std::reverse_iterator Example
  "#include <iostream>\n#include <vector>\nint main() {\n\tstd::vector<int> v = {1,2,3};\n\tfor(auto it = v.rbegin(); it != v.rend(); ++it) std::cout << *it;\n\treturn 0;\n}",

  // 97. std::distance with reverse_iterator
  "#include <iostream>\n#include <vector>\nint main() {\n\tstd::vector<int> v = {1,2,3};\n\tstd::cout << std::distance(v.rbegin(), v.rend());\n\treturn 0;\n}",

  // 98. std::accumulate with double
  "#include <iostream>\n#include <vector>\n#include <numeric>\nint main() {\n\tstd::vector<double> v = {1.5,2.5,3.5};\n\tdouble sum = std::accumulate(v.begin(), v.end(), 0.0);\n\tstd::cout << sum;\n\treturn 0;\n}",

  // 99. std::find_if Example
  "#include <iostream>\n#include <vector>\n#include <algorithm>\nint main() {\n\tstd::vector<int> v = {1,3,5,8};\n\tauto it = std::find_if(v.begin(), v.end(), [](int n){return n%2==0;});\n\tif(it != v.end()) std::cout << *it;\n\treturn 0;\n}",

  // 100. std::transform with two vectors
  "#include <iostream>\n#include <vector>\n#include <algorithm>\nint main() {\n\tstd::vector<int> a = {1,2,3};\n\tstd::vector<int> b = {4,5,6};\n\tstd::vector<int> c(3);\n\tstd::transform(a.begin(), a.end(), b.begin(), c.begin(), [](int x, int y){return x+y;});\n\tfor(int n : c) std::cout << n;\n\treturn 0;\n}",
];
