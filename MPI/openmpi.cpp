//sudo apt install libomp-dev
#include <omp.h>
#include <iostream>

int main(){
    omp_set_num_threads(4);
    #pragma omp parallel    
    {
        int thread_id = omp_get_thread_num();
        int num_threads = omp_get_num_threads();
        std::cout << "Hello from thread " << thread_id << " out of " << num_threads << std::endl;
    }

}
//g++ -fopenmp openmpi.cpp -o openmpi.out
#include <iostream>
#include <omp.h>
#include <vector>

int main() {
    const int N = 1000000; // size of array
    std::vector<int> arr(N);
    long long serial_sum = 0;
    long long parallel_sum = 0;

    // Initialize array with values 1 to N
    for (int i = 0; i < N; i++) {
        arr[i] = i + 1;
    }

    // //////////////////////////////////////
    // // Serial Sum
    // //////////////////////////////////////
    double start = omp_get_wtime();
    for (int i = 0; i < N; i++) {
        serial_sum += arr[i];
    }

    double end = omp_get_wtime();
    std::cout << "Serial sum = " << serial_sum
              << "\n(Time: " << end - start << "s)" << std::endl;

    // //////////////////////////////////////
    // // Parallel Sum with reduction
    // //////////////////////////////////////

    // The rest of the Parallel Sum block is not fully visible in the image.
    
    // ... program continues
}
