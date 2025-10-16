from mpi4py import MPI

comm = MPI.COMM_WORLD
rank = comm.Get_rank()
size = comm.Get_size()
name = MPI.Get_processor_name()
print(f"Hello from rank {rank} out of {size} on {name}")

# mpirun -np 4 python3 mpi.py