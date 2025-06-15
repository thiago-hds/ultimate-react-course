import supabase, { supabaseUrl } from './supabase';
export async function getCabins() {
	let { data, error } = await supabase.from('cabins').select('*');
	if (error) {
		throw new Error('Cabins could not be loaded');
	}

	return data;
}

export async function createEditCabin(newCabin, id) {
	const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

	const imageName = `${Math.random()}-${newCabin.image.name}`.replace(
		'/',
		''
	);

	const imagePath = hasImagePath
		? newCabin.image
		: `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	let query = supabase.from('cabins');

	console.log('newCabin', newCabin);
	console.log('id', id);

	if (!id) {
		query = query.insert([{ ...newCabin, image: imagePath }]);
	} else {
		query = query.update({ ...newCabin, image: imagePath }).eq('id', id);
	}

	const { data, error } = await query.select().single();

	if (error) {
		throw new Error('Cabin could not be created');
	}

	const { error: storageError } = await supabase.storage
		.from('cabin-images')
		.upload(imageName, newCabin.image);

	if (storageError) {
		await supabase.from('cabins').delete().eq('id', data.id);
		throw new Error(
			'Cabin image could not be uploaded and cabin could not be created'
		);
	}

	return data;
}

export async function deleteCabin(id) {
	const { error } = await supabase.from('cabins').delete().eq('id', id);

	if (error) {
		throw new Error('Cabins could not be deleted');
	}
}
