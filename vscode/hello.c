#include <stdio.h>

int main(void) {
    printf("你好，C 语言！\n");
    printf("如果你能看懂这行中文，说明环境配好了。\n");

    int a, b;
    printf("请输入两个整数（中间打个空格）：");
    if (scanf("%d %d", &a, &b) == 2) {
        printf("%d + %d = %d\n", a, b, a + b);
    }
    return 0;
}
