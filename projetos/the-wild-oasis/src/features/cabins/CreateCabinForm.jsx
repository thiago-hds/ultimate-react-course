import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';
import FormRow from '../../ui/FormRow';
import { useCreateCabin } from './useCreateCabin';

function CreateCabinForm({ cabinToEdit }) {
	const { id: editId = null, ...editValues } = cabinToEdit;
	const isEditSession = Boolean(editId);

	const queryClient = useQueryClient();

	const { register, handleSubmit, reset, getValues, formState } = useForm({
		defaultValues: isEditSession ? editValues : {},
	});
	const { errors } = formState;

	const { isCreating, createCabin } = useCreateCabin();

	const { mutate: editCabin, isLoading: isEditing } = useMutation({
		mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
		onSuccess: () => {
			toast.success('Cabin succefully edited');
			queryClient.invalidateQueries({ queryKey: ['cabins'] });
			reset();
		},
		onError: err => toast.error(err.message),
	});

	const isWorking = isCreating || isEditing;

	function onSubmit(data) {
		console.log(data);

		const image =
			typeof data.image === 'string' ? data.image : data.image[0];

		if (isEditSession) {
			editCabin({ newCabinData: { ...data, image }, id: editId });
		} else {
			createCabin({ ...data, image: image });
		}
	}

	function onError(errors) {
		console.log(errors);
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)}>
			<FormRow label="Name" error={errors?.name?.message}>
				<Input
					type="text"
					id="name"
					disabled={isWorking}
					{...register('name', {
						required: 'This field is required',
					})}
				/>
			</FormRow>
			<FormRow
				label="Maximum capacity"
				error={errors?.maxCapacity?.message}
			>
				<Input
					type="number"
					id="maxCapacity"
					disabled={isWorking}
					{...register('maxCapacity', {
						required: 'This field is required',
						min: {
							value: 1,
							message: 'Capacity should be at least 1',
						},
					})}
				/>
			</FormRow>

			<FormRow
				label="Regular Price"
				error={errors?.regularPrice?.message}
			>
				<Input
					type="number"
					id="regularPrice"
					disabled={isWorking}
					{...register('regularPrice', {
						required: 'This field is required',
						min: {
							value: 1,
							message: 'Price should be at least 1',
						},
					})}
				/>
			</FormRow>

			<FormRow label="Discount" error={errors?.discount?.message}>
				<Input
					type="number"
					id="discount"
					defaultValue={0}
					disabled={isWorking}
					{...register('discount', {
						required: 'This field is required',
						validate: value => {
							return (
								value <= getValues().regularPrice ||
								'Discount should be less than regular price'
							);
						},
					})}
				/>
			</FormRow>

			<FormRow
				label="Description for website"
				error={errors?.discount?.message}
			>
				<Textarea
					type="number"
					id="description"
					defaultValue=""
					disabled={isWorking}
					{...register('description', {
						required: 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow label="Cabin photo">
				<FileInput
					id="image"
					accept="image/*"
					type="file"
					{...register('image', {
						required: isEditSession
							? false
							: 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button variation="secondary" type="reset">
					Cancel
				</Button>
				<Button disabled={isWorking}>
					{isEditSession ? 'Edit Cabin' : 'Create New Cabin'}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
