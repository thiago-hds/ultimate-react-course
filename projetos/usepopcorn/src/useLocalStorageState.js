import { useEffect, useState } from 'react';

export function useLocalStorageState(initialState, key) {
	// inicializar estado com itens obtidos do localStorage
	// ! para isso não é preciso criar um novo useEffect!
	const [value, setValue] = useState(() => {
		const storedWatched = localStorage.getItem(key);
		return storedWatched ? JSON.parse(storedWatched) : initialState;
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [value, key]);

	return [value, setValue];
}
