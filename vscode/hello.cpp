#include <iostream>
using namespace std;

int main() {
    cout << "你好，C++！" << endl;
    cout << "能看到这行中文，说明 g++ 也配好了。" << endl;

    int n;
    cout << "随便输个整数：";
    cin >> n;
    cout << "它的两倍是 " << n * 2 << endl;
    return 0;
}
