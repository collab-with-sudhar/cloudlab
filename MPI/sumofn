#include <iostream>
#include <omp.h>
using namespace std;

int main() {
    int n;
    cout << "Enter number of elements: ";
    cin >> n;

    int *arr = new int[n];
    cout << "Enter " << n << " numbers: ";
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }

    int total_sum = 0;

    // Parallel region with reduction clause for sum
    #pragma omp parallel for reduction(+:total_sum)
    for (int i = 0; i < n; i++) {
        total_sum += arr[i];
    }

    cout << "\nTotal Sum = " << total_sum << endl;

    delete[] arr;
    return 0;
}
