import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createEditCabin as createEditCabinApi } from '../../services/apiCabins';

export function useCreateCabin() {
	const queryClient = useQueryClient();

	const { mutate: createCabin, isLoading: isCreating } = useMutation({
		mutationFn: createEditCabinApi,
		onSuccess: () => {
			toast.success('New cabin succefully created');
			queryClient.invalidateQueries({ queryKey: ['cabins'] });
			// reset();
		},
		onError: err => toast.error(err.message),
	});

	return { isCreating, createCabin };
}
