#define _CRT_SECURE_NO_WARNINGS
#include<stdio.h>
#include<stdbool.h>
#include<stdlib.h>
#include<time.h>
int main()
{
	/*int num = 1;
	do
	{
		printf("%d\n", num);
		num = num + 1;

	} while (num <= 100);
*/

	/*int data[10] = { 1,2,3,4,5,6,7,8,9,10 };
	double d[5] = { 1.1,1.2,1.3,1.4,1.5 };*/

	/*int i = 0;

	do
	{
	
		
	



	}*/

	int arr[] = { 1,2,3,4,5,6,7,8,};
	//printf("%zu\n", sizeof(arr));
	//printf("%zu\n", sizeof(arr[0]));
	int sz = sizeof(arr) / sizeof(arr[0]);
	int i = 0;
	for (i = 0; i < sz; i++)
	{
		printf("%d", arr[i]);
	}



	return 0;
}